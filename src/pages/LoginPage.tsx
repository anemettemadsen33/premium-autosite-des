import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/lib/auth'
import { SignIn, EnvelopeSimple, Lock } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface LoginPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }

    setIsLoading(true)
    
    const success = await login(email, password)
    
    if (success) {
      toast.success('Welcome back!')
      onNavigate('dashboard')
    } else {
      toast.error('Invalid email or password')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent to-purple-600 rounded-2xl flex items-center justify-center">
            <SignIn size={32} weight="duotone" className="text-white" />
          </div>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <p className="text-sm text-muted-foreground">Sign in to your account to continue</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <EnvelopeSimple size={20} weight="duotone" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock size={20} weight="duotone" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full gap-2 bg-gradient-to-r from-accent to-purple-600"
              disabled={isLoading}
            >
              <SignIn size={20} weight="bold" />
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <button
              onClick={() => onNavigate('register')}
              className="text-accent hover:underline font-medium"
            >
              Register
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
