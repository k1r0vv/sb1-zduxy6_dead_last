import { create } from 'zustand';

type AdminView = 'dashboard' | 'setup-season' | 'manage-users' | 'map-setup' | 'champions';

interface AdminNavigationState {
  currentView: AdminView;
  navigateToDashboard: () => void;
  navigateToSetupSeason: () => void;
  navigateToManageUsers: () => void;
  navigateToMapSetup: () => void;
  navigateToChampions: () => void;
}

export const useAdminNavigation = create<AdminNavigationState>((set) => ({
  currentView: 'dashboard',
  navigateToDashboard: () => set({ currentView: 'dashboard' }),
  navigateToSetupSeason: () => set({ currentView: 'setup-season' }),
  navigateToManageUsers: () => set({ currentView: 'manage-users' }),
  navigateToMapSetup: () => set({ currentView: 'map-setup' }),
  navigateToChampions: () => set({ currentView: 'champions' }),
}));