import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

type User = {
  name: string
  email: string
  assignedTickets: number
  workloadPercentage: number
}

const users: User[] = [
  { name: "John Doe", email: "john@example.com", assignedTickets: 5, workloadPercentage: 60 },
  { name: "Jane Smith", email: "jane@example.com", assignedTickets: 3, workloadPercentage: 40 },
  { name: "Mike Johnson", email: "mike@example.com", assignedTickets: 7, workloadPercentage: 80 },
]

export function UserWorkload() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Workload</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.email} className="flex items-center space-x-4">
              <div className="flex-1">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <div className="flex-1">
                <Progress value={user.workloadPercentage} className="w-full" />
              </div>
              <div className="flex-1 text-right">
                <p className="text-sm font-medium">{user.assignedTickets} tickets</p>
                <p className="text-xs text-muted-foreground">{user.workloadPercentage}% workload</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

