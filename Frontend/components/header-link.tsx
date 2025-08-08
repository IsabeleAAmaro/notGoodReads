"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface HeaderLinkProps {
  href: string
  children: React.ReactNode
}

export function HeaderLink({ href, children }: HeaderLinkProps) {
  const pathname = usePathname()

  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "text-base font-normal",
        "hover:underline",
        pathname === href && "text-foreground",
      )}
    >
      {children}
    </Link>
  )
}
