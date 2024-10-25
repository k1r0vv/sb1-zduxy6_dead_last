import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useAlliance, AllianceMember } from '../../hooks/useAlliance';

interface BattlegroundAssignmentProps {
  onBack: () => void;
}

export const BattlegroundAssignment: React.FC<BattlegroundAssignmentProps> = ({ onBack }) => {
  const { members, updateMemberBattleground, getMembersByBattleground } = useAlliance();

  const handleAssignment = (member: AllianceMember, bg: 1 | 2 | 3) => {
    const currentInBg = getMembersByBattleground(bg).length;
    if (currentInBg < 10 || member.battleground === bg) {
      updateMemberBattleground(member.id, bg);
    }
  };

  const getBattlegroundStats = (bg: 1 | 2 | 3) => {
    const count = getMembersByBattleground(bg).length;
    return `${count}/10`;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gray-800 rounded-lg p-8">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Alliance Members
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-8">Battleground Assignments</h1>

        <div className="grid grid-cols-3 gap-8">
          {[1, 2, 3].map((bg) => (
            <div key={bg} className="bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Battleground {bg}</h2>
                <span className="px-3 py-1 bg-blue-600 rounded-full text-sm">
                  {getBattlegroundStats(bg as 1 | 2 | 3)}
                </span>
              </div>
              <div className="space-y-2">
                {members.map((member) => (
                  <label
                    key={member.id}
                    className="flex items-center space-x-2 p-2 hover:bg-gray-600 rounded cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`member-${member.id}`}
                      checked={member.battleground === bg}
                      onChange={() => handleAssignment(member, bg as 1 | 2 | 3)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span>{member.name}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};