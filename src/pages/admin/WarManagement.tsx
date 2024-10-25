import React from 'react';
import { ArrowLeft, Edit2 } from 'lucide-react';
import { useAdminNavigation } from '../../hooks/useAdminNavigation';
import { useWarManagement, War } from '../../hooks/useWarManagement';
import { WarDetails } from '../../components/admin/WarManagement/WarDetails';

export const WarManagement: React.FC = () => {
  const { navigateToDashboard } = useAdminNavigation();
  const { wars, currentWarId, setCurrentWar, updateWarNotes } = useWarManagement();

  const handleNotesUpdate = (warId: number, notes: string) => {
    updateWarNotes(warId, notes);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {currentWarId ? (
        <WarDetails
          war={wars.find((w) => w.id === currentWarId)!}
          onBack={() => setCurrentWar(null)}
        />
      ) : (
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
            <h1 className="text-3xl font-bold mb-8">War Management</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wars.map((war) => (
                <div
                  key={war.id}
                  className="bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">{war.name}</h3>
                    <button
                      onClick={() => setCurrentWar(war.id)}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                  </div>
                  <textarea
                    value={war.notes}
                    onChange={(e) => handleNotesUpdate(war.id, e.target.value)}
                    placeholder="Add notes (e.g., opponent name)"
                    className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-sm text-gray-300 resize-none"
                    rows={2}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};