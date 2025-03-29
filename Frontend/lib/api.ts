const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

// Auth API calls
export async function loginUser(username: string, password: string) {
  const response = await fetch(`${API_URL}/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })

  if (!response.ok) {
    throw new Error("Login failed")
  }

  return response.json()
}

export async function registerUser(userData: any) {
  const response = await fetch(`${API_URL}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    throw new Error("Registration failed")
  }

  return response.json()
}

export async function getUserProfile(token: string) {
  const response = await fetch(`${API_URL}/users/me/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch user profile")
  }

  return response.json()
}

export async function updateUserProfile(token: string, userData: any) {
  const response = await fetch(`${API_URL}/users/me/`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    throw new Error("Failed to update user profile")
  }

  return response.json()
}

export async function deleteUserAccount(token: string) {
  const response = await fetch(`${API_URL}/users/me/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to delete account")
  }

  return true
}

// Books API calls
export async function getBooks(token: string, params = {}) {
  const queryParams = new URLSearchParams(params as Record<string, string>).toString()
  const url = `${API_URL}/books/${queryParams ? `?${queryParams}` : ""}`

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch books")
  }

  return response.json()
}

export async function getBook(token: string, id: string) {
  const response = await fetch(`${API_URL}/books/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch book")
  }

  return response.json()
}

export async function createBook(token: string, bookData: any) {
  const response = await fetch(`${API_URL}/books/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookData),
  })

  if (!response.ok) {
    throw new Error("Failed to create book")
  }

  return response.json()
}

export async function updateBook(token: string, id: string, bookData: any) {
  const response = await fetch(`${API_URL}/books/${id}/`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookData),
  })

  if (!response.ok) {
    throw new Error("Failed to update book")
  }

  return response.json()
}

export async function deleteBook(token: string, id: string) {
  const response = await fetch(`${API_URL}/books/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to delete book")
  }

  return true
}

