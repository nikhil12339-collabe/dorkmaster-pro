
import React from 'react';

interface HeaderProps {
  onToggleAI?: () => void;
  onToggleAbout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleAI, onToggleAbout }) => {
  return (
    <header className="border-b border-red-900/30 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="relative flex items-center justify-center w-10 h-10 mr-4">
              <div className="absolute inset-0 bg-black border border-red-600 rotate-45"></div>
              <div className="relative z-10 flex flex-col items-center -space-y-1">
                <span className="text-[10px] font-black text-white">DORK</span>
                <span className="text-[10px] font-black text-red-600">PRO</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-black tracking-tighter uppercase leading-none text-white">DORK PRO</h1>
              <p className="text-[7px] text-red-600 font-black uppercase tracking-widest">Autonomous Recon</p>
            </div>
          </div>
        </div>
        
        <nav className="flex items-center space-x-8 text-[11px] font-black uppercase tracking-widest">
          <button className="text-red-500 border-b-2 border-red-600 pb-1">Console</button>
          <button onClick={onToggleAI} className="text-gray-400 hover:text-red-400 transition-colors flex items-center space-x-2">
            <span className="w-1 h-1 bg-red-600 rounded-full animate-pulse"></span>
            <span>Dork AI</span>
          </button>
          <button onClick={onToggleAbout} className="text-gray-400 hover:text-red-400 transition-colors">
            <span>About Us</span>
          </button>
        </nav>

        <div className="hidden sm:flex items-center space-x-2 bg-red-950/10 border border-red-900/20 px-4 py-1.5 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></div>
          <span className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em]">Operational Console Active</span>
        </div>
      </div>
    </header>
  );
};
