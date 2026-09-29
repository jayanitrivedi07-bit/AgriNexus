"use client";

import React from 'react';
import { Globe2, Users, Database, ShieldCheck } from 'lucide-react';

export default function NetworkPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-text-primary text-white p-3 rounded-xl">
          <Globe2 className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-display text-text-primary">BRICS Cooperative Network</h2>
          <p className="text-text-secondary text-sm">Cross-border agricultural intelligence and data sovereignty.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-dark-dash rounded-3xl p-8 text-white relative overflow-hidden shadow-xl border border-gray-800">
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
            <Globe2 className="w-96 h-96 -mt-20 -mr-20" />
          </div>
          <div className="relative z-10">
            <span className="bg-blue-600 text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block tracking-wider uppercase">Data Sovereignty</span>
            <h3 className="text-3xl font-display font-bold mb-4">Your Data. Protected. Shared on your terms.</h3>
            <p className="text-gray-300 max-w-lg mb-8 leading-relaxed">
              AgriNexus uses decentralized protocols to ensure that BRICS farmers maintain 100% ownership of their yield data, soil intel, and practices.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                <ShieldCheck className="w-6 h-6 text-agri-green mb-2" />
                <h4 className="font-semibold text-sm mb-1">Local Processing</h4>
                <p className="text-xs text-gray-400">Models run inference in-region to respect data localization laws.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                <Users className="w-6 h-6 text-blue-400 mb-2" />
                <h4 className="font-semibold text-sm mb-1">Cooperative Analytics</h4>
                <p className="text-xs text-gray-400">Opt-in anonymized pooling for stronger regional AI models.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-border shadow-soft">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-sky" /> Regional Data Hubs
          </h3>
          <ul className="space-y-4">
            <li className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇧🇷</span>
                <span className="font-medium text-sm">Brazil Node</span>
              </div>
              <span className="text-xs font-bold text-agri-green bg-agri-green/10 px-2 py-1 rounded">Active</span>
            </li>
            <li className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇷🇺</span>
                <span className="font-medium text-sm">Russia Node</span>
              </div>
              <span className="text-xs font-bold text-agri-green bg-agri-green/10 px-2 py-1 rounded">Active</span>
            </li>
            <li className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇮🇳</span>
                <span className="font-medium text-sm">India Node</span>
              </div>
              <span className="text-xs font-bold text-agri-green bg-agri-green/10 px-2 py-1 rounded">Active</span>
            </li>
            <li className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇨🇳</span>
                <span className="font-medium text-sm">China Node</span>
              </div>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded">Syncing</span>
            </li>
            <li className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇿🇦</span>
                <span className="font-medium text-sm">South Africa Node</span>
              </div>
              <span className="text-xs font-bold text-agri-green bg-agri-green/10 px-2 py-1 rounded">Active</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
