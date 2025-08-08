"use client"

import { createContext, useContext, useEffect, useState } from "react"
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
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = Cookies.get("token")
        const storedUser = localStorage.getItem("user")

        if (storedToken && storedUser) {
          const parsedUser = JSON.parse(storedUser)
          if (parsedUser && typeof parsedUser === "object") {
            setToken(storedToken)
            setUser(parsedUser)
          } else {
            console.error("Invalid user data in localStorage")
            logout()
          }
        }
      } catch (error) {
        console.error("Error loading authentication data:", error)
        logout()
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const login = (token: string, user: User) => {
    try {
      Cookies.set("token", token, { expires: 7, path: "/" }) // Expires in 7 days
      if (user) {
        localStorage.setItem("user", JSON.stringify(user))
      }
      setToken(token)
      setUser(user)
      router.push("/dashboard")
    } catch (error) {
      console.error("Error saving authentication data:", error)
    }
  }

  const logout = () => {
    try {
      Cookies.remove("token", { path: "/" })
      localStorage.removeItem("user")
      setToken(null)
      setUser(null)
      router.push("/")
    } catch (error) {
      console.error("Error logging out:", error)
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
