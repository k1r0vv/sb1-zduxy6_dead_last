import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';

export interface AllianceMember {
  id: string;
  name: string;
  lineId: string;
  isAdmin: boolean;
  password?: string;
  battleground?: 1 | 2 | 3;
  createdBy: string;
}

interface AllianceState {
  members: AllianceMember[];
  addMember: (member: Omit<AllianceMember, 'id' | 'password'>) => { id: string; password?: string };
  removeMember: (id: string) => void;
  updateMemberBattleground: (id: string, battleground: 1 | 2 | 3) => void;
  getMembersByBattleground: (bg: 1 | 2 | 3) => AllianceMember[];
  getTotalMembers: () => number;
  removeFromAlliance: (id: string) => void;
}

const generatePassword = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length: 12 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
};

export const useAlliance = create<AllianceState>()(
  persist(
    (set, get) => ({
      members: [],
      addMember: (memberData) => {
        const id = nanoid();
        const password = memberData.isAdmin ? generatePassword() : undefined;
        const member = { ...memberData, id, password };
        
        set((state) => {
          if (state.members.length >= 30) {
            throw new Error('Alliance cannot exceed 30 members');
          }
          return { members: [...state.members, member] };
        });
        
        return { id, password };
      },
      removeMember: (id) => {
        set((state) => ({
          members: state.members.filter((m) => m.id !== id)
        }));
      },
      updateMemberBattleground: (id, battleground) => {
        set((state) => ({
          members: state.members.map((m) =>
            m.id === id ? { ...m, battleground } : m
          )
        }));
      },
      getMembersByBattleground: (bg) => {
        return get().members.filter((m) => m.battleground === bg);
      },
      getTotalMembers: () => get().members.length,
      removeFromAlliance: (id) => {
        set((state) => ({
          members: state.members.filter((m) => m.id !== id)
        }));
      }
    }),
    {
      name: 'alliance-storage'
    }
  )
);