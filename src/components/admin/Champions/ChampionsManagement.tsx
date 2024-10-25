import React, { useState } from 'react';
import { ChampionClass } from '../../../types/champion';
import { ChampionClassCard } from './ChampionClassCard';
import { ChampionList } from './ChampionList';
import { classIcons } from '../../../utils/classIcons';

export const ChampionsManagement: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<ChampionClass | null>(null);

  const championClasses: ChampionClass[] = ['Cosmic', 'Mutant', 'Mystic', 'Science', 'Skill', 'Tech'];

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="flex items-center mb-6">
        {selectedClass && (
          <button 
            onClick={() => setSelectedClass(null)}
            className="text-gray-400 hover:text-white flex items-center gap-2 mb-4"
          >
            <span>← Back to Classes</span>
          </button>
        )}
      </div>

      {!selectedClass ? (
        <div>
          <h1 className="text-3xl font-bold text-white mb-8">Champions Management</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {championClasses.map((championClass) => (
              <ChampionClassCard
                key={championClass}
                championClass={championClass}
                icon={classIcons[championClass]}
                onClick={() => setSelectedClass(championClass)}
              />
            ))}
          </div>
        </div>
      ) : (
        <ChampionList championClass={selectedClass} />
      )}
    </div>
  );
};