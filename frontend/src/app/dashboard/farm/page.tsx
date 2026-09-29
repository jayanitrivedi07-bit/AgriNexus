"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Plus, MapPin, Loader2, ArrowRight } from 'lucide-react';

export default function FarmsPage() {
  const { token } = useAuth();
  const [farms, setFarms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    const fetchFarms = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiUrl}/api/v1/farms`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setFarms(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch farms", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFarms();
  }, [token]);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-forest" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">My Farms</h1>
          <p className="text-text-secondary mt-1">Manage your agricultural operations and zones.</p>
        </div>
        <Link href="/dashboard/farm/create" className="flex items-center gap-2 bg-forest text-white px-4 py-2 rounded-xl font-medium hover:bg-forest/90 transition-colors">
          <Plus className="w-5 h-5" />
          <span>Add Farm</span>
        </Link>
      </div>

      {farms.length === 0 ? (
        <div className="bg-white border border-border rounded-2xl p-12 text-center">
          <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-forest" />
          </div>
          <h2 className="text-xl font-bold text-text-primary mb-2">No farms found</h2>
          <p className="text-text-secondary mb-6">Create your first farm to start collecting intelligence.</p>
          <Link href="/dashboard/farm/create" className="inline-flex items-center gap-2 bg-forest text-white px-6 py-3 rounded-xl font-medium hover:bg-forest/90 transition-colors">
            <Plus className="w-5 h-5" />
            <span>Add Farm</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farms.map((farm) => (
            <Link href={`/dashboard/farm/${farm.id}`} key={farm.id} className="block group">
              <div className="bg-white border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:border-forest/30">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-sage rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-forest" />
                  </div>
                  <span className="text-xs font-medium bg-forest/10 text-forest px-2.5 py-1 rounded-full">
                    {farm.area} {farm.areaUnit}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-1 group-hover:text-forest transition-colors">{farm.name}</h3>
                <p className="text-sm text-text-secondary mb-4">{farm.regionCode}, {farm.countryCode}</p>
                
                <div className="flex items-center justify-between text-sm border-t border-border pt-4">
                  <span className="text-text-secondary">Crop: {farm.currentCropId || 'None'}</span>
                  <ArrowRight className="w-4 h-4 text-forest group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
