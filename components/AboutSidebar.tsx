
import React from 'react';

export const AboutSidebar: React.FC<{ isOpen?: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-[400px] border-l border-red-900/40 shadow-2xl bg-[#0a0a0a] flex flex-col z-[100] animate-in slide-in-from-right duration-300">
      <div className="bg-red-950/20 px-6 py-4 border-b border-red-900/30 flex items-center justify-between">
        <h4 className="text-[11px] font-black uppercase tracking-widest text-white">ABOUT <span className="text-red-600">US</span></h4>
        <button onClick={onClose} className="text-gray-500 hover:text-red-500 p-2 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-10">
        <section className="space-y-4">
          <div className="inline-block px-3 py-1 bg-red-600/10 border border-red-600/30 rounded text-[9px] font-black text-red-500 uppercase tracking-widest">
            Mission Statement
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter leading-tight">Automated Google Dorking Platform</h2>
          <div className="space-y-4 text-gray-500 text-[11px] leading-relaxed uppercase font-bold text-justify">
            <p>
              Dork Pro is a smart and efficient Google Dorking tool developed to simplify and speed up the process of advanced Google searches for cybersecurity research and educational purposes.
            </p>
            <p>
              Manually performing Google Dorking can be time-consuming and repetitive, especially when testing multiple queries or domains. To solve this problem, Dork Pro was created — a tool that automates and organizes Google Dorking queries, saving time while improving efficiency and accuracy.
            </p>
            <p>
              This platform is designed for ethical hackers, cybersecurity learners, penetration testers, and researchers who want quick access to structured Google Dork results without manually writing complex search operators every time.
            </p>
            <p className="text-red-500/80">
              Dork Pro is strictly intended for educational and ethical use only. It works only with publicly available, Google-indexed information and does not perform any illegal or intrusive actions.
            </p>
          </div>
        </section>

        <section className="pt-8 border-t border-red-900/20">
          <div className="bg-red-950/10 p-6 rounded-2xl border border-red-900/20 relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 blur-3xl rounded-full"></div>
            <p className="text-[9px] font-black text-red-600 uppercase tracking-widest mb-1">Developer</p>
            <h3 className="text-xl font-black text-white tracking-widest uppercase mb-3">NIKHIL GUPTA</h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed">
              A passionate cybersecurity learner and developer focused on building practical tools that simplify real-world security research and automation.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <div className="space-y-3">
             <h5 className="text-[10px] font-black text-white uppercase tracking-widest">Connect with Me</h5>
             <div className="grid grid-cols-1 gap-3">
                {/* Instagram Link */}
                <a 
                  href="https://www.instagram.com/hyperglitch_editz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between group p-4 rounded-xl border border-white/5 bg-white/5 hover:border-red-600/40 hover:bg-red-950/10 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-red-600/10 rounded-lg group-hover:bg-red-600/20 transition-colors">
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">Instagram</span>
                      <span className="text-[8px] font-bold text-gray-500 uppercase">@hyperglitch_editz</span>
                    </div>
                  </div>
                  <svg className="w-4 h-4 text-gray-700 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>

                {/* LinkedIn Link */}
                <a 
                  href="https://www.linkedin.com/in/nikhil-gupta-ji-11975334b" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between group p-4 rounded-xl border border-white/5 bg-white/5 hover:border-red-600/40 hover:bg-red-950/10 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-600/10 rounded-lg group-hover:bg-blue-600/20 transition-colors">
                      <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">LinkedIn</span>
                      <span className="text-[8px] font-bold text-gray-500 uppercase">Nikhil Gupta</span>
                    </div>
                  </div>
                  <svg className="w-4 h-4 text-gray-700 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
             </div>
          </div>
        </section>

        <section className="p-4 bg-black/40 border border-white/5 rounded-xl">
           <p className="text-[8px] text-gray-600 font-black uppercase tracking-[0.2em] leading-relaxed text-center">
             Dork Pro v4.2.0 • Build ID: Stealth_729 • Legal Notice: Use of this software must comply with local laws and target authorization policies.
           </p>
        </section>
      </div>

      <div className="p-6 border-t border-red-900/10 bg-black/80">
        <button onClick={onClose} className="w-full py-3 bg-white/5 hover:bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl border border-white/10 transition-all">
          Exit About Section
        </button>
      </div>
    </div>
  );
};
