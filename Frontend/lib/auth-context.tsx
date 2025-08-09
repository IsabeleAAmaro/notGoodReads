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
    const initializeAuth = async () => {
      const storedToken = Cookies.get("token")
      if (storedToken) {
        try {
          // Verify token with the backend
          const response = await fetch(
            "http://localhost:8080/api/users/verify-token/",
            {
              headers: {
                Authorization: `Bearer ${storedToken}`,
              },
            }
          )

          if (response.ok) {
            const storedUser = localStorage.getItem("user")
            if (storedUser) {
              const parsedUser = JSON.parse(storedUser)
              setToken(storedToken)
              setUser(parsedUser)
            } else {
              logout()
            }
          } else {
            // Token is invalid or expired
            logout()
          }
        } catch (error) {
          console.error("Error verifying token:", error)
          logout()
        }
      }
      setIsLoading(false)
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
