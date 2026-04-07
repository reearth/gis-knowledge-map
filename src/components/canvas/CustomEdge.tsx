import { memo, useState } from 'react'
import { EdgeProps, getBezierPath, EdgeLabelRenderer, BaseEdge } from 'reactflow'

function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  selected,
}: EdgeProps) {
  const [isHovered, setIsHovered] = useState(false)

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  // Relationship type colors
  const relationshipColors: Record<string, string> = {
    prerequisites: '#EF4444',
    related: '#9CA3AF',
    enables: '#10B981',
    partOf: '#6B7280',
    usedBy: '#F59E0B',
  }

  const color = data?.relationshipType
    ? relationshipColors[data.relationshipType] || '#9CA3AF'
    : '#9CA3AF'

  const showLabel = selected || isHovered

  return (
    <>
      {/* Invisible wider path for easier hovering */}
      <path
        d={edgePath}
        strokeWidth={20}
        stroke="transparent"
        fill="none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ cursor: 'pointer' }}
      />

      {/* Visible edge path */}
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          strokeWidth: showLabel ? 2 : 1,
          stroke: color,
          opacity: showLabel ? 0.6 : 0.15,
          transition: 'all 0.2s ease',
        }}
      />

      {/* Edge label */}
      {showLabel && data?.relationshipType && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              pointerEvents: 'none',
              padding: '4px 8px',
              borderRadius: '6px',
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              border: `1px solid ${color}`,
              fontSize: '11px',
              fontWeight: 600,
              color: color,
              whiteSpace: 'nowrap',
            }}
          >
            {data.relationshipType}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  )
}

export default memo(CustomEdge)
