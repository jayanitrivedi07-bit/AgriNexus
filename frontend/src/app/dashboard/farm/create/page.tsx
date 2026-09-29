"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function CreateFarmPage() {
  const router = useRouter();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    countryCode: 'IN',
    regionCode: '',
    area: '',
    areaUnit: 'acre',
    soilType: 'loamy',
    irrigationType: 'rainfed'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/v1/farms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          area: Number(formData.area),
          location: { type: 'Point', coordinates: [0, 0] } // Mock default
        })
      });

      const data = await res.json();
      if (data.success) {
        router.push('/dashboard/farm');
      } else {
        setError(data.error?.message || 'Failed to create farm');
      }
    } catch (err) {
      setError('An error occurred during submission.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Create New Farm</h1>
        <p className="text-text-secondary mt-1">Register a new agricultural operation.</p>
      </div>

      <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
        {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl mb-6 text-sm">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Farm Name</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2.5 rounded-xl border border-border focus:ring-2 focus:ring-forest focus:border-forest outline-none" 
              placeholder="e.g. North Valley Field"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Area</label>
              <input 
                type="number" 
                required
                min="0.1"
                step="0.1"
                value={formData.area}
                onChange={(e) => setFormData({...formData, area: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-border focus:ring-2 focus:ring-forest focus:border-forest outline-none" 
                placeholder="0.0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Unit</label>
              <select 
                value={formData.areaUnit}
                onChange={(e) => setFormData({...formData, areaUnit: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-border focus:ring-2 focus:ring-forest focus:border-forest outline-none bg-white"
              >
                <option value="acre">Acres</option>
                <option value="hectare">Hectares</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Region Code</label>
              <input 
                type="text" 
                required
                value={formData.regionCode}
                onChange={(e) => setFormData({...formData, regionCode: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-border focus:ring-2 focus:ring-forest focus:border-forest outline-none" 
                placeholder="e.g. MH, CA, TX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Soil Type</label>
              <select 
                value={formData.soilType}
                onChange={(e) => setFormData({...formData, soilType: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-border focus:ring-2 focus:ring-forest focus:border-forest outline-none bg-white"
              >
                <option value="loamy">Loamy</option>
                <option value="clay">Clay</option>
                <option value="sandy">Sandy</option>
                <option value="silt">Silt</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <button 
              type="button" 
              onClick={() => router.back()}
              className="px-6 py-3 rounded-xl font-medium text-text-secondary bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 bg-forest text-white py-3 rounded-xl font-semibold hover:bg-forest/90 transition-colors disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              Create Farm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
