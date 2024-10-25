import React, { useState } from 'react';
import { useWarManagement } from '../../hooks/useWarManagement';
import { WarDetails } from '../../components/user/WarManagement/WarDetails';
import { Shield, Swords } from 'lucide-react';

export const WarManagement: React.FC = () => {
  const { wars, currentWarId, setCurrentWar, updateWarNotes } = useWarManagement();
  const [selectedWar, setSelectedWar] = useState<number | null>(null);

  const handleNotesUpdate = (warId: number, notes: string) => {
    updateWarNotes(warId, notes);
  };

  if (selectedWar) {
    const war = wars.find(w => w.id === selectedWar);
    if (!war) return null;
    return <WarDetails war={war} onBack={() => setSelectedWar(null)} />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gray-800 rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-8">War Management</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wars.map((war) => (
            <div
              key={war.id}
              onClick={() => setSelectedWar(war.id)}
              className="bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-4">{war.name}</h3>
              {war.notes && (
                <p className="text-gray-300 text-sm mb-4">{war.notes}</p>
              )}
              <div className="flex space-x-4">
                <div className="flex items-center text-sm text-gray-400">
                  <Shield className="w-4 h-4 mr-1" />
                  {Object.keys(war.defenseAssignments).length} defenders
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Swords className="w-4 h-4 mr-1" />
                  {Object.keys(war.attackAssignments).length} attackers
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};