import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { GameMap } from '../components/GameMap';
import { AllianceManagement } from '../components/alliance/AllianceManagement';
import { useUserNavigation } from '../hooks/useUserNavigation';
import { DashboardOverview } from '../components/dashboard/DashboardOverview';
import { WarSeasonView } from '../components/warSeason/WarSeasonView';
import { WarManagement } from './user/WarManagement';

export const UserDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { 
    currentView, 
    navigateToOverview, 
    navigateToMap, 
    navigateToAlliance, 
    navigateToWarSeason,
    navigateToWarManagement 
  } = useUserNavigation();

  const renderContent = () => {
    switch (currentView) {
      case 'map':
        return <GameMap />;
      case 'alliance':
        return <AllianceManagement />;
      case 'warSeason':
        return <WarSeasonView />;
      case 'warManagement':
        return <WarManagement />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-4 bg-gray-800 shadow-md flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">Alliance War Dashboard</h1>
          <span className="text-gray-400">Welcome, {currentUser?.name}</span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={navigateToOverview}
            className={`px-4 py-2 rounded ${
              currentView === 'overview'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Overview
          </button>
          <button
            onClick={navigateToWarSeason}
            className={`px-4 py-2 rounded ${
              currentView === 'warSeason'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            War Season
          </button>
          <button
            onClick={navigateToWarManagement}
            className={`px-4 py-2 rounded ${
              currentView === 'warManagement'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            War Management
          </button>
          <button
            onClick={navigateToMap}
            className={`px-4 py-2 rounded ${
              currentView === 'map'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            War Map
          </button>
          <button
            onClick={navigateToAlliance}
            className={`px-4 py-2 rounded ${
              currentView === 'alliance'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Alliance Members
          </button>
        </div>
      </div>
      <div className="p-4">
        {renderContent()}
      </div>
    </div>
  );
};