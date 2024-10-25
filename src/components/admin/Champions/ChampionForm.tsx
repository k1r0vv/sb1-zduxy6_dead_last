import React, { useState, useRef } from 'react';
import { X, Upload } from 'lucide-react';
import { Champion, ChampionClass } from '../../../types/champion';

interface ChampionFormProps {
  championClass: ChampionClass;
  starRating: '6' | '7';
  onClose: () => void;
  onSubmit: (name: string, rankOptions: string[], imageData?: string) => void;
  champion?: Champion;
}

export const ChampionForm: React.FC<ChampionFormProps> = ({
  championClass,
  starRating,
  onClose,
  onSubmit,
  champion
}) => {
  const [name, setName] = useState(champion?.name || '');
  const [selectedRanks, setSelectedRanks] = useState<string[]>(
    champion?.rankOptions || []
  );
  const [imagePreview, setImagePreview] = useState<string>(champion?.fullImage || '');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError('Image size must be less than 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Champion name is required');
      return;
    }

    if (selectedRanks.length === 0) {
      setError('At least one rank must be selected');
      return;
    }

    onSubmit(name.trim(), selectedRanks, imagePreview);
  };

  const rankOptions = starRating === '6' 
    ? ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)']
    : ['Rank 1', 'Rank 2', 'Rank 3'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">
            {champion ? 'Edit' : 'Add'} {championClass} Champion ({starRating}★)
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Available Ranks
            </label>
            <div className="space-y-2">
              {rankOptions.map((rank) => (
                <label key={rank} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedRanks.includes(rank)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRanks([...selectedRanks, rank]);
                      } else {
                        setSelectedRanks(selectedRanks.filter((r) => r !== rank));
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-200">{rank}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Champion Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
              {imagePreview ? (
                <div className="space-y-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-40 rounded"
                  />
                  <button
                    type="button"
                    onClick={() => setImagePreview('')}
                    className="text-red-400 text-sm hover:text-red-300"
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-400">
                    <label className="relative cursor-pointer rounded-md bg-transparent hover:text-gray-300">
                      <span>Upload a file</span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="sr-only"
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG up to 2MB
                  </p>
                </div>
              )}
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

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
              {champion ? 'Save Changes' : 'Add Champion'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};