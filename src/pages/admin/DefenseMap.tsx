import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useAdminNavigation } from '../../hooks/useAdminNavigation';
import { GameMap } from '../../components/GameMap';
import { ChampionSearch } from '../../components/admin/DefenseMap/ChampionSearch';

export const DefenseMap: React.FC = () => {
  const { navigateToDashboard } = useAdminNavigation();
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <button
            onClick={navigateToDashboard}
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-2">Defense Map</h1>
          <p className="text-gray-400 mb-8">
            Click on any node to assign a champion for defense.
          </p>

          <div className="relative">
            <GameMap onNodeClick={(nodeId) => setSelectedNode(nodeId)} />
            
            {selectedNode && (
              <ChampionSearch
                onSelect={(champion) => {
                  // Handle champion selection
                  setSelectedNode(null);
                }}
                onClose={() => setSelectedNode(null)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};