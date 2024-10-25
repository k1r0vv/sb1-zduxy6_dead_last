import React from 'react';
import { ChampionClass } from '../../../types/champion';
import { getChampionCount } from '../../../utils/championData';

interface ChampionClassCardProps {
  championClass: ChampionClass;
  icon: string;
  onClick: () => void;
}

export const ChampionClassCard: React.FC<ChampionClassCardProps> = ({
  championClass,
  icon,
  onClick,
}) => {
  const sixStarCount = getChampionCount(championClass, '6');
  const sevenStarCount = getChampionCount(championClass, '7');

  return (
    <button
      onClick={onClick}
      className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors w-full text-left"
    >
      <div className="flex items-center gap-4">
        <img src={icon} alt={championClass} className="w-12 h-12" />
        <div>
          <h3 className="text-xl font-semibold text-white">{championClass}</h3>
          <p className="text-gray-400">
            {sixStarCount + sevenStarCount} Total Champions
          </p>
        </div>
      </div>
    </button>
  );
};