import React, { useState } from 'react';
import { Database, AlertCircle, CheckCircle } from 'lucide-react';

export const DbTestPanel: React.FC = () => {
  const [testResult, setTestResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleTestConnection = async () => {
    setLoading(true);
    setError('');
    setTestResult('');

    try {
      const response = await fetch('http://localhost:5000/api/test-db', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setTestResult(data.message);
      } else {
        throw new Error(data.error || 'Failed to test database connection');
      }
    } catch (err) {
      console.error('Connection test error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-gray-800 rounded-lg shadow-lg w-80">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center text-white">
          <Database className="w-5 h-5 mr-2" />
          Database Test
        </h3>
        <div className="text-xs text-gray-400">SQLite Database</div>
      </div>

      <button
        onClick={handleTestConnection}
        disabled={loading}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed mb-4 flex items-center justify-center"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white mr-2" />
            Testing...
          </>
        ) : (
          'Test Connection'
        )}
      </button>

      {error && (
        <div className="p-3 bg-red-900/50 border border-red-500 rounded flex items-start mb-2">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-200">{error}</p>
        </div>
      )}

      {testResult && (
        <div className="p-3 bg-green-900/50 border border-green-500 rounded flex items-start">
          <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-green-200">{testResult}</p>
        </div>
      )}
    </div>
  );
};