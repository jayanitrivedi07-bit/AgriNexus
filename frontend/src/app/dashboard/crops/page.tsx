"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Loader2, Sprout, Plus, Search } from 'lucide-react';

export default function CropsPage() {
  const { token } = useAuth();
  const [crops, setCrops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    const fetchCrops = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiUrl}/api/v1/crops`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setCrops(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch crops", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCrops();
  }, [token]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Crops Management</h1>
          <p className="text-text-secondary mt-1">Track and manage crop growth, yield, and schedules.</p>
        </div>
        <button className="flex items-center gap-2 bg-forest text-white px-4 py-2 rounded-xl font-medium hover:bg-forest/90 transition-colors">
          <Plus className="w-5 h-5" />
          <span>Add Crop</span>
        </button>
      </div>

      <div className="bg-white border border-border rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-border flex justify-between items-center bg-gray-50/50">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search crops..." 
              className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent w-64"
            />
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-forest" /></div>
        ) : crops.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sprout className="w-8 h-8 text-forest" />
            </div>
            <h2 className="text-xl font-bold text-text-primary mb-2">No crops found</h2>
            <p className="text-text-secondary">Start tracking your crops to get intelligent insights.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-border text-sm text-text-secondary">
                <tr>
                  <th className="px-6 py-4 font-medium">Crop Name</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Planting Date</th>
                  <th className="px-6 py-4 font-medium">Expected Yield</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {crops.map((crop, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-text-primary">{crop.name}</td>
                    <td className="px-6 py-4 text-text-secondary">{crop.type}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${crop.status === 'Healthy' ? 'bg-agri-green/10 text-agri-green' : 'bg-yellow-500/10 text-yellow-600'}`}>
                        {crop.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-text-secondary">{crop.plantingDate}</td>
                    <td className="px-6 py-4 text-text-secondary">{crop.yield}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
