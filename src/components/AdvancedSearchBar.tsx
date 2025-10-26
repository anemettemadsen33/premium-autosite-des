import { useState, useEffect, useRef, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MagnifyingGlass, X, Clock, TrendUp } from '@phosphor-icons/react'
import { useDebounce } from '@/hooks/use-debounce'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { motion, AnimatePresence } from 'framer-motion'

interface SearchSuggestion {
  query: string
  type: 'recent' | 'suggestion'
  count?: number
}

interface AdvancedSearchBarProps {
  value: string
  onChange: (value: string) => void
  onSearch?: (query: string) => void
  suggestions?: string[]
  placeholder?: string
  className?: string
}

export function AdvancedSearchBar({
  value,
  onChange,
  onSearch,
  suggestions = [],
  placeholder = 'Search vehicles...',
  className = ''
}: AdvancedSearchBarProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>('recent-searches', [])
  const debouncedValue = useDebounce(value, 300)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const allSuggestions = useMemo(() => {
    const results: SearchSuggestion[] = []

    if (value.length === 0) {
      recentSearches.slice(0, 5).forEach(query => {
        results.push({ query, type: 'recent' })
      })
    } else {
      const filtered = suggestions
        .filter(s => s.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 8)
      
      filtered.forEach(query => {
        results.push({ query, type: 'suggestion' })
      })
    }

    return results
  }, [value, recentSearches, suggestions])

  const handleSearch = (query: string) => {
    if (query.trim()) {
      const newRecent = [query, ...recentSearches.filter(s => s !== query)].slice(0, 10)
      setRecentSearches(newRecent)
      onSearch?.(query)
      setIsFocused(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && value.trim()) {
      handleSearch(value)
    }
  }

  const handleClearRecent = () => {
    setRecentSearches([])
  }

  const handleRemoveRecent = (query: string) => {
    setRecentSearches(recentSearches.filter(s => s !== query))
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && e.target instanceof Node && !containerRef.current.contains(e.target)) {
        setIsFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const showSuggestions = isFocused && allSuggestions.length > 0

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <MagnifyingGlass 
          size={20} 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
        />
        <Input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="pl-10 pr-10"
        />
        {value && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
            onClick={() => onChange('')}
          >
            <X size={16} />
          </Button>
        )}
      </div>

      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 z-50"
          >
            <Card>
              <CardContent className="p-2">
                {value.length === 0 && recentSearches.length > 0 && (
                  <div className="flex items-center justify-between px-2 py-1 mb-1">
                    <span className="text-xs text-muted-foreground font-medium">
                      Recent Searches
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 text-xs"
                      onClick={handleClearRecent}
                    >
                      Clear
                    </Button>
                  </div>
                )}

                <div className="space-y-1">
                  {allSuggestions.map((suggestion, index) => (
                    <motion.div
                      key={`${suggestion.type}-${suggestion.query}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <button
                        className="w-full flex items-center gap-3 px-3 py-2 hover:bg-accent rounded-md transition-colors text-left group"
                        onClick={() => {
                          onChange(suggestion.query)
                          handleSearch(suggestion.query)
                        }}
                      >
                        {suggestion.type === 'recent' ? (
                          <Clock size={16} className="text-muted-foreground flex-shrink-0" />
                        ) : (
                          <MagnifyingGlass size={16} className="text-muted-foreground flex-shrink-0" />
                        )}
                        
                        <span className="flex-1 text-sm">{suggestion.query}</span>

                        {suggestion.type === 'recent' && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleRemoveRecent(suggestion.query)
                            }}
                          >
                            <X size={14} />
                          </Button>
                        )}

                        {suggestion.count !== undefined && (
                          <Badge variant="secondary" className="text-xs">
                            {suggestion.count}
                          </Badge>
                        )}
                      </button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
