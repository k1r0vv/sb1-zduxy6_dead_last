import React from 'react';

interface MapNodeProps {
  id: string;
  type?: 'normal' | 'boss';
}

export const MapNode: React.FC<MapNodeProps> = ({ id, type = 'normal' }) => {
  const baseClasses = "flex items-center justify-center w-16 h-16 rounded-full border-2 transition-all duration-300";
  const normalClasses = "border-blue-500 bg-blue-900/50 hover:bg-blue-800 hover:border-blue-400";
  const bossClasses = "border-red-500 bg-red-900/50 hover:bg-red-800 hover:border-red-400 w-20 h-20";

  return (
    <div 
      className={`${baseClasses} ${type === 'boss' ? bossClasses : normalClasses}`}
      role="button"
      tabIndex={0}
    >
      <span className="font-bold text-lg">
        {type === 'boss' ? '👑' : id}
      </span>
    </div>
  );
};