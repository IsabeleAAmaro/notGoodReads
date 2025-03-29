"use client"

import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { BookOpen, Settings, LogOut } from "lucide-react"

type HeaderProps = {
  showDashboard?: boolean
  showSettings?: boolean
  showLogout?: boolean
}

export function Header({ showDashboard = false, showSettings = false, showLogout = false }: HeaderProps) {
  const { user, logout } = useAuth()

  return (
    <header className="border-b border-border">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          <span className="text-xl font-bold">NGoodReads</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6">
          {!user && (
            <>
              <Link href="/signin">
                <Button variant="ghost" className="font-mono">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="font-mono">Sign Up</Button>
              </Link>
            </>
          )}

          {user && (
            <div className="flex items-center gap-4">
              {showDashboard && (
                <Link href="/dashboard">
                  <Button variant="ghost" size="icon">
                    <BookOpen className="h-5 w-5" />
                    <span className="sr-only">Dashboard</span>
                  </Button>
                </Link>
              )}

              {showSettings && (
                <Link href="/settings">
                  <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                    <span className="sr-only">Settings</span>
                  </Button>
                </Link>
              )}

              {showLogout && (
                <Button variant="ghost" size="icon" onClick={logout}>
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Log out</span>
                </Button>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

