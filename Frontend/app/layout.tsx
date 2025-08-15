import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Space_Mono } from "next/font/google"

import { AuthProvider } from "@/lib/auth-context"
import { Header } from "@/components/header"
import { Toaster } from "@/components/ui/toaster"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
})

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.ico',
  },
  title: "NotGoodReads - Reading Tracker",
  description: "Track your reading journey",
    generator: 'Isabele'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${spaceMono.variable} font-mono`}>
        <AuthProvider>
          <Header />
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
