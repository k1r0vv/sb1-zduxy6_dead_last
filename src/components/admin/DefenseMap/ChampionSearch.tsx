import React, { useState } from 'react';
import { X, Search } from 'lucide-react';

interface ChampionSearchProps {
  onSelect: (champion: string) => void;
  onClose: () => void;
}

export const ChampionSearch: React.FC<ChampionSearchProps> = ({
  onSelect,
  onClose,
}) => {
  const [search, setSearch] = useState('');

  // Mock champion list - replace with actual data
  const champions = [
    'Iron Man',
    'Spider-Man',
    'Captain America',
    'Thor',
    'Hulk',
    'Black Widow',
    'Hawkeye',
  ].filter((champion) =>
    champion.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Select Champion</h3>
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
            placeholder="Search champions..."
          />
        </div>

        <div className="max-h-96 overflow-y-auto">
          {champions.map((champion) => (
            <button
              key={champion}
              onClick={() => onSelect(champion)}
              className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded-md"
            >
              {champion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};