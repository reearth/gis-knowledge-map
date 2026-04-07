import { Node as ReactFlowNode, Edge as ReactFlowEdge } from 'reactflow'
import { Node } from './node.types'
import { CSSProperties } from 'react'

// Extended React Flow node with our custom data
export interface GraphNode extends ReactFlowNode {
  id: string
  type: string
  position: { x: number; y: number }
  data: Node
  parentNode?: string
  extent?: 'parent'
  style?: CSSProperties
}

// Extended React Flow edge with our custom data
export interface GraphEdge extends Omit<ReactFlowEdge, 'data' | 'style'> {
  id: string
  source: string
  target: string
  type?: string
  label?: string
  animated?: boolean
  style?: CSSProperties
  data?: {
    relationshipType: string
    color?: string
  }
}

// Graph data structure
export interface GraphData {
  nodes: GraphNode[]
  edges: GraphEdge[]
}

// Filter state
export interface FilterState {
  categories: string[]
  types: string[]
  roles: string[]
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  searchQuery: string
}

// View state
export interface ViewState {
  selectedNodeId: string | null
  highlightedNodeIds: string[]
  focusMode: boolean
  zoom: number
}
