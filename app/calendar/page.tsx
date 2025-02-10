"use client"

import { useState } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

moment.locale("en-GB")
const localizer = momentLocalizer(moment)

type Event = {
  id: number
  title: string
  start: Date
  end: Date
  color: string
}

const initialEvents: Event[] = [
  {
    id: 1,
    title: "Project Kickoff",
    start: new Date(2025, 5, 1, 9, 0),
    end: new Date(2025, 5, 1, 11, 0),
    color: "#3498db",
  },
  {
    id: 2,
    title: "Team Meeting",
    start: new Date(2025, 5, 3, 14, 0),
    end: new Date(2025, 5, 3, 15, 30),
    color: "#2ecc71",
  },
  {
    id: 3,
    title: "Release Planning",
    start: new Date(2025, 5, 5, 10, 0),
    end: new Date(2025, 5, 5, 12, 0),
    color: "#e74c3c",
  },
]

export default function CalendarView() {
  const [myEvents, setMyEvents] = useState<Event[]>(initialEvents)
  const [eventColor, setEventColor] = useState("#3498db")

  const handleSelect = ({ start, end }: { start: Date; end: Date }) => {
    const title = window.prompt("New Event name")
    if (title) {
      const color = window.prompt("Event color (e.g., #3498db)", eventColor)
      setMyEvents([...myEvents, { id: myEvents.length + 1, title, start, end, color: color || eventColor }])
    }
  }

  const eventStyleGetter = (event: Event) => {
    return {
      style: {
        backgroundColor: event.color,
      },
    }
  }

  const handleEventClick = (event: Event) => {
    const newColor = window.prompt("Update event color", event.color)
    if (newColor) {
      setMyEvents(myEvents.map((e) => (e.id === event.id ? { ...e, color: newColor } : e)))
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Calendar</h1>
      <Card className="bg-gradient-to-br from-white to-gray-50">
        <CardHeader>
          <CardTitle>Event Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="eventColor">Event Color</Label>
            <Input
              id="eventColor"
              type="color"
              value={eventColor}
              onChange={(e) => setEventColor(e.target.value)}
              className="w-full h-10"
            />
          </div>
          <Calendar
            localizer={localizer}
            events={myEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            selectable
            onSelectSlot={handleSelect}
            eventPropGetter={eventStyleGetter}
            onSelectEvent={handleEventClick}
          />
        </CardContent>
      </Card>
    </div>
  )
}

