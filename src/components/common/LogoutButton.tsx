import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const LogoutButton: React.FC = () => {
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      className="fixed top-4 right-4 flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 z-50"
    >
      <LogOut className="w-5 h-5 mr-2" />
      Logout
    </button>
  );
};