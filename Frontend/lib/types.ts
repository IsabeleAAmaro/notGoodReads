export type Book = {
  id: string
  title: string
  author: string
  genre: string
  status: "Want to Read" | "Reading" | "Completed"
  rating: number
  notes: string
  created_at: string
  updated_at: string
}

export type User = {
  id: string
  username: string
  email: string
  first_name: string
  last_name: string
  bio: string
}

