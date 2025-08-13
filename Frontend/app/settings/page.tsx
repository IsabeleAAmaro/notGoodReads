"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { getUserProfile, updateUserProfile, deleteUserAccount, changePassword } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"

export default function SettingsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user, token, logout, isLoading: authLoading } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    bio: user?.bio || "",
  })
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    new_password_confirm: "",
  })
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
  })
  const [passwordError, setPasswordError] = useState("")

  useEffect(() => {
    if (!authLoading && !token) {
      router.push("/signin")
      return
    }

    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        bio: user.bio || "",
      })
      setIsLoading(false)
    }
  }, [user, authLoading, token, router])

  const validatePassword = (password: string) => {
    setPasswordValidations({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
    })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
    if (name === "new_password") {
      validatePassword(value)
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

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError("")

    if (passwordData.new_password !== passwordData.new_password_confirm) {
      setPasswordError("New passwords do not match.")
      return
    }

    const allPasswordValidationsMet = Object.values(passwordValidations).every(Boolean)
    if (!allPasswordValidationsMet) {
      setPasswordError("New password does not meet all requirements.")
      return
    }

    try {
      setIsSubmitting(true)
      await changePassword(token!, passwordData.current_password, passwordData.new_password)
      toast({
        title: "Success",
        description: "Password changed successfully",
      })
      setPasswordData({
        current_password: "",
        new_password: "",
        new_password_confirm: "",
      })
    } catch (error: any) {
      setPasswordError(error.message || "Failed to change password")
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
      <main className="flex-1 p-4 md:p-6">
        <div className="container mx-auto max-w-md space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Account Settings</h1>
            <p className="text-muted-foreground">Update your account information</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Update your personal information.</CardDescription>
            </CardHeader>
            <CardContent>
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
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password. Make sure it's a strong one.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current_password">Current Password</Label>
                  <Input
                    id="current_password"
                    name="current_password"
                    type="password"
                    value={passwordData.current_password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new_password">New Password</Label>
                  <Input
                    id="new_password"
                    name="new_password"
                    type="password"
                    value={passwordData.new_password}
                    onChange={handlePasswordChange}
                    required
                  />
                  <div className="text-sm">
                    <p className={passwordValidations.length ? "text-green-500" : "text-red-500"}>
                      - At least 8 characters
                    </p>
                    <p className={passwordValidations.uppercase ? "text-green-500" : "text-red-500"}>
                      - At least one uppercase letter
                    </p>
                    <p className={passwordValidations.lowercase ? "text-green-500" : "text-red-500"}>
                      - At least one lowercase letter
                    </p>
                    <p className={passwordValidations.number ? "text-green-500" : "text-red-500"}>
                      - At least one number
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new_password_confirm">Confirm New Password</Label>
                  <Input
                    id="new_password_confirm"
                    name="new_password_confirm"
                    type="password"
                    value={passwordData.new_password_confirm}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Changing Password..." : "Change Password"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delete Account</CardTitle>
              <CardDescription>
                Permanently delete your account and all associated data. This action cannot be undone.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" onClick={() => setIsDeleting(true)} disabled={isSubmitting}>
                Delete Account
              </Button>
            </CardContent>
          </Card>
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
