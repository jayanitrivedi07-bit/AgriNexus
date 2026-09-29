"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2, Plus, MapPin, Edit, ArrowLeft, Sprout } from 'lucide-react';
import Link from 'next/link';

export default function FarmDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { token } = useAuth();
  const farmId = params.farmId as string;

  const [farm, setFarm] = useState<any>(null);
  const [fields, setFields] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const [farmRes, fieldsRes] = await Promise.all([
          fetch(`${apiUrl}/api/v1/farms/${farmId}`, { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch(`${apiUrl}/api/v1/farms/${farmId}/fields`, { headers: { 'Authorization': `Bearer ${token}` } })
        ]);

        const farmData = await farmRes.json();
        const fieldsData = await fieldsRes.json();

        if (farmData.success) setFarm(farmData.data);
        if (fieldsData.success) setFields(fieldsData.data);
      } catch (error) {
        console.error("Failed to fetch farm data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token, farmId]);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-forest" /></div>;
  if (!farm) return <div className="text-center py-20 text-red-500">Farm not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => router.push('/dashboard/farm')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-text-secondary" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-text-primary">{farm.name}</h1>
          <p className="text-text-secondary mt-1">{farm.regionCode}, {farm.countryCode} • {farm.area} {farm.areaUnit}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Farm Info Card */}
        <div className="bg-white rounded-2xl border border-border p-6 shadow-sm col-span-1">
          <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-forest" /> 
            Farm Details
          </h2>
          <div className="space-y-4">
            <div>
              <span className="block text-sm text-text-secondary">Current Crop</span>
              <span className="font-medium">{farm.currentCropId || 'None'}</span>
            </div>
            <div>
              <span className="block text-sm text-text-secondary">Soil Type</span>
              <span className="font-medium capitalize">{farm.soilType}</span>
            </div>
            <div>
              <span className="block text-sm text-text-secondary">Irrigation</span>
              <span className="font-medium capitalize">{farm.irrigationType}</span>
            </div>
            <div>
              <span className="block text-sm text-text-secondary">Growth Stage</span>
              <span className="font-medium capitalize">{farm.growthStage || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Fields List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
              <Sprout className="w-5 h-5 text-forest" />
              Fields / Zones
            </h2>
            <Link href={`/dashboard/farm/${farmId}/field/create`} className="flex items-center gap-2 bg-forest text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-forest/90 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Add Field</span>
            </Link>
          </div>

          {fields.length === 0 ? (
            <div className="bg-white border border-border rounded-xl p-8 text-center">
              <p className="text-text-secondary">No fields added yet. Divide your farm into management zones.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map((field) => (
                <div key={field.id} className="bg-white border border-border rounded-xl p-4 hover:border-forest/30 transition-colors cursor-pointer" onClick={() => router.push(`/dashboard/farm/${farmId}/field/${field.id}`)}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-text-primary">{field.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-forest/10 text-forest capitalize">{field.status}</span>
                  </div>
                  <div className="text-sm text-text-secondary space-y-1">
                    <p>Area: {field.area || 'Unknown'}</p>
                    <p>Crop: {field.cropType || 'None'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
