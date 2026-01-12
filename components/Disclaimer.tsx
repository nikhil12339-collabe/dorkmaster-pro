
import React from 'react';

export const Disclaimer: React.FC = () => {
  return (
    <div className="bg-red-950/10 border border-red-900/20 rounded-[2rem] p-8 mb-8 relative overflow-hidden group shadow-xl">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-red-600 shadow-[0_0_15px_rgba(230,57,70,0.5)]"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <h3 className="text-red-500 font-black text-[10px] uppercase tracking-[0.3em] mb-4">Core Mechanism</h3>
          <p className="text-white font-black text-lg uppercase tracking-tight leading-tight">HOW <br/> DORK PRO <br/> WORKS</p>
        </div>
        
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="space-y-1">
            <h4 className="text-white text-[9px] font-black uppercase tracking-widest flex items-center space-x-2">
              <span className="w-4 h-4 rounded-full bg-red-600 text-black flex items-center justify-center text-[8px]">1</span>
              <span>Dork Mapping</span>
            </h4>
            <p className="text-gray-500 text-[10px] font-medium uppercase leading-relaxed">
              The engine analyzes your target domain or topic to map potential attack surfaces like sensitive files, exposed DBs, and hidden logins.
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="text-white text-[9px] font-black uppercase tracking-widest flex items-center space-x-2">
              <span className="w-4 h-4 rounded-full bg-red-600 text-black flex items-center justify-center text-[8px]">2</span>
              <span>Dork Synthesis</span>
            </h4>
            <p className="text-gray-500 text-[10px] font-medium uppercase leading-relaxed">
              We generate specialized Google search operators (Dorks) that force the index to reveal technical data that is usually obscured from public view.
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="text-white text-[9px] font-black uppercase tracking-widest flex items-center space-x-2">
              <span className="w-4 h-4 rounded-full bg-red-600 text-black flex items-center justify-center text-[8px]">3</span>
              <span>Intelligence Report</span>
            </h4>
            <p className="text-gray-500 text-[10px] font-medium uppercase leading-relaxed">
              Final findings are aggregated and presented as clickable technical endpoints for authorized security auditing and vulnerability assessment.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-red-900/20 flex items-center justify-between opacity-60">
        <div className="flex items-center space-x-3">
          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">OPERATIONAL CLEARANCE REQUIRED • AUTHORIZED USE ONLY</p>
        </div>
        <p className="text-[9px] text-red-500/50 font-black uppercase tracking-widest">Gov/Mil Filters Hardcoded Active</p>
      </div>
    </div>
  );
};
