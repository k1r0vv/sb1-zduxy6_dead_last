import React, { useState } from 'react';
import { ArrowLeft, Shield, Swords } from 'lucide-react';
import { War, useWarManagement } from '../../../hooks/useWarManagement';
import { GameMap } from '../../GameMap';
import { NodeAssignmentModal } from './NodeAssignmentModal';
import { useAlliance } from '../../../hooks/useAlliance';

interface WarDetailsProps {
  war: War;
  onBack: () => void;
}

export const WarDetails: React.FC<WarDetailsProps> = ({ war, onBack }) => {
  const [activeTab, setActiveTab] = useState<'defense' | 'attack'>('defense');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const { updateDefenseAssignment, updateAttackAssignment } = useWarManagement();
  const { members } = useAlliance();

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(nodeId);
  };

  const handleAssignment = (value: string) => {
    if (selectedNode) {
      if (activeTab === 'defense') {
        updateDefenseAssignment(war.id, selectedNode, value);
      } else {
        updateAttackAssignment(war.id, selectedNode, value);
      }
      setSelectedNode(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to War List
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{war.name}</h1>
            {war.notes && (
              <p className="text-gray-400">Notes: {war.notes}</p>
            )}
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('defense')}
              className={`flex items-center px-4 py-2 rounded-md ${
                activeTab === 'defense'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Shield className="w-5 h-5 mr-2" />
              Defense Map
            </button>
            <button
              onClick={() => setActiveTab('attack')}
              className={`flex items-center px-4 py-2 rounded-md ${
                activeTab === 'attack'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Swords className="w-5 h-5 mr-2" />
              Attack Map
            </button>
          </div>
        </div>

        <div className="relative">
          <GameMap 
            onNodeClick={handleNodeClick}
            assignments={activeTab === 'defense' ? war.defenseAssignments : war.attackAssignments}
          />
          
          {selectedNode && (
            <NodeAssignmentModal
              type={activeTab}
              nodeId={selectedNode}
              currentAssignment={
                activeTab === 'defense'
                  ? war.defenseAssignments[selectedNode]
                  : war.attackAssignments[selectedNode]
              }
              members={members}
              onAssign={handleAssignment}
              onClose={() => setSelectedNode(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};