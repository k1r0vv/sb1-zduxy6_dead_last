import React, { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { useAdminNavigation } from '../../hooks/useAdminNavigation';
import { useMapSetup } from '../../hooks/useMapSetup';
import { NodeInstructionsModal } from '../../components/admin/MapSetup/NodeInstructionsModal';
import { PreviewMap } from '../../components/admin/MapSetup/PreviewMap';

export const MapSetup: React.FC = () => {
  const { navigateToDashboard } = useAdminNavigation();
  const { 
    staticInstructions, 
    setStaticInstructions,
    nodeTactics,
    updateNodeTactic,
    saveMapSetup 
  } = useMapSetup();

  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(nodeId);
    setShowModal(true);
  };

  const handleSave = async () => {
    await saveMapSetup();
    navigateToDashboard();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <button
            onClick={navigateToDashboard}
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          <button
            onClick={handleSave}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Map Setup
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-2">Map Setup</h1>
          <p className="text-gray-400 mb-8">Configure node instructions and tactics for the alliance war map.</p>

          <div className="space-y-8">
            <div className="bg-gray-700 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Alliance War Tactic Node Info</h2>
              <textarea
                value={staticInstructions}
                onChange={(e) => setStaticInstructions(e.target.value)}
                className="w-full h-32 bg-gray-800 border border-gray-600 rounded-md p-4 text-white resize-none"
                placeholder="Enter alliance war tactic node information..."
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Map Preview</h2>
              <p className="text-gray-400 mb-4">Click on any node to edit its specific tactics. Hover over nodes to view saved tactics.</p>
              <div className="scale-110 transform origin-top-left">
                <PreviewMap onNodeClick={handleNodeClick} nodeTactics={nodeTactics} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && selectedNode && (
        <NodeInstructionsModal
          nodeId={selectedNode}
          tactics={nodeTactics[selectedNode] || ''}
          onSave={(tactics) => {
            updateNodeTactic(selectedNode, tactics);
            setShowModal(false);
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};