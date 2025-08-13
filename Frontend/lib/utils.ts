import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { BookStatus, BookStatusApi } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const STATUS_API_TO_DISPLAY: Record<BookStatusApi, BookStatus> = {
  QUERO_LER: "Want to Read",
  LENDO: "Reading",
  CONCLUIDO: "Completed",
}

export const STATUS_DISPLAY_TO_API: Record<BookStatus, BookStatusApi> = {
  "Want to Read": "QUERO_LER",
  Reading: "LENDO",
  Completed: "CONCLUIDO",
}
