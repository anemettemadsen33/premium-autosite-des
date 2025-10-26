import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Keyboard, Command } from '@phosphor-icons/react'

type Shortcut = {
  keys: string[]
  description: string
  category: string
}

type KeyboardShortcutsProps = {
  onNavigate: (page: string, params?: Record<string, string>) => void
}

export function KeyboardShortcuts({ onNavigate }: KeyboardShortcutsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const shortcuts: Shortcut[] = [
    { keys: ['?'], description: 'Show keyboard shortcuts', category: 'General' },
    { keys: ['/', 'Ctrl', 'K'], description: 'Focus search', category: 'General' },
    { keys: ['H'], description: 'Go to homepage', category: 'Navigation' },
    { keys: ['D'], description: 'Go to dashboard', category: 'Navigation' },
    { keys: ['F'], description: 'Go to favorites', category: 'Navigation' },
    { keys: ['M'], description: 'Go to messages', category: 'Navigation' },
    { keys: ['A'], description: 'Go to auctions', category: 'Navigation' },
    { keys: ['N'], description: 'Create new listing', category: 'Actions' },
    { keys: ['C'], description: 'Open chat support', category: 'Actions' },
    { keys: ['Q'], description: 'Quick actions menu', category: 'Actions' },
    { keys: ['T'], description: 'Toggle theme', category: 'Settings' },
    { keys: ['Esc'], description: 'Close modals/dialogs', category: 'General' },
  ]

  const categories = Array.from(new Set(shortcuts.map(s => s.category)))

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      if (e.key === '?') {
        e.preventDefault()
        setIsOpen(true)
      }

      if (e.key === 'Escape') {
        setIsOpen(false)
      }

      if (e.ctrlKey || e.metaKey) return

      switch (e.key.toLowerCase()) {
        case 'h':
          e.preventDefault()
          onNavigate('home')
          break
        case 'd':
          e.preventDefault()
          onNavigate('dashboard')
          break
        case 'f':
          e.preventDefault()
          onNavigate('favorites')
          break
        case 'm':
          e.preventDefault()
          onNavigate('messages')
          break
        case 'a':
          e.preventDefault()
          onNavigate('auctions')
          break
        case 'n':
          e.preventDefault()
          onNavigate('add-listing')
          break
        case 't': {
          e.preventDefault()
          const themeToggle = document.querySelector('[data-theme-toggle]') as HTMLButtonElement
          themeToggle?.click()
          break
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [onNavigate])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Keyboard className="h-6 w-6 text-accent" weight="duotone" />
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription>
            Navigate faster with keyboard commands
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
                {category}
              </h3>
              <div className="space-y-2">
                {shortcuts
                  .filter(s => s.category === category)
                  .map((shortcut, index) => (
                    <div key={index} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted transition-colors">
                      <span className="text-sm">{shortcut.description}</span>
                      <div className="flex items-center gap-1">
                        {shortcut.keys.map((key, i) => (
                          <div key={i} className="flex items-center gap-1">
                            {i > 0 && <span className="text-xs text-muted-foreground">+</span>}
                            <Badge variant="outline" className="font-mono px-2 py-1 text-xs">
                              {key === 'Ctrl' ? <Command className="h-3 w-3" /> : key}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
              {category !== categories[categories.length - 1] && <Separator className="mt-4" />}
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
          <p className="text-sm text-center text-muted-foreground">
            Press <Badge variant="outline" className="mx-1 font-mono">?</Badge> anytime to view this help
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
