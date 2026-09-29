"use client";

import React from 'react';
import { Activity, Droplets, Sprout, AlertTriangle } from 'lucide-react';

export default function DashboardHome() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-display text-text-primary mb-1">Today's Farm Intelligence</h2>
        <p className="text-text-secondary text-sm">Here's what is happening on your farm.</p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Farm Health" 
          value="87%" 
          status="Healthy" 
          icon={<Activity className="text-agri-green" />} 
          trend="↑ 2.1% from last week"
        />
        <MetricCard 
          title="Soil Moisture" 
          value="64%" 
          status="Optimal" 
          icon={<Droplets className="text-sky" />} 
          trend="Adequate for current stage"
        />
        <MetricCard 
          title="Crop Health" 
          value="91%" 
          status="Healthy" 
          icon={<Sprout className="text-forest" />} 
          trend="↑ 4.2% from last week"
        />
        <MetricCard 
          title="Disease Risk" 
          value="Low" 
          status="Information" 
          icon={<AlertTriangle className="text-text-secondary" />} 
          trend="No immediate threats detected"
        />
      </div>

      {/* Action Required & Watch */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-border shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-text-primary flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span> Action Required
            </h3>
          </div>
          <div className="bg-red-50/50 rounded-xl p-5 border border-red-100">
            <h4 className="font-semibold text-red-900 mb-2">Zone C: Vegetation stress increased</h4>
            <ul className="text-sm text-red-800 space-y-1 mb-4 list-disc list-inside">
              <li>NDVI decreased from 0.74 to 0.67</li>
              <li>Soil moisture decreased</li>
              <li>Rainfall below expected</li>
            </ul>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors">
              Inspect Field
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-border shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-text-primary flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span> Watch
            </h3>
          </div>
          <div className="bg-amber-50/50 rounded-xl p-5 border border-amber-100">
            <h4 className="font-semibold text-amber-900 mb-2">Disease pressure increasing</h4>
            <p className="text-sm text-amber-800 mb-4">Humidity + rainfall pattern in the last 48 hours.</p>
            <button className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-amber-700 transition-colors">
              Run Diagnosis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, status, icon, trend }: { title: string, value: string, status: string, icon: React.ReactNode, trend: string }) {
  const getStatusColor = (s: string) => {
    switch (s.toLowerCase()) {
      case 'healthy': return 'text-agri-green';
      case 'optimal': return 'text-sky';
      case 'warning': return 'text-amber-500';
      case 'critical': return 'text-red-500';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-border shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
          {icon}
        </div>
      </div>
      <p className="text-sm font-medium text-text-secondary mb-1">{title}</p>
      <div className="flex items-end gap-3 mb-2">
        <h4 className="text-3xl font-display font-bold text-text-primary leading-none">{value}</h4>
        <span className={`text-sm font-semibold ${getStatusColor(status)}`}>{status}</span>
      </div>
      <p className="text-xs text-text-muted">{trend}</p>
    </div>
  );
}
