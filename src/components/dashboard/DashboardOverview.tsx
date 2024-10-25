import React from 'react';
import { Map, Users, Calendar, Shield } from 'lucide-react';
import { useUserNavigation } from '../../hooks/useUserNavigation';
import { useAuth } from '../../hooks/useAuth';

export const DashboardOverview: React.FC = () => {
  const { navigateToMap, navigateToAlliance, navigateToWarSeason } = useUserNavigation();
  const { currentUser } = useAuth();

  const menuItems = [
    {
      title: 'War Season',
      description: 'View current season details, node tactics, and progress',
      icon: Calendar,
      onClick: navigateToWarSeason,
    },
    {
      title: 'War Map',
      description: 'Interactive map with node assignments and tactics',
      icon: Map,
      onClick: navigateToMap,
    },
    {
      title: 'Alliance Members',
      description: 'Manage alliance members and battleground assignments',
      icon: Users,
      onClick: navigateToAlliance,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gray-800 rounded-lg p-8">
        <div className="flex items-center space-x-4 mb-8">
          {currentUser?.role === 'admin' && (
            <Shield className="w-6 h-6 text-yellow-500" />
          )}
          <div>
            <h1 className="text-3xl font-bold">Welcome, {currentUser?.name}</h1>
            <p className="text-gray-400 mt-2">
              {currentUser?.role === 'admin' 
                ? 'You have admin access to manage alliance members and war tactics'
                : 'Access your alliance war tools and information'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <button
              key={item.title}
              onClick={item.onClick}
              className="bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-colors text-left"
            >
              <item.icon className="w-8 h-8 mb-4 text-blue-400" />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};