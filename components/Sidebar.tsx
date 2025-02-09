"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Home, Trello, Table, FileText, Settings, Calendar, Menu, X, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleSidebar = () => setIsOpen(!isOpen)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: Trello, label: "Kanban Board", href: "/kanban" },
    { icon: Table, label: "Table View", href: "/table" },
    { icon: Calendar, label: "Calendar", href: "/calendar" },
    { icon: FileText, label: "Reports", href: "/reports" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ]

  return (
    <>
      <Button
        variant="outline"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={toggleSidebar}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>
      <div
        className={`bg-background h-full shadow-lg fixed md:static transition-all duration-300 ease-in-out z-40 ${
          isOpen ? "w-64 left-0" : "w-0 -left-64 md:w-64 md:left-0"
        }`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold">Ticket System</h1>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center py-2 px-6 hover:bg-accent ${
                pathname === item.href ? "bg-accent font-semibold" : ""
              }`}
            >
              <item.icon className="mr-2" size={18} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4">
          <Button variant="outline" size="icon">
            <Sun size={18} />
          </Button>
        </div>
      </div>
    </>
  )
}

export default Sidebar

