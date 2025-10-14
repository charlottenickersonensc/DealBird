import { useState, useEffect, useRef } from 'react';
import { User } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  ArrowLeft,
  Play,
  Pause,
  Video,
  VideoOff,
  Mic,
  MicOff,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Volume2,
  MessageSquare,
  Eye,
  SkipForward,
  RotateCcw,
} from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

type TrainingSimulationProps = {
  user: User;
  context?: any;
  onBack: () => void;
};

type FeedbackItem = {
  timestamp: string;
  type: 'strength' | 'weakness' | 'tip';
  category: 'body-language' | 'tone' | 'content';
  message: string;
};

type SessionMetrics = {
  bodyLanguage: number;
  tone: number;
  content: number;
  overall: number;
};

export function TrainingSimulation({ user, context, onBack }: TrainingSimulationProps) {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [sessionTime, setSessionTime] = useState(0);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [realTimeFeedback, setRealTimeFeedback] = useState<FeedbackItem[]>([]);
  const [sessionComplete, setSessionComplete] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  // Mock AI avatar states
  const [aiMessage, setAiMessage] = useState(
    "Hello! I'm ready to begin this negotiation simulation. Let's discuss the terms of our partnership."
  );

  // Mock session metrics
  const [metrics, setMetrics] = useState<SessionMetrics>({
    bodyLanguage: 0,
    tone: 0,
    content: 0,
    overall: 0,
  });

  // Mock key moments for replay
  const keyMoments = [
    {
      id: '1',
      timestamp: '2:14',
      type: 'strength' as const,
      title: 'Excellent objection handling',
      description: 'You effectively reframed the concern about pricing',
    },
    {
      id: '2',
      timestamp: '5:42',
      type: 'weakness' as const,
      title: 'Posture needs improvement',
      description: 'Leaning back conveys disinterest',
    },
    {
      id: '3',
      timestamp: '8:33',
      type: 'strength' as const,
      title: 'Strong closing technique',
      description: 'Clear call-to-action with next steps',
    },
  ];

  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setSessionTime((prev) => prev + 1);
        
        // Simulate real-time feedback
        if (Math.random() > 0.95) {
          addRealTimeFeedback();
        }

        // Simulate AI speaking
        if (Math.random() > 0.9) {
          setAiSpeaking(true);
          setTimeout(() => setAiSpeaking(false), 3000);
        }

        // Update metrics gradually
        setMetrics((prev) => ({
          bodyLanguage: Math.min(85, prev.bodyLanguage + Math.random() * 2),
          tone: Math.min(88, prev.tone + Math.random() * 2),
          content: Math.min(82, prev.content + Math.random() * 2),
          overall: Math.min(85, prev.overall + Math.random() * 2),
        }));
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, isPaused]);

  const addRealTimeFeedback = () => {
    const feedbackOptions: FeedbackItem[] = [
      {
        timestamp: formatTime(sessionTime),
        type: 'tip',
        category: 'body-language',
        message: 'Maintain eye contact to build trust',
      },
      {
        timestamp: formatTime(sessionTime),
        type: 'strength',
        category: 'tone',
        message: 'Excellent confident tone!',
      },
      {
        timestamp: formatTime(sessionTime),
        type: 'weakness',
        category: 'content',
        message: 'Try asking more open-ended questions',
      },
      {
        timestamp: formatTime(sessionTime),
        type: 'tip',
        category: 'body-language',
        message: 'Uncross your arms - appear more open',
      },
    ];

    const newFeedback = feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)];
    setRealTimeFeedback((prev) => [newFeedback, ...prev].slice(0, 5));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartSession = async () => {
    setIsActive(true);
    setSessionTime(0);
    setMetrics({ bodyLanguage: 0, tone: 0, content: 0, overall: 0 });
    setRealTimeFeedback([]);
    
    // Mock camera access
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.log('Camera access demo mode');
    }
  };

  const handleEndSession = () => {
    setIsActive(false);
    setSessionComplete(true);
    
    // Stop camera
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }

    // Finalize metrics
    setMetrics({
      bodyLanguage: 83,
      tone: 88,
      content: 79,
      overall: 85,
    });
  };

  const handleRestart = () => {
    setSessionComplete(false);
    setIsActive(false);
    setSessionTime(0);
    setRealTimeFeedback([]);
  };

  if (sessionComplete) {
    return (
      <div className="min-h-screen">
        <header className="glass-header">
          <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-lg">Session Complete</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleRestart}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              <Button onClick={onBack}>Back to Dashboard</Button>
            </div>
          </div>
        </header>

        <div className="max-w-5xl mx-auto p-6 space-y-6">
          {/* Overall Score */}
          <Card className="glass-card border-sage-200/50 smooth-shadow-lg bg-gradient-to-br from-sage-100/50 to-moss-100/30">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-28 h-28 rounded-full glass-card shadow-lg">
                  <span className="text-5xl">{Math.round(metrics.overall)}</span>
                </div>
                <div>
                  <h2 className="text-3xl mb-2">Great Performance!</h2>
                  <p className="text-sage-600">
                    You've shown significant improvement in key areas
                  </p>
                </div>
                <div className="flex justify-center gap-8">
                  <div>
                    <p className="text-sm text-gray-600">Session Time</p>
                    <p className="text-xl">{formatTime(sessionTime)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Improvement</p>
                    <p className="text-xl text-green-600">+7 points</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Metrics Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Breakdown</CardTitle>
              <CardDescription>Your scores across key evaluation areas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Body Language</span>
                  <span>{Math.round(metrics.bodyLanguage)}%</span>
                </div>
                <Progress value={metrics.bodyLanguage} />
                <p className="text-sm text-gray-600 mt-1">
                  Strong posture and gestures. Work on maintaining eye contact.
                </p>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Vocal Tone</span>
                  <span>{Math.round(metrics.tone)}%</span>
                </div>
                <Progress value={metrics.tone} />
                <p className="text-sm text-gray-600 mt-1">
                  Excellent confidence and clarity. Great modulation.
                </p>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Content & Strategy</span>
                  <span>{Math.round(metrics.content)}%</span>
                </div>
                <Progress value={metrics.content} />
                <p className="text-sm text-gray-600 mt-1">
                  Good use of data. Increase open-ended questions for better engagement.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Key Moments */}
          <Card>
            <CardHeader>
              <CardTitle>Key Moments</CardTitle>
              <CardDescription>
                Review important points from your session
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {keyMoments.map((moment) => (
                <div
                  key={moment.id}
                  className="flex items-start gap-3 p-4 border rounded-lg hover:border-blue-500 transition-colors cursor-pointer"
                >
                  <div
                    className={`p-2 rounded-lg ${
                      moment.type === 'strength'
                        ? 'bg-green-100'
                        : 'bg-yellow-100'
                    }`}
                  >
                    {moment.type === 'strength' ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p>{moment.title}</p>
                      <Badge variant="outline">{moment.timestamp}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{moment.description}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Action Items */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended Next Steps</CardTitle>
              <CardDescription>Focus on these areas to improve further</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p>Practice asking open-ended questions</p>
                    <p className="text-sm text-gray-600">
                      This will help you better understand client needs
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Eye className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p>Work on maintaining consistent eye contact</p>
                    <p className="text-sm text-gray-600">
                      Builds trust and shows confidence
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p>Review advanced objection handling techniques</p>
                    <p className="text-sm text-gray-600">
                      See recommended resources in your dashboard
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="glass-header">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg">AI Training Simulation</h1>
              {context?.training && (
                <p className="text-sm text-gray-600">{context.training.title}</p>
              )}
              {context?.meeting && (
                <p className="text-sm text-gray-600">
                  Practicing for: {context.meeting.client}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isActive && (
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                Recording: {formatTime(sessionTime)}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {!isActive ? (
          <Card className="max-w-2xl mx-auto glass-card border-sage-200/50 smooth-shadow-lg">
            <CardHeader>
              <CardTitle>Ready to Begin?</CardTitle>
              <CardDescription className="text-sage-600">
                This simulation will analyze your body language, tone, and content in
                real-time
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  This session will use your camera and microphone to provide detailed
                  feedback on your negotiation skills.
                </AlertDescription>
              </Alert>

              {context?.meeting && (
                <div className="p-5 glass-card border-sage-200/50 rounded-2xl">
                  <p className="mb-2">Scenario:</p>
                  <p className="text-sm text-sage-700">
                    You're meeting with {context.meeting.client} from{' '}
                    {context.meeting.company}. Based on previous interactions, they are{' '}
                    {context.meeting.personality}. {context.meeting.suggestedStrategy}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <p>What you'll receive:</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Real-time feedback on your performance
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Analysis of body language, tone, and content
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Playback of key strong and weak moments
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Actionable recommendations for improvement
                  </li>
                </ul>
              </div>

              <Button onClick={handleStartSession} className="w-full" size="lg">
                <Play className="h-5 w-5 mr-2" />
                Start Simulation
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main simulation area */}
            <div className="lg:col-span-2 space-y-4">
              {/* AI Avatar */}
              <Card>
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-32 h-32 rounded-full bg-white shadow-xl mx-auto flex items-center justify-center">
                        <div className="text-6xl">🤵</div>
                      </div>
                      {aiSpeaking && (
                        <div className="flex items-center justify-center gap-1">
                          <div className="w-2 h-4 bg-blue-500 rounded animate-pulse" />
                          <div className="w-2 h-6 bg-blue-500 rounded animate-pulse delay-75" />
                          <div className="w-2 h-8 bg-blue-500 rounded animate-pulse delay-150" />
                          <div className="w-2 h-6 bg-blue-500 rounded animate-pulse delay-75" />
                          <div className="w-2 h-4 bg-blue-500 rounded animate-pulse" />
                        </div>
                      )}
                    </div>
                    {aiSpeaking && (
                      <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur rounded-lg p-3">
                        <p className="text-sm">{aiMessage}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Your video */}
              <Card>
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
                    {videoEnabled ? (
                      <video
                        ref={videoRef}
                        autoPlay
                        muted
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <VideoOff className="h-12 w-12 text-gray-400" />
                    )}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      <Button
                        variant={videoEnabled ? 'default' : 'destructive'}
                        size="icon"
                        onClick={() => setVideoEnabled(!videoEnabled)}
                      >
                        {videoEnabled ? (
                          <Video className="h-4 w-4" />
                        ) : (
                          <VideoOff className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant={audioEnabled ? 'default' : 'destructive'}
                        size="icon"
                        onClick={() => setAudioEnabled(!audioEnabled)}
                      >
                        {audioEnabled ? (
                          <Mic className="h-4 w-4" />
                        ) : (
                          <MicOff className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant={isPaused ? 'default' : 'outline'}
                        size="icon"
                        onClick={() => setIsPaused(!isPaused)}
                      >
                        {isPaused ? (
                          <Play className="h-4 w-4" />
                        ) : (
                          <Pause className="h-4 w-4" />
                        )}
                      </Button>
                      <Button variant="destructive" size="icon" onClick={handleEndSession}>
                        <SkipForward className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Feedback panel */}
            <div className="space-y-4">
              {/* Current metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Live Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Overall</span>
                      <span>{Math.round(metrics.overall)}%</span>
                    </div>
                    <Progress value={metrics.overall} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Body Language</span>
                      <span>{Math.round(metrics.bodyLanguage)}%</span>
                    </div>
                    <Progress value={metrics.bodyLanguage} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Tone</span>
                      <span>{Math.round(metrics.tone)}%</span>
                    </div>
                    <Progress value={metrics.tone} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Content</span>
                      <span>{Math.round(metrics.content)}%</span>
                    </div>
                    <Progress value={metrics.content} />
                  </div>
                </CardContent>
              </Card>

              {/* Real-time feedback */}
              <Card>
                <CardHeader>
                  <CardTitle>Real-Time Tips</CardTitle>
                  <CardDescription>Live coaching during your session</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {realTimeFeedback.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-4">
                        Tips will appear here as you practice
                      </p>
                    ) : (
                      realTimeFeedback.map((feedback, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg text-sm ${
                            feedback.type === 'strength'
                              ? 'bg-green-50 border border-green-200'
                              : feedback.type === 'weakness'
                              ? 'bg-yellow-50 border border-yellow-200'
                              : 'bg-blue-50 border border-blue-200'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            {feedback.type === 'strength' ? (
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                            ) : feedback.type === 'weakness' ? (
                              <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                            ) : (
                              <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5" />
                            )}
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-1">
                                <Badge variant="outline" className="text-xs">
                                  {feedback.category}
                                </Badge>
                                <span className="text-xs text-gray-500">
                                  {feedback.timestamp}
                                </span>
                              </div>
                              <p>{feedback.message}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
