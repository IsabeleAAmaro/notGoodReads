"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

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
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem("token")
        const storedUser = localStorage.getItem("user")

        if (storedToken && storedUser) {
          // Verificação adicional para JSON válido
          const parsedUser = JSON.parse(storedUser)
          if (parsedUser && typeof parsedUser === 'object') {
            setToken(storedToken)
            setUser(parsedUser)
          } else {
            console.error('Dados de usuário inválidos no localStorage')
            localStorage.removeItem("user")
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados de autenticação:', error)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const login = (token: string, user: User) => {
    try {
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      setToken(token)
      setUser(user)
    } catch (error) {
      console.error('Erro ao salvar dados de autenticação:', error)
    }
  }

  const logout = () => {
    try {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setToken(null)
      setUser(null)
      router.push("/")
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
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