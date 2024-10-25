import React, { useState } from 'react';
import { ChampionClass } from '../../../types/champion';
import { useChampions } from '../../../hooks/useChampions';
import { ChampionForm } from './ChampionForm';
import { BulkAddModal } from './BulkAddModal';
import { Plus, List, Edit2, Trash2 } from 'lucide-react';

interface ChampionsListProps {
  championClass: ChampionClass;
}

export const ChampionsList: React.FC<ChampionsListProps> = ({ championClass }) => {
  const [selectedRarity, setSelectedRarity] = useState<'6' | '7'>('6');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showBulkAdd, setShowBulkAdd] = useState(false);
  const [editingChampion, setEditingChampion] = useState<string | null>(null);
  const { champions, addChampion, updateChampion, removeChampion, getChampionsByClass } = useChampions();

  const currentChampions = getChampionsByClass(championClass, selectedRarity);

  const handleDelete = (championId: string) => {
    if (window.confirm('Are you sure you want to delete this champion?')) {
      removeChampion(championId);
    }
  };

  const handleBulkAdd = (names: string[]) => {
    names.forEach(name => {
      const rankOptions = selectedRarity === '6' 
        ? ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)']
        : ['Rank 1', 'Rank 2', 'Rank 3'];

      addChampion({
        name: name.trim(),
        class: championClass,
        starRating: selectedRarity,
        rankOptions
      });
    });
    setShowBulkAdd(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">{championClass} Champions</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setShowBulkAdd(true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <List className="w-5 h-5 mr-2" />
            Bulk Add
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Champion
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setSelectedRarity('6')}
          className={`px-4 py-2 rounded-md ${
            selectedRarity === '6'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          6★ Champions
        </button>
        <button
          onClick={() => setSelectedRarity('7')}
          className={`px-4 py-2 rounded-md ${
            selectedRarity === '7'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          7★ Champions
        </button>
      </div>

      <div className="grid gap-4">
        {currentChampions.map((champion) => (
          <div
            key={champion.id}
            className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
          >
            <div className="flex items-center gap-4">
              {champion.portraitImage && (
                <img
                  src={champion.portraitImage}
                  alt={champion.name}
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div>
                <h3 className="text-lg font-semibold">{champion.name}</h3>
                <div className="flex gap-2 mt-1">
                  {champion.rankOptions.map((rank) => (
                    <span
                      key={rank}
                      className="px-2 py-1 text-xs bg-gray-700 rounded"
                    >
                      {rank}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditingChampion(champion.id)}
                className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                title="Edit champion"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDelete(champion.id)}
                className="p-2 text-red-400 hover:text-red-300 transition-colors"
                title="Delete champion"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddForm && (
        <ChampionForm
          championClass={championClass}
          starRating={selectedRarity}
          onSubmit={(name, rankOptions, imageData) => {
            addChampion({
              name,
              class: championClass,
              starRating: selectedRarity,
              rankOptions,
              fullImage: imageData
            });
            setShowAddForm(false);
          }}
          onClose={() => setShowAddForm(false)}
        />
      )}

      {editingChampion && (
        <ChampionForm
          championClass={championClass}
          starRating={selectedRarity}
          champion={currentChampions.find(c => c.id === editingChampion)}
          onSubmit={(name, rankOptions, imageData) => {
            updateChampion(editingChampion, {
              name,
              class: championClass,
              starRating: selectedRarity,
              rankOptions,
              fullImage: imageData
            });
            setEditingChampion(null);
          }}
          onClose={() => setEditingChampion(null)}
        />
      )}

      {showBulkAdd && (
        <BulkAddModal
          onSubmit={handleBulkAdd}
          onClose={() => setShowBulkAdd(false)}
        />
      )}
    </div>
  );
};