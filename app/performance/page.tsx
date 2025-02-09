"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend)

export default function PerformanceMetrics() {
  const ticketResolutionData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Average Resolution Time (hours)",
        data: [24, 22, 20, 18, 16, 15],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  }

  const ticketVolumeData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "New Tickets",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Closed Tickets",
        data: [45, 50, 65, 59, 80, 81],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Performance Metrics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Average Ticket Resolution Time</CardTitle>
          </CardHeader>
          <CardContent>
            <Line data={ticketResolutionData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ticket Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar data={ticketVolumeData} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

