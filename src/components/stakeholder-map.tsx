import { useState } from 'react';
import { User } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Users,
  Crown,
  Shield,
  User as UserIcon,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

type StakeholderMapProps = {
  user: User;
  clientId: string | null;
  onBack: () => void;
};

type Stakeholder = {
  id: string;
  name: string;
  role: string;
  influence: 'high' | 'medium' | 'low';
  engagement: 'champion' | 'supportive' | 'neutral' | 'skeptical' | 'blocker';
  notes: string;
  connections: string[]; // IDs of connected stakeholders
  x: number; // position
  y: number;
};

const mockStakeholders: Stakeholder[] = [
  {
    id: '1',
    name: 'John Smith',
    role: 'CEO',
    influence: 'high',
    engagement: 'neutral',
    notes: 'Final decision maker. Focused on ROI and strategic fit.',
    connections: ['2', '3'],
    x: 50,
    y: 20,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'CFO',
    influence: 'high',
    engagement: 'skeptical',
    notes: 'Concerned about budget. Needs detailed financial justification.',
    connections: ['1', '4'],
    x: 25,
    y: 50,
  },
  {
    id: '3',
    name: 'Michael Chen',
    role: 'CTO',
    influence: 'high',
    engagement: 'champion',
    notes: 'Very supportive. Understands technical value. Key advocate.',
    connections: ['1', '5'],
    x: 75,
    y: 50,
  },
  {
    id: '4',
    name: 'Emily Davis',
    role: 'VP Operations',
    influence: 'medium',
    engagement: 'supportive',
    notes: 'Will benefit from implementation. Generally positive.',
    connections: ['2'],
    x: 25,
    y: 80,
  },
  {
    id: '5',
    name: 'Alex Martinez',
    role: 'IT Manager',
    influence: 'low',
    engagement: 'neutral',
    notes: 'Will be involved in implementation. No strong opinion yet.',
    connections: ['3'],
    x: 75,
    y: 80,
  },
];

export function StakeholderMap({ user, clientId, onBack }: StakeholderMapProps) {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>(mockStakeholders);
  const [selectedStakeholder, setSelectedStakeholder] = useState<Stakeholder | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const getInfluenceIcon = (influence: Stakeholder['influence']) => {
    switch (influence) {
      case 'high':
        return <Crown className="h-4 w-4" />;
      case 'medium':
        return <Shield className="h-4 w-4" />;
      case 'low':
        return <UserIcon className="h-4 w-4" />;
    }
  };

  const getEngagementColor = (engagement: Stakeholder['engagement']) => {
    switch (engagement) {
      case 'champion':
        return 'bg-green-500';
      case 'supportive':
        return 'bg-blue-500';
      case 'neutral':
        return 'bg-gray-400';
      case 'skeptical':
        return 'bg-yellow-500';
      case 'blocker':
        return 'bg-red-500';
    }
  };

  const getEngagementLabel = (engagement: Stakeholder['engagement']) => {
    switch (engagement) {
      case 'champion':
        return 'Champion';
      case 'supportive':
        return 'Supportive';
      case 'neutral':
        return 'Neutral';
      case 'skeptical':
        return 'Skeptical';
      case 'blocker':
        return 'Blocker';
    }
  };

  const getInfluenceSize = (influence: Stakeholder['influence']) => {
    switch (influence) {
      case 'high':
        return 'w-24 h-24';
      case 'medium':
        return 'w-20 h-20';
      case 'low':
        return 'w-16 h-16';
    }
  };

  const handleDragStart = (e: React.DragEvent, stakeholder: Stakeholder) => {
    setIsDragging(true);
    e.dataTransfer.setData('stakeholderId', stakeholder.id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const stakeholderId = e.dataTransfer.getData('stakeholderId');
    const container = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - container.left) / container.width) * 100;
    const y = ((e.clientY - container.top) / container.height) * 100;

    setStakeholders((prev) =>
      prev.map((s) =>
        s.id === stakeholderId ? { ...s, x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) } : s
      )
    );
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
              <h1 className="text-lg">Stakeholder Map</h1>
              <p className="text-sm text-gray-600">Visualize decision-makers and influencers</p>
            </div>
          </div>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Stakeholder
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Stakeholder</DialogTitle>
                <DialogDescription>
                  Add a key decision-maker or influencer to the map
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input placeholder="Full name" />
                </div>
                <div className="space-y-2">
                  <Label>Role/Title</Label>
                  <Input placeholder="e.g., VP of Sales" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Influence Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Engagement</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="champion">Champion</SelectItem>
                        <SelectItem value="supportive">Supportive</SelectItem>
                        <SelectItem value="neutral">Neutral</SelectItem>
                        <SelectItem value="skeptical">Skeptical</SelectItem>
                        <SelectItem value="blocker">Blocker</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Input placeholder="Key information about this stakeholder" />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setShowAddDialog(false)}>Add Stakeholder</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map Visualization */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Client: TechCorp Industries</CardTitle>
                    <CardDescription>
                      Drag stakeholders to reposition • Click to view details
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Zap className="h-4 w-4 mr-1" />
                      Auto-Arrange
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Legend */}
                <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm mb-2">Influence:</p>
                    <div className="flex gap-3 text-xs">
                      <div className="flex items-center gap-1">
                        <Crown className="h-4 w-4" />
                        High
                      </div>
                      <div className="flex items-center gap-1">
                        <Shield className="h-4 w-4" />
                        Medium
                      </div>
                      <div className="flex items-center gap-1">
                        <UserIcon className="h-4 w-4" />
                        Low
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm mb-2">Engagement:</p>
                    <div className="flex gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        Champion
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        Supportive
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-gray-400" />
                        Neutral
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        Skeptical
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        Blocker
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Canvas */}
                <div
                  className="relative w-full h-[600px] border-2 border-dashed border-sage-300/50 rounded-2xl glass-card bg-gradient-to-br from-sage-100/30 to-moss-100/20"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {stakeholders.map((stakeholder) =>
                      stakeholder.connections.map((connId) => {
                        const target = stakeholders.find((s) => s.id === connId);
                        if (!target) return null;
                        return (
                          <line
                            key={`${stakeholder.id}-${connId}`}
                            x1={`${stakeholder.x}%`}
                            y1={`${stakeholder.y}%`}
                            x2={`${target.x}%`}
                            y2={`${target.y}%`}
                            stroke="var(--sage-300)"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                          />
                        );
                      })
                    )}
                  </svg>

                  {/* Stakeholders */}
                  {stakeholders.map((stakeholder) => (
                    <div
                      key={stakeholder.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, stakeholder)}
                      onClick={() => setSelectedStakeholder(stakeholder)}
                      className="absolute cursor-move transition-transform hover:scale-110"
                      style={{
                        left: `${stakeholder.x}%`,
                        top: `${stakeholder.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <div
                        className={`${getInfluenceSize(
                          stakeholder.influence
                        )} rounded-full ${getEngagementColor(
                          stakeholder.engagement
                        )} shadow-lg flex items-center justify-center text-white relative group`}
                      >
                        <div className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow">
                          {getInfluenceIcon(stakeholder.influence)}
                        </div>
                        <div className="text-center">
                          <p className="text-sm">{stakeholder.name.split(' ')[0]}</p>
                          <p className="text-xs opacity-90">{stakeholder.role.split(' ')[0]}</p>
                        </div>

                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-2 hidden group-hover:block w-48 p-2 bg-white rounded-lg shadow-lg border text-gray-900 text-xs z-10">
                          <p>{stakeholder.name}</p>
                          <p className="text-gray-600">{stakeholder.role}</p>
                          <div className="flex gap-1 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {stakeholder.influence}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {getEngagementLabel(stakeholder.engagement)}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Details Panel */}
          <div className="space-y-4">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Map Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total Stakeholders</span>
                  <Badge>{stakeholders.length}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">High Influence</span>
                  <Badge variant="secondary">
                    {stakeholders.filter((s) => s.influence === 'high').length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Champions</span>
                  <Badge className="bg-green-100 text-green-800">
                    {stakeholders.filter((s) => s.engagement === 'champion').length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Blockers</span>
                  <Badge className="bg-red-100 text-red-800">
                    {stakeholders.filter((s) => s.engagement === 'blocker').length}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Selected Stakeholder Details */}
            {selectedStakeholder ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{selectedStakeholder.name}</CardTitle>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>{selectedStakeholder.role}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Badge
                      className={`${getEngagementColor(
                        selectedStakeholder.engagement
                      )} text-white`}
                    >
                      {getEngagementLabel(selectedStakeholder.engagement)}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      {getInfluenceIcon(selectedStakeholder.influence)}
                      {selectedStakeholder.influence} influence
                    </Badge>
                  </div>

                  <div>
                    <p className="text-sm mb-2">Notes:</p>
                    <p className="text-sm text-gray-700 p-3 bg-gray-50 rounded-lg">
                      {selectedStakeholder.notes}
                    </p>
                  </div>

                  {selectedStakeholder.connections.length > 0 && (
                    <div>
                      <p className="text-sm mb-2">Connected to:</p>
                      <div className="space-y-2">
                        {selectedStakeholder.connections.map((connId) => {
                          const connected = stakeholders.find((s) => s.id === connId);
                          return connected ? (
                            <div
                              key={connId}
                              className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg text-sm"
                            >
                              <ArrowRight className="h-4 w-4 text-gray-400" />
                              <div>
                                <p>{connected.name}</p>
                                <p className="text-xs text-gray-600">{connected.role}</p>
                              </div>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 space-y-2">
                    <Button variant="outline" className="w-full">
                      View Interactions
                    </Button>
                    <Button variant="outline" className="w-full">
                      Schedule Meeting
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Users className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                  <p className="text-sm text-gray-500">
                    Click on a stakeholder to view details
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Strategic Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Strategic Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="mb-1">✓ Strong Champions</p>
                  <p className="text-xs text-gray-600">
                    Michael Chen (CTO) is a key advocate. Leverage his support with other
                    stakeholders.
                  </p>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="mb-1">⚠ Address Skepticism</p>
                  <p className="text-xs text-gray-600">
                    Sarah Johnson (CFO) needs more financial justification. Focus on ROI data.
                  </p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="mb-1">→ Engagement Path</p>
                  <p className="text-xs text-gray-600">
                    Suggested sequence: Michael → John → Sarah for maximum influence.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
