import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { SeasonForm, SeasonFormData } from '../../components/admin/SeasonSetup/SeasonForm';
import { useAdminNavigation } from '../../hooks/useAdminNavigation';

export const SetupNewSeason: React.FC = () => {
  const { navigateToDashboard } = useAdminNavigation();

  const handleSubmit = async (data: SeasonFormData) => {
    try {
      // In a real app, this would make an API call
      console.log('Creating new season:', data);
      navigateToDashboard();
    } catch (error) {
      console.error('Failed to create season:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={navigateToDashboard}
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-2">Setup New Season</h1>
          <p className="text-gray-400 mb-8">Configure the parameters for the new Alliance War season.</p>
          
          <SeasonForm onSubmit={handleSubmit} onCancel={navigateToDashboard} />
        </div>
      </div>
    </div>
  );
};