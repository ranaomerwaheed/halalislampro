import React, { useState } from 'react';
import { X, Mail, Lock, User, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { StorageService } from '../services/storageService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth state
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div 
      id="auth-modal-overlay"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
    >
      <div className="w-full max-w-md ios-glass-card rounded-3xl shadow-2xl border border-white/30 dark:border-white/10 overflow-hidden p-6 sm:p-8 space-y-6">
        
        {/* Header with pure unboxed logo */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://i.postimg.cc/k5Gz9zYv/hip.png" 
              alt="Logo" 
              className="h-8.5 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100">
                {isLogin ? 'Sign In' : 'Create Free Account'}
              </h3>
              <p className="text-xs text-stone-500">
                Sync bookmarks, reading history, & progress
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-full ios-glass text-stone-400 hover:text-stone-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 mx-auto flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
            <p className="font-bold text-base text-stone-900 dark:text-stone-100">Welcome</p>
            <p className="text-xs text-stone-500">Your spiritual profile is synced securely.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Abdullah"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-2xl ios-glass border border-white/40 dark:border-white/10 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="believer@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-2xl ios-glass border border-white/40 dark:border-white/10 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-2xl ios-glass border border-white/40 dark:border-white/10 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md transition-all hover:scale-[1.01]"
            >
              {isLogin ? 'Sign In' : 'Create Free Account'}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-xs text-stone-500 hover:text-emerald-800 dark:hover:text-emerald-400 font-medium"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </button>
            </div>
          </form>
        )}

        <div className="p-3.5 rounded-2xl ios-glass text-[11px] text-stone-500 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>Private, encrypted, and free from commercial ads forever.</span>
        </div>

      </div>
    </div>
  );
};
