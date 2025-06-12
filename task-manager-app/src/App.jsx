import React, { useState } from 'react';
import Login from './components/Login';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import TasksPage from './components/TasksPage';
import SettingsPage from './components/SettingsPage';
import { mockTasks } from './data/mockData';

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
      {currentPage === 'tasks' && (
        <TasksPage 
          tasks={tasks} 
          setTasks={setTasks} 
        />
      )}
      {currentPage === 'settings' && (
        <SettingsPage 
          currentUser={currentUser}
          userSettings={userSettings}
          setUserSettings={setUserSettings}
        />
      )}
    </div>
  );
};

export default App;