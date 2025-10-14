import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { User } from '../App';
import { Users, UserCircle } from 'lucide-react';

type SignInProps = {
  onSignIn: (user: User) => void;
};

export function SignIn({ onSignIn }: SignInProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Mock users for demo
  const mockUsers = {
    'manager@company.com': {
      id: '1',
      name: 'Sarah Johnson',
      email: 'manager@company.com',
      role: 'manager' as const,
    },
    'employee@company.com': {
      id: '2',
      name: 'Alex Chen',
      email: 'employee@company.com',
      role: 'employee' as const,
    },
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const user = mockUsers[email as keyof typeof mockUsers];
    if (user) {
      onSignIn(user);
    }
  };

  const handleQuickSignIn = (role: 'manager' | 'employee') => {
    const email = role === 'manager' ? 'manager@company.com' : 'employee@company.com';
    const user = mockUsers[email];
    onSignIn(user);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Organic background shapes */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-sage-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-moss-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-earth-200/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-5xl tracking-tight">NegotiateAI</h1>
          <p className="text-sage-700 text-lg">
            Master negotiation skills through mindful, AI-powered practice
          </p>
        </div>

        <Card className="glass-card border-sage-200/50 shadow-xl">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription className="text-sage-600">
              Enter your credentials to continue your journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-sage-200/50">
              <p className="text-sm text-sage-600 mb-4 text-center">Quick Demo Access</p>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleQuickSignIn('manager')}
                  className="flex items-center gap-2 border-sage-300 hover:bg-sage-100/50 hover:border-sage-400"
                >
                  <Users className="h-4 w-4" />
                  Manager
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleQuickSignIn('employee')}
                  className="flex items-center gap-2 border-sage-300 hover:bg-sage-100/50 hover:border-sage-400"
                >
                  <UserCircle className="h-4 w-4" />
                  Employee
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-sage-500">
          Demo accounts: manager@company.com / employee@company.com
        </div>
      </div>
    </div>
  );
}
