import React from 'react';
import { SetupNewSeason } from './admin/SetupNewSeason';
import { ManageUsers } from './admin/ManageUsers';
import { MapSetup } from './admin/MapSetup';
import { Champions } from './admin/Champions';
import { useAdminNavigation } from '../hooks/useAdminNavigation';
import { Shield, Map, Users, PlayCircle, Sword } from 'lucide-react';

export const AdminDashboard = () => {
  const { 
    currentView, 
    navigateToSetupSeason, 
    navigateToManageUsers, 
    navigateToMapSetup,
    navigateToChampions,
  } = useAdminNavigation();

  if (currentView === 'setup-season') {
    return <SetupNewSeason />;
  }

  if (currentView === 'manage-users') {
    return <ManageUsers />;
  }

  if (currentView === 'map-setup') {
    return <MapSetup />;
  }

  if (currentView === 'champions') {
    return <Champions />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-400 mt-2">Manage your alliance war settings and configurations</p>
          </div>
          <Shield className="w-8 h-8 text-yellow-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            title="Setup New Season"
            description="Create and configure a new Alliance War season"
            icon={PlayCircle}
            onClick={navigateToSetupSeason}
          />
          <DashboardCard
            title="Map Setup"
            description="Configure node instructions and tactics"
            icon={Map}
            onClick={navigateToMapSetup}
          />
          <DashboardCard
            title="Manage Users"
            description="Add or remove users and manage their access"
            icon={Users}
            onClick={navigateToManageUsers}
          />
          <DashboardCard
            title="Champions"
            description="Manage champions roster and attributes"
            icon={Sword}
            onClick={navigateToChampions}
          />
        </div>
      </div>
    </div>
  );
};

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  onClick?: () => void;
}

const DashboardCard = ({ title, description, icon: Icon, onClick }: DashboardCardProps) => (
  <div 
    className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
    onClick={onClick}
  >
    <Icon className="w-8 h-8 mb-4 text-blue-400" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);