import { createContext, useContext, ReactNode, useEffect, useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { User } from './types'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUserId, setCurrentUserId] = useKV<string | null>('current-user-id', null)
  const [users, setUsers] = useKV<Record<string, User>>('users', {})
  const [passwords, setPasswords] = useKV<Record<string, string>>('user-passwords', {})
  const [isLoading, setIsLoading] = useState(true)
  
  const user = currentUserId && users ? users[currentUserId] || null : null

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!users || !passwords) return false
    
    const userEntry = Object.entries(users).find(([_, u]) => u.email === email)
    
    if (!userEntry) {
      return false
    }
    
    const [userId, userData] = userEntry
    
    if (passwords[userId] !== password) {
      return false
    }
    
    setCurrentUserId(userId)
    return true
  }

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    const currentUsers = users || {}
    const currentPasswords = passwords || {}
    
    const existingUser = Object.values(currentUsers).find(u => u.email === email)
    
    if (existingUser) {
      return false
    }
    
    const userId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const newUser: User = {
      id: userId,
      email,
      name,
      createdAt: new Date().toISOString()
    }
    
    setUsers(current => ({ ...(current || {}), [userId]: newUser }))
    setPasswords(current => ({ ...(current || {}), [userId]: password }))
    setCurrentUserId(userId)
    
    return true
  }

  const logout = () => {
    setCurrentUserId(null)
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
