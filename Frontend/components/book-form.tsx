"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StarIcon } from "@/components/ui/star-icon"
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
    rating: 0,
    notes: "",
  })
  const [hoverRating, setHoverRating] = useState<number | null>(null)

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
        <div
          className="flex items-center space-x-1"
          onMouseLeave={() => setHoverRating(null)}
        >
          {[1, 2, 3, 4, 5].map((star) => {
            const currentRating = hoverRating ?? formData.rating ?? 0
            const fill =
              currentRating >= star ? "full" : currentRating >= star - 0.5 ? "half" : "none"

            return (
              <div
                key={star}
                className="relative"
                onMouseEnter={() => setHoverRating(star)}
                onClick={() => handleRatingChange(star)}
              >
                <div
                  className="absolute inset-0 w-1/2"
                  onMouseEnter={() => setHoverRating(star - 0.5)}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRatingChange(star - 0.5)
                  }}
                />
                <StarIcon fill={fill} />
              </div>
            )
          })}
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
