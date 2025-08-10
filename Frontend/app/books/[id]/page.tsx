"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { BookForm } from "@/components/book-form"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { getBook, updateBook, deleteBook } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import type { Book } from "@/lib/types"
import { Edit, Trash2, Star } from "lucide-react"

export default function BookDetailsPage() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()
  const { toast } = useToast()
  const { token, isLoading: authLoading } = useAuth()
  const [book, setBook] = useState<Book | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!authLoading && !token) {
      router.push("/signin")
      return
    }

    if (token && id) {
      fetchBook()
    }
  }, [token, authLoading, id])

  const fetchBook = async () => {
    try {
      setIsLoading(true)
      const data = await getBook(token!, id)
      setBook(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch book details",
        variant: "destructive",
      })
      router.push("/dashboard")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleUpdate = async (data: Partial<Book>) => {
    try {
      setIsSubmitting(true)
      await updateBook(token!, id, data)

      toast({
        title: "Success",
        description: "Book updated successfully",
      })

      setBook((prev) => (prev ? { ...prev, ...data } : null))
      setIsEditing(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update book",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    try {
      setIsSubmitting(true)
      await deleteBook(token!, id)

      toast({
        title: "Success",
        description: "Book deleted successfully",
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete book",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
      setIsDeleting(false)
    }
  }

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-5 w-5 fill-current" />)
    }

    if (hasHalfStar) {
      stars.push(
        <svg
          key="half"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2" />
          <path fill="currentColor" d="M12 2v15.8" />
        </svg>,
      )
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-5 w-5" />)
    }

    return stars
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Want to Read":
        return "bg-secondary text-secondary-foreground"
      case "Reading":
        return "bg-primary text-primary-foreground"
      case "Completed":
        return "bg-accent text-accent-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  if (authLoading || isLoading) {
    return <div>Loading...</div>
  }

  if (!book) {
    return <div>Book not found</div>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-4 md:p-6">
        <div className="container mx-auto max-w-3xl space-y-6">
          {isEditing ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Edit Reading</h1>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setIsDeleting(true)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              <BookForm initialData={book} onSubmit={handleUpdate} isLoading={isSubmitting} />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">{book.title}</h1>
                <Button variant="outline" size="icon" onClick={handleEdit}>
                  <Edit className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <div className="text-lg">by {book.author}</div>
                  <div className={`px-3 py-1 text-sm rounded-full ${getStatusColor(book.status)}`}>{book.status}</div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(book.rating)}</div>
                  <span className="text-muted-foreground">{book.rating.toFixed(1)}</span>
                </div>

                <div className="bg-muted inline-block px-3 py-1 rounded">{book.genre}</div>

                {book.notes && (
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Notes</h2>
                    <div className="rounded-lg border p-4">{book.notes}</div>
                  </div>
                )}

                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">Added</h2>
                  <div className="text-muted-foreground">{new Date(book.created_at).toLocaleDateString()}</div>
                </div>

                {book.created_at !== book.updated_at && (
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Last Updated</h2>
                    <div className="text-muted-foreground">{new Date(book.updated_at).toLocaleDateString()}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Book</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{book.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleting(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isSubmitting}>
              {isSubmitting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
