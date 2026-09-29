"use client";

import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Leaf } from 'lucide-react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Wait for backend to sync profile in a real app or sync it here via API
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-soft p-8 border border-border">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-forest/10 p-3 rounded-full mb-4">
            <Leaf className="w-8 h-8 text-forest" />
          </div>
          <h2 className="text-2xl font-bold font-display text-text-primary">Create Account</h2>
          <p className="text-text-secondary text-sm mt-2">Join the digital agriculture network</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-border focus:ring-2 focus:ring-forest focus:border-forest outline-none transition-all"
              placeholder="farmer@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-border focus:ring-2 focus:ring-forest focus:border-forest outline-none transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-forest text-white py-3 rounded-xl font-semibold hover:bg-forest/90 transition-colors disabled:opacity-70"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-secondary">
          Already have an account? <Link href="/login" className="text-forest font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
