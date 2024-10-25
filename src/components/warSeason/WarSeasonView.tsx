import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { useMapSetup } from '../../hooks/useMapSetup';
import { GameMap } from '../GameMap';

export const WarSeasonView: React.FC = () => {
  const { staticInstructions, nodeTactics } = useMapSetup();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gray-800 rounded-lg p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Current War Season</h1>
          <div className="flex space-x-6 text-gray-400">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              <span>March 15 - April 15, 2024</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              <span>24h per node</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              <span>Standard Layout</span>
            </div>
          </div>
        </div>

        {staticInstructions && (
          <div className="mb-8 bg-gray-700 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Alliance War Tactics</h2>
            <p className="text-gray-300 whitespace-pre-wrap">{staticInstructions}</p>
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold mb-4">War Map</h2>
          <p className="text-gray-400 mb-4">
            Hover over nodes to view specific tactics and instructions.
          </p>
          <div className="scale-110 transform origin-top-left">
            <GameMap />
          </div>
        </div>
      </div>
    </div>
  );
};