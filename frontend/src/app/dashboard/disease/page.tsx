"use client";

import React, { useState } from 'react';
import { ScanLine, Upload, AlertCircle, CheckCircle2, Loader2, Cloud } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function DiseasePage() {
  const { token } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState('soybean');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('crop', crop);
      // Optional: farmId if we had it selected, but it defaults to null in backend if missing.

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/v1/disease/analyze`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      const data = await res.json();
      
      if (data.success) {
        setResult(data.data);
      } else {
        console.error("Error analyzing disease:", data.error);
        alert(data.error?.message || "Failed to analyze disease");
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-amber-500/10 p-3 rounded-xl text-amber-600">
          <ScanLine className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-display text-text-primary">Disease Intelligence</h2>
          <p className="text-text-secondary text-sm">Upload crop imagery for AI-assisted multi-signal disease risk assessment.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="bg-white rounded-2xl p-6 border border-border shadow-soft space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Crop Type</label>
            <select 
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border outline-none focus:ring-2 focus:ring-forest focus:border-forest"
            >
              <option value="soybean">Soybean</option>
              <option value="millet">Millet</option>
              <option value="maize">Maize</option>
              <option value="wheat">Wheat</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Upload Image</label>
            <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:bg-gray-50 transition-colors relative">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="w-10 h-10 text-gray-400 mx-auto mb-4" />
              <p className="text-sm font-medium text-text-primary mb-1">Click or drag image to upload</p>
              <p className="text-xs text-text-muted">JPG, PNG up to 5MB</p>
            </div>
          </div>

          {previewUrl && (
            <div className="relative rounded-xl overflow-hidden border border-border h-48 bg-gray-100 flex items-center justify-center">
              <img src={previewUrl} alt="Crop preview" className="max-h-full object-contain" />
            </div>
          )}

          <button 
            onClick={handleAnalyze}
            disabled={!file || loading}
            className="w-full bg-forest text-white py-3 rounded-xl font-semibold hover:bg-forest/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ScanLine className="w-5 h-5" />}
            {loading ? 'Analyzing Image & Context...' : 'Analyze Disease Risk'}
          </button>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-2xl p-6 border border-border shadow-soft">
          {!result && !loading && (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-text-muted">
              <ScanLine className="w-16 h-16 opacity-20 mb-4" />
              <p>Upload an image to see the multi-signal assessment.</p>
            </div>
          )}

          {loading && (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-text-secondary">
              <Loader2 className="w-10 h-10 animate-spin text-forest mb-4" />
              <p className="font-medium animate-pulse">Running multi-signal assessment...</p>
              <p className="text-xs mt-2 opacity-70">Combining visual data with current weather & soil context</p>
            </div>
          )}

          {result && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-start justify-between border-b border-border pb-4">
                <div>
                  <h3 className="text-xl font-bold text-text-primary">{result.potentialCondition}</h3>
                  <p className="text-sm text-text-secondary capitalize">Crop: {crop}</p>
                </div>
                <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-lg font-bold text-sm">
                  {Math.round(result.confidence * 100)}% Match
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-text-primary text-sm mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest" /> Visual Indicators
                </h4>
                <ul className="list-disc list-inside text-sm text-text-secondary space-y-1">
                  {result.visualIndicators?.map((ind: string, i: number) => <li key={i}>{ind}</li>)}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-text-primary text-sm mb-2 flex items-center gap-2">
                  <Cloud className="w-4 h-4 text-sky" /> Environmental Context
                </h4>
                <ul className="list-disc list-inside text-sm text-text-secondary space-y-1">
                  {result.environmentalContext?.map((ctx: string, i: number) => <li key={i}>{ctx}</li>)}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h4 className="font-semibold text-text-primary text-sm mb-2">Recommended Action</h4>
                <p className="text-sm text-text-secondary leading-relaxed">{result.recommendedAction}</p>
              </div>

              <div className="bg-red-50/50 rounded-xl p-4 border border-red-100 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <p className="text-xs text-red-800 leading-relaxed">
                  {result.limitations?.join(" ")}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
