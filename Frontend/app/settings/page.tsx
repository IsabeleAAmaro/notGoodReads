"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { getUserProfile, updateUserProfile, deleteUserAccount } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"

export default function SettingsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user, token, logout, isLoading: authLoading } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    bio: "",
  })

  useEffect(() => {
    if (!authLoading && !token) {
      router.push("/signin")
      return
    }

    if (token) {
      fetchUserProfile()
    }
  }, [token, authLoading])

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true)
      const data = await getUserProfile(token!)
      setFormData({
        username: data.username || "",
        email: data.email || "",
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        bio: data.bio || "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch user profile",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsSubmitting(true)
      await updateUserProfile(token!, formData)

      toast({
        title: "Success",
        description: "Profile updated successfully",
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteAccount = async () => {
    try {
      setIsSubmitting(true)
      await deleteUserAccount(token!)

      toast({
        title: "Account Deleted",
        description: "Your account has been deleted successfully",
      })

      logout()
      router.push("/")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete account",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
      setIsDeleting(false)
    }
  }

  if (authLoading || isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header showDashboard showLogout />
      <main className="flex-1 p-4 md:p-6">
        <div className="container mx-auto max-w-md space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Account Settings</h1>
            <p className="text-muted-foreground">Update your account information</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" value={formData.username} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" name="bio" rows={4} value={formData.bio} onChange={handleChange} />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>

              <Button type="button" variant="destructive" onClick={() => setIsDeleting(true)} disabled={isSubmitting}>
                Delete Account
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your account? This will permanently remove your account and all your data.
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleting(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAccount} disabled={isSubmitting}>
              {isSubmitting ? "Deleting..." : "Delete Account"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

