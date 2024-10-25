import React from 'react';
import { LoginPage } from './pages/LoginPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { UserDashboard } from './pages/UserDashboard';
import { useAuth } from './hooks/useAuth';
import { LogoutButton } from './components/common/LogoutButton';

const App: React.FC = () => {
  const { isAuthenticated, currentUser } = useAuth();

  return (
    <>
      {!isAuthenticated ? (
        <LoginPage />
      ) : (
        <>
          <LogoutButton />
          {currentUser?.role === 'admin' ? (
            <AdminDashboard />
          ) : (
            <UserDashboard />
          )}
        </>
      )}
    </>
  );
};

export default App;