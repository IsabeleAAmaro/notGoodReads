"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { Book, BookStatus } from "@/lib/types"
import { STATUS_API_TO_DISPLAY, STATUS_DISPLAY_TO_API } from "@/lib/utils"

type FormData = Omit<Partial<Book>, "status"> & {
  status?: BookStatus
}

type BookFormProps = {
  initialData?: Partial<Book>
  onSubmit: (data: Partial<Book>) => void
  isLoading: boolean
}

export function BookForm({ initialData, onSubmit, isLoading }: BookFormProps) {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    author: "",
    genre: "",
    status: "Want to Read",
    rating: 0.5,
    notes: "",
  })

  useEffect(() => {
    if (initialData) {
      const initialStatus = initialData.status
      const formattedData = {
        ...initialData,
        status: initialStatus ? STATUS_API_TO_DISPLAY[initialStatus] : "Want to Read",
      }
      setFormData(formattedData)
    }
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const formattedData = {
      ...formData,
      status: formData.status ? STATUS_DISPLAY_TO_API[formData.status] : undefined,
    }

    onSubmit(formattedData as Partial<Book>)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Book title"
          required
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="author">Author</Label>
        <Input
          id="author"
          name="author"
          placeholder="Author name"
          required
          value={formData.author}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="genre">Genre</Label>
        <Input
          id="genre"
          name="genre"
          placeholder="Book genre"
          required
          value={formData.genre}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Reading Status</Label>
        <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
          <SelectTrigger id="status">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Want to Read">Want to Read</SelectItem>
            <SelectItem value="Reading">Reading</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="rating">Rating</Label>
        <div className="flex items-center space-x-1">
          {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => handleRatingChange(rating)}
              className="focus:outline-none"
            >
              {rating % 1 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill={formData.rating && formData.rating >= rating ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ) : (
                <svg
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
                  <path fill={formData.rating && formData.rating >= rating ? "currentColor" : "none"} d="M12 2v15.8" />
                </svg>
              )}
            </button>
          ))}
          <span className="ml-2 text-sm">{formData.rating?.toFixed(1)}</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          placeholder="Your thoughts about the book..."
          rows={5}
          maxLength={1000}
          value={formData.notes}
          onChange={handleChange}
        />
        <p className="text-xs text-muted-foreground text-right">{formData.notes?.length || 0}/1000</p>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save"}
      </Button>
    </form>
  )
}
