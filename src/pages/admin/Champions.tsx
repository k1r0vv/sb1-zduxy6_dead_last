import React, { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { useAdminNavigation } from '../../hooks/useAdminNavigation';
import { ChampionClass } from '../../types/champion';
import { useChampions } from '../../hooks/useChampions';
import { ChampionsList } from '../../components/admin/Champions/ChampionsList';

export const Champions = () => {
  const [selectedClass, setSelectedClass] = useState<ChampionClass | null>(null);
  const { navigateToDashboard } = useAdminNavigation();
  const { getChampionsByClass } = useChampions();

  const championClasses: { name: ChampionClass; icon: string }[] = [
    { name: 'Cosmic', icon: '🌌' },
    { name: 'Mutant', icon: '🧬' },
    { name: 'Mystic', icon: '✨' },
    { name: 'Science', icon: '🧪' },
    { name: 'Skill', icon: '🎯' },
    { name: 'Tech', icon: '⚙️' },
  ];

  if (selectedClass) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => setSelectedClass(null)}
            className="flex items-center text-gray-400 hover:text-white mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Classes
          </button>
          
          <ChampionsList championClass={selectedClass} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={navigateToDashboard}
            className="flex items-center text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-8">Champions Management</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {championClasses.map((cls) => {
            const sixStarChamps = getChampionsByClass(cls.name, '6');
            const sevenStarChamps = getChampionsByClass(cls.name, '7');
            
            return (
              <button
                key={cls.name}
                onClick={() => setSelectedClass(cls.name)}
                className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-left"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{cls.icon}</span>
                  <div>
                    <h2 className="text-xl font-semibold">{cls.name}</h2>
                    <p className="text-gray-400">
                      {sixStarChamps.length} 6★ | {sevenStarChamps.length} 7★
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};