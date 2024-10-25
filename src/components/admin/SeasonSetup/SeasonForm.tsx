import React, { useState } from 'react';
import { Calendar, Users, Map, Clock } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';

interface SeasonFormProps {
  onSubmit: (data: SeasonFormData) => void;
  onCancel: () => void;
}

export interface SeasonFormData {
  seasonName: string;
  startDate: string;
  endDate: string;
  mapLayout: string;
  timePerNode: number;
  battlegrounds: {
    bg1: string[];
    bg2: string[];
    bg3: string[];
  };
}

export const SeasonForm: React.FC<SeasonFormProps> = ({ onSubmit, onCancel }) => {
  const { users } = useAuth();
  const [formData, setFormData] = useState<SeasonFormData>({
    seasonName: '',
    startDate: '',
    endDate: '',
    mapLayout: 'standard',
    timePerNode: 24,
    battlegrounds: {
      bg1: [],
      bg2: [],
      bg3: []
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlayerAssignment = (userId: string, battleground: 'bg1' | 'bg2' | 'bg3') => {
    setFormData(prev => {
      // Remove user from all battlegrounds first
      const newBattlegrounds = {
        bg1: prev.battlegrounds.bg1.filter(id => id !== userId),
        bg2: prev.battlegrounds.bg2.filter(id => id !== userId),
        bg3: prev.battlegrounds.bg3.filter(id => id !== userId),
      };

      // Add user to selected battleground
      newBattlegrounds[battleground] = [...newBattlegrounds[battleground], userId];

      return {
        ...prev,
        battlegrounds: newBattlegrounds
      };
    });
  };

  const getBattlegroundForPlayer = (userId: string): string => {
    if (formData.battlegrounds.bg1.includes(userId)) return 'bg1';
    if (formData.battlegrounds.bg2.includes(userId)) return 'bg2';
    if (formData.battlegrounds.bg3.includes(userId)) return 'bg3';
    return '';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-200">Season Name</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="text"
              name="seasonName"
              value={formData.seasonName}
              onChange={handleChange}
              className="block w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Season 1 2024"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-200">Start Date</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="block w-full bg-gray-800 border border-gray-600 rounded-md py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200">End Date</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="block w-full bg-gray-800 border border-gray-600 rounded-md py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200">Time Per Node (hours)</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              name="timePerNode"
              value={formData.timePerNode}
              onChange={handleChange}
              min="1"
              max="72"
              className="block w-full bg-gray-800 border border-gray-600 rounded-md py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200">Map Layout</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Map className="h-5 w-5 text-gray-400" />
            </div>
            <select
              name="mapLayout"
              value={formData.mapLayout}
              onChange={handleChange}
              className="block w-full bg-gray-800 border border-gray-600 rounded-md py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="standard">Standard Layout</option>
              <option value="advanced">Advanced Layout</option>
              <option value="expert">Expert Layout</option>
            </select>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-200 mb-4">Battleground Assignments</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['bg1', 'bg2', 'bg3'].map((bg, index) => (
              <div key={bg} className="bg-gray-700 p-4 rounded-lg">
                <h4 className="text-md font-medium mb-3">Battleground {index + 1}</h4>
                <div className="space-y-2">
                  {users.map(user => (
                    <label key={user.id} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`user-${user.id}`}
                        checked={getBattlegroundForPlayer(user.id) === bg}
                        onChange={() => handlePlayerAssignment(user.id, bg as 'bg1' | 'bg2' | 'bg3')}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span>{user.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {Object.values(formData.battlegrounds).reduce((acc, curr) => acc + curr.length, 0) !== 30 && (
            <p className="text-yellow-500 mt-2">
              Please assign exactly 10 players to each battleground (Total: 30 players)
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="px-4 py-2 border border-gray-600 rounded-md text-gray-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={Object.values(formData.battlegrounds).reduce((acc, curr) => acc + curr.length, 0) !== 30}
        >
          Create Season
        </button>
      </div>
    </form>
  );
};