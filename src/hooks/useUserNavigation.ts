import { create } from 'zustand';

type UserView = 'overview' | 'map' | 'alliance' | 'warSeason' | 'warManagement';

interface UserNavigationState {
  currentView: UserView;
  navigateToOverview: () => void;
  navigateToMap: () => void;
  navigateToAlliance: () => void;
  navigateToWarSeason: () => void;
  navigateToWarManagement: () => void;
}

export const useUserNavigation = create<UserNavigationState>((set) => ({
  currentView: 'overview',
  navigateToOverview: () => set({ currentView: 'overview' }),
  navigateToMap: () => set({ currentView: 'map' }),
  navigateToAlliance: () => set({ currentView: 'alliance' }),
  navigateToWarSeason: () => set({ currentView: 'warSeason' }),
  navigateToWarManagement: () => set({ currentView: 'warManagement' }),
}));