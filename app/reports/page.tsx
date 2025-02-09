"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { jsPDF } from "jspdf"
import "jspdf-autotable"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const generatePDF = () => {
  const doc = new jsPDF()

  // Add colorful header
  doc.setFillColor(52, 152, 219) // A vibrant blue color
  doc.rect(0, 0, 210, 40, "F")
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(24)
  doc.text("Ticket System Report", 105, 25, { align: "center" })

  // Add date with timestamp
  const now = new Date()
  doc.setFontSize(12)
  doc.text(`Generated on: ${now.toLocaleDateString()} at ${now.toLocaleTimeString()}`, 105, 35, { align: "center" })

  // Reset text color for the rest of the document
  doc.setTextColor(0, 0, 0)

  // Add summary
  doc.setFontSize(16)
  doc.text("Summary", 20, 60)
  doc.setFontSize(12)
  doc.text("Total Tickets: 34", 30, 70)
  doc.text("Open Tickets: 12", 30, 80)
  doc.text("Closed Tickets: 22", 30, 90)

  // Add ticket data
  const ticketData = [
    ["1", "Implement user authentication", "Open", "High", "John Doe"],
    ["2", "Design new landing page", "In Progress", "Medium", "Jane Smith"],
    ["3", "Fix pagination bug", "Closed", "Low", "Mike Johnson"],
  ]

  doc.autoTable({
    startY: 100,
    head: [["ID", "Title", "Status", "Priority", "Assignee"]],
    body: ticketData,
    theme: "grid",
    styles: { fillColor: [249, 249, 249] },
    columnStyles: {
      0: { cellWidth: 20 },
      1: { cellWidth: 70 },
      2: { cellWidth: 30 },
      3: { cellWidth: 30 },
      4: { cellWidth: 40 },
    },
    headStyles: { fillColor: [52, 152, 219], textColor: 255 },
  })

  // Add chart
  const canvas = document.createElement("canvas")
  canvas.width = 500
  canvas.height = 300
  const ctx = canvas.getContext("2d")
  if (ctx) {
    new ChartJS(ctx, {
      type: "bar",
      data: {
        labels: ["Open", "In Progress", "Closed"],
        datasets: [
          {
            label: "Tickets by Status",
            data: [12, 5, 22],
            backgroundColor: ["#3498db", "#f1c40f", "#2ecc71"],
          },
        ],
      },
      options: {
        responsive: false,
        animation: false,
      },
    })

    // Wait for the chart to render
    setTimeout(() => {
      const chartImage = canvas.toDataURL("image/jpeg", 1.0)
      doc.addImage(chartImage, "JPEG", 20, 180, 170, 80)
      doc.save("ticket-report.pdf")
    }, 100)
  } else {
    console.error("Could not get 2D context for canvas")
    doc.save("ticket-report.pdf")
  }
}

export default function Reports() {
  const chartData = {
    labels: ["Open", "In Progress", "Closed"],
    datasets: [
      {
        label: "Tickets by Status",
        data: [12, 5, 22],
        backgroundColor: ["#3498db", "#f1c40f", "#2ecc71"],
      },
    ],
  }

  const statistics = [
    { label: "Total Tickets", value: 39 },
    { label: "Open Tickets", value: 12 },
    { label: "In Progress", value: 5 },
    { label: "Closed Tickets", value: 22 },
    { label: "Average Resolution Time", value: "2.4 days" },
    { label: "Customer Satisfaction", value: "4.7/5" },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statistics.map((stat, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Generate Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Click the button below to generate a PDF report of all tickets.</p>
          <Button onClick={generatePDF}>Generate PDF Report</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Tickets by Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar data={chartData} />
        </CardContent>
      </Card>
    </div>
  )
}

