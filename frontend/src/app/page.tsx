import React from 'react';
import Link from 'next/link';
import { Leaf, Cloud, FlaskConical, Brain, Globe2, ShieldAlert } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-border">
        <div className="flex items-center gap-2">
          <Leaf className="text-forest h-6 w-6" />
          <span className="font-display font-bold text-xl text-forest tracking-tight">AgriNexus</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-text-secondary">
          <Link href="#platform" className="hover:text-forest transition-colors">Platform</Link>
          <Link href="#solutions" className="hover:text-forest transition-colors">Solutions</Link>
          <Link href="#network" className="hover:text-forest transition-colors">Network</Link>
          <Link href="#data" className="hover:text-forest transition-colors">Data</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-forest transition-colors">Login</Link>
          <Link href="/dashboard" className="bg-forest text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-forest/90 transition-colors">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-24 pb-32 px-8 overflow-hidden bg-gradient-to-b from-bg to-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          {/* Decorative glowing blobs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-agri-green/20 rounded-full blur-3xl -z-10 mix-blend-multiply"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-ai/10 rounded-full blur-3xl -z-10 mix-blend-multiply"></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="font-display text-5xl md:text-7xl font-extrabold text-text-primary tracking-tight leading-tight mb-6">
            Intelligence for a More <br/>
            <span className="text-forest">Sustainable Agriculture</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed">
            Connect satellite data, soil intelligence, weather insights and AI-powered recommendations to make better agricultural decisions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className="bg-forest text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-forest/90 transition-colors shadow-soft hover:shadow-lg w-full sm:w-auto">
              Explore AgriNexus
            </Link>
            <Link href="/network" className="bg-white text-text-primary border border-border px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors shadow-sm w-full sm:w-auto flex items-center justify-center gap-2">
              <Globe2 className="w-5 h-5" /> Explore the Network
            </Link>
          </div>
        </div>
      </header>

      {/* Core Features */}
      <section id="platform" className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold text-text-primary mb-4">Core Capabilities</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">Unified intelligence to power your digital farm twin, powered by local models and global data layers.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<Leaf className="w-8 h-8 text-agri-green" />}
              title="Crop Intelligence"
              description="Recommendations based on location, soil, weather, crop history, and environmental conditions."
              color="border-agri-green/20"
            />
            <FeatureCard 
              icon={<FlaskConical className="w-8 h-8 text-earth" />}
              title="Soil Intelligence"
              description="Analytics for Nitrogen, Phosphorus, Potassium, pH, Moisture, and Soil health scores."
              color="border-earth/20"
            />
            <FeatureCard 
              icon={<Cloud className="w-8 h-8 text-sky" />}
              title="Climate Intelligence"
              description="Hyper-local temperature, rainfall, humidity, forecasts, and extreme weather alerts."
              color="border-sky/20"
            />
            <FeatureCard 
              icon={<Brain className="w-8 h-8 text-ai" />}
              title="AI Advisory"
              description="Personalized recommendations, crop suggestions, irrigation advice, and disease risk assessment."
              color="border-ai/20"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-dark-dash text-white py-12 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="text-agri-green h-6 w-6" />
              <span className="font-display font-bold text-xl tracking-tight">AgriNexus</span>
            </div>
            <p className="text-gray-400 text-sm">Digital Agriculture Intelligence</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Solutions</li>
              <li>AI Advisory</li>
              <li>Crop Intelligence</li>
              <li>Weather Intelligence</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Network</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>BRICS Network</li>
              <li>Data Hub</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-gray-800 text-sm text-gray-500 text-center">
          &copy; {new Date().getFullYear()} AgriNexus. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, color }: { icon: React.ReactNode, title: string, description: string, color: string }) {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-soft border border-border hover:border-transparent hover:shadow-lg transition-all duration-300 relative overflow-hidden group`}>
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-current opacity-5 rounded-bl-full -z-10 transition-transform group-hover:scale-110 ${color.replace('border-', 'text-')}`}></div>
      <div className="mb-6 p-3 bg-gray-50 rounded-xl inline-block">
        {icon}
      </div>
      <h3 className="font-bold text-lg text-text-primary mb-3">{title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
    </div>
  );
}
