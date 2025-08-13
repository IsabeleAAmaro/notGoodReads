export type BookStatus = "Want to Read" | "Reading" | "Completed"
export type BookStatusApi = "QUERO_LER" | "LENDO" | "CONCLUIDO"

export type Book = {
  id: string
  title: string
  author: string
  genre: string
  status: BookStatusApi
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
