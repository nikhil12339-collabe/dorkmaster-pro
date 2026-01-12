
import React, { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { Disclaimer } from './components/Disclaimer';
import { ResultCard } from './components/ResultCard';
import { DorkAI } from './components/DorkAI';
import { AboutSidebar } from './components/AboutSidebar';
import { SupportButton } from './components/SupportButton';
import { SearchIntent, DorkResult, SearchProgress } from './types';
import { INTENT_LABELS } from './constants';
import { DorkEngine } from './services/dorkEngine';
import { SearchService } from './services/searchService';

const App: React.FC = () => {
  const [queryInput, setQueryInput] = useState('');
  const [selectedIntent, setSelectedIntent] = useState<SearchIntent>(SearchIntent.ALL);
  const [results, setResults] = useState<DorkResult[]>([]);
  const [progress, setProgress] = useState<SearchProgress>({ status: 'IDLE', message: '' });
  const [logs, setLogs] = useState<{msg: string, isDork: boolean, dorkValue?: string}[]>([]);
  const [isAISidebarOpen, setIsAISidebarOpen] = useState(false);
  const [isAboutSidebarOpen, setIsAboutSidebarOpen] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [liveMode, setLiveMode] = useState(false);
  
  const stopScanningRef = useRef(false);

  useEffect(() => {
    const checkKey = async () => {
      if (typeof window !== 'undefined' && (window as any).aistudio?.hasSelectedApiKey) {
        const selected = await (window as any).aistudio.hasSelectedApiKey();
        setHasApiKey(selected);
      } else {
        setHasApiKey(!!process.env.GEMINI_API_KEY);
      }
    };
    checkKey();
    const interval = setInterval(checkKey, 2000);
    return () => clearInterval(interval);
  }, []);

  const addLog = (msg: string, isDork: boolean = false, dorkValue?: string) => {
    setLogs(prev => [{msg, isDork, dorkValue}, ...prev].slice(0, 100));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const launchGoogle = (dork: string) => {
    const url = `https://www.google.com/search?q=${encodeURIComponent(dork)}`;
    window.open(url, '_blank');
  };

  const copyAllDorks = () => {
    const allDorks = logs
      .filter(l => l.isDork && l.dorkValue)
      .map(l => l.dorkValue)
      .join('\n');
    if (allDorks) {
      navigator.clipboard.writeText(allDorks);
    }
  };

  const handleStartSearch = async () => {
    if (!queryInput.trim()) return;

    const mode = DorkEngine.detectMode(queryInput);
    const validation = DorkEngine.validateInput(queryInput, mode);
    
    if (!validation.valid) {
      addLog(`[ERROR] ${validation.error || 'INVALID TARGET'}`, false);
      return;
    }

    stopScanningRef.current = false;
    setResults([]);
    setLogs([]); 
    addLog(`[SYSTEM] INITIALIZING RECON FOR: ${queryInput}`, false);

    let dorkList = DorkEngine.generateDorks(queryInput, mode, selectedIntent);
    
    setProgress({ status: 'SEARCHING', mode, message: `COMPILING DORKS...` });
    addLog("[MODE] PATTERN GENERATION: Synthesizing dorks from library...", false);
    
    await new Promise(r => setTimeout(r, 400));
    
    dorkList.forEach(item => {
      addLog(`[DORK] ${item.dork}`, true, item.dork);
    });

    if (liveMode && hasApiKey) {
      addLog("[MODE] LIVE AUDIT: Starting Scraper...", false);
      setProgress({ status: 'SEARCHING', mode, message: `SCRAPING ASSETS...` });

      let allResults: DorkResult[] = [];
      for (let i = 0; i < dorkList.length; i++) {
        if (stopScanningRef.current) break;
        const { dork, category } = dorkList[i];
        try {
          const found = await SearchService.performSearch(dork, category, mode === 'TOPIC' ? queryInput : undefined);
          if (found.length > 0) {
            allResults = [...allResults, ...found];
            setResults(SearchService.deduplicate(allResults));
            addLog(`[FOUND] Asset identified with dork ${i+1}`, false);
          }
          await new Promise(r => setTimeout(r, 800));
        } catch (err: any) {
          addLog(`[SKIP] Live request limit reached or network lag.`, false);
        }
      }
      setProgress({ 
        status: 'COMPLETED', 
        message: `AUDIT FINISHED: ${allResults.length} ASSETS LOGGED` 
      });
    } else {
      setProgress({ 
        status: 'COMPLETED', 
        message: `GENERATION COMPLETE: ${dorkList.length} DORKS READY` 
      });
    }
  };

  return (
    <div className={`min-h-screen pb-32 transition-all duration-500 ease-in-out ${isAISidebarOpen || isAboutSidebarOpen ? 'pr-[400px]' : ''}`}>
      <Header 
        onToggleAI={() => {
          setIsAboutSidebarOpen(false);
          setIsAISidebarOpen(!isAISidebarOpen);
        }} 
        onToggleAbout={() => {
          setIsAISidebarOpen(false);
          setIsAboutSidebarOpen(!isAboutSidebarOpen);
        }}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-[#0a0a0a] border border-red-900/30 rounded-[2rem] p-8 lg:p-12 mb-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 blur-[100px] pointer-events-none"></div>
          <div className="relative z-10">
            <h2 className="text-5xl font-black text-white tracking-tighter uppercase mb-6">DORK <span className="text-red-600">PRO</span></h2>
            
            <div className="text-gray-400 text-[11px] max-w-4xl mb-6 uppercase font-bold leading-relaxed tracking-wide space-y-4">
              <p>
                Google Dorking is an advanced search technique that uses special Google search operators to discover publicly available but hidden information on the internet. It helps identify exposed files, directories, admin panels, login pages, configuration files, and potential security misconfigurations indexed by Google.
              </p>
              <p>
                This technique is widely used by ethical hackers, penetration testers, and cybersecurity professionals to analyze website security in a legal and non-intrusive way, as it only accesses data that is already publicly indexed.
              </p>
              <p className="text-red-500">
                ⚠️ Note: Google Dorking should be used strictly for educational and ethical purposes. Unauthorized or malicious use may be illegal.
              </p>
            </div>

            {hasApiKey && (
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Live Audit Mode</span>
                <button 
                  onClick={() => setLiveMode(!liveMode)}
                  className={`w-10 h-5 rounded-full relative transition-colors ${liveMode ? 'bg-red-600' : 'bg-gray-800'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${liveMode ? 'left-6' : 'left-1'}`}></div>
                </button>
              </div>
            )}
          </div>
        </div>

        <Disclaimer />

        <div className="bg-[#0a0a0a] border border-red-900/30 rounded-[2rem] p-8 mb-10 shadow-2xl">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-end">
              <div className="lg:col-span-6 space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-red-600 ml-1">Target Infrastructure / Topic</label>
                <input 
                  type="text" 
                  placeholder="e.g., example.com or 'university portal'" 
                  value={queryInput} 
                  onChange={(e) => setQueryInput(e.target.value)} 
                  onKeyDown={(e) => e.key === 'Enter' && handleStartSearch()}
                  className="w-full bg-black border border-red-900/30 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-1 focus:ring-red-600/40 transition-all placeholder:text-gray-800 uppercase font-bold text-xs" 
                />
              </div>
              <div className="lg:col-span-3 space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-red-600 ml-1">Dork Group</label>
                <select 
                  value={selectedIntent} 
                  onChange={(e) => setSelectedIntent(e.target.value as SearchIntent)} 
                  className="w-full bg-black border border-red-900/30 rounded-xl px-4 py-4 text-xs text-gray-400 font-black uppercase tracking-widest cursor-pointer hover:border-red-600/50 transition-colors"
                >
                  {Object.entries(INTENT_LABELS).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
                </select>
              </div>
              <div className="lg:col-span-3">
                <button 
                  onClick={handleStartSearch} 
                  disabled={progress.status === 'SEARCHING'}
                  className="w-full h-[52px] bg-red-700 hover:bg-red-600 disabled:bg-gray-900 disabled:text-gray-700 text-white font-black rounded-xl transition-all text-[10px] uppercase tracking-widest shadow-lg shadow-red-900/20"
                >
                  {progress.status === 'SEARCHING' ? 'PROCESSING...' : (liveMode && hasApiKey ? 'Run Live Audit' : 'Generate Dork')}
                </button>
              </div>
           </div>
        </div>

        <div className="w-full mb-12">
            <div className="bg-[#0a0a0a] border border-red-900/20 rounded-[1.5rem] overflow-hidden shadow-2xl">
                <div className="bg-red-950/20 px-6 py-4 border-b border-red-900/30 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-red-500">Output Terminal</h4>
                    </div>
                    
                    <button 
                      onClick={copyAllDorks} 
                      className="text-[9px] bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white px-4 py-1.5 rounded-lg uppercase font-black transition-all border border-red-600/30"
                    >
                      Copy All Dork
                    </button>
                </div>
                
                <div className="p-8 h-[600px] overflow-y-auto custom-scrollbar mono text-[11px] bg-black/60 space-y-2">
                    {logs.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full opacity-20">
                        <svg className="w-12 h-12 mb-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                        <p className="italic uppercase tracking-[0.3em] font-black">Waiting for input to generate recon patterns...</p>
                      </div>
                    ) : (
                      logs.map((log, i) => (
                        <div key={i} className={`group flex items-start justify-between border-l-2 pl-5 py-3 transition-colors hover:bg-white/5 ${log.isDork ? 'text-red-400 border-red-600/50' : 'text-gray-600 border-red-900/20'}`}>
                            <div className="flex-1 flex flex-col">
                               <span className="break-all pr-6 leading-relaxed font-bold uppercase text-[9px] mb-1 opacity-60">
                                 {log.msg.split(' ')[0]}
                               </span>
                               <span className="break-all pr-6 leading-relaxed">
                                 {log.isDork ? log.dorkValue : log.msg}
                               </span>
                            </div>
                            
                            {log.isDork && log.dorkValue && (
                              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                                <button 
                                  onClick={() => launchGoogle(log.dorkValue!)} 
                                  className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-[9px] font-black uppercase hover:bg-red-500 transition-all shadow-lg shadow-red-900/40"
                                >
                                  Launch
                                </button>
                                <button 
                                  onClick={() => copyToClipboard(log.dorkValue!)} 
                                  className="p-1.5 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-950/30 transition-all"
                                >
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path></svg>
                                </button>
                              </div>
                            )}
                        </div>
                      ))
                    )}
                </div>
            </div>
        </div>

        {results.length > 0 && (
          <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex items-center space-x-4 px-2">
                <div className="h-[1px] flex-1 bg-red-900/20"></div>
                <h2 className="text-xl font-black text-white uppercase tracking-[0.2em]">Automated Findings</h2>
                <div className="h-[1px] flex-1 bg-red-900/20"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {results.map((result) => <ResultCard key={result.id} result={result} />)}
            </div>
          </div>
        )}
      </main>

      <DorkAI isOpen={isAISidebarOpen} onClose={() => setIsAISidebarOpen(false)} />
      <AboutSidebar isOpen={isAboutSidebarOpen} onClose={() => setIsAboutSidebarOpen(false)} />
      <SupportButton />
      
      <footer className="fixed bottom-0 left-0 w-full p-4 bg-black/80 backdrop-blur-md border-t border-red-900/20 z-40 flex items-center justify-between pointer-events-none">
          <div className="flex items-center space-x-6 opacity-40">
              <span className="text-[8px] font-black uppercase text-white tracking-widest">v4.2.0-STABLE</span>
              <span className="text-[8px] font-black uppercase text-white tracking-widest">NO API KEY REQUIRED FOR GENERATION</span>
          </div>
          <div className="text-[8px] font-black uppercase text-red-600 tracking-[0.4em] opacity-40">
            Dork Pro Recon System
          </div>
      </footer>
    </div>
  );
};

export default App;
