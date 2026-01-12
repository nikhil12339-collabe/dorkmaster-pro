
import React from 'react';

export const SupportButton: React.FC = () => {
  return (
    <a 
      href="https://www.instagram.com/hyperglitch_editz" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[60] flex items-center space-x-3 bg-black border border-red-600/40 px-5 py-3 rounded-2xl shadow-[0_0_20px_rgba(230,57,70,0.15)] hover:shadow-[0_0_30px_rgba(230,57,70,0.4)] hover:border-red-600 transition-all duration-300 group pointer-events-auto"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-red-600 blur-md opacity-0 group-hover:opacity-40 transition-opacity"></div>
        <svg 
          className="w-5 h-5 text-red-500 group-hover:text-red-400 relative z-10" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-black uppercase tracking-widest text-white group-hover:text-red-500 transition-colors">Support</span>
        <span className="text-[7px] font-bold text-gray-600 uppercase tracking-widest -mt-0.5">hyperglitch_editz</span>
      </div>
    </a>
  );
};
