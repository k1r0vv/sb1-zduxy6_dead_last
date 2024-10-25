import React, { useState } from 'react';
import { Plus, Users, Shield, Trash2 } from 'lucide-react';
import { useAlliance, AllianceMember } from '../../hooks/useAlliance';
import { useAuth } from '../../hooks/useAuth';
import { AddMemberModal } from './AddMemberModal';
import { BattlegroundAssignment } from './BattlegroundAssignment';

export const AllianceManagement: React.FC = () => {
  const { currentUser } = useAuth();
  const { members, removeMember, getTotalMembers } = useAlliance();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAssignments, setShowAssignments] = useState(false);

  const handleRemoveMember = (member: AllianceMember) => {
    if (window.confirm(`Are you sure you want to remove ${member.name}?`)) {
      removeMember(member.id);
    }
  };

  if (showAssignments) {
    return <BattlegroundAssignment onBack={() => setShowAssignments(false)} />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gray-800 rounded-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Alliance Members</h1>
            <p className="text-gray-400">
              Total Members: {getTotalMembers()}/30
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowAssignments(true)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <Users className="w-5 h-5 mr-2" />
              Assign Battlegrounds
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              disabled={getTotalMembers() >= 30}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Member
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between bg-gray-700 p-4 rounded-md"
            >
              <div className="flex items-center space-x-4">
                {member.isAdmin && (
                  <Shield className="w-5 h-5 text-yellow-500" />
                )}
                <div>
                  <span className="text-lg block">{member.name}</span>
                  <span className="text-sm text-gray-400">
                    Line ID: {member.lineId}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {member.battleground && (
                  <span className="px-3 py-1 bg-blue-600 rounded-full text-sm">
                    BG {member.battleground}
                  </span>
                )}
                {member.id !== currentUser?.id && (
                  <button
                    onClick={() => handleRemoveMember(member)}
                    className="text-red-400 hover:text-red-300 p-2"
                    title="Remove member"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddModal && (
        <AddMemberModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
};