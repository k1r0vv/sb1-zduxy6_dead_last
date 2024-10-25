import React, { useState } from 'react';
import { Champion, ChampionClass } from '../../../types/champion';
import { getChampions, removeChampion } from '../../../utils/championData';
import { ChampionForm } from './ChampionForm';

interface ChampionListProps {
  championClass: ChampionClass;
}

export const ChampionList: React.FC<ChampionListProps> = ({ championClass }) => {
  const [selectedStar, setSelectedStar] = useState<'6' | '7'>('6');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingChampion, setEditingChampion] = useState<Champion | null>(null);
  
  const champions = getChampions(championClass);
  const currentChampions = selectedStar === '6' ? champions.sixStar : champions.sevenStar;

  const handleDelete = (championName: string) => {
    removeChampion(championClass, selectedStar, championName);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <button
            onClick={() => setSelectedStar('6')}
            className={`px-4 py-2 rounded ${
              selectedStar === '6' ? 'bg-blue-600' : 'bg-gray-700'
            }`}
          >
            6★ Champions
          </button>
          <button
            onClick={() => setSelectedStar('7')}
            className={`px-4 py-2 rounded ${
              selectedStar === '7' ? 'bg-blue-600' : 'bg-gray-700'
            }`}
          >
            7★ Champions
          </button>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
        >
          Add Champion
        </button>
      </div>

      {(showAddForm || editingChampion) && (
        <ChampionForm
          championClass={championClass}
          starRating={selectedStar}
          onClose={() => {
            setShowAddForm(false);
            setEditingChampion(null);
          }}
          champion={editingChampion}
        />
      )}

      <div className="space-y-4">
        {currentChampions.map((champion) => (
          <div 
            key={champion.name}
            className="flex justify-between items-center p-4 bg-gray-800 rounded-lg"
          >
            <div>
              <h3 className="text-lg font-semibold text-white">{champion.name}</h3>
              <div className="flex gap-2 mt-1">
                {champion.rankOptions.map((rank) => (
                  <span key={rank} className="text-sm text-gray-300">
                    {rank}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setEditingChampion(champion)}
                className="px-3 py-1 text-sm bg-blue-600 rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(champion.name)}
                className="px-3 py-1 text-sm bg-red-600 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};