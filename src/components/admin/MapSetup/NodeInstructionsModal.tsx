import React, { useState } from 'react';
import { X } from 'lucide-react';

interface NodeInstructionsModalProps {
  nodeId: string;
  tactics: string;
  onSave: (tactics: string) => void;
  onClose: () => void;
}

export const NodeInstructionsModal: React.FC<NodeInstructionsModalProps> = ({
  nodeId,
  tactics,
  onSave,
  onClose
}) => {
  const [currentTactics, setCurrentTactics] = useState(tactics);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(currentTactics);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">
            {nodeId === 'boss' ? 'Boss Node' : `Node ${nodeId}`} Tactics
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={currentTactics}
            onChange={(e) => setCurrentTactics(e.target.value)}
            className="w-full h-64 bg-gray-700 border border-gray-600 rounded-md p-4 text-white resize-none"
            placeholder="Enter node-specific tactics and instructions..."
          />

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-600 rounded-md text-gray-200 hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Tactics
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};