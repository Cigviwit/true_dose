'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import AuthModal from './AuthModal';
import { supabase } from '../../lib/supabaseClient';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  const router = useRouter();
  const [authOpen, setAuthOpen] = useState<false | 'sign-in' | 'sign-up'>(false);
  const [user, setUser] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleStart = () => {
    sessionStorage.setItem('gameInitiated', 'true');
    router.replace('/game');
  };

  const handlePractice = () => {
    sessionStorage.setItem('gameInitiated', 'true');
    router.replace('/practice');
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Auth Modal */}
      <AuthModal open={!!authOpen} onClose={() => setAuthOpen(false)} mode={authOpen === 'sign-up' ? 'sign-up' : 'sign-in'} />
      
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-gray-900/80 backdrop-blur-sm text-white p-4 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-30 border-r border-purple-500`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Menu</h2>
          <button className="md:hidden text-white" onClick={() => setIsSidebarOpen(false)}>
            X
          </button>
        </div>
        <nav className="space-y-4">
          {user && (
            <div className="flex items-center space-x-3 p-2 bg-gray-800/50 rounded-lg border border-purple-500 mb-4">
              <div className="w-10 h-10 bg-purple-600 flex items-center justify-center text-white font-bold text-lg rounded-full">
                {user.user_metadata?.full_name ? user.user_metadata.full_name[0].toUpperCase() : user.email ? user.email[0].toUpperCase() : 'U'}
              </div>
              <span className="text-lg font-semibold">{user.user_metadata?.full_name || user.email}</span>
            </div>
          )}
          <Button
            variant="ghost"
            onClick={() => {
              router.push('/profile/stats-and-settings');
              setIsSidebarOpen(false);
            }}
            className="w-full text-lg justify-start hover:bg-purple-700"
          >
            Settings
          </Button>
          {user ? (
            <Button
              variant="destructive"
              onClick={handleSignOut}
              className="w-full text-lg bg-red-600 hover:bg-red-700"
            >
              Sign Out
            </Button>
          ) : (
            <>
              <Button
                variant="default"
                className="w-full text-lg bg-purple-600 hover:bg-purple-700"
                onClick={() => { setAuthOpen('sign-in'); setIsSidebarOpen(false); }}
              >
                Sign In
              </Button>
              <Button
                variant="secondary"
                className="w-full text-lg bg-gray-700 hover:bg-gray-600"
                onClick={() => { setAuthOpen('sign-up'); setIsSidebarOpen(false); }}
              >
                Sign Up
              </Button>
            </>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navigation Bar - remains for menu toggle */}
        <nav className="w-full p-4 flex justify-between items-center bg-gray-900/50 md:hidden border-b border-purple-500">
          <button className="text-white font-bold" onClick={() => setIsSidebarOpen(true)}>
            MENU
          </button>
          <div className="flex gap-4">
            {/* Optionally keep some top-level navigation here or remove entirely */}
          </div>
        </nav>

        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div
            className="text-center space-y-8"
          >
            <h1 className="text-6xl font-bold text-white drop-shadow-lg">
              TrueDose
            </h1>
            
            <div className="flex flex-col items-center space-y-4">
              {/* Classic Mode Button */}
              <Button
                onClick={handleStart}
                className="w-full max-w-xs text-lg bg-purple-600 hover:bg-purple-700 text-white py-3"
              >
                Classic Mode
              </Button>

              {/* Practice Mode Button */}
              <Button
                variant="secondary"
                onClick={handlePractice}
                className="w-full max-w-xs text-lg bg-gray-700 hover:bg-gray-600 text-white py-3"
              >
                Practice Mode
              </Button>

              {/* How to Play Button */}
              <Button
                variant="outline"
                onClick={() => router.push('/how-to-play')}
                className="w-full max-w-xs text-lg border-purple-500 text-white hover:bg-purple-700 hover:text-white py-3"
              >
                How to Play
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 