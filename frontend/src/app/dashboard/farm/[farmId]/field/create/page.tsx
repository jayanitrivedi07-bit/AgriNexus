"use client";

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2, ArrowLeft } from 'lucide-react';

export default function CreateFieldPage() {
  const params = useParams();
  const router = useRouter();
  const { token } = useAuth();
  const farmId = params.farmId as string;
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    status: 'active',
    area: '',
    cropType: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/v1/farms/${farmId}/fields`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          area: Number(formData.area),
        })
      });

      const data = await res.json();
      if (data.success) {
        router.push(`/dashboard/farm/${farmId}`);
      } else {
        setError(data.error?.message || 'Failed to create field');
      }
    } catch (err) {
      setError('An error occurred during submission.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-text-secondary" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Create Field</h1>
          <p className="text-text-secondary mt-1">Add a new management zone to your farm.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
        {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl mb-6 text-sm">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Field Name</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2.5 rounded-xl border border-border focus:ring-2 focus:ring-forest focus:border-forest outline-none" 
              placeholder="e.g. Plot A"
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
              <label className="block text-sm font-medium text-text-primary mb-1">Status</label>
              <select 
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-border focus:ring-2 focus:ring-forest focus:border-forest outline-none bg-white"
              >
                <option value="active">Active</option>
                <option value="fallow">Fallow</option>
                <option value="harvested">Harvested</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Crop Type (Optional)</label>
            <input 
              type="text" 
              value={formData.cropType}
              onChange={(e) => setFormData({...formData, cropType: e.target.value})}
              className="w-full px-4 py-2.5 rounded-xl border border-border focus:ring-2 focus:ring-forest focus:border-forest outline-none" 
              placeholder="e.g. Wheat"
            />
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
              Create Field
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
