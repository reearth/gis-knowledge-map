import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Tag, AlertCircle, Sparkles } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { Node } from '@/types/node.types'

interface NodeDetailPanelProps {
  node: Node | null
  onClose: () => void
  onNodeNavigate?: (nodeId: string) => void
}

export default function NodeDetailPanel({
  node,
  onClose,
  onNodeNavigate,
}: NodeDetailPanelProps) {
  if (!node) return null

  // Get icon component
  const iconName = node.style?.icon || 'circle'
  const IconComponent = (LucideIcons as any)[
    iconName.split('-').map((word: string) =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('') as keyof typeof LucideIcons
  ] || LucideIcons.Circle

  const nodeColor = node.style?.color || '#3B82F6'

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-slate-900/95 backdrop-blur-xl border-l border-slate-700 shadow-2xl z-50 overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700 z-10" style={{ padding: '24px' }}>
          <div className="flex items-start justify-between" style={{ marginBottom: '16px' }}>
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${nodeColor}20` }}
            >
              <IconComponent className="w-7 h-7" style={{ color: nodeColor }} />
            </div>
            <button
              onClick={onClose}
              className="hover:bg-slate-800 rounded-lg transition-colors"
              style={{ padding: '8px' }}
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          <h2 className="text-2xl font-bold text-white" style={{ marginBottom: '8px' }}>{node.title}</h2>

          <div className="flex items-center flex-wrap" style={{ gap: '8px' }}>
            <span className="rounded-full text-xs font-medium text-slate-300 capitalize" style={{
              padding: '4px 12px',
              backgroundColor: 'rgb(30, 41, 59)'
            }}>
              {node.type}
            </span>
            {node.difficulty && (
              <span className="rounded-full text-xs font-medium capitalize" style={{
                padding: '4px 12px',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                color: 'rgb(147, 197, 253)'
              }}>
                {node.difficulty}
              </span>
            )}
            {node.importance && (
              <span className="rounded-full text-xs font-medium capitalize" style={{
                padding: '4px 12px',
                backgroundColor: 'rgba(168, 85, 247, 0.2)',
                color: 'rgb(216, 180, 254)'
              }}>
                {node.importance}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Summary */}
          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider" style={{ marginBottom: '8px' }}>
              Summary
            </h3>
            <p className="text-slate-200 leading-relaxed">{node.summary}</p>
          </div>

          {/* Description */}
          {node.description && (
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider" style={{ marginBottom: '8px' }}>
                Description
              </h3>
              <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                {node.description}
              </p>
            </div>
          )}

          {/* Aliases */}
          {node.aliases && node.aliases.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center" style={{ marginBottom: '8px', gap: '8px' }}>
                <Sparkles className="w-4 h-4" />
                Also Known As
              </h3>
              <div className="flex flex-wrap" style={{ gap: '8px' }}>
                {node.aliases.map((alias) => (
                  <span
                    key={alias}
                    className="bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-slate-300"
                    style={{ padding: '4px 12px' }}
                  >
                    {alias}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Relationships */}
          {node.relationships && Object.entries(node.relationships).some(([, ids]) => ids && ids.length > 0) && (
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider" style={{ marginBottom: '12px' }}>
                Relationships
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {Object.entries(node.relationships).map(([type, nodeIds]) => {
                  if (!nodeIds || nodeIds.length === 0) return null

                  const relationColors: Record<string, string> = {
                    prerequisites: 'red',
                    enables: 'emerald',
                    related: 'slate',
                    usedBy: 'orange',
                    partOf: 'slate',
                  }
                  const color = relationColors[type] || 'slate'

                  return (
                    <div key={type}>
                      <h4 className={`text-xs font-medium text-${color}-400 uppercase`} style={{ marginBottom: '8px' }}>
                        {type.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      <div className="flex flex-wrap" style={{ gap: '8px' }}>
                        {nodeIds.map((nodeId) => (
                          <button
                            key={nodeId}
                            onClick={() => onNodeNavigate?.(nodeId)}
                            className={`bg-${color}-500/10 border border-${color}-500/30 hover:bg-${color}-500/20 rounded-lg text-sm text-${color}-300 transition-colors`}
                            style={{ padding: '6px 12px' }}
                          >
                            {nodeId}
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Tags */}
          {node.tags && node.tags.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center" style={{ marginBottom: '8px', gap: '8px' }}>
                <Tag className="w-4 h-4" />
                Tags
              </h3>
              <div className="flex flex-wrap" style={{ gap: '8px' }}>
                {node.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 rounded-lg text-xs"
                    style={{ padding: '4px 12px' }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Keywords */}
          {node.keywords && node.keywords.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider" style={{ marginBottom: '8px' }}>
                Keywords
              </h3>
              <div className="flex flex-wrap" style={{ gap: '8px' }}>
                {node.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="bg-slate-800/50 rounded text-xs text-slate-400"
                    style={{ padding: '4px 8px' }}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Resources */}
          {node.resources && node.resources.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center" style={{ marginBottom: '12px', gap: '8px' }}>
                <ExternalLink className="w-4 h-4" />
                Resources
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {node.resources.map((resource, idx) => (
                  <a
                    key={idx}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors group"
                    style={{ padding: '12px' }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                          {resource.title}
                        </h4>
                        <p className="text-xs text-slate-400 capitalize" style={{ marginTop: '4px' }}>
                          {resource.type}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors flex-shrink-0" style={{ marginLeft: '8px' }} />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Role Relevance */}
          {node.roleRelevance && Object.keys(node.roleRelevance).length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center" style={{ marginBottom: '12px', gap: '8px' }}>
                <AlertCircle className="w-4 h-4" />
                Role Relevance
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {Object.entries(node.roleRelevance).map(([role, relevance]) => (
                  <div key={role}>
                    <div className="flex items-center justify-between" style={{ marginBottom: '4px' }}>
                      <span className="text-sm text-slate-300 capitalize">
                        {role.replace(/-/g, ' ')}
                      </span>
                      <span className="text-sm font-medium text-slate-400">
                        {Math.round(relevance * 100)}%
                      </span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all"
                        style={{ width: `${relevance * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Metadata */}
          {(node.contributors || node.lastUpdated) && (
            <div className="border-t border-slate-800" style={{ paddingTop: '24px' }}>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider" style={{ marginBottom: '12px' }}>
                Metadata
              </h3>
              <div className="text-sm text-slate-400" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {node.lastUpdated && (
                  <p>Last Updated: {node.lastUpdated}</p>
                )}
                {node.contributors && node.contributors.length > 0 && (
                  <p>Contributors: {node.contributors.join(', ')}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
