"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

type User = {
  id: string
  username: string
  email: string
  first_name: string
  last_name: string
  bio: string
}

type AuthContextType = {
  user: User | null
  token: string | null
  login: (token: string, user: User) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true) // Começa carregando
  const router = useRouter()

  const logout = useCallback(() => {
    Cookies.remove("token")
    localStorage.removeItem("user")
    setToken(null)
    setUser(null)
    // Usa o router do Next.js para navegar, é mais seguro que window.location
    router.push("/")
  }, [router])

  // Este useEffect só roda no cliente, após a montagem inicial
  useEffect(() => {
    const storedToken = Cookies.get("token")
    const storedUser = localStorage.getItem("user")

    if (storedToken && storedUser) {
      try {
        setUser(JSON.parse(storedUser))
        setToken(storedToken)
      } catch (e) {
        console.error("Failed to parse stored user, logging out.")
        logout()
      }
    }
    setIsLoading(false) // Termina o carregamento
  }, [logout])

  const login = (token: string, user: User) => {
    Cookies.set("token", token, { expires: 7 })
    localStorage.setItem("user", JSON.stringify(user))
    setToken(token)
    setUser(user)
    router.push("/dashboard")
  }

  const value = { user, token, login, logout, isLoading }

  return (
    <AuthContext.Provider value={value}>
      {/* Só renderiza os filhos quando o carregamento inicial terminar */}
      {!isLoading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
