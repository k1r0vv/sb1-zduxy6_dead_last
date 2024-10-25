import React from 'react';
import { Champion, ChampionClass, StarRating } from '../../types/champion';
import { getChampions } from '../../utils/championData';

interface ChampionListProps {
  championClass: ChampionClass;
  starRating: StarRating;
}

export const ChampionList: React.FC<ChampionListProps> = ({ championClass, starRating }) => {
  const champions = getChampions(championClass, starRating);

  return (
    <div className="space-y-4">
      {champions.map((champion) => (
        <div 
          key={`${champion.name}-${champion.starRating}`}
          className="flex justify-between items-center p-4 bg-gray-800 rounded-lg"
        >
          <div>
            <h3 className="text-lg font-semibold text-white">{champion.name}</h3>
            <div className="flex gap-2 mt-1">
              {champion.rankOptions.map((rank) => (
                <span 
                  key={rank} 
                  className="text-sm text-gray-300"
                >
                  {rank}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm bg-blue-600 rounded hover:bg-blue-700">
              Edit
            </button>
            <button className="px-3 py-1 text-sm bg-red-600 rounded hover:bg-red-700">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};