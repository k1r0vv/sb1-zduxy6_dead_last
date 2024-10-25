import React from 'react';
import { NodeType, NodeStatus } from './types';
import { Crown, Lock, Check } from 'lucide-react';

interface MapNodeProps {
  id: string;
  type: NodeType;
  status: NodeStatus;
  tactic?: string;
}

export const MapNode: React.FC<MapNodeProps> = ({ id, type, status, tactic }) => {
  const baseClasses = "flex items-center justify-center rounded-full border-2 transition-all duration-300 relative group";
  const sizeClasses = type === 'boss' ? 'w-20 h-20' : 'w-16 h-16';
  
  const statusClasses = {
    locked: 'border-gray-500 bg-gray-900/50 cursor-not-allowed',
    available: 'border-blue-500 bg-blue-900/50 hover:bg-blue-800 hover:border-blue-400 cursor-pointer',
    completed: 'border-green-500 bg-green-900/50 cursor-default'
  };

  const typeClasses = {
    normal: '',
    boss: 'border-red-500 bg-red-900/50 hover:bg-red-800 hover:border-red-400',
    checkpoint: 'border-yellow-500 bg-yellow-900/50 hover:bg-yellow-800 hover:border-yellow-400'
  };

  const getNodeContent = () => {
    if (status === 'locked') return <Lock className="w-6 h-6 text-gray-400" />;
    if (status === 'completed') return <Check className="w-6 h-6 text-green-400" />;
    if (type === 'boss') return <Crown className="w-8 h-8 text-yellow-400" />;
    return <span className="font-bold text-lg text-white">{id}</span>;
  };

  return (
    <div 
      className={`${baseClasses} ${sizeClasses} ${statusClasses[status]} ${typeClasses[type]}`}
      role="button"
      tabIndex={status === 'available' ? 0 : -1}
    >
      {getNodeContent()}
      {tactic && (
        <div className="absolute z-50 invisible group-hover:visible bg-gray-800 text-white p-4 rounded-lg shadow-lg w-64 -top-2 left-full ml-4">
          <p className="text-sm">{tactic}</p>
        </div>
      )}
      {tactic && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full" />
      )}
    </div>
  );
};