
import React from 'react';
import { DorkResult } from '../types';
import { INTENT_LABELS } from '../constants';

interface ResultCardProps {
  result: DorkResult;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="glass border border-white/5 hover:border-[#E63946]/40 transition-all duration-500 rounded-[2rem] p-8 group relative overflow-hidden flex flex-col h-full shadow-2xl">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#E63946]/5 to-transparent pointer-events-none group-hover:opacity-100 opacity-30 transition-opacity"></div>
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <span className="px-4 py-1.5 bg-[#E63946]/10 text-[#E63946] text-[10px] font-black rounded-xl uppercase tracking-widest border border-[#E63946]/20">
          {INTENT_LABELS[result.category]}
        </span>
        <span className="text-[10px] text-gray-600 mono font-bold bg-black/40 px-3 py-1 rounded-lg">
          {new Date(result.timestamp).toLocaleTimeString()}
        </span>
      </div>
      
      <h3 className="text-white font-black text-xl mb-4 group-hover:text-[#E63946] transition-colors line-clamp-2 leading-tight relative z-10">
        <a href={result.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
          {result.title}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="ml-3 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1"><path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
      </h3>
      
      <p className="text-sm text-gray-500 mb-8 line-clamp-3 leading-relaxed flex-grow h-12 italic overflow-hidden">
        {result.snippet}
      </p>

      <div className="pt-8 border-t border-white/5 relative z-10 space-y-5">
        <div className="space-y-2">
          <p className="text-[9px] text-[#E63946] font-black uppercase tracking-[0.2em]">Asset Endpoint</p>
          <div className="flex items-center space-x-2">
            <p className="flex-1 text-[11px] text-gray-400 mono truncate bg-black/60 px-4 py-2.5 rounded-xl border border-white/5">{result.url}</p>
            <button onClick={() => copyToClipboard(result.url)} className="p-2.5 bg-white/5 rounded-xl text-gray-400 hover:text-[#E63946] hover:bg-[#E63946]/10 transition-all border border-white/5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path></svg>
            </button>
          </div>
        </div>
        
        <div className="space-y-2">
           <p className="text-[9px] text-gray-700 font-black uppercase tracking-[0.2em]">Dork Signature</p>
           <code className="block text-[10px] bg-black/40 px-4 py-2 rounded-xl text-gray-600 border border-white/5 font-bold truncate">
            {result.dorkUsed}
          </code>
        </div>
      </div>
    </div>
  );
};
