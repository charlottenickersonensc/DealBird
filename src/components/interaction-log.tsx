import { useState } from 'react';
import { User } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  ArrowLeft,
  Calendar,
  Search,
  Plus,
  FileText,
  Users,
  MessageSquare,
  ChevronRight,
  Clock,
  TrendingUp,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

type InteractionLogProps = {
  user: User;
  clientId: string | null;
  onBack: () => void;
  onViewStakeholderMap: (clientId: string) => void;
};

type Interaction = {
  id: string;
  clientName: string;
  clientCompany: string;
  date: string;
  duration: string;
  type: 'meeting' | 'call' | 'email';
  notes: string;
  keyPoints: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  nextSteps: string[];
  hasTranscript: boolean;
};

const mockInteractions: Interaction[] = [
  {
    id: '1',
    clientName: 'John Smith',
    clientCompany: 'TechCorp Industries',
    date: '2024-10-10',
    duration: '45 min',
    type: 'meeting',
    notes: 'Discussed pricing structure and implementation timeline. John expressed concerns about ROI but seemed interested in the value proposition.',
    keyPoints: [
      'Primary concern: ROI timeline',
      'Interested in case studies from similar companies',
      'Decision maker but needs CFO approval',
      'Prefers data-driven arguments',
    ],
    sentiment: 'positive',
    nextSteps: [
      'Send detailed ROI analysis by Friday',
      'Schedule follow-up with CFO',
      'Provide 3 case studies from tech sector',
    ],
    hasTranscript: true,
  },
  {
    id: '2',
    clientName: 'Emily Davis',
    clientCompany: 'Innovate Inc',
    date: '2024-10-08',
    duration: '30 min',
    type: 'call',
    notes: 'Initial discovery call. Emily is very relationship-focused and wants to build a long-term partnership.',
    keyPoints: [
      'Values relationships over quick transactions',
      'Looking for a strategic partner, not just a vendor',
      'Has budget approval up to $500K',
      'Timeline: wants to start Q4',
    ],
    sentiment: 'positive',
    nextSteps: [
      'Arrange in-person meeting',
      'Prepare partnership proposal',
      'Connect her with existing clients for references',
    ],
    hasTranscript: false,
  },
  {
    id: '3',
    clientName: 'Michael Brown',
    clientCompany: 'Global Systems',
    date: '2024-10-05',
    duration: '20 min',
    type: 'meeting',
    notes: 'Very direct and to-the-point. Michael wants clear deliverables and timelines. No interest in lengthy presentations.',
    keyPoints: [
      'Extremely time-conscious',
      'Wants detailed project plan with milestones',
      'Focus on results, not process',
      'Has authority to make final decision',
    ],
    sentiment: 'neutral',
    nextSteps: [
      'Send one-page executive summary',
      'Provide detailed project timeline',
      'Schedule 15-min follow-up next week',
    ],
    hasTranscript: true,
  },
];

const mockSuggestions = [
  'Consider emphasizing ROI metrics in your next meeting with John',
  'Emily responds well to personal stories - share customer success narratives',
  'Michael prefers bullet points - keep all communications concise',
];

export function InteractionLog({
  user,
  clientId,
  onBack,
  onViewStakeholderMap,
}: InteractionLogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInteraction, setSelectedInteraction] = useState<Interaction | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const filteredInteractions = mockInteractions.filter(
    (int) =>
      int.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      int.clientCompany.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSentimentColor = (sentiment: Interaction['sentiment']) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800';
      case 'neutral':
        return 'bg-gray-100 text-gray-800';
      case 'negative':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="min-h-screen">
      <header className="glass-header">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg">Interaction Log</h1>
              <p className="text-sm text-gray-600">Track and analyze client conversations</p>
            </div>
          </div>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Log Interaction
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Log New Interaction</DialogTitle>
                <DialogDescription>
                  Record details from your client meeting or conversation
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Client Name</Label>
                    <Input placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input placeholder="Company Name" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="meeting">Meeting</SelectItem>
                        <SelectItem value="call">Call</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Input placeholder="30 min" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea
                    placeholder="What was discussed? What were the key takeaways?"
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Next Steps</Label>
                  <Textarea placeholder="What are the action items?" rows={3} />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setShowAddDialog(false)}>Save Interaction</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Interactions List */}
          <div className="lg:col-span-2 space-y-4">
            {/* Search and filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by client name or company..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Button variant="outline">Filter</Button>
                </div>
              </CardContent>
            </Card>

            {/* Interactions */}
            <div className="space-y-3">
              {filteredInteractions.map((interaction) => (
                <Card
                  key={interaction.id}
                  className="hover:border-blue-500 transition-colors cursor-pointer"
                  onClick={() => setSelectedInteraction(interaction)}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p>{interaction.clientName}</p>
                          <Badge className={getSentimentColor(interaction.sentiment)}>
                            {interaction.sentiment}
                          </Badge>
                          {interaction.hasTranscript && (
                            <Badge variant="outline">
                              <FileText className="h-3 w-3 mr-1" />
                              Transcript
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{interaction.clientCompany}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(interaction.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {interaction.duration}
                      </div>
                      <Badge variant="secondary">{interaction.type}</Badge>
                    </div>

                    <p className="text-sm text-gray-700 line-clamp-2 mb-3">
                      {interaction.notes}
                    </p>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewStakeholderMap(interaction.id);
                        }}
                      >
                        <Users className="h-4 w-4 mr-1" />
                        Stakeholder Map
                      </Button>
                      {interaction.hasTranscript && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedInteraction(interaction);
                          }}
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          View Transcript
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Details Panel */}
          <div className="space-y-4">
            {/* AI Suggestions */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  <CardTitle>AI Suggestions</CardTitle>
                </div>
                <CardDescription>Personalized recommendations based on your notes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockSuggestions.map((suggestion, idx) => (
                    <div key={idx} className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <p className="text-sm">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Selected Interaction Details */}
            {selectedInteraction ? (
              <Card>
                <CardHeader>
                  <CardTitle>{selectedInteraction.clientName}</CardTitle>
                  <CardDescription>{selectedInteraction.clientCompany}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Tabs defaultValue="summary">
                    <TabsList className="w-full">
                      <TabsTrigger value="summary" className="flex-1">
                        Summary
                      </TabsTrigger>
                      <TabsTrigger value="transcript" className="flex-1">
                        Transcript
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="summary" className="space-y-4">
                      <div>
                        <p className="text-sm mb-2">Notes</p>
                        <p className="text-sm text-gray-700 p-3 bg-gray-50 rounded-lg">
                          {selectedInteraction.notes}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm mb-2">Key Points</p>
                        <ul className="space-y-2">
                          {selectedInteraction.keyPoints.map((point, idx) => (
                            <li key={idx} className="text-sm flex items-start gap-2">
                              <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="text-sm mb-2">Next Steps</p>
                        <ul className="space-y-2">
                          {selectedInteraction.nextSteps.map((step, idx) => (
                            <li key={idx} className="text-sm flex items-start gap-2">
                              <div className="h-4 w-4 rounded-full border-2 border-blue-600 mt-0.5 flex-shrink-0" />
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>

                    <TabsContent value="transcript" className="space-y-3">
                      {selectedInteraction.hasTranscript ? (
                        <div className="space-y-3">
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm mb-1">
                              <span className="font-medium">You:</span> Thank you for meeting
                              with me today. I wanted to discuss how our solution can help
                              address your current challenges.
                            </p>
                            <p className="text-xs text-gray-600">0:32</p>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm mb-1">
                              <span className="font-medium">
                                {selectedInteraction.clientName}:
                              </span>{' '}
                              I appreciate that. My main concern right now is understanding
                              the ROI. We've made similar investments before that didn't pan
                              out.
                            </p>
                            <p className="text-xs text-gray-600">1:05</p>
                          </div>
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm mb-1">
                              <span className="font-medium">You:</span> That's a very valid
                              concern. Let me show you some data from companies in your
                              industry...
                            </p>
                            <p className="text-xs text-gray-600">1:22</p>
                          </div>
                          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-start gap-2">
                              <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                              <div>
                                <p className="text-sm mb-1">
                                  AI Analysis: Strong data-driven approach. Client engagement
                                  increased after this point.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <FileText className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                          <p>No transcript available for this interaction</p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => onViewStakeholderMap(selectedInteraction.id)}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    View Stakeholder Map
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                  <p className="text-gray-500">Select an interaction to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
