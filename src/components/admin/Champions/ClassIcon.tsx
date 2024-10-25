import React from 'react';
import { ChampionClass } from '../../../hooks/useChampions';

interface ClassIconProps {
  championClass: ChampionClass;
  className?: string;
}

export const ClassIcon: React.FC<ClassIconProps> = ({ championClass, className = "w-6 h-6" }) => {
  const getIconPath = () => {
    switch (championClass) {
      case 'Cosmic':
        return (
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
            fill="currentColor"
          />
        );
      case 'Mutant':
        return (
          <path
            d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"
            fill="currentColor"
          />
        );
      case 'Mystic':
        return (
          <path
            d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
            fill="currentColor"
          />
        );
      case 'Science':
        return (
          <path
            d="M7 19c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H7zm5-18C6.48 1 2 5.48 2 11c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10z"
            fill="currentColor"
          />
        );
      case 'Skill':
        return (
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
            fill="currentColor"
          />
        );
      case 'Tech':
        return (
          <path
            d="M22 9V7h-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2v-2h-2V9h2zm-4 10H4V5h14v14zM6 13h5v4H6zm6-6h4v3h-4zM6 7h5v5H6zm6 4h4v6h-4z"
            fill="currentColor"
          />
        );
      default:
        return null;
    }
  };

  const getIconColor = () => {
    switch (championClass) {
      case 'Cosmic':
        return 'text-blue-400';
      case 'Mutant':
        return 'text-yellow-400';
      case 'Mystic':
        return 'text-purple-400';
      case 'Science':
        return 'text-green-400';
      case 'Skill':
        return 'text-red-400';
      case 'Tech':
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <svg
      viewBox="0 0 24 24"
      className={`${className} ${getIconColor()}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {getIconPath()}
    </svg>
  );
};