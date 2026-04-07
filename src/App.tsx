import { useEffect, useState, useCallback, useMemo } from 'react'
import { ReactFlowProvider } from 'reactflow'
import { loadGISContent, validateRelationships, findNodeById } from './lib/content-loader'
import { buildGraph, applyLayout, filterByType } from './lib/graph-builder'
import GraphCanvas from './components/canvas/GraphCanvas'
import NodeDetailPanel from './components/features/NodeDetailPanel'
import SearchCommand from './components/features/SearchCommand'
import FilterPanel from './components/features/FilterPanel'
import KeyboardShortcuts from './components/features/KeyboardShortcuts'
import { GraphNode } from './types/graph.types'
import { DomainConfig, Node } from './types/node.types'
import { Search, Keyboard } from 'lucide-react'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Content state
  const [allNodes, setAllNodes] = useState<Node[]>([])
  const [config, setConfig] = useState<DomainConfig | null>(null)
  const [graphData, setGraphData] = useState<{
    nodes: GraphNode[]
    edges: any[]
  } | null>(null)

  // UI state
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  // Load content on mount
  useEffect(() => {
    try {
      // Clear any React Flow cached state in localStorage
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('rf-')) {
          localStorage.removeItem(key)
          console.log('🧹 Cleared localStorage:', key)
        }
      })

      const content = loadGISContent()
      const relationshipErrors = validateRelationships(content.nodes)
      const allErrors = [...content.errors, ...relationshipErrors]

      if (allErrors.length > 0) {
        console.error('⚠️ Content validation errors:', allErrors)
      }

      setAllNodes(content.nodes)
      setConfig(content.config)

      const graph = buildGraph(content.nodes, { animate: false })
      console.log('🔍 Graph before layout:', graph.nodes.map(n => ({
        id: n.id,
        category: n.data.category,
        pos: n.position
      })))

      const layoutedNodes = applyLayout(graph.nodes, 'category')
      console.log('🔍 Graph after layout:', layoutedNodes.map(n => ({
        id: n.id,
        category: n.data.category,
        pos: n.position
      })))

      setGraphData({
        nodes: layoutedNodes,
        edges: graph.edges,
      })

      console.log('✅ Content loaded successfully:', {
        config: content.config,
        nodesCount: content.nodes.length,
        edgesCount: graph.edges.length,
        errors: allErrors.length,
      })

      setIsLoading(false)
    } catch (err) {
      console.error('❌ Failed to load content:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
      setIsLoading(false)
    }
  }, [])

  // Apply filters to graph
  const filteredGraphData = useMemo(() => {
    if (!graphData) return null

    let filtered = graphData

    // Apply type filter (category and type are now merged)
    if (selectedTypes.length > 0) {
      filtered = filterByType(filtered, selectedTypes)
    }

    return filtered
  }, [graphData, selectedTypes])

  // Handlers
  const handleNodeClick = useCallback((node: GraphNode) => {
    setSelectedNodeId(node.id)
  }, [])

  const handleNodeSelect = useCallback((nodeId: string) => {
    setSelectedNodeId(nodeId)
    // TODO: Center camera on node
  }, [])

  const handleTypeToggle = useCallback((type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }, [])

  const handleClearFilters = useCallback(() => {
    setSelectedTypes([])
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
      // ? to toggle help
      if (e.key === '?' && !isSearchOpen) {
        e.preventDefault()
        setIsHelpOpen(prev => !prev)
      }
      // Escape to close panels and reset focus
      if (e.key === 'Escape') {
        setSelectedNodeId(null)
        setIsSearchOpen(false)
        setIsHelpOpen(false)
      }
      // R to reset filters
      if (e.key === 'r' && !e.metaKey && !e.ctrlKey && !isSearchOpen && !isHelpOpen) {
        handleClearFilters()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSearchOpen, isHelpOpen, handleClearFilters])

  const selectedNode = selectedNodeId ? (findNodeById(allNodes, selectedNodeId) || null) : null

  // Loading state
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-lg font-medium">Loading Knowledge Map...</p>
          <p className="text-slate-400 text-sm mt-2">Parsing YAML content & building graph</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-8 max-w-md">
          <h2 className="text-red-400 text-xl font-bold mb-2">Error Loading Content</h2>
          <p className="text-slate-300">{error}</p>
          <p className="text-slate-400 text-sm mt-4">Check console for details</p>
        </div>
      </div>
    )
  }

  if (!filteredGraphData || !config) {
    return null
  }

  return (
    <div className="w-screen h-screen flex overflow-hidden bg-slate-950">
      {/* Filter Sidebar */}
      <FilterPanel
        config={config}
        selectedTypes={selectedTypes}
        onTypeToggle={handleTypeToggle}
        onClearFilters={handleClearFilters}
        totalNodes={graphData?.nodes.length || 0}
        visibleNodes={filteredGraphData.nodes.length}
        edgesCount={graphData?.edges.length || 0}
      />

      {/* Main Canvas */}
      <div className="flex-1 relative">
        <ReactFlowProvider>
          <GraphCanvas
            initialNodes={filteredGraphData.nodes}
            initialEdges={filteredGraphData.edges}
            onNodeClick={handleNodeClick}
          />
        </ReactFlowProvider>

        {/* Floating Action Buttons */}
        <div className="absolute z-10" style={{ bottom: '24px', right: '24px', display: 'flex', gap: '12px' }}>
          {/* Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="bg-slate-800/90 hover:bg-slate-800 backdrop-blur-xl border border-slate-700 rounded-xl shadow-xl transition-all flex items-center text-slate-300 hover:text-white"
            style={{
              padding: '12px 16px',
              gap: '12px'
            }}
          >
            <Search className="w-5 h-5" />
            <span className="text-sm font-medium">Search</span>
            <kbd className="rounded text-xs" style={{
              padding: '4px 8px',
              backgroundColor: 'rgba(51, 65, 85, 0.5)'
            }}>⌘K</kbd>
          </button>

          {/* Help Button */}
          <button
            onClick={() => setIsHelpOpen(true)}
            className="bg-slate-800/90 hover:bg-slate-800 backdrop-blur-xl border border-slate-700 rounded-xl shadow-xl transition-all flex items-center text-slate-300 hover:text-white"
            style={{
              padding: '12px'
            }}
            title="Keyboard Shortcuts"
          >
            <Keyboard className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Node Detail Panel */}
      <NodeDetailPanel
        node={selectedNode}
        onClose={() => setSelectedNodeId(null)}
        onNodeNavigate={handleNodeSelect}
      />

      {/* Search Command Palette */}
      <SearchCommand
        nodes={graphData?.nodes || []}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNodeSelect={handleNodeSelect}
      />

      {/* Keyboard Shortcuts Help */}
      <KeyboardShortcuts
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </div>
  )
}

export default App
