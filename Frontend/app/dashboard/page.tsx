"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { getBooks } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import type { Book } from "@/lib/types"
import { BookOpen, Plus, Search, Star } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user, token, isLoading: authLoading } = useAuth()
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    if (!token) {
      router.push("/signin")
      return
    }

    if (token) {
      fetchBooks()
    }
  }, [token, activeTab])

  const fetchBooks = async () => {
    try {
      setIsLoading(true)

      const params: Record<string, string> = {}

      if (activeTab !== "all") {
        params.status = activeTab
      }

      const data = await getBooks(token!, params)
      setBooks(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch books",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-current" />)
    }

    if (hasHalfStar) {
      stars.push(
        <svg
          key="half"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2" />
          <path fill="currentColor" d="M12 2v15.8" />
        </svg>,
      )
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4" />)
    }

    return stars
  }

  if (authLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 p-4 md:p-6">
        <div className="container mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">My Reading List</h1>
              <p className="text-muted-foreground">Track and manage your reading journey</p>
            </div>
            <Link href="/books/new">
              <Button className="font-mono">
                <Plus className="mr-2 h-4 w-4" />
                Add New Reading
              </Button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="Want to Read">Want to Read</TabsTrigger>
                <TabsTrigger value="Reading">Reading</TabsTrigger>
                <TabsTrigger value="Completed">Completed</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by title or author..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="h-24 bg-muted" />
                  <CardContent className="p-4">
                    <div className="h-4 w-3/4 bg-muted rounded mb-2" />
                    <div className="h-4 w-1/2 bg-muted rounded" />
                  </CardContent>
                </Card>
              ))
            ) : filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <Link href={`/books/${book.id}`} key={book.id}>
                  <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="line-clamp-1">{book.title}</CardTitle>
                        <div className={`px-2 py-1 text-xs rounded-full ${getStatusColor(book.status)}`}>
                          {book.status}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <div className="text-sm text-muted-foreground mb-2">by {book.author}</div>
                      <div className="flex items-center mb-2">
                        {renderStars(book.rating)}
                        <span className="ml-2 text-sm text-muted-foreground">{book.rating.toFixed(1)}</span>
                      </div>
                      <div className="text-xs bg-muted inline-block px-2 py-1 rounded">{book.genre}</div>
                      {book.notes && <p className="mt-2 text-sm line-clamp-2">{book.notes}</p>}
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
                <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-bold mb-1">No books found</h3>
                <p className="text-muted-foreground mb-4">
                  {activeTab === "all"
                    ? "You haven't added any books yet."
                    : `You don't have any books with status "${activeTab}".`}
                </p>
                <Link href="/books/new">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Book
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
