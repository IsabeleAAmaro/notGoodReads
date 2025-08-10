"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { BookForm } from "@/components/book-form"
import { useToast } from "@/components/ui/use-toast"
import { createBook } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import type { Book } from "@/lib/types"

export default function NewBookPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { token, isLoading: authLoading } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!token) {
      router.push("/signin")
    }
  }, [token, router])

  const handleSubmit = async (data: Partial<Book>) => {
    try {
      setIsLoading(true)

      await createBook(token!, data)

      toast({
        title: "Success",
        description: "Book added successfully",
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add book",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (authLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-4 md:p-6">
        <div className="container mx-auto max-w-md space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Add New Reading</h1>
            <p className="text-muted-foreground">Add a new book to your reading list</p>
          </div>

          <BookForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </main>
    </div>
  )
}
