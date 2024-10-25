import React, { useState } from 'react';
import { ArrowLeft, Trash2, Plus, Copy } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useAdminNavigation } from '../../hooks/useAdminNavigation';

export const ManageUsers: React.FC = () => {
  const { users, addUser, removeUser, currentUser } = useAuth();
  const { navigateToDashboard } = useAdminNavigation();
  const [newUserName, setNewUserName] = useState('');
  const [newUserLineId, setNewUserLineId] = useState('');
  const [error, setError] = useState('');

  const handleAddUser = () => {
    try {
      if (!newUserName.trim() || !newUserLineId.trim()) {
        setError('Name and Line ID are required');
        return;
      }

      // Check for duplicate names
      if (users.some(u => u.name.toLowerCase() === newUserName.trim().toLowerCase())) {
        setError('A user with this name already exists');
        return;
      }

      // Check for duplicate Line IDs
      if (users.some(u => u.lineId.toLowerCase() === newUserLineId.trim().toLowerCase())) {
        setError('A user with this Line ID already exists');
        return;
      }

      addUser(newUserName.trim(), newUserLineId.trim());
      setNewUserName('');
      setNewUserLineId('');
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add user');
    }
  };

  const handleRemoveUser = (userId: string) => {
    if (userId === currentUser?.id) {
      setError('You cannot remove yourself');
      return;
    }

    if (window.confirm('Are you sure you want to remove this user?')) {
      removeUser(userId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={navigateToDashboard}
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-2">Manage Users</h1>
          <p className="text-gray-400 mb-8">Add or remove users and manage their access.</p>

          <div className="mb-8">
            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                placeholder="Enter user name"
                className="bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                value={newUserLineId}
                onChange={(e) => setNewUserLineId(e.target.value)}
                placeholder="Enter Line ID"
                className="bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleAddUser}
                disabled={!newUserName.trim() || !newUserLineId.trim()}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add User
              </button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-900/50 border border-red-500 rounded">
                <p className="text-red-200">{error}</p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Current Users</h2>
            {users.length === 0 ? (
              <p className="text-gray-400">No users added yet.</p>
            ) : (
              <div className="grid gap-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between bg-gray-700 p-4 rounded-md"
                  >
                    <div>
                      <span className="text-lg block">{user.name}</span>
                      <span className="text-sm text-gray-400">Line ID: {user.lineId}</span>
                    </div>
                    {user.id !== currentUser?.id && (
                      <button
                        onClick={() => handleRemoveUser(user.id)}
                        className="text-red-400 hover:text-red-300 p-2"
                        title="Remove user"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};