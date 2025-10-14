import { useState } from 'react';
import { SignIn } from './components/sign-in';
import { ManagerDashboard } from './components/manager-dashboard';
import { EmployeeDashboard } from './components/employee-dashboard';
import { TrainingSimulation } from './components/training-simulation';
import { InteractionLog } from './components/interaction-log';
import { StakeholderMap } from './components/stakeholder-map';
import { EmployeeProfile } from './components/employee-profile';

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'manager' | 'employee';
  avatar?: string;
};

export type AppView = 
  | 'signin'
  | 'manager-dashboard'
  | 'employee-dashboard'
  | 'training-simulation'
  | 'interaction-log'
  | 'stakeholder-map'
  | 'employee-profile';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('signin');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [trainingContext, setTrainingContext] = useState<any>(null);

  const handleSignIn = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'manager') {
      setCurrentView('manager-dashboard');
    } else {
      setCurrentView('employee-dashboard');
    }
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    setCurrentView('signin');
    setSelectedEmployeeId(null);
    setSelectedClientId(null);
  };

  const handleStartTraining = (context?: any) => {
    setTrainingContext(context);
    setCurrentView('training-simulation');
  };

  const handleViewInteractionLog = (clientId?: string) => {
    setSelectedClientId(clientId || null);
    setCurrentView('interaction-log');
  };

  const handleViewStakeholderMap = (clientId?: string) => {
    setSelectedClientId(clientId || null);
    setCurrentView('stakeholder-map');
  };

  const handleViewEmployeeProfile = (employeeId: string) => {
    setSelectedEmployeeId(employeeId);
    setCurrentView('employee-profile');
  };

  const handleBackToDashboard = () => {
    if (currentUser?.role === 'manager') {
      setCurrentView('manager-dashboard');
    } else {
      setCurrentView('employee-dashboard');
    }
  };

  return (
    <div className="min-h-screen">
      {currentView === 'signin' && (
        <SignIn onSignIn={handleSignIn} />
      )}

      {currentView === 'manager-dashboard' && currentUser && (
        <ManagerDashboard
          user={currentUser}
          onSignOut={handleSignOut}
          onViewEmployeeProfile={handleViewEmployeeProfile}
          onViewInteractionLog={handleViewInteractionLog}
        />
      )}

      {currentView === 'employee-dashboard' && currentUser && (
        <EmployeeDashboard
          user={currentUser}
          onSignOut={handleSignOut}
          onStartTraining={handleStartTraining}
          onViewInteractionLog={handleViewInteractionLog}
          onViewStakeholderMap={handleViewStakeholderMap}
        />
      )}

      {currentView === 'training-simulation' && currentUser && (
        <TrainingSimulation
          user={currentUser}
          context={trainingContext}
          onBack={handleBackToDashboard}
        />
      )}

      {currentView === 'interaction-log' && currentUser && (
        <InteractionLog
          user={currentUser}
          clientId={selectedClientId}
          onBack={handleBackToDashboard}
          onViewStakeholderMap={handleViewStakeholderMap}
        />
      )}

      {currentView === 'stakeholder-map' && currentUser && (
        <StakeholderMap
          user={currentUser}
          clientId={selectedClientId}
          onBack={handleBackToDashboard}
        />
      )}

      {currentView === 'employee-profile' && currentUser && selectedEmployeeId && (
        <EmployeeProfile
          employeeId={selectedEmployeeId}
          onBack={handleBackToDashboard}
          onAssignTraining={handleStartTraining}
        />
      )}
    </div>
  );
}