import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { AllianceMember } from '../../../hooks/useAlliance';

interface NodeAssignmentModalProps {
  type: 'defense' | 'attack';
  nodeId: string;
  currentAssignment?: string;
  members: AllianceMember[];
  onAssign: (value: string) => void;
  onClose: () => void;
}

export const NodeAssignmentModal: React.FC<NodeAssignmentModalProps> = ({
  type,
  nodeId,
  currentAssignment,
  members,
  onAssign,
  onClose,
}) => {
  const [search, setSearch] = useState('');

  // Mock champion list for defense assignments
  const champions = [
    'Iron Man',
    'Spider-Man',
    'Captain America',
    'Thor',
    'Hulk',
    'Black Widow',
    'Hawkeye',
  ];

  const items = type === 'defense' 
    ? champions.filter(c => c.toLowerCase().includes(search.toLowerCase()))
    : members.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">
            {type === 'defense' ? 'Assign Champion' : 'Assign Player'} to Node {nodeId}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 pl-10 pr-4 text-white placeholder-gray-400"
            placeholder={`Search ${type === 'defense' ? 'champions' : 'players'}...`}
          />
        </div>

        <div className="max-h-96 overflow-y-auto">
          {type === 'defense' ? (
            // Champions list for defense
            champions.map((champion) => (
              <button
                key={champion}
                onClick={() => onAssign(champion)}
                className={`w-full text-left px-4 py-2 hover:bg-gray-700 rounded-md ${
                  currentAssignment === champion ? 'bg-blue-600' : ''
                }`}
              >
                {champion}
              </button>
            ))
          ) : (
            // Players list for attack
            members.map((member) => (
              <button
                key={member.id}
                onClick={() => onAssign(member.name)}
                className={`w-full text-left px-4 py-2 hover:bg-gray-700 rounded-md ${
                  currentAssignment === member.name ? 'bg-blue-600' : ''
                }`}
              >
                {member.name}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};