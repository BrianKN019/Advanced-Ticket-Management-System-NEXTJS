"use client"
import { Bar, Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { Search, Plus, Tag } from "lucide-react"
import { useState, useEffect } from "react"
import { UserWorkload } from "@/components/UserWorkload"
import { UserMentions } from "@/components/UserMentions" // Import UserMentions component

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

const StatCard = ({ title, value, change }) => (
  <Card className={`bg-gradient-to-br ${getGradientClass(title)}`}>
    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {getIcon(title)}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{change}</p>
    </CardContent>
  </Card>
)

const getGradientClass = (title) => {
  switch (title) {
    case "Total Tickets":
      return "from-purple-100 to-indigo-100"
    case "Open Tickets":
      return "from-pink-100 to-rose-100"
    case "Closed Tickets":
      return "from-yellow-100 to-amber-100"
    case "Avg. Response Time":
      return "from-green-100 to-emerald-100"
    default:
      return "from-gray-100 to-gray-200"
  }
}

const getIcon = (title) => {
  switch (title) {
    case "Total Tickets":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    case "Open Tickets":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <path d="M2 10h20" />
        </svg>
      )
    case "Closed Tickets":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      )
    case "Avg. Response Time":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      )
    default:
      return null
  }
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [tags, setTags] = useState(["bug", "feature", "enhancement", "documentation"])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [priorityFilter, setPriorityFilter] = useState("All")

  // Sample data
  const [ticketsByStatus, setTicketsByStatus] = useState({
    // Added useState hook for ticketsByStatus
    labels: ["Open", "In Progress", "Closed"],
    datasets: [
      {
        data: [12, 19, 3],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  })

  const [ticketsByPriority, setTicketsByPriority] = useState({
    // Added useState hook for ticketsByPriority
    labels: ["Low", "Medium", "High"],
    datasets: [
      {
        label: "Number of Tickets",
        data: [5, 15, 10],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  })

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, user: "John Doe", action: "updated ticket #1234", time: "2 hours ago" },
    { id: 2, user: "Jane Smith", action: "created ticket #5678", time: "4 hours ago" },
    { id: 3, user: "Mike Johnson", action: "closed ticket #9101", time: "1 day ago" },
  ])

  const [upcomingDeadlines, setUpcomingDeadlines] = useState([
    { id: 1, title: "Project Alpha Launch", date: "2023-06-15" },
    { id: 2, title: "Client Meeting", date: "2023-06-18" },
    { id: 3, title: "Team Review", date: "2023-06-20" },
  ])

  const [tickets, setTickets] = useState([
    { id: 1, title: "Fix login bug", status: "Open", priority: "High" },
    { id: 2, title: "Implement new feature", status: "In Progress", priority: "Medium" },
    { id: 3, title: "Update documentation", status: "Closed", priority: "Low" },
  ])

  useEffect(() => {
    // Filter tickets based on search term, status, and priority
    const filteredTickets = tickets.filter((ticket) => {
      const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "All" || ticket.status === statusFilter
      const matchesPriority = priorityFilter === "All" || ticket.priority === priorityFilter
      return matchesSearch && matchesStatus && matchesPriority
    })

    // Update charts based on filtered tickets
    const updatedTicketsByStatus = {
      ...ticketsByStatus,
      datasets: [
        {
          ...ticketsByStatus.datasets[0],
          data: [
            filteredTickets.filter((t) => t.status === "Open").length,
            filteredTickets.filter((t) => t.status === "In Progress").length,
            filteredTickets.filter((t) => t.status === "Closed").length,
          ],
        },
      ],
    }

    const updatedTicketsByPriority = {
      ...ticketsByPriority,
      datasets: [
        {
          ...ticketsByPriority.datasets[0],
          data: [
            filteredTickets.filter((t) => t.priority === "Low").length,
            filteredTickets.filter((t) => t.priority === "Medium").length,
            filteredTickets.filter((t) => t.priority === "High").length,
          ],
        },
      ],
    }

    // Update state
    setTicketsByStatus(updatedTicketsByStatus)
    setTicketsByPriority(updatedTicketsByPriority)
  }, [searchTerm, statusFilter, priorityFilter, tickets])

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Total Tickets" value={tickets.length.toString()} change="+2 from last week" />
              <StatCard
                title="Open Tickets"
                value={tickets.filter((t) => t.status === "Open").length.toString()}
                change="+1 from yesterday"
              />
              <StatCard
                title="Closed Tickets"
                value={tickets.filter((t) => t.status === "Closed").length.toString()}
                change="+3 from last week"
              />
              <StatCard title="Avg. Response Time" value="2.4h" change="-0.3h from last month" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tickets by Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <Doughnut data={ticketsByStatus} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Tickets by Priority</CardTitle>
                </CardHeader>
                <CardContent>
                  <Bar data={ticketsByPriority} />
                </CardContent>
              </Card>
            </div>
            <div className="mt-6">
              <UserWorkload />
            </div>
          </>
        )
      case "activity":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {recentActivity.map((activity) => (
                  <motion.li
                    key={activity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center space-x-4"
                  >
                    <Avatar>
                      <AvatarFallback>{activity.user[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">
                        {activity.user} {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )
      case "deadlines":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {upcomingDeadlines.map((deadline) => (
                  <motion.li
                    key={deadline.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm font-medium">{deadline.title}</span>
                    <Badge variant="outline">{deadline.date}</Badge>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
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
          <UserMentions /> {/* Replaced Bell icon button with UserMentions component */}
          <Avatar>
            <AvatarImage src="/avatars/user.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="flex space-x-2">
        <Button variant={activeTab === "overview" ? "default" : "outline"} onClick={() => setActiveTab("overview")}>
          Overview
        </Button>
        <Button variant={activeTab === "activity" ? "default" : "outline"} onClick={() => setActiveTab("activity")}>
          Recent Activity
        </Button>
        <Button variant={activeTab === "deadlines" ? "default" : "outline"} onClick={() => setActiveTab("deadlines")}>
          Upcoming Deadlines
        </Button>
      </div>

      {renderTabContent()}

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex space-x-4">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Ticket
          </Button>
          <Button variant="outline">Generate Report</Button>
          <Button variant="outline">Team Chat</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ticket Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                <Tag className="mr-1 h-3 w-3" />
                {tag}
              </Badge>
            ))}
          </div>
          <div className="mt-4">
            <Input
              placeholder="Add new tag..."
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  const newTag = e.currentTarget.value.trim()
                  if (newTag && !tags.includes(newTag)) {
                    setTags([...tags, newTag])
                    e.currentTarget.value = ""
                  }
                }
              }}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

