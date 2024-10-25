import React, { useState } from 'react';
import { X } from 'lucide-react';

interface BulkAddModalProps {
  onSubmit: (names: string[]) => void;
  onClose: () => void;
}

export const BulkAddModal: React.FC<BulkAddModalProps> = ({ onSubmit, onClose }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const names = input
      .split(',')
      .map(name => name.trim())
      .filter(name => name.length > 0);
    onSubmit(names);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Bulk Add Champions</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Champion Names (comma-separated)
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-40 bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white resize-none"
              placeholder="Example: Champion 1, Champion 2, Champion 3"
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-600 rounded-md text-gray-200 hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Champions
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};