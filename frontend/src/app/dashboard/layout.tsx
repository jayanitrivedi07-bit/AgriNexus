"use client";

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Map, 
  Sprout, 
  FlaskConical, 
  Cloud, 
  ScanLine, 
  Brain, 
  Settings, 
  LogOut,
  Leaf,
  Globe2
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center bg-bg">Loading...</div>;
  }

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const navItems = [
    { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, href: '/dashboard' },
    { label: 'My Farm', icon: <Map className="w-5 h-5" />, href: '/dashboard/farm' },
    { label: 'Crops', icon: <Sprout className="w-5 h-5" />, href: '/dashboard/crops' },
    { label: 'Soil', icon: <FlaskConical className="w-5 h-5" />, href: '/dashboard/soil' },
    { label: 'Weather', icon: <Cloud className="w-5 h-5" />, href: '/dashboard/weather' },
    { label: 'Disease Detection', icon: <ScanLine className="w-5 h-5" />, href: '/dashboard/disease' },
    { label: 'AI Advisor', icon: <Brain className="w-5 h-5" />, href: '/dashboard/advisor' },
    { label: 'BRICS Network', icon: <Globe2 className="w-5 h-5" />, href: '/dashboard/network' },
  ];

  return (
    <div className="flex h-screen bg-bg overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-border flex flex-col hidden md:flex shrink-0">
        <div className="p-6 flex items-center gap-2 border-b border-border">
          <Leaf className="text-forest w-6 h-6" />
          <span className="font-display font-bold text-xl tracking-tight text-forest">AgriNexus</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                    isActive 
                      ? 'bg-forest/10 text-forest' 
                      : 'text-text-secondary hover:bg-gray-50 hover:text-text-primary'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-border">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg font-medium text-text-secondary hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-40 border-b border-border px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-sm font-semibold text-text-secondary">Good morning, Farmer</h1>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
            <span className="flex items-center gap-1.5"><Cloud className="w-4 h-4 text-sky" /> 28°C</span>
            <span className="bg-agri-green/10 text-agri-green px-2.5 py-1 rounded-full text-xs font-bold">Farm Health 87%</span>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
