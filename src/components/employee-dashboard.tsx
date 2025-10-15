import { useState } from 'react';
import { User } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  LogOut,
  TrendingUp,
  Target,
  Calendar,
  Play,
  Clock,
  Award,
  ChevronRight,
  BookOpen,
  Video,
  FileText,
  Trophy,
  BarChart3,
  MessageSquare,
  Users as UsersIcon,
  Sparkles,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

type EmployeeDashboardProps = {
  user: User;
  onSignOut: () => void;
  onStartTraining: (context?: any) => void;
  onViewInteractionLog: () => void;
  onViewStakeholderMap: (clientId: string) => void;
};

// Mock data
const performanceData = [
  { date: 'Week 1', score: 72 },
  { date: 'Week 2', score: 75 },
  { date: 'Week 3', score: 78 },
  { date: 'Week 4', score: 82 },
  { date: 'Week 5', score: 84 },
  { date: 'Week 6', score: 87 },
];

const skillsData = [
  { skill: 'Body Language', value: 85 },
  { skill: 'Tone', value: 88 },
  { skill: 'Content', value: 82 },
  { skill: 'Persuasiveness', value: 79 },
  { skill: 'Strategy', value: 86 },
];

const upcomingMeetings = [
  {
    id: '1',
    client: 'John Smith',
    company: 'TechCorp',
    date: '2 days',
    priority: 'high',
    personality: 'Analytical, detail-oriented',
    suggestedStrategy: 'Focus on data and ROI. Prepare detailed cost-benefit analysis.',
  },
  {
    id: '2',
    client: 'Emily Davis',
    company: 'Innovate Inc',
    date: '5 days',
    priority: 'medium',
    personality: 'Relationship-driven, collaborative',
    suggestedStrategy: 'Build rapport first. Emphasize partnership opportunities.',
  },
  {
    id: '3',
    client: 'Michael Brown',
    company: 'Global Systems',
    date: '1 week',
    priority: 'low',
    personality: 'Direct, results-focused',
    suggestedStrategy: 'Be concise and action-oriented. Present clear next steps.',
  },
];

const suggestedTrainings = [
  {
    id: '1',
    title: 'Handling Objections',
    type: 'AI Suggested',
    duration: '20 min',
    reason: 'Based on your recent performance patterns',
    icon: Sparkles,
  },
  {
    id: '2',
    title: 'Advanced Closing Techniques',
    type: 'Manager Assigned',
    duration: '30 min',
    reason: 'Required for upcoming high-value deals',
    icon: Target,
  },
  {
    id: '3',
    title: 'Body Language Mastery',
    type: 'Recommended',
    duration: '25 min',
    reason: 'Improve non-verbal communication',
    icon: Trophy,
  },
];

const resources = [
  {
    id: '1',
    title: 'The Psychology of Persuasion',
    type: 'article',
    duration: '8 min read',
    icon: FileText,
  },
  {
    id: '2',
    title: 'Negotiation Tactics Masterclass',
    type: 'video',
    duration: '45 min',
    icon: Video,
  },
  {
    id: '3',
    title: 'Building Trust in Sales',
    type: 'article',
    duration: '6 min read',
    icon: BookOpen,
  },
  {
    id: '4',
    title: 'Advanced Objection Handling',
    type: 'video',
    duration: '30 min',
    icon: Video,
  },
];

const leaderboard = [
  { rank: 1, name: 'Priya Patel', score: 94, improvement: 12, avatar: 'PP' },
  { rank: 2, name: 'Maria Garcia', score: 92, improvement: 8, avatar: 'MG' },
  { rank: 3, name: 'Alex Chen', score: 87, improvement: 15, avatar: 'AC' },
  { rank: 4, name: 'James Wilson', score: 78, improvement: 22, avatar: 'JW' },
];

export function EmployeeDashboard({
  user,
  onSignOut,
  onStartTraining,
  onViewInteractionLog,
  onViewStakeholderMap,
}: EmployeeDashboardProps) {
  const [timeRange, setTimeRange] = useState<'month' | '6month' | 'year'>('month');

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass-header sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="gradient-sage text-white px-4 py-2 rounded-xl shadow-sm">NA</div>
            <div>
              <h1 className="text-xl">My Dashboard</h1>
              <p className="text-sm text-sage-600">{user.name}</p>
            </div>
          </div>
          <Button variant="outline" onClick={onSignOut} className="border-sage-300 hover:bg-sage-100/50">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Stats & Training */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Stats */}
            <Card className="glass-card border-sage-200/50 smooth-shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Your Performance</CardTitle>
                    <CardDescription className="text-sage-600">Track your progress and improvement</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={timeRange === 'month' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setTimeRange('month')}
                    >
                      1M
                    </Button>
                    <Button
                      variant={timeRange === '6month' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setTimeRange('6month')}
                    >
                      6M
                    </Button>
                    <Button
                      variant={timeRange === 'year' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setTimeRange('year')}
                    >
                      1Y
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-5 glass-card border-sage-200/50 rounded-2xl">
                    <p className="text-sm text-sage-600 mb-1">Current Score</p>
                    <p className="text-4xl">87</p>
                    <p className="text-sm text-moss-600 flex items-center justify-center gap-1 mt-2">
                      <TrendingUp className="h-4 w-4" />
                      +15%
                    </p>
                  </div>
                  <div className="text-center p-5 glass-card border-sage-200/50 rounded-2xl">
                    <p className="text-sm text-sage-600 mb-1">Training Hours</p>
                    <p className="text-4xl">12</p>
                    <p className="text-sm text-sage-600 mt-2">This month</p>
                  </div>
                  <div className="text-center p-5 glass-card border-sage-200/50 rounded-2xl">
                    <p className="text-sm text-sage-600 mb-1">Rank</p>
                    <p className="text-4xl">#3</p>
                    <p className="text-sm text-sage-600 mt-2">of 12</p>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Weekly Goal Progress</span>
                    <span>8/10 hours</span>
                  </div>
                  <Progress value={80} />
                </div>

                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[70, 90]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="var(--chart-1)"
                      strokeWidth={2}
                      dot={{ fill: 'var(--chart-1)', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Skills Radar */}
            <Card className="glass-card border-sage-200/50 smooth-shadow-lg">
              <CardHeader>
                <CardTitle>Skills Breakdown</CardTitle>
                <CardDescription className="text-sage-600">Your performance across key areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <ResponsiveContainer width="50%" height={300}>
                    <RadarChart data={skillsData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="skill" />
                      <Radar
                        dataKey="value"
                        stroke="var(--chart-2)"
                        fill="var(--chart-2)"
                        fillOpacity={0.6}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                  <div className="flex-1 space-y-3">
                    {skillsData.map((skill) => (
                      <div key={skill.skill}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{skill.skill}</span>
                          <span>{skill.value}%</span>
                        </div>
                        <Progress value={skill.value} />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Suggested Training */}
            <Card className="glass-card border-sage-200/50 smooth-shadow-lg">
              <CardHeader>
                <CardTitle>Recommended Training</CardTitle>
                <CardDescription className="text-sage-600">
                  Personalized sessions to improve your skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {suggestedTrainings.map((training) => (
                    <div
                      key={training.id}
                      className="glass-card border-sage-200/50 p-4 hover:border-sage-400 transition-all glass-card-hover rounded-xl"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-3 gradient-sage rounded-xl shadow-sm">
                          <training.icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <div>
                              <p>{training.title}</p>
                              <p className="text-sm text-gray-600">{training.reason}</p>
                            </div>
                            <Badge variant="secondary">{training.type}</Badge>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {training.duration}
                            </p>
                            <Button
                              size="sm"
                              onClick={() => onStartTraining({ training })}
                            >
                              <Play className="h-4 w-4 mr-1" />
                              Start
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => onStartTraining()}
                >
                  Browse All Trainings
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Meetings */}
            <Card className="glass-card border-sage-200/50 smooth-shadow-lg">
              <CardHeader>
                <CardTitle>Upcoming Meetings</CardTitle>
                <CardDescription className="text-sage-600">
                  Prepare for your scheduled negotiations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingMeetings.map((meeting) => (
                    <div
                      key={meeting.id}
                      className="border rounded-lg p-4 hover:border-blue-500 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p>{meeting.client}</p>
                            <Badge
                              variant={
                                meeting.priority === 'high'
                                  ? 'destructive'
                                  : meeting.priority === 'medium'
                                  ? 'default'
                                  : 'secondary'
                              }
                            >
                              {meeting.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{meeting.company}</p>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          in {meeting.date}
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 mb-3">
                        <p className="text-sm mb-1">
                          <span className="text-gray-600">Personality: </span>
                          {meeting.personality}
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-600">Strategy: </span>
                          {meeting.suggestedStrategy}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onViewStakeholderMap(meeting.id)}
                        >
                          <UsersIcon className="h-4 w-4 mr-1" />
                          Stakeholder Map
                        </Button>
                        <Button
                          size="sm"
                          onClick={() =>
                            onStartTraining({ meeting, type: 'client-specific' })
                          }
                        >
                          <Play className="h-4 w-4 mr-1" />
                          Practice Session
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={onViewInteractionLog}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  View All Interactions
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Resources & Leaderboard */}
          <div className="space-y-6">
            {/* Resources */}
            <Card className="glass-card border-sage-200/50 smooth-shadow">
              <CardHeader>
                <CardTitle>Learning Resources</CardTitle>
                <CardDescription className="text-sage-600">Curated content for you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {resources.map((resource) => (
                    <div
                      key={resource.id}
                      className="border rounded-lg p-3 hover:border-blue-500 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-gray-100 rounded">
                          <resource.icon className="h-4 w-4 text-gray-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm truncate">{resource.title}</p>
                          <p className="text-xs text-gray-600">{resource.duration}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card className="glass-card border-sage-200/50 smooth-shadow">
              <CardHeader>
                <CardTitle>Team Leaderboard</CardTitle>
                <CardDescription className="text-sage-600">See how you compare</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((person) => (
                    <div
                      key={person.rank}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        person.name === user.name
                          ? 'bg-blue-50 border-2 border-blue-200'
                          : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white border-2">
                        {person.rank <= 3 ? (
                          <Award
                            className={`h-5 w-5 ${
                              person.rank === 1
                                ? 'text-yellow-500'
                                : person.rank === 2
                                ? 'text-gray-400'
                                : 'text-amber-600'
                            }`}
                          />
                        ) : (
                          <span className="text-sm">{person.rank}</span>
                        )}
                      </div>
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-sm">
                          {person.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{person.name}</p>
                        <p className="text-xs text-gray-600">
                          +{person.improvement}% improvement
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{person.score}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-card border-sage-200/50 smooth-shadow">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => onStartTraining()}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Custom Training
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={onViewInteractionLog}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Interaction Log
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => onViewStakeholderMap('default')}
                >
                  <UsersIcon className="h-4 w-4 mr-2" />
                  Stakeholder Maps
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
