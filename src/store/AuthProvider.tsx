import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { storage, STORAGE_KEYS } from '@/lib/storage'
import { generateId } from '@/lib/id'
import { UnauthorizedError } from '@/lib/errors'
import type { AdminUser, Credentials, Session } from '@/types'

const ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL ?? 'jawadkhanktk788@gmail.com').trim().toLowerCase()
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? ''
const SESSION_TTL_MS = 8 * 60 * 60 * 1000

export const DEMO_CREDENTIALS: Credentials = { email: ADMIN_EMAIL, password: '' }

const ADMIN_USER: AdminUser = {
  id: 'admin',
  name: 'Jawad Khan',
  email: ADMIN_EMAIL,
  avatar: '',
  role: 'admin',
}

interface AuthContextValue {
  status: 'idle' | 'loading'
  user: AdminUser | null
  isAuthenticated: boolean
  login: (credentials: Credentials) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function readSession(): Session | null {
  const stored = storage.get<Session>(STORAGE_KEYS.session)
  if (!stored || new Date(stored.expiresAt).getTime() <= Date.now()) {
    storage.remove(STORAGE_KEYS.session)
    return null
  }
  return stored
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(readSession)
  const [status, setStatus] = useState<'idle' | 'loading'>('idle')

  useEffect(() => {
    const timer = window.setInterval(() => {
      const current = readSession()
      setSession(current)
    }, 60_000)
    return () => window.clearInterval(timer)
  }, [])

  const login = useCallback(async (credentials: Credentials) => {
    setStatus('loading')
    try {
      await new Promise((resolve) => setTimeout(resolve, 350))
      if (!ADMIN_PASSWORD) {
        throw new UnauthorizedError('Admin authentication is not configured. Set VITE_ADMIN_PASSWORD in your local environment.')
      }
      const ok = credentials.email.trim().toLowerCase() === ADMIN_EMAIL && credentials.password === ADMIN_PASSWORD
      if (!ok) throw new UnauthorizedError('Invalid email or password.')
      const next: Session = {
        user: ADMIN_USER,
        token: generateId('session'),
        expiresAt: new Date(Date.now() + SESSION_TTL_MS).toISOString(),
      }
      storage.set(STORAGE_KEYS.session, next)
      setSession(next)
    } finally {
      setStatus('idle')
    }
  }, [])

  const logout = useCallback(() => {
    storage.remove(STORAGE_KEYS.session)
    setSession(null)
  }, [])

  const value = useMemo<AuthContextValue>(() => ({
    status,
    user: session?.user ?? null,
    isAuthenticated: !!session,
    login,
    logout,
  }), [status, session, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
