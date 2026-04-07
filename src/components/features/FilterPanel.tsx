import { motion } from 'framer-motion'
import { Filter, X, Map } from 'lucide-react'
import { DomainConfig } from '@/types/node.types'

interface FilterPanelProps {
  config: DomainConfig
  selectedTypes: string[]
  onTypeToggle: (type: string) => void
  onClearFilters: () => void
  totalNodes?: number
  visibleNodes?: number
  edgesCount?: number
}

export default function FilterPanel({
  config,
  selectedTypes,
  onTypeToggle,
  onClearFilters,
  totalNodes = 0,
  visibleNodes = 0,
  edgesCount = 0,
}: FilterPanelProps) {
  const hasActiveFilters = selectedTypes.length > 0

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="w-72 bg-slate-900/95 backdrop-blur-xl border-r border-slate-700 overflow-y-auto"
      style={{ padding: '24px' }}
    >
      {/* Title Section */}
      <div style={{ marginBottom: '32px' }}>
        <div className="flex items-center" style={{ gap: '12px', marginBottom: '8px' }}>
          <Map className="w-6 h-6 text-blue-400" />
          <h1 className="text-xl font-bold text-white">GIS Knowledge Map</h1>
        </div>
        <p className="text-sm text-slate-400" style={{ marginBottom: '12px' }}>
          {totalNodes} nodes • {edgesCount} relationships
        </p>
        <p className="text-xs text-slate-500">
          Click to focus • Double-click to zoom • Press ? for help
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-800" style={{ marginBottom: '24px' }} />

      {/* Filters Header */}
      <div style={{ marginBottom: '24px' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: '12px' }}>
          <div className="flex items-center" style={{ gap: '8px' }}>
            <Filter className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-bold text-white">Filters</h2>
          </div>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-xs text-slate-400 hover:text-white transition-colors flex items-center"
              style={{ gap: '4px' }}
            >
              <X className="w-3 h-3" />
              Clear
            </button>
          )}
        </div>

        {/* Visible nodes indicator */}
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-blue-500/10 border border-blue-500/30 rounded-lg"
            style={{ padding: '8px 12px' }}
          >
            <p className="text-xs font-medium text-blue-400">
              Showing {visibleNodes} of {totalNodes} nodes
            </p>
          </motion.div>
        )}
      </div>

      {/* Node Types (combined with categories) */}
      <div style={{ marginBottom: '24px' }}>
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider" style={{ marginBottom: '12px' }}>
          Node Types
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {config.nodeTypes.map((nodeType) => {
            const isSelected = selectedTypes.includes(nodeType.id)
            return (
              <button
                key={nodeType.id}
                onClick={() => onTypeToggle(nodeType.id)}
                className="w-full rounded-lg text-left transition-all flex items-center border-2"
                style={{
                  padding: '12px',
                  gap: '12px',
                  backgroundColor: isSelected ? 'rgba(16, 185, 129, 0.2)' : 'rgba(30, 41, 59, 0.5)',
                  borderColor: isSelected ? 'rgba(16, 185, 129, 0.5)' : 'transparent'
                }}
              >
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: nodeType.color }}
                />
                <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {nodeType.label}
                </span>
                {isSelected && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="border-t border-slate-800" style={{ paddingTop: '16px' }}>
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider" style={{ marginBottom: '12px' }}>
          Active Filters
        </h3>
        <div className="text-sm text-slate-300" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div className="flex justify-between">
            <span>Selected Types:</span>
            <span className="font-medium">{selectedTypes.length}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
