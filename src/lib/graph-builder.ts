import { type Node } from './schemas'
import { type GraphNode, type GraphEdge, type GraphData } from '../types/graph.types'

interface BuildGraphOptions {
  animate?: boolean
  includeRelationshipTypes?: string[]
}

/**
 * Builds React Flow graph data from nodes
 */
export function buildGraph(
  nodes: Node[],
  options: BuildGraphOptions = {}
): GraphData {
  const { animate = false, includeRelationshipTypes } = options

  // Transform nodes to React Flow format
  // Don't set positions here - let applyLayout handle it
  const graphNodes: GraphNode[] = nodes.map((node) => {
    const graphNode: GraphNode = {
      id: node.id,
      type: 'custom', // We'll create a custom node component
      position: { x: 0, y: 0 }, // Placeholder, will be overridden by layout
      data: node,
    }

    // Set up parent-child relationship for React Flow
    if (node.parentNode) {
      graphNode.parentNode = node.parentNode
      graphNode.extent = 'parent' // Constrain child within parent bounds
    }

    // Group nodes (parents) need explicit dimensions
    if (node.isGroup) {
      graphNode.style = {
        width: 300,
        height: 400,
        backgroundColor: 'rgba(100, 116, 139, 0.05)',
        borderRadius: '8px',
        border: '2px solid rgba(100, 116, 139, 0.2)',
      }
    }

    return graphNode
  })

  // Build edges from relationships
  const graphEdges: GraphEdge[] = []
  let edgeId = 0

  nodes.forEach((node) => {
    if (!node.relationships) return

    // Process each relationship type
    Object.entries(node.relationships).forEach(([relationshipType, targetIds]) => {
      if (!targetIds || !Array.isArray(targetIds)) return

      // Filter by included relationship types if specified
      if (
        includeRelationshipTypes &&
        !includeRelationshipTypes.includes(relationshipType)
      ) {
        return
      }

      targetIds.forEach((targetId) => {
        graphEdges.push({
          id: `e${edgeId++}`,
          source: node.id,
          target: targetId,
          type: 'default',
          animated: animate,
          data: {
            relationshipType,
          },
          label: relationshipType,
        })
      })
    })
  })

  return {
    nodes: graphNodes,
    edges: graphEdges,
  }
}

/**
 * Applies layout algorithm to position nodes
 */
export function applyLayout(
  nodes: GraphNode[],
  layoutType: 'grid' | 'category' | 'force' = 'category'
): GraphNode[] {
  if (layoutType === 'grid') {
    return applyGridLayout(nodes)
  } else if (layoutType === 'category') {
    return applyCategoryLayout(nodes)
  }

  // Default: preserve positions
  return nodes
}

/**
 * Grid layout - arranges nodes in a grid
 */
function applyGridLayout(nodes: GraphNode[]): GraphNode[] {
  const cols = Math.ceil(Math.sqrt(nodes.length))
  const spacing = 200

  return nodes.map((node, index) => ({
    ...node,
    position: {
      x: (index % cols) * spacing,
      y: Math.floor(index / cols) * spacing,
    },
  }))
}

/**
 * Category layout - groups nodes hierarchically with parent-child relationships
 */
function applyCategoryLayout(nodes: GraphNode[]): GraphNode[] {
  const result: GraphNode[] = []

  // Separate parent nodes and child nodes
  const parentNodes = nodes.filter((n) => n.data.isGroup)
  const childNodes = nodes.filter((n) => !n.data.isGroup)
  const standaloneNodes = childNodes.filter((n) => !n.data.parentNode)

  // Group children by parent
  const childrenByParent = new Map<string, GraphNode[]>()
  childNodes.forEach((node) => {
    if (node.data.parentNode) {
      if (!childrenByParent.has(node.data.parentNode)) {
        childrenByParent.set(node.data.parentNode, [])
      }
      childrenByParent.get(node.data.parentNode)!.push(node)
    }
  })

  let currentX = 100 // Start X position
  const parentSpacing = 80 // Horizontal spacing between parent groups
  const childSpacing = 180 // Vertical spacing between children
  const childPadding = 50 // Padding inside parent for children

  // Layout parent nodes and their children
  parentNodes.forEach((parent) => {
    const children = childrenByParent.get(parent.id) || []

    // Calculate parent height based on number of children
    const parentHeight = Math.max(
      400,
      children.length * childSpacing + childPadding * 2 + 60 // 60 for parent title
    )

    // Position parent node
    result.push({
      ...parent,
      position: {
        x: currentX,
        y: 100,
      },
      style: {
        ...parent.style,
        width: 320,
        height: parentHeight,
      },
    })

    // Position children inside parent (relative to parent's top-left)
    children.forEach((child, index) => {
      result.push({
        ...child,
        position: {
          x: 10, // Small padding from parent's left edge
          y: index * childSpacing + childPadding + 40, // Offset for parent title
        },
      })
    })

    // Move to next parent position
    currentX += 320 + parentSpacing
  })

  // Layout standalone nodes (no parent) in a separate column
  if (standaloneNodes.length > 0) {
    standaloneNodes.forEach((node, index) => {
      result.push({
        ...node,
        position: {
          x: currentX,
          y: 100 + index * childSpacing,
        },
      })
    })
  }

  console.log('📍 Hierarchical layout applied:', {
    parentCount: parentNodes.length,
    childCount: childNodes.length,
    standaloneCount: standaloneNodes.length,
    totalNodes: result.length,
    parents: parentNodes.map((p) => ({
      id: p.id,
      children: childrenByParent.get(p.id)?.length || 0,
    })),
  })

  return result
}

/**
 * Filters graph by category (now uses type field)
 * Kept for backwards compatibility but filters by type
 */
export function filterByCategory(
  graph: GraphData,
  categories: string[]
): GraphData {
  if (categories.length === 0) return graph

  const filteredNodes = graph.nodes.filter((node) =>
    categories.includes(node.data.type)
  )

  const nodeIds = new Set(filteredNodes.map((n) => n.id))
  const filteredEdges = graph.edges.filter(
    (edge) => nodeIds.has(edge.source) && nodeIds.has(edge.target)
  )

  return {
    nodes: filteredNodes,
    edges: filteredEdges,
  }
}

/**
 * Filters graph by node type
 */
export function filterByType(graph: GraphData, types: string[]): GraphData {
  if (types.length === 0) return graph

  const filteredNodes = graph.nodes.filter((node) =>
    types.includes(node.data.type)
  )

  const nodeIds = new Set(filteredNodes.map((n) => n.id))
  const filteredEdges = graph.edges.filter(
    (edge) => nodeIds.has(edge.source) && nodeIds.has(edge.target)
  )

  return {
    nodes: filteredNodes,
    edges: filteredEdges,
  }
}

/**
 * Gets connected nodes for a given node
 */
export function getConnectedNodes(
  graph: GraphData,
  nodeId: string
): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const connectedNodeIds = new Set<string>([nodeId])

  // Find all edges connected to this node
  const connectedEdges = graph.edges.filter((edge) => {
    if (edge.source === nodeId) {
      connectedNodeIds.add(edge.target)
      return true
    }
    if (edge.target === nodeId) {
      connectedNodeIds.add(edge.source)
      return true
    }
    return false
  })

  // Get all connected nodes
  const connectedNodes = graph.nodes.filter((node) =>
    connectedNodeIds.has(node.id)
  )

  return {
    nodes: connectedNodes,
    edges: connectedEdges,
  }
}

/**
 * Searches nodes by query
 */
export function searchNodes(nodes: GraphNode[], query: string): GraphNode[] {
  const lowerQuery = query.toLowerCase()

  return nodes.filter((node) => {
    const { title, summary, tags, keywords, aliases } = node.data

    return (
      title.toLowerCase().includes(lowerQuery) ||
      summary?.toLowerCase().includes(lowerQuery) ||
      tags?.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      keywords?.some((kw) => kw.toLowerCase().includes(lowerQuery)) ||
      aliases?.some((alias) => alias.toLowerCase().includes(lowerQuery))
    )
  })
}
