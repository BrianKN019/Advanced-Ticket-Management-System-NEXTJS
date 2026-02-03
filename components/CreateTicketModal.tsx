"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"

type TicketPriority = "Low" | "Medium" | "High" | "Critical"
type TicketStatus = "Open" | "In Progress" | "Closed"

interface CreateTicketModalProps {
  onCreateTicket: (ticket: {
    title: string
    description: string
    status: TicketStatus
    priority: TicketPriority
    assignee: string
    assigneeEmail: string
    priorityScore: number
    estimatedTime: number 
  }) => void
}

export function CreateTicketModal({ onCreateTicket }: CreateTicketModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState<TicketStatus>("Open")
  const [priority, setPriority] = useState<TicketPriority>("Medium")
  const [assignee, setAssignee] = useState("")
  const [assigneeEmail, setAssigneeEmail] = useState("")
  const [priorityScore, setPriorityScore] = useState(50)
  const [isPriorityScoreCustom, setIsPriorityScoreCustom] = useState(false)
  const [estimatedTime, setEstimatedTime] = useState(1)

  const priorityScoreDefaults: Record<TicketPriority, number> = {
    Low: 20,
    Medium: 50,
    High: 80,
    Critical: 95,
  }

  useEffect(() => {
    if (!isPriorityScoreCustom) {
      setPriorityScore(priorityScoreDefaults[priority])
    }
  }, [isPriorityScoreCustom, priority])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const normalizedTitle = title.trim()
    const normalizedDescription = description.trim()
    const normalizedAssignee = assignee.trim()
    const normalizedAssigneeEmail = assigneeEmail.trim()

    onCreateTicket({
      title: normalizedTitle,
      description: normalizedDescription,
      status,
      priority,
      assignee: normalizedAssignee,
      assigneeEmail: normalizedAssigneeEmail,
      priorityScore,
      estimatedTime,
    })
    setTitle("")
    setDescription("")
    setStatus("Open")
    setPriority("Medium")
    setAssignee("")
    setAssigneeEmail("")
    setPriorityScore(priorityScoreDefaults.Medium)
    setIsPriorityScoreCustom(false)
    setEstimatedTime(1)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Create New Ticket</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Ticket</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(value: TicketStatus) => setStatus(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={priority}
              onValueChange={(value: TicketPriority) => {
                setPriority(value)
                setIsPriorityScoreCustom(false)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="priorityScore">Priority Score</Label>
            <Slider
              id="priorityScore"
              min={0}
              max={100}
              step={1}
              value={[priorityScore]}
              onValueChange={(value) => {
                setPriorityScore(value[0])
                setIsPriorityScoreCustom(true)
              }}
            />
            <span className="text-sm text-muted-foreground">{priorityScore}</span>
          </div>
          <div>
            <Label htmlFor="assignee">Assignee Name</Label>
            <Input id="assignee" value={assignee} onChange={(e) => setAssignee(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="assigneeEmail">Assignee Email</Label>
            <Input
              id="assigneeEmail"
              value={assigneeEmail}
              onChange={(e) => setAssigneeEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="estimatedTime">Estimated Time (hours)</Label>
            <Input
              id="estimatedTime"
              type="number"
              min={0}
              step={0.5}
              value={estimatedTime}
              onChange={(e) => {
                const nextValue = Number.parseFloat(e.target.value)
                setEstimatedTime(Number.isNaN(nextValue) ? 0 : Math.max(0, nextValue))
              }}
              required
            />
          </div>
          <Button type="submit">Create Ticket</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
