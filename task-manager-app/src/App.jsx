import React, { useState } from 'react';
import Login from './components/Login';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import TasksPage from './components/TasksPage';
import SettingsPage from './components/SettingsPage';
import { mockTasks } from './data/mockData';
import { AuthProvider } from './auth/AuthContext';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { PERMISSIONS } from './auth/roles';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('login');
  const [tasks, setTasks] = useState(mockTasks);
  const [userSettings, setUserSettings] = useState({
    theme: 'light',
    notifications: true,
    emailUpdates: false
  });

  if (!currentUser) {
    return (
      <Login 
        setCurrentUser={setCurrentUser} 
        setCurrentPage={setCurrentPage} 
      />
    );
  }

  return (
    <AuthProvider userRole={currentUser.role}>
      <div className="min-h-screen bg-gray-50">
        <Navigation 
          currentUser={currentUser}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setCurrentUser={setCurrentUser}
        />
        {currentPage === 'dashboard' && (
            <Dashboard 
              currentUser={currentUser} 
              tasks={tasks} 
            />
        )}
        {/* Added ProtectedRoute to handle task management permissions in TasksPage */}
        {/* Later can do for rest of tabs if needed */}
        {currentPage === 'tasks' && (
          <ProtectedRoute 
            requiredPermissions={[
              PERMISSIONS.CREATE_TASK,
              PERMISSIONS.EDIT_TASK,
              PERMISSIONS.DELETE_TASK,
              PERMISSIONS.ASSIGN_TASK,
            ]}
          >
            <TasksPage 
              tasks={tasks} 
              setTasks={setTasks} 
            />
          </ProtectedRoute>
        )}
        {currentPage === 'settings' && (
            <SettingsPage 
              currentUser={currentUser}
              userSettings={userSettings}
              setUserSettings={setUserSettings}
            />
        )}
      </div>
    </AuthProvider>
  );
};

export default App;