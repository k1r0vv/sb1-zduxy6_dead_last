import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MapSetupState {
  staticInstructions: string;
  nodeTactics: Record<string, string>;
  setStaticInstructions: (instructions: string) => void;
  setNodeTactics: (tactics: Record<string, string>) => void;
  updateNodeTactic: (nodeId: string, tactic: string) => void;
  saveMapSetup: () => Promise<void>;
}

export const useMapSetup = create<MapSetupState>()(
  persist(
    (set) => ({
      staticInstructions: '',
      nodeTactics: {},
      setStaticInstructions: (instructions) => set({ staticInstructions: instructions }),
      setNodeTactics: (tactics) => set({ nodeTactics: tactics }),
      updateNodeTactic: (nodeId, tactic) => 
        set((state) => ({
          nodeTactics: {
            ...state.nodeTactics,
            [nodeId]: tactic
          }
        })),
      saveMapSetup: async () => {
        // In a real app, this would make an API call
        console.log('Saving map setup...');
      }
    }),
    {
      name: 'map-setup-storage',
      partialize: (state) => ({
        staticInstructions: state.staticInstructions,
        nodeTactics: state.nodeTactics
      })
    }
  )
);