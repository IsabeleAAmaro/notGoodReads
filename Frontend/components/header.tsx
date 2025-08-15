"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, LogOut, Settings } from "lucide-react"

import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"

import { HeaderLink } from "./header-link"

export function Header() {
  const { user, logout, isLoading } = useAuth()
  const pathname = usePathname()

  const isBookPage =
    pathname.startsWith("/books/") || pathname.startsWith("/books/new")

  if (isLoading) {
    return null
  }

  return (
    <header className="border-b border-border">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link
          href={user ? "/dashboard" : "/"}
          className="flex items-center gap-2"
        >
          <img src="/logo-transparent2.png" className="h-8 w-8" />
          <span className="text-xl font-bold">NotGoodReads</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6">
          {!user && (
            <>
              <Link href="/signin">
                <Button variant="ghost" className="font-mono">
                  Entrar
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="font-mono">Cadastre-se</Button>
              </Link>
            </>
          )}

          {user && (
            <div className="flex items-center gap-4">
              {isBookPage && <HeaderLink href="/dashboard">Início</HeaderLink>}

              <Link href="/settings">
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Button>
              </Link>

              <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Log out</span>
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
