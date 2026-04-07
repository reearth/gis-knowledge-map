import { memo } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import { Node } from '@/types/node.types'

interface CustomNodeData extends Node {}

function CustomNode({ data, selected }: NodeProps<CustomNodeData>) {
  // Get icon component
  const iconName = data.style?.icon || 'circle'
  const IconComponent = (LucideIcons as any)[
    iconName.split('-').map((word: string) =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('') as keyof typeof LucideIcons
  ] || LucideIcons.Circle

  // Type colors from config - nodes automatically inherit their type's color
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

  // All nodes use their type's color for consistency
  const nodeColor = data.type ? (typeColors[data.type] || '#64748b') : '#64748b'
  const typeColor = nodeColor

  // Render group/parent nodes differently
  if (data.isGroup) {
    return (
      <>
        <Handle type="target" position={Position.Top} className="opacity-0" />
        <Handle type="source" position={Position.Bottom} className="opacity-0" />

        <div className="w-full h-full relative rounded-lg" style={{
          backgroundColor: 'rgba(100, 116, 139, 0.05)',
          border: `2px solid ${selected ? typeColor : 'rgba(100, 116, 139, 0.2)'}`,
          padding: '12px',
        }}>
          {/* Group header */}
          <div className="flex items-center mb-2" style={{ gap: '8px' }}>
            <IconComponent
              className="w-5 h-5"
              style={{ color: typeColor }}
            />
            <h3 className="font-semibold text-sm" style={{ color: typeColor }}>
              {data.title}
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            {data.summary}
          </p>
        </div>
      </>
    )
  }

  // Regular node rendering
  return (
    <>
      {/* Handles for connections */}
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <Handle type="source" position={Position.Bottom} className="opacity-0" />

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{
          scale: 1.05,
          boxShadow: `0 0 25px ${nodeColor}30`,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative rounded-xl border-2 backdrop-blur-sm transition-all duration-200 cursor-pointer min-w-[180px] max-w-[240px]"
        style={{
          padding: '12px 16px',
          borderColor: selected ? nodeColor : 'rgba(71, 85, 105, 0.5)',
          backgroundColor: selected
            ? `${nodeColor}20`
            : 'rgba(30, 41, 59, 0.8)',
          boxShadow: selected ? `0 0 20px ${nodeColor}40` : '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Header with icon and title */}
        <div className="flex items-center mb-2" style={{ gap: '12px' }}>
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{
              backgroundColor: selected ? `${nodeColor}30` : 'rgba(51, 65, 85, 0.5)'
            }}
          >
            <IconComponent
              className="w-5 h-5"
              style={{ color: nodeColor }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-white truncate">
              {data.title}
            </h3>
            <p className="text-xs text-slate-400 capitalize">
              {data.type}
            </p>
          </div>
        </div>

        {/* Summary */}
        <p className="text-xs text-slate-300 line-clamp-2" style={{ marginBottom: '8px' }}>
          {data.summary}
        </p>

        {/* Footer badges */}
        <div className="flex items-center flex-wrap" style={{ gap: '6px' }}>
          {data.type && (
            <span className="rounded text-xs font-semibold" style={{
              padding: '3px 8px',
              backgroundColor: `${typeColor}25`,
              border: `1px solid ${typeColor}60`,
              color: typeColor
            }}>
              {data.type}
            </span>
          )}
          {data.difficulty && (
            <span className="rounded-full text-xs font-medium" style={{
              padding: '2px 8px',
              backgroundColor: `${nodeColor}20`,
              color: nodeColor
            }}>
              {data.difficulty}
            </span>
          )}
          {data.importance && (
            <span className="rounded-full text-xs font-medium text-slate-300" style={{
              padding: '2px 8px',
              backgroundColor: 'rgba(51, 65, 85, 0.5)'
            }}>
              {data.importance}
            </span>
          )}
        </div>

        {/* Selection indicator */}
        {selected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
            style={{ backgroundColor: nodeColor }}
          />
        )}
      </motion.div>
    </>
  )
}

export default memo(CustomNode)
