"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
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
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const logout = () => {
    try {
      Cookies.remove("token", { path: "/" })
      localStorage.removeItem("user")
      setToken(null)
      setUser(null)
      window.location.href = "/"
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  const login = (token: string, user: User) => {
    try {
      Cookies.set("token", token, { expires: 7, path: "/" }) // Expires in 7 days
      if (user) {
        localStorage.setItem("user", JSON.stringify(user))
      }
      setToken(token)
      setUser(user)
      window.location.href = "/dashboard"
    } catch (error) {
      console.error("Error saving authentication data:", error)
    }
  }

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = Cookies.get("token")
      if (storedToken) {
        try {
          // Verify token with the backend
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-token/`,
            {
              headers: {
                Authorization: `Bearer ${storedToken}`,
              },
            }
          )

          if (response.ok) {
            const userData = await response.json()
            setToken(storedToken)
            setUser(userData)
            localStorage.setItem("user", JSON.stringify(userData))
          } else {
            // Token is invalid or expired
            logout()
          }
        } catch (error) {
          console.error("Error verifying token:", error)
          logout()
        } finally {
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

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
