
import React from 'react';

export const DorkAI: React.FC<{ isOpen?: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-[400px] border-l border-red-900/40 shadow-2xl bg-[#0a0a0a] flex flex-col z-[100] animate-in slide-in-from-right duration-300">
      <div className="bg-red-950/20 px-6 py-4 border-b border-red-900/30 flex items-center justify-between">
        <h4 className="text-[11px] font-black uppercase tracking-widest text-white">DORK <span className="text-red-600">AI</span></h4>
        
        <div className="flex items-center space-x-2">
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 p-2 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-red-600 blur-[80px] opacity-20 animate-pulse"></div>
          <h2 className="text-8xl font-black text-white uppercase tracking-tighter relative z-10">SOON</h2>
        </div>
        <p className="text-[10px] text-red-500 font-black uppercase tracking-[0.5em] mb-4">Neural Engine Pending</p>
        <p className="text-gray-600 text-[10px] uppercase font-bold leading-relaxed max-w-[250px]">
          Automated vulnerability mapping and AI-driven vector generation is currently in cold storage.
        </p>
      </div>

      <div className="p-8 border-t border-red-900/10 bg-black/40">
        <p className="text-[8px] text-gray-800 uppercase font-black text-center tracking-widest">Operational Status: Stealth</p>
      </div>
    </div>
  );
};
