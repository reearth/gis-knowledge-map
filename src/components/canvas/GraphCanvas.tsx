import { useCallback, useState, useEffect, useMemo } from 'react'
import ReactFlow, {
  Background,
  Controls,
  Node,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  BackgroundVariant,
  useReactFlow,
} from 'reactflow'
import 'reactflow/dist/style.css'
import CustomNode from './CustomNode'
import CustomEdge from './CustomEdge'
import { GraphNode, GraphEdge } from '@/types/graph.types'

const nodeTypes = {
  custom: CustomNode,
}

const edgeTypes = {
  default: CustomEdge,
}

interface GraphCanvasProps {
  initialNodes: GraphNode[]
  initialEdges: GraphEdge[]
  onNodeClick?: (node: GraphNode) => void
}

export default function GraphCanvas({
  initialNodes,
  initialEdges,
  onNodeClick,
}: GraphCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [highlightedNodes, setHighlightedNodes] = useState<Set<string>>(new Set())
  const [focusMode, setFocusMode] = useState(false)

  const { setCenter, getZoom, fitBounds, fitView } = useReactFlow()

  // Update nodes and edges when initialNodes/initialEdges change
  useEffect(() => {
    console.log('🔄 GraphCanvas received:', initialNodes.length, 'nodes,', initialEdges.length, 'edges')
    console.log('📍 Node positions sample:')
    initialNodes.slice(0, 5).forEach(n => {
      console.log(`  ${n.id} (${n.data.category}): x=${n.position.x}, y=${n.position.y}`)
    })

    // Update nodes and edges
    setNodes(initialNodes)
    setEdges(initialEdges)

    // Fit view after positions are applied
    const timer = setTimeout(() => {
      fitView({ padding: 0.1, duration: 300 })
    }, 200)

    return () => clearTimeout(timer)
  }, [initialNodes, initialEdges, setNodes, setEdges, fitView])

  // Find connected nodes for highlighting
  const getConnectedNodes = useCallback((nodeId: string): Set<string> => {
    const connected = new Set<string>([nodeId])

    edges.forEach(edge => {
      if (edge.source === nodeId) {
        connected.add(edge.target)
      }
      if (edge.target === nodeId) {
        connected.add(edge.source)
      }
    })

    return connected
  }, [edges])

  // Update highlighted nodes when selection changes
  useEffect(() => {
    if (selectedNode) {
      const connected = getConnectedNodes(selectedNode)
      setHighlightedNodes(connected)
    } else {
      setHighlightedNodes(new Set())
    }
  }, [selectedNode, getConnectedNodes])

  // Apply dimming effect to nodes
  const styledNodes = useMemo(() => {
    return nodes.map(node => ({
      ...node,
      style: {
        ...node.style,
        opacity: focusMode && selectedNode && !highlightedNodes.has(node.id) ? 0.2 : 1,
        transition: 'opacity 0.3s ease',
      },
    }))
  }, [nodes, focusMode, selectedNode, highlightedNodes])

  // Apply highlighting to edges
  const styledEdges = useMemo(() => {
    return edges.map(edge => ({
      ...edge,
      style: {
        ...edge.style,
        opacity: focusMode && selectedNode &&
          !highlightedNodes.has(edge.source) &&
          !highlightedNodes.has(edge.target) ? 0.05 : 0.15,
        transition: 'opacity 0.3s ease',
      },
      animated: selectedNode ? (edge.source === selectedNode || edge.target === selectedNode) : false,
    }))
  }, [edges, focusMode, selectedNode, highlightedNodes])

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const handleNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      setSelectedNode(node.id)
      setFocusMode(true)

      // Smooth camera movement to selected node
      if (node.position) {
        // Calculate absolute position (child nodes have relative positions)
        let absoluteX = node.position.x
        let absoluteY = node.position.y

        // If node has a parent, add parent's position to get absolute position
        if ((node as GraphNode).parentNode) {
          const parentNode = nodes.find(n => n.id === (node as GraphNode).parentNode)
          if (parentNode) {
            absoluteX += parentNode.position.x
            absoluteY += parentNode.position.y
          }
        }

        const zoom = getZoom()
        setCenter(absoluteX + 120, absoluteY + 60, {
          duration: 800,
          zoom: Math.max(zoom, 1),
        })
      }

      if (onNodeClick) {
        onNodeClick(node as GraphNode)
      }
    },
    [onNodeClick, setCenter, getZoom, nodes]
  )

  const handleNodeDoubleClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      // Double-click to zoom into neighborhood
      const connected = getConnectedNodes(node.id)
      const connectedNodes = nodes.filter(n => connected.has(n.id))

      if (connectedNodes.length > 0) {
        // Helper function to get absolute position of a node
        const getAbsolutePosition = (n: GraphNode) => {
          let x = n.position.x
          let y = n.position.y

          if (n.parentNode) {
            const parent = nodes.find(p => p.id === n.parentNode)
            if (parent) {
              x += parent.position.x
              y += parent.position.y
            }
          }

          return { x, y }
        }

        const positions = connectedNodes.map(n => getAbsolutePosition(n as GraphNode))
        const minX = Math.min(...positions.map(p => p.x))
        const maxX = Math.max(...positions.map(p => p.x + 240))
        const minY = Math.min(...positions.map(p => p.y))
        const maxY = Math.max(...positions.map(p => p.y + 200))

        fitBounds(
          { x: minX - 50, y: minY - 50, width: maxX - minX + 100, height: maxY - minY + 100 },
          { duration: 800, padding: 0.2 }
        )
      }
    },
    [getConnectedNodes, nodes, fitBounds]
  )

  const handlePaneClick = useCallback(() => {
    setSelectedNode(null)
    setFocusMode(false)
  }, [])

  return (
    <div className="w-full h-full relative">
      <ReactFlow
        nodes={styledNodes}
        edges={styledEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        onNodeDoubleClick={handleNodeDoubleClick}
        onPaneClick={handlePaneClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        minZoom={0.2}
        maxZoom={2}
        defaultEdgeOptions={{
          type: 'default',
          animated: false,
        }}
        className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
      >
        {/* Background pattern */}
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#334155"
          className="opacity-30"
        />

        {/* Controls */}
        <Controls
          className="!bg-slate-800/90 !border-slate-700 !shadow-xl"
          showInteractive={false}
        />
      </ReactFlow>
    </div>
  )
}
