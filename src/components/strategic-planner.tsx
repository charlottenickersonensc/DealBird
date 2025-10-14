import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import {
  Users,
  Target,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  BarChart3,
  Lightbulb,
} from 'lucide-react';
import { Progress } from './ui/progress';

type Employee = {
  id: string;
  name: string;
  avatar: string;
  score: number;
  strengths: string[];
  weaknesses: string[];
};

type Client = {
  id: string;
  name: string;
  priority: string;
  dealValue: number;
  difficulty: string;
  personality: string;
};

type StrategicPlannerProps = {
  employees: Employee[];
  clients: Client[];
};

type Prediction = {
  successRate: number;
  dealValue: number;
  timeToClose: string;
  risks: string[];
  opportunities: string[];
  recommendation: 'highly-recommended' | 'recommended' | 'neutral' | 'not-recommended';
};

const mockClients: Client[] = [
  {
    id: 'client1',
    name: 'TechCorp Industries',
    priority: 'high',
    dealValue: 450000,
    difficulty: 'hard',
    personality: 'Analytical, data-driven, skeptical',
  },
  {
    id: 'client2',
    name: 'Global Solutions Ltd',
    priority: 'medium',
    dealValue: 280000,
    difficulty: 'medium',
    personality: 'Relationship-focused, collaborative',
  },
  {
    id: 'client3',
    name: 'Innovate Systems',
    priority: 'high',
    dealValue: 620000,
    difficulty: 'hard',
    personality: 'Direct, results-oriented, impatient',
  },
];

export function StrategicPlanner({ employees }: StrategicPlannerProps) {
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [prediction, setPrediction] = useState<Prediction | null>(null);

  const calculatePrediction = (employeeId: string, clientId: string): Prediction => {
    const employee = employees.find((e) => e.id === employeeId);
    const client = mockClients.find((c) => c.id === clientId);

    if (!employee || !client) {
      return {
        successRate: 0,
        dealValue: 0,
        timeToClose: 'Unknown',
        risks: [],
        opportunities: [],
        recommendation: 'neutral',
      };
    }

    // Mock calculation based on employee score and client difficulty
    const baseRate = employee.score;
    const difficultyModifier = client.difficulty === 'hard' ? -10 : client.difficulty === 'medium' ? -5 : 0;
    const successRate = Math.max(30, Math.min(95, baseRate + difficultyModifier + Math.random() * 10));

    const risks = [];
    const opportunities = [];

    // Generate contextual risks and opportunities
    if (client.difficulty === 'hard' && employee.score < 85) {
      risks.push('Employee may struggle with complex objections');
    }
    if (client.personality.includes('Analytical') && !employee.strengths.includes('Content')) {
      risks.push('Client values data-driven arguments; employee needs stronger content');
    }
    if (employee.weaknesses.includes('Body Language') && client.personality.includes('skeptical')) {
      risks.push('Poor body language may amplify client skepticism');
    }

    if (employee.strengths.includes('Persuasiveness')) {
      opportunities.push('Employee excels at persuasion techniques');
    }
    if (employee.score > 90) {
      opportunities.push('Top performer with proven track record');
    }

    const recommendation: Prediction['recommendation'] =
      successRate > 80
        ? 'highly-recommended'
        : successRate > 65
        ? 'recommended'
        : successRate > 50
        ? 'neutral'
        : 'not-recommended';

    return {
      successRate: Math.round(successRate),
      dealValue: client.dealValue,
      timeToClose: client.difficulty === 'hard' ? '6-8 weeks' : client.difficulty === 'medium' ? '4-6 weeks' : '2-4 weeks',
      risks: risks.length > 0 ? risks : ['No significant risks identified'],
      opportunities: opportunities.length > 0 ? opportunities : ['Standard opportunity'],
      recommendation,
    };
  };

  const handleAnalyze = () => {
    if (selectedEmployee && selectedClient) {
      const pred = calculatePrediction(selectedEmployee, selectedClient);
      setPrediction(pred);
    }
  };

  const getRecommendationColor = (rec: Prediction['recommendation']) => {
    switch (rec) {
      case 'highly-recommended':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'recommended':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'neutral':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'not-recommended':
        return 'bg-red-100 text-red-800 border-red-300';
    }
  };

  const getRecommendationText = (rec: Prediction['recommendation']) => {
    switch (rec) {
      case 'highly-recommended':
        return 'Highly Recommended Match';
      case 'recommended':
        return 'Recommended Match';
      case 'neutral':
        return 'Neutral Match';
      case 'not-recommended':
        return 'Not Recommended';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Negotiation Chess</CardTitle>
          <CardDescription>
            Strategically assign employees to clients based on AI-powered predictions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <Lightbulb className="h-4 w-4" />
            <AlertDescription>
              Select an employee and client to see predicted outcomes based on historical data,
              personality matching, and skill analysis.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Employee Selection */}
            <div className="space-y-3">
              <label className="text-sm">Select Employee</label>
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an employee..." />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((emp) => (
                    <SelectItem key={emp.id} value={emp.id}>
                      <div className="flex items-center gap-2">
                        <span>{emp.name}</span>
                        <Badge variant="secondary" className="ml-2">
                          Score: {emp.score}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedEmployee && (
                <Card className="bg-gray-50">
                  <CardContent className="pt-4">
                    {(() => {
                      const emp = employees.find((e) => e.id === selectedEmployee);
                      return emp ? (
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{emp.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p>{emp.name}</p>
                              <p className="text-sm text-gray-600">Performance: {emp.score}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Strengths:</p>
                            <div className="flex flex-wrap gap-1">
                              {emp.strengths.map((s) => (
                                <Badge key={s} variant="secondary">
                                  {s}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Areas for Improvement:</p>
                            <div className="flex flex-wrap gap-1">
                              {emp.weaknesses.map((w) => (
                                <Badge key={w} variant="outline">
                                  {w}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : null;
                    })()}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Client Selection */}
            <div className="space-y-3">
              <label className="text-sm">Select Client</label>
              <Select value={selectedClient} onValueChange={setSelectedClient}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a client..." />
                </SelectTrigger>
                <SelectContent>
                  {mockClients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      <div className="flex items-center gap-2">
                        <span>{client.name}</span>
                        <Badge
                          variant={client.priority === 'high' ? 'destructive' : 'secondary'}
                          className="ml-2"
                        >
                          {client.priority}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedClient && (
                <Card className="bg-gray-50">
                  <CardContent className="pt-4">
                    {(() => {
                      const client = mockClients.find((c) => c.id === selectedClient);
                      return client ? (
                        <div className="space-y-2">
                          <div>
                            <p>{client.name}</p>
                            <p className="text-sm text-gray-600">
                              Deal Value: ${(client.dealValue / 1000).toFixed(0)}K
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Badge
                              variant={
                                client.difficulty === 'hard'
                                  ? 'destructive'
                                  : client.difficulty === 'medium'
                                  ? 'default'
                                  : 'secondary'
                              }
                            >
                              {client.difficulty} difficulty
                            </Badge>
                            <Badge variant={client.priority === 'high' ? 'destructive' : 'secondary'}>
                              {client.priority} priority
                            </Badge>
                          </div>
                          <div className="pt-2">
                            <p className="text-sm text-gray-600 mb-1">Personality Profile:</p>
                            <p className="text-sm">{client.personality}</p>
                          </div>
                        </div>
                      ) : null;
                    })()}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={!selectedEmployee || !selectedClient}
            className="w-full mt-6"
            size="lg"
          >
            <BarChart3 className="h-5 w-5 mr-2" />
            Analyze Match & Predict Outcome
          </Button>
        </CardContent>
      </Card>

      {/* Prediction Results */}
      {prediction && (
        <Card className={`border-2 ${getRecommendationColor(prediction.recommendation)}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Predicted Outcome</CardTitle>
              <Badge className={getRecommendationColor(prediction.recommendation)}>
                {getRecommendationText(prediction.recommendation)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Success metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg border">
                <p className="text-sm text-gray-600 mb-2">Success Probability</p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl">{prediction.successRate}%</span>
                  {prediction.successRate >= 70 ? (
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-600" />
                  )}
                </div>
                <Progress value={prediction.successRate} />
              </div>

              <div className="p-4 bg-white rounded-lg border">
                <p className="text-sm text-gray-600 mb-2">Expected Deal Value</p>
                <p className="text-3xl">${(prediction.dealValue / 1000).toFixed(0)}K</p>
                <p className="text-sm text-gray-600 mt-2">
                  Adj. value: ${((prediction.dealValue * prediction.successRate) / 100000).toFixed(0)}K
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border">
                <p className="text-sm text-gray-600 mb-2">Estimated Timeline</p>
                <p className="text-3xl">{prediction.timeToClose}</p>
                <p className="text-sm text-gray-600 mt-2">To close deal</p>
              </div>
            </div>

            {/* Risks and Opportunities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg border">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <p>Identified Risks</p>
                </div>
                <ul className="space-y-2">
                  {prediction.risks.map((risk, idx) => (
                    <li key={idx} className="text-sm flex items-start gap-2">
                      <span className="text-yellow-600 mt-0.5">•</span>
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-white rounded-lg border">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <p>Key Opportunities</p>
                </div>
                <ul className="space-y-2">
                  {prediction.opportunities.map((opp, idx) => (
                    <li key={idx} className="text-sm flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">•</span>
                      <span>{opp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recommendations */}
            <div className="p-4 bg-white rounded-lg border">
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-5 w-5 text-blue-600" />
                <p>Strategic Recommendations</p>
              </div>
              {prediction.recommendation === 'highly-recommended' && (
                <div className="space-y-2 text-sm">
                  <p>✓ Excellent match - proceed with confidence</p>
                  <p>✓ Employee skills align well with client needs</p>
                  <p>✓ High probability of successful outcome</p>
                </div>
              )}
              {prediction.recommendation === 'recommended' && (
                <div className="space-y-2 text-sm">
                  <p>✓ Good match - proceed with standard preparation</p>
                  <p>⚠ Provide additional training on identified weak areas</p>
                  <p>✓ Success likely with proper support</p>
                </div>
              )}
              {prediction.recommendation === 'neutral' && (
                <div className="space-y-2 text-sm">
                  <p>⚠ Moderate risk - consider alternatives</p>
                  <p>⚠ Provide extensive preparation and support</p>
                  <p>⚠ Consider pairing with a senior team member</p>
                </div>
              )}
              {prediction.recommendation === 'not-recommended' && (
                <div className="space-y-2 text-sm">
                  <p>✗ High risk - strongly consider reassignment</p>
                  <p>✗ Skill gaps may lead to unfavorable outcome</p>
                  <p>⚠ If proceeding, ensure heavy manager involvement</p>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button className="flex-1">Assign This Employee</Button>
              <Button variant="outline" className="flex-1">
                Compare with Other Employees
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Historical comparisons */}
      <Card>
        <CardHeader>
          <CardTitle>Historical Performance Matrix</CardTitle>
          <CardDescription>
            Employee success rates with similar client profiles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Employee</th>
                  <th className="text-center p-3">Analytical Clients</th>
                  <th className="text-center p-3">Relationship-Driven</th>
                  <th className="text-center p-3">Direct/Results-Focused</th>
                  <th className="text-center p-3">Overall Win Rate</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">{emp.avatar}</AvatarFallback>
                        </Avatar>
                        <span>{emp.name}</span>
                      </div>
                    </td>
                    <td className="text-center p-3">
                      <Badge variant="secondary">
                        {Math.round(emp.score + Math.random() * 10 - 5)}%
                      </Badge>
                    </td>
                    <td className="text-center p-3">
                      <Badge variant="secondary">
                        {Math.round(emp.score + Math.random() * 10 - 5)}%
                      </Badge>
                    </td>
                    <td className="text-center p-3">
                      <Badge variant="secondary">
                        {Math.round(emp.score + Math.random() * 10 - 5)}%
                      </Badge>
                    </td>
                    <td className="text-center p-3">
                      <Badge variant="default">{emp.score}%</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
