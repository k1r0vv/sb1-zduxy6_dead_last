import React, { useState } from 'react';
import { ChampionClass, StarRating } from '../../types/champion';
import { ChampionList } from './ChampionList';
import { getAllChampionClasses, getChampionCount } from '../../utils/championData';

export const ChampionManager: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<ChampionClass | null>(null);
  const [selectedStar, setSelectedStar] = useState<StarRating>('6');

  const championClasses = getAllChampionClasses();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Champions Management</h2>
      
      <div className="grid grid-cols-3 gap-6">
        {championClasses.map((championClass) => (
          <button
            key={championClass}
            onClick={() => setSelectedClass(championClass)}
            className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700"
          >
            <h3 className="text-xl font-semibold">{championClass}</h3>
            <p className="text-gray-400">
              {getChampionCount(championClass, '6')} 6★ Champions
            </p>
            <p className="text-gray-400">
              {getChampionCount(championClass, '7')} 7★ Champions
            </p>
          </button>
        ))}
      </div>

      {selectedClass && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
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
            <button className="px-4 py-2 bg-green-600 rounded hover:bg-green-700">
              Add Champion
            </button>
          </div>
          
          <ChampionList 
            championClass={selectedClass} 
            starRating={selectedStar} 
          />
        </div>
      )}
    </div>
  );
};