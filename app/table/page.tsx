"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { CSVLink } from "react-csv"

const initialTickets = [
  {
    id: "1",
    title: "Implement user authentication",
    status: "Open",
    priority: "High",
    assignee: { name: "John Doe", email: "john@example.com", avatar: "/avatars/john.png" },
  },
  {
    id: "2",
    title: "Design new landing page",
    status: "In Progress",
    priority: "Medium",
    assignee: { name: "Jane Smith", email: "jane@example.com", avatar: "/avatars/jane.png" },
  },
  {
    id: "3",
    title: "Fix pagination bug",
    status: "Closed",
    priority: "Low",
    assignee: { name: "Mike Johnson", email: "mike@example.com", avatar: "/avatars/mike.png" },
  },
]

export default function TableView() {
  const [tickets, setTickets] = useState(initialTickets)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [priorityFilter, setPriorityFilter] = useState("All")

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.title.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === "All" || ticket.status === statusFilter) &&
      (priorityFilter === "All" || ticket.priority === priorityFilter),
  )

  const csvData = filteredTickets.map(({ id, title, status, priority, assignee }) => ({
    ID: id,
    Title: title,
    Status: status,
    Priority: priority,
    Assignee: assignee.name,
    Email: assignee.email,
  }))

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Table View</h1>
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <Input
          placeholder="Search tickets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Priorities</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
          <CSVLink data={csvData} filename={"tickets.csv"}>
            <Button variant="outline">Export CSV</Button>
          </CSVLink>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Assignee</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>{ticket.title}</TableCell>
                <TableCell>{ticket.status}</TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src={ticket.assignee.avatar} alt={ticket.assignee.name} />
                      <AvatarFallback>{ticket.assignee.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{ticket.assignee.name}</div>
                      <div className="text-sm text-gray-500">{ticket.assignee.email}</div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

