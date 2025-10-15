import { useState } from "react";
import { User } from "../App";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Progress } from "./ui/progress";
import {
  LogOut,
  TrendingUp,
  Users,
  Target,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  DollarSign,
  Award,
  ChevronRight,
  BarChart3,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { StrategicPlanner } from "./strategic-planner";

type ManagerDashboardProps = {
  user: User;
  onSignOut: () => void;
  onViewEmployeeProfile: (employeeId: string) => void;
  onViewInteractionLog: (clientId: string) => void;
};

// Mock data
const employees = [
  {
    id: "emp1",
    name: "Alex Chen",
    avatar: "AC",
    score: 87,
    trainingHours: 12,
    improvement: 15,
    strengths: ["Body Language", "Tone"],
    weaknesses: ["Question Ratio"],
    status: "active",
  },
  {
    id: "emp2",
    name: "Maria Garcia",
    avatar: "MG",
    score: 92,
    trainingHours: 18,
    improvement: 8,
    strengths: ["Content", "Persuasiveness"],
    weaknesses: ["Time Management"],
    status: "active",
  },
  {
    id: "emp3",
    name: "James Wilson",
    avatar: "JW",
    score: 78,
    trainingHours: 9,
    improvement: 22,
    strengths: ["Negotiation", "Strategy"],
    weaknesses: ["Body Language"],
    status: "needs-attention",
  },
  {
    id: "emp4",
    name: "Priya Patel",
    avatar: "PP",
    score: 94,
    trainingHours: 21,
    improvement: 12,
    strengths: ["All-around"],
    weaknesses: ["Advanced Tactics"],
    status: "active",
  },
];

const clients = [
  {
    id: "client1",
    name: "TechCorp Industries",
    priority: "high",
    assignedTo: "Maria Garcia",
    nextMeeting: "2 days",
    dealValue: 450000,
    status: "negotiation",
    difficulty: "hard",
    personality: "Analytical, data-driven, skeptical",
  },
  {
    id: "client2",
    name: "Global Solutions Ltd",
    priority: "medium",
    assignedTo: "Alex Chen",
    nextMeeting: "5 days",
    dealValue: 280000,
    status: "discovery",
    difficulty: "medium",
    personality: "Relationship-focused, collaborative",
  },
  {
    id: "client3",
    name: "Innovate Systems",
    priority: "high",
    assignedTo: "Priya Patel",
    nextMeeting: "1 day",
    dealValue: 620000,
    status: "closing",
    difficulty: "hard",
    personality: "Direct, results-oriented, impatient",
  },
];

const roiData = [
  { month: "Jan", deals: 4, value: 1.2 },
  { month: "Feb", deals: 5, value: 1.5 },
  { month: "Mar", deals: 6, value: 1.8 },
  { month: "Apr", deals: 7, value: 2.1 },
  { month: "May", deals: 9, value: 2.6 },
  { month: "Jun", deals: 11, value: 3.2 },
];

const teamPerformanceData = [
  { week: "W1", avgScore: 76 },
  { week: "W2", avgScore: 78 },
  { week: "W3", avgScore: 81 },
  { week: "W4", avgScore: 83 },
  { week: "W5", avgScore: 85 },
  { week: "W6", avgScore: 87 },
];

export function ManagerDashboard({
  user,
  onSignOut,
  onViewEmployeeProfile,
  onViewInteractionLog,
}: ManagerDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [sortBy, setSortBy] = useState<
    "score" | "improvement" | "hours"
  >("score");

  const sortedEmployees = [...employees].sort((a, b) => {
    if (sortBy === "score") return b.score - a.score;
    if (sortBy === "improvement")
      return b.improvement - a.improvement;
    return b.trainingHours - a.trainingHours;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass-header sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="gradient-sage text-white px-4 py-2 rounded-xl shadow-sm">
              NA
            </div>
            <div>
              <h1 className="text-xl">Manager Dashboard</h1>
              <p className="text-sm text-sage-600">
                {user.name}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={onSignOut}
            className="border-sage-300 hover:bg-sage-100/50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8 glass-card p-1 border-sage-200/50">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-sage-600 data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="team"
              className="data-[state=active]:bg-sage-600 data-[state=active]:text-white"
            >
              Team Performance
            </TabsTrigger>
            <TabsTrigger
              value="strategic"
              className="data-[state=active]:bg-sage-600 data-[state=active]:text-white"
            >
              Strategic Planner
            </TabsTrigger>
            <TabsTrigger
              value="clients"
              className="data-[state=active]:bg-sage-600 data-[state=active]:text-white"
            >
              Client Management
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* ROI Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="glass-card glass-card-hover border-sage-200/50">
                <CardHeader className="pb-2">
                  <CardDescription className="text-sage-600">
                    Total Deals (6mo)
                  </CardDescription>
                  <CardTitle className="flex items-baseline gap-2 text-3xl">
                    <span>42</span>
                    <span className="text-sm text-moss-600 flex items-center gap-1">
                      <ArrowUpRight className="h-4 w-4" />
                      28%
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-sage-500">
                    vs pre-platform: 32
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card glass-card-hover border-sage-200/50">
                <CardHeader className="pb-2">
                  <CardDescription className="text-sage-600">
                    Deal Value
                  </CardDescription>
                  <CardTitle className="flex items-baseline gap-2 text-3xl">
                    <span>$3.2M</span>
                    <span className="text-sm text-moss-600 flex items-center gap-1">
                      <ArrowUpRight className="h-4 w-4" />
                      42%
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-sage-500">
                    vs baseline: $2.2M
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card glass-card-hover border-sage-200/50">
                <CardHeader className="pb-2">
                  <CardDescription className="text-sage-600">
                    Avg Team Score
                  </CardDescription>
                  <CardTitle className="flex items-baseline gap-2 text-3xl">
                    <span>87</span>
                    <span className="text-sm text-moss-600 flex items-center gap-1">
                      <ArrowUpRight className="h-4 w-4" />
                      14%
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-sage-500">
                    All employees improving
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card glass-card-hover border-sage-200/50">
                <CardHeader className="pb-2">
                  <CardDescription className="text-sage-600">
                    Training Hours
                  </CardDescription>
                  <CardTitle className="flex items-baseline gap-2 text-3xl">
                    <span>240</span>
                    <span className="text-sm text-sage-600 flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      This month
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-sage-500">
                    60 hours/employee
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-card border-sage-200/50 smooth-shadow">
                <CardHeader>
                  <CardTitle>Deal Flow & Value</CardTitle>
                  <CardDescription className="text-sage-600">
                    6-month trend showing platform impact
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer
                    width="100%"
                    height={300}
                  >
                    <AreaChart data={roiData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                      />
                      <Tooltip />
                      <Area
                        yAxisId="left"
                        type="monotone"
                        dataKey="deals"
                        fill="var(--chart-1)"
                        stroke="var(--chart-1)"
                        fillOpacity={0.6}
                      />
                      <Area
                        yAxisId="right"
                        type="monotone"
                        dataKey="value"
                        fill="var(--chart-2)"
                        stroke="var(--chart-2)"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="glass-card border-sage-200/50 smooth-shadow">
                <CardHeader>
                  <CardTitle>Team Performance Trend</CardTitle>
                  <CardDescription className="text-sage-600">
                    Average score progression over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer
                    width="100%"
                    height={300}
                  >
                    <LineChart data={teamPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis domain={[70, 90]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="avgScore"
                        stroke="var(--chart-3)"
                        strokeWidth={3}
                        dot={{ fill: "var(--chart-3)", r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performers This Month</CardTitle>
                <CardDescription>
                  Employees showing exceptional progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employees
                    .sort(
                      (a, b) => b.improvement - a.improvement,
                    )
                    .slice(0, 3)
                    .map((emp, idx) => (
                      <div
                        key={emp.id}
                        className="flex items-center gap-4"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <Award className="h-5 w-5 text-yellow-500" />
                          <Avatar>
                            <AvatarFallback>
                              {emp.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p>{emp.name}</p>
                            <p className="text-sm text-gray-600">
                              +{emp.improvement} points
                              improvement
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary">
                          {emp.score} score
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Performance Tab */}
          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>
                      Monitor and manage individual performance
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={
                        sortBy === "score"
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => setSortBy("score")}
                    >
                      By Score
                    </Button>
                    <Button
                      variant={
                        sortBy === "improvement"
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => setSortBy("improvement")}
                    >
                      By Improvement
                    </Button>
                    <Button
                      variant={
                        sortBy === "hours"
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => setSortBy("hours")}
                    >
                      By Training
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sortedEmployees.map((emp) => (
                    <div
                      key={emp.id}
                      className="border rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer"
                      onClick={() =>
                        onViewEmployeeProfile(emp.id)
                      }
                    >
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>
                            {emp.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <p>{emp.name}</p>
                                {emp.status ===
                                  "needs-attention" && (
                                  <Badge variant="destructive">
                                    Needs Attention
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">
                                {emp.trainingHours}h training •
                                +{emp.improvement}% improvement
                              </p>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="text-sm text-gray-600">
                                  Performance Score
                                </p>
                                <p className="text-2xl">
                                  {emp.score}
                                </p>
                              </div>
                              <ChevronRight className="h-5 w-5 text-gray-400" />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">
                                Overall Progress
                              </span>
                              <span>{emp.score}%</span>
                            </div>
                            <Progress value={emp.score} />
                          </div>
                          <div className="flex gap-2 text-sm">
                            <span className="text-gray-600">
                              Strengths:
                            </span>
                            {emp.strengths.map((s) => (
                              <Badge
                                key={s}
                                variant="secondary"
                              >
                                {s}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Strategic Planner Tab */}
          <TabsContent value="strategic">
            <StrategicPlanner
              employees={employees}
              clients={clients}
            />
          </TabsContent>

          {/* Client Management Tab */}
          <TabsContent value="clients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Client Projects</CardTitle>
                <CardDescription>
                  Monitor ongoing negotiations and upcoming
                  meetings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clients.map((client) => (
                    <div
                      key={client.id}
                      className="border rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer"
                      onClick={() =>
                        onViewInteractionLog(client.id)
                      }
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div>
                            <p>{client.name}</p>
                            <p className="text-sm text-gray-600">
                              Assigned to: {client.assignedTo}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            variant={
                              client.priority === "high"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {client.priority} priority
                          </Badge>
                          <Badge variant="outline">
                            {client.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-gray-600">
                            <Calendar className="h-4 w-4" />
                            Next meeting: {client.nextMeeting}
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <DollarSign className="h-4 w-4" />$
                            {(client.dealValue / 1000).toFixed(
                              0,
                            )}
                            K
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}