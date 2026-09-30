"use client";

import React, { useState, useEffect } from 'react';
import { Brain, Search, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdvisorPage() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [advisory, setAdvisory] = useState<any>(null);
  const [farmId, setFarmId] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    const fetchFarms = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiUrl}/api/v1/farms`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setFarmId(data.data[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch farms", error);
      }
    };
    fetchFarms();
  }, [token]);

  const handleGenerate = async () => {
    if (!farmId) {
      alert("Please create a farm first to generate an advisory.");
      return;
    }
    
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/v1/farms/${farmId}/advisories/generate`, { 
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      
      if (data.success) {
        setAdvisory(data.data);
      } else {
        console.error("Error generating advisory:", data.error);
        alert(data.error?.message || "Failed to generate advisory");
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-ai/10 p-3 rounded-xl text-ai">
          <Brain className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-display text-text-primary">AI Advisor</h2>
          <p className="text-text-secondary text-sm">Generate contextual recommendations based on your Digital Farm Twin.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-border shadow-soft text-center py-12">
        <div className="max-w-md mx-auto space-y-6">
          <Brain className="w-16 h-16 text-ai/20 mx-auto" />
          <h3 className="font-semibold text-xl">Ready to analyze</h3>
          <p className="text-text-secondary">The advisor will look at your current crop stage, latest soil moisture, and a 7-day weather forecast to produce an actionable recommendation.</p>
          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="bg-ai text-white px-8 py-3 rounded-xl font-semibold hover:bg-ai/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2 mx-auto"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            {loading ? 'Analyzing Farm Data...' : 'Generate Advisory'}
          </button>
        </div>
      </div>

      {advisory && (
        <div className="bg-white rounded-2xl p-8 border border-border shadow-soft space-y-6 border-l-4 border-l-ai animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="bg-ai/10 text-ai text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
                AI Recommendation
              </span>
              <h3 className="text-2xl font-bold text-text-primary">{advisory.title}</h3>
            </div>
            <span className="text-sm font-semibold text-text-secondary bg-gray-100 px-3 py-1 rounded-lg">
              Confidence: {advisory.confidence}
            </span>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <h4 className="font-semibold text-text-primary mb-2">Recommendation</h4>
            <p className="text-text-secondary">{advisory.recommendation}</p>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary mb-2">Reasoning</h4>
            <p className="text-text-secondary">{advisory.reason}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-text-primary mb-3 text-sm uppercase tracking-wider text-gray-500">Evidence</h4>
              <ul className="space-y-2">
                {advisory.evidence?.map((ev: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="text-ai mt-0.5">•</span> {ev}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary mb-3 text-sm uppercase tracking-wider text-gray-500">Suggested Actions</h4>
              <ul className="space-y-2">
                {advisory.actions?.map((act: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="text-agri-green mt-0.5">✓</span> {act}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
