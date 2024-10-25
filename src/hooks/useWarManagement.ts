import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface War {
  id: number;
  name: string;
  notes: string;
  defenseAssignments: Record<string, string>; // nodeId -> championName
  attackAssignments: Record<string, string>; // nodeId -> playerName
}

interface WarManagementState {
  wars: War[];
  currentWarId: number | null;
  addWar: (name: string) => void;
  updateWarNotes: (warId: number, notes: string) => void;
  setCurrentWar: (warId: number | null) => void;
  updateDefenseAssignment: (warId: number, nodeId: string, championName: string) => void;
  updateAttackAssignment: (warId: number, nodeId: string, playerName: string) => void;
}

export const useWarManagement = create<WarManagementState>()(
  persist(
    (set) => ({
      wars: Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        name: `War ${i + 1}`,
        notes: '',
        defenseAssignments: {},
        attackAssignments: {},
      })),
      currentWarId: null,
      addWar: (name) =>
        set((state) => ({
          wars: [...state.wars, { id: Date.now(), name, notes: '', defenseAssignments: {}, attackAssignments: {} }],
        })),
      updateWarNotes: (warId, notes) =>
        set((state) => ({
          wars: state.wars.map((war) =>
            war.id === warId ? { ...war, notes } : war
          ),
        })),
      setCurrentWar: (warId) => set({ currentWarId: warId }),
      updateDefenseAssignment: (warId, nodeId, championName) =>
        set((state) => ({
          wars: state.wars.map((war) =>
            war.id === warId
              ? {
                  ...war,
                  defenseAssignments: {
                    ...war.defenseAssignments,
                    [nodeId]: championName,
                  },
                }
              : war
          ),
        })),
      updateAttackAssignment: (warId, nodeId, playerName) =>
        set((state) => ({
          wars: state.wars.map((war) =>
            war.id === warId
              ? {
                  ...war,
                  attackAssignments: {
                    ...war.attackAssignments,
                    [nodeId]: playerName,
                  },
                }
              : war
          ),
        })),
    }),
    {
      name: 'war-management-storage',
    }
  )
);