import { User } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Target,
  Award,
  Calendar,
  Clock,
  BarChart3,
  Send,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';

type EmployeeProfileProps = {
  employeeId: string;
  onBack: () => void;
  onAssignTraining: (context: any) => void;
};

// Mock detailed employee data
const employeeData = {
  id: 'emp1',
  name: 'Alex Chen',
  email: 'alex.chen@company.com',
  avatar: 'AC',
  role: 'Senior Sales Executive',
  score: 87,
  trainingHours: 52,
  improvement: 15,
  joinDate: '2023-03-15',
  dealsCompleted: 18,
  dealValue: 1250000,
  strengths: ['Body Language', 'Vocal Tone', 'Relationship Building'],
  weaknesses: ['Question Ratio', 'Objection Handling'],
  status: 'active',
};

const performanceHistory = [
  { month: 'Apr', score: 72, deals: 2 },
  { month: 'May', score: 75, deals: 3 },
  { month: 'Jun', score: 78, deals: 2 },
  { month: 'Jul', score: 82, deals: 4 },
  { month: 'Aug', score: 84, deals: 3 },
  { month: 'Sep', score: 87, deals: 4 },
];

const skillsRadar = [
  { skill: 'Body Language', value: 92 },
  { skill: 'Tone', value: 88 },
  { skill: 'Content', value: 79 },
  { skill: 'Persuasion', value: 85 },
  { skill: 'Objection Handling', value: 75 },
  { skill: 'Closing', value: 90 },
];

const trainingModules = [
  {
    id: '1',
    name: 'Advanced Objection Handling',
    category: 'weakness',
    priority: 'high',
    duration: '30 min',
    completed: false,
  },
  {
    id: '2',
    name: 'Asking Better Questions',
    category: 'weakness',
    priority: 'high',
    duration: '25 min',
    completed: false,
  },
  {
    id: '3',
    name: 'Body Language Mastery',
    category: 'strength',
    priority: 'medium',
    duration: '20 min',
    completed: true,
  },
  {
    id: '4',
    name: 'Vocal Presence & Confidence',
    category: 'strength',
    priority: 'low',
    duration: '25 min',
    completed: true,
  },
];

const recentDeals = [
  {
    id: '1',
    client: 'TechStart Inc',
    value: 85000,
    date: '2024-10-01',
    outcome: 'won',
    score: 91,
  },
  {
    id: '2',
    client: 'Global Systems',
    value: 120000,
    date: '2024-09-15',
    outcome: 'won',
    score: 88,
  },
  {
    id: '3',
    client: 'Digital Corp',
    value: 65000,
    date: '2024-09-01',
    outcome: 'lost',
    score: 76,
  },
];

const availableTrainings = [
  { id: 't1', name: 'Handling Difficult Objections', category: 'Objections' },
  { id: 't2', name: 'Advanced Closing Techniques', category: 'Closing' },
  { id: 't3', name: 'Consultative Selling', category: 'Strategy' },
  { id: 't4', name: 'Building Rapport Quickly', category: 'Relationships' },
];

export function EmployeeProfile({ employeeId, onBack, onAssignTraining }: EmployeeProfileProps) {
  return (
    <div className="min-h-screen">
      <header className="glass-header">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback>{employeeData.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-lg">{employeeData.name}</h1>
                <p className="text-sm text-gray-600">{employeeData.role}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Send Message to {employeeData.name}</DialogTitle>
                  <DialogDescription>
                    Send feedback or instructions
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Message</Label>
                    <Textarea
                      placeholder="Type your message here..."
                      rows={5}
                    />
                  </div>
                  <Button className="w-full">Send Message</Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Target className="h-4 w-4 mr-2" />
                  Assign Training
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Assign Training Module</DialogTitle>
                  <DialogDescription>
                    Select a training module for {employeeData.name}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Training Module</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a training..." />
                      </SelectTrigger>
                      <SelectContent>
                        {availableTrainings.map((training) => (
                          <SelectItem key={training.id} value={training.id}>
                            {training.name} - {training.category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High Priority</SelectItem>
                        <SelectItem value="medium">Medium Priority</SelectItem>
                        <SelectItem value="low">Low Priority</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Notes (Optional)</Label>
                    <Textarea
                      placeholder="Add any specific instructions or context..."
                      rows={3}
                    />
                  </div>
                  <Button className="w-full">Assign Training</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left sidebar - Quick stats */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Performance Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100">
                    <span className="text-3xl">{employeeData.score}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <TrendingUp className="h-4 w-4" />
                    <span>+{employeeData.improvement} points</span>
                  </div>
                  <p className="text-sm text-gray-600">Last 30 days</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Key Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Training Hours</span>
                  <Badge>{employeeData.trainingHours}h</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Deals Completed</span>
                  <Badge>{employeeData.dealsCompleted}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total Deal Value</span>
                  <Badge variant="secondary">${(employeeData.dealValue / 1000).toFixed(0)}K</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Team Rank</span>
                  <Badge variant="default">#3 of 12</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Strengths</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {employeeData.strengths.map((strength) => (
                    <div key={strength} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{strength}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Areas for Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {employeeData.weaknesses.map((weakness) => (
                    <div key={weakness} className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm">{weakness}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3 space-y-6">
            <Tabs defaultValue="performance">
              <TabsList>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="training">Training</TabsTrigger>
                <TabsTrigger value="deals">Deals History</TabsTrigger>
              </TabsList>

              {/* Performance Tab */}
              <TabsContent value="performance" className="space-y-6">
                {/* Performance trend */}
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Trend</CardTitle>
                    <CardDescription>Score and deal progression over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={performanceHistory}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" domain={[70, 90]} />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="score"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          name="Score"
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="deals"
                          stroke="#10b981"
                          strokeWidth={2}
                          name="Deals"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Skills radar */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Skills Assessment</CardTitle>
                      <CardDescription>Performance across key areas</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <RadarChart data={skillsRadar}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="skill" />
                          <Radar
                            dataKey="value"
                            stroke="#8b5cf6"
                            fill="#8b5cf6"
                            fillOpacity={0.6}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Detailed Breakdown</CardTitle>
                      <CardDescription>Skill scores and progress</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {skillsRadar.map((skill) => (
                        <div key={skill.skill}>
                          <div className="flex justify-between mb-2 text-sm">
                            <span>{skill.skill}</span>
                            <span>{skill.value}%</span>
                          </div>
                          <Progress value={skill.value} />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Insights */}
                <Card>
                  <CardHeader>
                    <CardTitle>AI-Generated Insights</CardTitle>
                    <CardDescription>
                      Performance analysis and recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="mb-1">Strong Upward Trajectory</p>
                          <p className="text-sm text-gray-700">
                            {employeeData.name} has shown consistent improvement over the past
                            6 months, with a +{employeeData.improvement}% increase in overall
                            performance. This trend suggests strong engagement with training
                            materials.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Award className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="mb-1">Excelling in Body Language</p>
                          <p className="text-sm text-gray-700">
                            Body language score of 92% places {employeeData.name} in the top 10%
                            of the team. This is a key strength that can be leveraged in
                            high-stakes negotiations.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="mb-1">Focus Area: Objection Handling</p>
                          <p className="text-sm text-gray-700">
                            Objection handling (75%) is the lowest-scoring category. Recommend
                            assigning "Advanced Objection Handling" training module to address
                            this gap.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Training Tab */}
              <TabsContent value="training" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Assigned Training Modules</CardTitle>
                    <CardDescription>
                      Track progress on current and completed trainings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {trainingModules.map((module) => (
                        <div
                          key={module.id}
                          className={`p-4 border rounded-lg ${
                            module.completed ? 'bg-gray-50' : 'bg-white'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <p>{module.name}</p>
                                {module.completed ? (
                                  <Badge className="bg-green-100 text-green-800">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Completed
                                  </Badge>
                                ) : (
                                  <Badge
                                    variant={
                                      module.priority === 'high'
                                        ? 'destructive'
                                        : module.priority === 'medium'
                                        ? 'default'
                                        : 'secondary'
                                    }
                                  >
                                    {module.priority} priority
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {module.duration}
                                </span>
                                <span className="capitalize">
                                  Focus: {module.category}
                                </span>
                              </div>
                            </div>
                            {!module.completed && (
                              <Button variant="outline" size="sm">
                                View Progress
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Training Recommendations</CardTitle>
                    <CardDescription>
                      AI-suggested modules based on performance gaps
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="mb-1">Advanced Objection Handling</p>
                            <p className="text-sm text-gray-600">
                              Addresses primary weakness area
                            </p>
                          </div>
                          <Badge variant="destructive">High Priority</Badge>
                        </div>
                        <Button
                          size="sm"
                          onClick={() =>
                            onAssignTraining({
                              training: { title: 'Advanced Objection Handling' },
                            })
                          }
                        >
                          Assign Now
                        </Button>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="mb-1">Asking Better Questions</p>
                            <p className="text-sm text-gray-600">
                              Improve discovery and engagement
                            </p>
                          </div>
                          <Badge variant="default">Medium Priority</Badge>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            onAssignTraining({
                              training: { title: 'Asking Better Questions' },
                            })
                          }
                        >
                          Assign Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Deals History Tab */}
              <TabsContent value="deals" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Deals</CardTitle>
                    <CardDescription>
                      Performance in recent client negotiations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentDeals.map((deal) => (
                        <div key={deal.id} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <p>{deal.client}</p>
                              <p className="text-sm text-gray-600">
                                {new Date(deal.date).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge
                              variant={deal.outcome === 'won' ? 'default' : 'secondary'}
                              className={
                                deal.outcome === 'won'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                              }
                            >
                              {deal.outcome === 'won' ? 'Won' : 'Lost'}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600 mb-1">Deal Value</p>
                              <p>${(deal.value / 1000).toFixed(0)}K</p>
                            </div>
                            <div>
                              <p className="text-gray-600 mb-1">Performance Score</p>
                              <p>{deal.score}%</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Win Rate Analysis</CardTitle>
                    <CardDescription>Success rate by deal size and type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2 text-sm">
                          <span>Overall Win Rate</span>
                          <span>72%</span>
                        </div>
                        <Progress value={72} />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2 text-sm">
                          <span>High-Value Deals (&gt;$100K)</span>
                          <span>68%</span>
                        </div>
                        <Progress value={68} />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2 text-sm">
                          <span>Mid-Value Deals ($50K-$100K)</span>
                          <span>78%</span>
                        </div>
                        <Progress value={78} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
