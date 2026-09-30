"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Loader2, FlaskConical, Plus } from 'lucide-react';

export default function SoilPage() {
  const { token } = useAuth();
  const [soilData, setSoilData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    const fetchSoilData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiUrl}/api/v1/soil`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setSoilData(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch soil data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSoilData();
  }, [token]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Soil Analysis</h1>
          <p className="text-text-secondary mt-1">Monitor soil health, moisture, and nutrient levels.</p>
        </div>
        <button className="flex items-center gap-2 bg-forest text-white px-4 py-2 rounded-xl font-medium hover:bg-forest/90 transition-colors">
          <Plus className="w-5 h-5" />
          <span>New Analysis</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-forest" /></div>
      ) : soilData.length === 0 ? (
        <div className="bg-white border border-border rounded-2xl p-12 text-center">
          <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FlaskConical className="w-8 h-8 text-forest" />
          </div>
          <h2 className="text-xl font-bold text-text-primary mb-2">No soil data</h2>
          <p className="text-text-secondary mb-6">Add a soil analysis record to monitor your land's health.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {soilData.map((record, index) => (
            <div key={index} className="bg-white border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-sage rounded-xl flex items-center justify-center">
                  <FlaskConical className="w-6 h-6 text-forest" />
                </div>
                <span className="text-xs font-medium bg-forest/10 text-forest px-2.5 py-1 rounded-full">
                  pH: {record.phLevel}
                </span>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-1">{record.zoneName}</h3>
              <p className="text-sm text-text-secondary mb-4">Tested on: {record.testDate}</p>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-text-secondary">Nitrogen (N)</span>
                    <span className="font-medium text-text-primary">{record.nitrogen} mg/kg</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(100, record.nitrogen)}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-text-secondary">Phosphorus (P)</span>
                    <span className="font-medium text-text-primary">{record.phosphorus} mg/kg</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: `${Math.min(100, record.phosphorus)}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-text-secondary">Potassium (K)</span>
                    <span className="font-medium text-text-primary">{record.potassium} mg/kg</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full" style={{ width: `${Math.min(100, record.potassium)}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
