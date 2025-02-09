"use client"

import "./globals.css"
import { Inter } from "next/font/google"
import Sidebar from "@/components/Sidebar"
import { Toaster } from "@/components/ui/toaster"
// import { ThemeProvider } from "next-themes" //Removed as per update 1
import { useState, useEffect } from "react"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Advanced Ticket System",
  description: "A modern and feature-rich ticket management system for efficient task tracking and team collaboration.",
  keywords: "ticket system, task management, project management, team collaboration",
  author: "BRIAN KIMEMIA",
  openGraph: {
    title: "Advanced Ticket System",
    description: "Efficient task tracking and team collaboration platform",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Advanced Ticket System" }],
  },
}

function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen`}>
        {/* Removed ThemeProvider wrapper as per update 2 */}
        <div className="flex flex-col md:flex-row h-screen">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  )
}

export default RootLayout

