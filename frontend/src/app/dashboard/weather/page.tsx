"use client";

import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets } from 'lucide-react';

export default function WeatherPage() {
  const [loading, setLoading] = useState(true);
  const [forecast, setForecast] = useState<any[]>([]);

  useEffect(() => {
    // Simulate fetching weather from backend
    setTimeout(() => {
      const today = new Date();
      const mockForecast = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date(today);
        d.setDate(d.getDate() + i);
        return {
          date: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
          temp: Math.round(25 + Math.random() * 8),
          precipitation: Math.round(Math.random() * 20),
          humidity: Math.round(50 + Math.random() * 40),
          icon: Math.random() > 0.6 ? <CloudRain className="w-8 h-8 text-sky" /> : (Math.random() > 0.5 ? <Cloud className="w-8 h-8 text-gray-400" /> : <Sun className="w-8 h-8 text-amber-500" />)
        };
      });
      setForecast(mockForecast);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-sky/10 p-3 rounded-xl text-sky">
          <Cloud className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-display text-text-primary">Hyper-Local Climate Intelligence</h2>
          <p className="text-text-secondary text-sm">Powered by Open-Meteo & Copernicus Satellite Data</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-sky/90 to-blue-600 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="text-lg font-medium opacity-90 mb-1">Current Conditions</h3>
            <div className="flex items-end gap-4">
              <span className="text-6xl font-display font-bold">28°C</span>
              <span className="text-xl opacity-90 pb-1 flex items-center gap-2">
                <Sun className="w-6 h-6" /> Partly Cloudy
              </span>
            </div>
            <p className="mt-4 opacity-80 text-sm">Coordinates: 45.42° N, 10.98° E (Farm Center)</p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-6 md:mt-0">
            <div className="flex items-center gap-3">
              <Droplets className="w-5 h-5 opacity-80" />
              <div>
                <p className="text-xs opacity-70">Humidity</p>
                <p className="font-semibold">64%</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CloudRain className="w-5 h-5 opacity-80" />
              <div>
                <p className="text-xs opacity-70">Precipitation</p>
                <p className="font-semibold">0 mm</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Wind className="w-5 h-5 opacity-80" />
              <div>
                <p className="text-xs opacity-70">Wind</p>
                <p className="font-semibold">12 km/h</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Sun className="w-5 h-5 opacity-80" />
              <div>
                <p className="text-xs opacity-70">UV Index</p>
                <p className="font-semibold">High (7)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold font-display mt-8 mb-4">7-Day Forecast</h3>
      
      {loading ? (
        <div className="h-40 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forest"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {forecast.map((day, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 border border-border shadow-sm text-center hover:shadow-md transition-shadow">
              <p className="text-sm font-medium text-text-secondary mb-3">{day.date}</p>
              <div className="flex justify-center mb-3">
                {day.icon}
              </div>
              <p className="text-2xl font-bold text-text-primary mb-1">{day.temp}°C</p>
              <div className="flex items-center justify-center gap-1 text-xs text-sky font-medium bg-sky/5 rounded-md py-1">
                <Droplets className="w-3 h-3" /> {day.precipitation}mm
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
