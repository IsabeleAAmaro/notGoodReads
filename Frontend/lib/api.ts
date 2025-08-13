const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

// Auth API calls ==============================================================
export async function loginUser(username: string, password: string) {
  const response = await fetch(`${API_URL}/api/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })

  if (!response.ok) {
    throw new Error("Login failed")
  }

  const data = await response.json()
  return {
    access: data.access,
    refresh: data.refresh,
    user: data.user,
  }
}

export async function refreshToken(refresh: string) {
  const response = await fetch(`${API_URL}/api/token/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh }),
  })

  if (!response.ok) {
    throw new Error("Token refresh failed")
  }

  return response.json()
}

export async function registerUser(userData: any) {
  const response = await fetch(`${API_URL}/api/auth/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: userData.username,
      email: userData.email,
      first_name: userData.first_name,
      last_name: userData.last_name,
      password: userData.password,
      password_confirm: userData.password_confirm,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.detail || "Registration failed")
  }

  return response.json()
}

export async function getUserProfile(token: string) {
  const response = await fetch(`${API_URL}/api/auth/profile/`, {
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
  const response = await fetch(`${API_URL}/api/auth/profile/`, {
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

export async function logoutUser(token: string) {
  const response = await fetch(`${API_URL}/api/auth/logout/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Logout failed")
  }

  return true
}

export async function deleteUserAccount(token: string) {
  const response = await fetch(`${API_URL}/api/auth/delete/`, {
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

// Books API calls =============================================================
export async function getBooks(token: string, params = {}) {
  const queryParams = new URLSearchParams(params as Record<string, string>).toString()
  const url = `${API_URL}/api/reading/books/${queryParams ? `?${queryParams}` : ""}`

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
  const response = await fetch(`${API_URL}/api/reading/books/${id}/`, {
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
  const response = await fetch(`${API_URL}/api/reading/books/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookData),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.detail || "Failed to create book")
  }

  return response.json()
}

export async function updateBook(token: string, id: string, bookData: any) {
  const response = await fetch(`${API_URL}/api/reading/books/${id}/`, {
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
  const response = await fetch(`${API_URL}/api/reading/books/${id}/`, {
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

// New stats endpoint ==========================================================
export async function getReadingStats(token: string) {
  const response = await fetch(`${API_URL}/api/reading/stats/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch reading stats")
  }

  return response.json()
}
