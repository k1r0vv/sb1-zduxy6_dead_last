import React, { useState } from 'react';
import { X, Shield } from 'lucide-react';
import { useAlliance } from '../../hooks/useAlliance';
import { useAuth } from '../../hooks/useAuth';

interface AddMemberModalProps {
  onClose: () => void;
}

export const AddMemberModal: React.FC<AddMemberModalProps> = ({ onClose }) => {
  const { currentUser } = useAuth();
  const { addMember, getTotalMembers } = useAlliance();
  const [name, setName] = useState('');
  const [lineId, setLineId] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState<string>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (getTotalMembers() >= 30) {
        throw new Error('Alliance cannot exceed 30 members');
      }

      const { password } = addMember({
        name: name.trim(),
        lineId: lineId.trim(),
        isAdmin,
        createdBy: currentUser?.id || ''
      });

      if (password) {
        setGeneratedPassword(password);
      } else {
        onClose();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add member');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Add Alliance Member</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {generatedPassword ? (
          <div className="space-y-4">
            <div className="bg-gray-700 p-4 rounded-md">
              <p className="text-sm text-gray-300 mb-2">
                Admin member created! Password:
              </p>
              <code className="block p-2 bg-gray-900 rounded text-green-400">
                {generatedPassword}
              </code>
              <p className="text-sm text-gray-400 mt-2">
                Make sure to save this password - it cannot be recovered later!
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Line ID
              </label>
              <input
                type="text"
                value={lineId}
                onChange={(e) => setLineId(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white"
                required
              />
            </div>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-200 flex items-center">
                <Shield className="w-4 h-4 mr-1 text-yellow-500" />
                Make this member an admin
              </span>
            </label>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-600 rounded-md text-gray-200 hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Member
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};