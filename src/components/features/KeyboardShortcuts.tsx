import { motion, AnimatePresence } from 'framer-motion'
import { X, Keyboard } from 'lucide-react'

interface KeyboardShortcutsProps {
  isOpen: boolean
  onClose: () => void
}

export default function KeyboardShortcuts({ isOpen, onClose }: KeyboardShortcutsProps) {
  if (!isOpen) return null

  const shortcuts = [
    { key: '⌘ K / Ctrl K', description: 'Open search' },
    { key: 'Click', description: 'Select node and highlight connections' },
    { key: 'Double Click', description: 'Zoom to node neighborhood' },
    { key: 'Esc', description: 'Clear selection and close panels' },
    { key: 'R', description: 'Reset all filters' },
    { key: 'Drag', description: 'Pan the canvas' },
    { key: 'Scroll', description: 'Zoom in/out' },
    { key: 'Hover Edge', description: 'Show relationship type' },
  ]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
        onClick={onClose}
        style={{ padding: '16px' }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl max-w-md w-full"
          style={{ padding: '24px' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between" style={{ marginBottom: '24px' }}>
            <div className="flex items-center" style={{ gap: '12px' }}>
              <Keyboard className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-bold text-white">Keyboard Shortcuts</h2>
            </div>
            <button
              onClick={onClose}
              className="hover:bg-slate-800 rounded-lg transition-colors"
              style={{ padding: '8px' }}
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {/* Shortcuts list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {shortcuts.map((shortcut, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-slate-800/50 rounded-lg"
                style={{ padding: '12px' }}
              >
                <span className="text-sm text-slate-300">{shortcut.description}</span>
                <kbd
                  className="text-xs font-medium text-slate-200 bg-slate-700 rounded"
                  style={{ padding: '4px 8px' }}
                >
                  {shortcut.key}
                </kbd>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-slate-700" style={{ marginTop: '24px', paddingTop: '16px' }}>
            <p className="text-xs text-slate-400 text-center">
              Press <kbd className="bg-slate-700 rounded" style={{ padding: '2px 6px' }}>?</kbd> to toggle this help
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
