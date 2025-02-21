"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bell } from "lucide-react"

type Notification = {
  id: string
  user: string
  avatar: string
  content: string
  timestamp: string
  read: boolean
}

export function UserMentions() { 
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      user: "John Doe",
      avatar: "/avatars/john.png",
      content: "mentioned you in ticket #1234", 
      timestamp: "2023-06-10T10:30:00Z",
      read: false,
    },
    {
      id: "2",
      user: "Jane Smith",
      avatar: "/avatars/jane.png", 
      content: "assigned you to ticket #5678",
      timestamp: "2023-06-10T11:15:00Z", 
      read: false,
    },
  ])

  const [showNotifications, setShowNotifications] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  return (
    <div className="relative">
      <button className="relative" onClick={() => setShowNotifications(!showNotifications)}>
        <Bell size={24} />
        {unreadCount > 0 && (
          <Badge variant="destructive" className="absolute -top-2 -right-2">
            {unreadCount}
          </Badge>
        )}
      </button>
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-10">
          <div className="p-2 border-b">
            <h3 className="text-lg font-semibold">Notifications</h3>
            <button className="text-sm text-blue-500 hover:text-blue-700" onClick={markAllAsRead}>
              Mark all as read
            </button>
          </div>
          <ul className="max-h-96 overflow-auto">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={`p-2 hover:bg-gray-100 ${notification.read ? "opacity-50" : ""}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src={notification.avatar} alt={notification.user} />
                    <AvatarFallback>{notification.user[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm">
                      <span className="font-semibold">{notification.user}</span> {notification.content}
                    </p>
                    <p className="text-xs text-gray-500">{new Date(notification.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

