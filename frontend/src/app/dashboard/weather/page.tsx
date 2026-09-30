"use client";

import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function WeatherPage() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [forecast, setForecast] = useState<any[]>([]);

  useEffect(() => {
    if (!token) return;
    
    const fetchWeather = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        
        // First get the farm ID
        const farmRes = await fetch(`${apiUrl}/api/v1/farms`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const farmData = await farmRes.json();
        
        if (!farmData.success || farmData.data.length === 0) {
          setLoading(false);
          return;
        }
        
        const farmId = farmData.data[0].id;
        
        // Then fetch weather for this farm
        const weatherRes = await fetch(`${apiUrl}/api/v1/farms/${farmId}/weather?days=7`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const weatherData = await weatherRes.json();
        
        if (weatherData.success) {
          // Transform backend format to UI format
          const formatted = weatherData.data.map((day: any) => {
            const dateObj = new Date(day.forecastDate);
            return {
              date: dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
              temp: Math.round(day.temperature),
              precipitation: day.precipitationMm,
              humidity: Math.round(day.humidity),
              // basic logic for icon
              icon: day.precipitationProbability > 50 
                ? <CloudRain className="w-8 h-8 text-sky" /> 
                : (day.precipitationProbability > 20 
                    ? <Cloud className="w-8 h-8 text-gray-400" /> 
                    : <Sun className="w-8 h-8 text-amber-500" />)
            };
          });
          setForecast(formatted);
        }
      } catch (error) {
        console.error("Failed to fetch weather", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWeather();
  }, [token]);

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
              <span className="text-6xl font-display font-bold">
                {forecast.length > 0 ? forecast[0].temp : '--'}°C
              </span>
              <span className="text-xl opacity-90 pb-1 flex items-center gap-2">
                {forecast.length > 0 ? forecast[0].icon : <Sun className="w-6 h-6" />} 
                {forecast.length > 0 && forecast[0].precipitation > 0 ? 'Rain Expected' : 'Partly Cloudy'}
              </span>
            </div>
            <p className="mt-4 opacity-80 text-sm">Farm location based analysis</p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-6 md:mt-0">
            <div className="flex items-center gap-3">
              <Droplets className="w-5 h-5 opacity-80" />
              <div>
                <p className="text-xs opacity-70">Humidity</p>
                <p className="font-semibold">{forecast.length > 0 ? forecast[0].humidity : '--'}%</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CloudRain className="w-5 h-5 opacity-80" />
              <div>
                <p className="text-xs opacity-70">Precipitation</p>
                <p className="font-semibold">{forecast.length > 0 ? forecast[0].precipitation : '--'} mm</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Wind className="w-5 h-5 opacity-80" />
              <div>
                <p className="text-xs opacity-70">Wind</p>
                <p className="font-semibold">-- km/h</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Sun className="w-5 h-5 opacity-80" />
              <div>
                <p className="text-xs opacity-70">UV Index</p>
                <p className="font-semibold">--</p>
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
      ) : forecast.length === 0 ? (
        <div className="h-40 flex items-center justify-center text-text-secondary">
          <p>Please add a farm to see the weather forecast.</p>
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
