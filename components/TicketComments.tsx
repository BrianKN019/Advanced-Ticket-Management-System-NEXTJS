"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

type Comment = {
  id: string
  user: string
  avatar: string
  content: string
  timestamp: string
}

type Activity = {
  id: string
  user: string
  action: string
  timestamp: string
}

export function TicketComments({ ticketId }: { ticketId: string }) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      user: "John Doe",
      avatar: "/avatars/john.png",
      content: "This is a critical issue. We need to address it ASAP.",
      timestamp: "2023-06-10T10:30:00Z",
    },
    {
      id: "2",
      user: "Jane Smith",
      avatar: "/avatars/jane.png",
      content: "I've started working on this. Will update soon.",
      timestamp: "2023-06-10T11:15:00Z",
    },
  ])

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      user: "John Doe",
      action: "created the ticket",
      timestamp: "2023-06-10T10:00:00Z",
    },
    {
      id: "2",
      user: "Jane Smith",
      action: "changed the status to In Progress",
      timestamp: "2023-06-10T11:00:00Z",
    },
  ])

  const [newComment, setNewComment] = useState("")

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        user: "Current User",
        avatar: "/avatars/user.png",
        content: newComment,
        timestamp: new Date().toISOString(),
      }
      setComments([...comments, comment])
      setNewComment("")

      // Add to activity log
      const activity: Activity = {
        id: Date.now().toString(),
        user: "Current User",
        action: "added a comment",
        timestamp: new Date().toISOString(),
      }
      setActivities([...activities, activity])
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-4">
                <Avatar>
                  <AvatarImage src={comment.avatar} alt={comment.user} />
                  <AvatarFallback>{comment.user[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{comment.user}</p>
                  <p className="text-sm text-gray-500">{new Date(comment.timestamp).toLocaleString()}</p>
                  <p className="mt-1">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button onClick={handleAddComment}>Add Comment</Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {activities.map((activity) => (
              <li key={activity.id} className="text-sm">
                <span className="font-semibold">{activity.user}</span> {activity.action} -{" "}
                {new Date(activity.timestamp).toLocaleString()}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

