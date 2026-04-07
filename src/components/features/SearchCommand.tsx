import { useEffect, useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Zap } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { GraphNode } from '@/types/graph.types'
import { searchNodes } from '@/lib/graph-builder'

interface SearchCommandProps {
  nodes: GraphNode[]
  isOpen: boolean
  onClose: () => void
  onNodeSelect: (nodeId: string) => void
}

// Debounce hook for search performance
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default function SearchCommand({
  nodes,
  isOpen,
  onClose,
  onNodeSelect,
}: SearchCommandProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Debounce search query for better performance
  const debouncedQuery = useDebounce(query, 150)

  // Memoized search results
  const results = useMemo(() => {
    if (debouncedQuery.trim()) {
      const searchResults = searchNodes(nodes, debouncedQuery)
      return searchResults.slice(0, 10) // Limit to 10 results
    } else {
      return nodes.slice(0, 10) // Show first 10 nodes by default
    }
  }, [debouncedQuery, nodes])

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0)
  }, [results])

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % results.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length)
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault()
        onNodeSelect(results[selectedIndex].id)
        onClose()
      } else if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    },
    [results, selectedIndex, onNodeSelect, onClose]
  )

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-32 px-4"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: -20 }}
          transition={{ type: 'spring', damping: 30, stiffness: 400 }}
          className="w-full max-w-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input */}
          <div className="border-b border-slate-700" style={{ padding: '16px' }}>
            <div className="relative">
              <Search className="absolute w-5 h-5 text-slate-400" style={{ left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search nodes... (type to filter)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                className="w-full bg-slate-800/50 text-white placeholder-slate-400 rounded-xl border border-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                style={{ paddingLeft: '48px', paddingRight: '48px', paddingTop: '12px', paddingBottom: '12px' }}
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute hover:bg-slate-700 rounded-lg transition-colors"
                  style={{ right: '16px', top: '50%', transform: 'translateY(-50%)', padding: '4px' }}
                >
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="overflow-y-auto" style={{ maxHeight: '384px' }}>
            {results.length === 0 ? (
              <div className="text-center text-slate-400" style={{ padding: '32px' }}>
                <Search className="w-12 h-12 mx-auto opacity-50" style={{ marginBottom: '12px' }} />
                <p>No results found</p>
                <p className="text-sm" style={{ marginTop: '4px' }}>Try a different search term</p>
              </div>
            ) : (
              <div style={{ padding: '8px' }}>
                {results.map((node, index) => {
                  const iconName = node.data.style?.icon || 'circle'
                  const IconComponent = (LucideIcons as any)[
                    iconName.split('-').map((word: string) =>
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join('') as keyof typeof LucideIcons
                  ] || LucideIcons.Circle

                  // Use type colors for consistency
                  const typeColors: Record<string, string> = {
                    'core-concepts': '#64748B',
                    'spatial-reference-systems': '#10B981',
                    'data-models': '#8B5CF6',
                    'data-formats': '#EC4899',
                    'processing-tools': '#14B8A6',
                    'analysis-libraries': '#06B6D4',
                    'gis-servers-services': '#F97316',
                    'tile-delivery-systems': '#F59E0B',
                    'web-mapping-libraries': '#FB923C',
                    'desktop-gis-applications': '#3B82F6',
                    'spatial-databases': '#A855F7',
                    'cloud-gis-platforms': '#C084FC',
                    'remote-sensing': '#0EA5E9',
                  }
                  const nodeColor = node.data.type ? (typeColors[node.data.type] || '#64748b') : '#64748b'

                  return (
                    <button
                      key={node.id}
                      onClick={() => {
                        onNodeSelect(node.id)
                        onClose()
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className="w-full rounded-xl text-left transition-all border-2"
                      style={{
                        padding: '12px',
                        marginBottom: '4px',
                        backgroundColor: selectedIndex === index ? 'rgb(30, 41, 59)' : 'transparent',
                        borderColor: selectedIndex === index ? 'rgba(59, 130, 246, 0.5)' : 'transparent'
                      }}
                    >
                      <div className="flex items-center" style={{ gap: '12px' }}>
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${nodeColor}20` }}
                        >
                          <IconComponent className="w-5 h-5" style={{ color: nodeColor }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-white truncate">
                            {node.data.title}
                          </h3>
                          <p className="text-sm text-slate-400 truncate">
                            {node.data.summary}
                          </p>
                        </div>
                        <div className="flex items-center flex-shrink-0" style={{ gap: '8px' }}>
                          <span className="rounded text-xs text-slate-300 capitalize" style={{
                            padding: '4px 8px',
                            backgroundColor: 'rgba(51, 65, 85, 0.5)'
                          }}>
                            {node.data.type}
                          </span>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Footer hint */}
          <div className="border-t border-slate-700 bg-slate-800/30 flex items-center justify-between text-xs text-slate-400" style={{ padding: '12px' }}>
            <div className="flex items-center" style={{ gap: '16px' }}>
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span>Esc Close</span>
            </div>
            <div className="flex items-center" style={{ gap: '8px' }}>
              {query !== debouncedQuery && (
                <Zap className="w-3 h-3 text-yellow-400 animate-pulse" />
              )}
              <span>{results.length} results</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
