"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CreateTicketModal } from "@/components/CreateTicketModal"
import { motion } from "framer-motion"

type TicketPriority = "Low" | "Medium" | "High"
type TicketStatus = "Open" | "In Progress" | "Closed"

type Ticket = {
  id: string
  title: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  assignee: {
    name: string
    email: string
    avatar: string
  }
}

const initialTickets: Ticket[] = [
  {
    id: "1",
    title: "Implement user authentication",
    description: "Add login and registration functionality",
    status: "Open",
    priority: "High",
    assignee: { name: "John Doe", email: "john@example.com", avatar: "/avatars/john.png" },
  },
  {
    id: "2",
    title: "Design new landing page",
    description: "Create a modern and responsive landing page",
    status: "In Progress",
    priority: "Medium",
    assignee: { name: "Jane Smith", email: "jane@example.com", avatar: "/avatars/jane.png" },
  },

  {
    id: "3",
    title: "Fix pagination bug",
    description: "Resolve issues with pagination on the product listing page",
    status: "Closed",
    priority: "Low",
    assignee: { name: "Mike Johnson", email: "mike@example.com", avatar: "/avatars/mike.png" },
  },
  {
    id: "4",
    title: "Documentation plan ",
    description: "Resolve issues with pagination on the product listing page",
    status: "Closed",
    priority: "Low",
    assignee: { name: "Mike Johnson", email: "mike@example.com", avatar: "/avatars/mike.png" },
  },
  {
    id: "5",
    title: "Create bug Register",
    description: "Resolve issues with pagination on the product listing page",
    status: "Closed",
    priority: "High",
    assignee: { name: "Mike Johnson", email: "mike@example.com", avatar: "/avatars/mike.png" },
  },
]

export default function KanbanBoard() {
  const [tickets, setTickets] = useState(initialTickets)

  const onDragEnd = (result: any) => {
    if (!result.destination) return

    const newTickets = Array.from(tickets)
    const [reorderedItem] = newTickets.splice(result.source.index, 1)
    reorderedItem.status = result.destination.droppableId as TicketStatus
    newTickets.splice(result.destination.index, 0, reorderedItem)

    setTickets(newTickets)
  }

  const handleCreateTicket = (newTicket: Omit<Ticket, "id">) => {
    const ticket: Ticket = {
      ...newTicket,
      id: Date.now().toString(),
      assignee: {
        name: newTicket.assignee,
        email: `${newTicket.assignee.toLowerCase().replace(" ", ".")}@example.com`,
        avatar: "/avatars/default.png",
      },
    }
    setTickets([...tickets, ticket])
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Kanban Board</h1>
        <CreateTicketModal onCreateTicket={handleCreateTicket} />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Open", "In Progress", "Closed"].map((status) => (
            <Card key={status} className="bg-gradient-to-br from-white to-gray-50">
              <CardHeader>
                <CardTitle>{status}</CardTitle>
              </CardHeader>
              <CardContent>
                <Droppable droppableId={status}>
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                      {tickets
                        .filter((ticket) => ticket.status === status)
                        .map((ticket, index) => (
                          <Draggable key={ticket.id} draggableId={ticket.id} index={index}>
                            {(provided) => (
                              <motion.div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="bg-white p-4 rounded-lg shadow"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <h3 className="font-semibold mb-2">{ticket.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">{ticket.description}</p>
                                <div className="flex items-center justify-between">
                                  <Badge
                                    variant={
                                      ticket.priority === "High"
                                        ? "destructive"
                                        : ticket.priority === "Medium"
                                          ? "default"
                                          : "secondary"
                                    }
                                  >
                                    {ticket.priority}
                                  </Badge>
                                  <Avatar>
                                    <AvatarImage src={ticket.assignee.avatar} alt={ticket.assignee.name} />
                                    <AvatarFallback>{ticket.assignee.name[0]}</AvatarFallback>
                                  </Avatar>
                                </div>
                              </motion.div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </CardContent>
            </Card>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}

