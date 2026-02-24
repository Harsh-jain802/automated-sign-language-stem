"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, FileText, Upload, BookOpen, ChevronRight, Settings, Info, 
  Menu, X, Layout, Maximize, UserCheck, MonitorPlay, CloudUpload, CheckCircle,
  Database, Cpu, Activity
} from 'lucide-react';

export default function Page() {
  // --- UI & Navigation State ---
  const [activeTab, setActiveTab] = useState<'dashboard' | 'upload'>('dashboard');
  const [isLeftOpen, setIsLeftOpen] = useState(true);
  const [isRightOpen, setIsRightOpen] = useState(true);
  const [showAvatar, setShowAvatar] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // --- Upload & AI Logic State ---
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success'>('idle');
  const playerRef = useRef<HTMLDivElement>(null);

  // --- Fullscreen Listener ---
  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // --- Automated Upload -> Dashboard Flow ---
  const handleUpload = () => {
    setUploadStatus('uploading');
    
    // Simulate AI analyzing the STEM context
    setTimeout(() => {
      setUploadStatus('success');
      
      // Success delay then auto-switch back to video page
      setTimeout(() => {
        setActiveTab('dashboard');
        setUploadStatus('idle');
      }, 1200);
    }, 2800);
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900 overflow-hidden text-sm">
      
      {/* --- LEFT SIDEBAR (Toggleable) --- */}
      <aside className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out z-20 ${isLeftOpen ? 'w-64' : 'w-0 overflow-hidden opacity-0'}`}>
        <div className="p-6 border-b border-gray-200 bg-[#005a8c] text-white whitespace-nowrap">
          <h1 className="text-xl font-bold uppercase tracking-tight">Innovatrix</h1>
          <p className="text-[10px] opacity-80 uppercase tracking-widest mt-1 font-semibold">STEM Sign Gen</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider pb-2 px-2">Navigation</div>
          <NavItem 
            icon={<BookOpen size={18}/>} 
            label="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')}
          />
          <NavItem 
            icon={<Upload size={18}/>} 
            label="Upload Content" 
            active={activeTab === 'upload'} 
            onClick={() => setActiveTab('upload')}
          />
          
          <div className="mt-8 text-[11px] font-bold text-gray-400 uppercase tracking-wider pb-2 px-2">Physics Modules</div>
          <NavItem label="0.1: Vectors vs Scalars" active={activeTab === 'dashboard'} />
          <NavItem label="0.2: 1D Kinematics" />
          <NavItem label="0.3: Newton's Laws" isSub />
        </nav>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative bg-[#fcfcfc]">
        
        {/* Top Navigation Bar */}
        <header className="bg-[#005a8c] text-white p-4 shadow-md flex justify-between items-center z-10 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsLeftOpen(!isLeftOpen)}
              className="p-1.5 hover:bg-white/20 rounded-md transition-colors"
            >
              {isLeftOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h2 className="text-xl font-light truncate">
              {activeTab === 'dashboard' ? '0.1 Vectors vs. Scalars' : 'Content Management'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsRightOpen(!isRightOpen)}
              className="p-1.5 hover:bg-white/20 rounded-md transition-colors border border-white/20"
            >
              <Layout size={20} />
            </button>
          </div>
        </header>

        {/* --- SCROLLABLE CONTENT --- */}
        <div className="p-6 md:p-10 overflow-y-auto flex-1">
          
          {/* VIEW 1: DASHBOARD (Video & AI Interaction) */}
          {activeTab === 'dashboard' && (
            <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* Secondary Toolbar */}
                <div className="mb-6 flex flex-wrap gap-3">
                    <button 
                        onClick={() => setShowAvatar(!showAvatar)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all border shadow-sm ${
                            showAvatar ? 'bg-blue-600 text-white border-blue-700' : 'bg-white text-gray-600 border-gray-300'
                        }`}
                    >
                        {showAvatar ? <MonitorPlay size={15}/> : <UserCheck size={15}/>}
                        {showAvatar ? "Hide Sign Avatar" : "Show Sign Avatar"}
                    </button>
                    <button 
                        onClick={() => playerRef.current?.requestFullscreen()}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gray-800 text-white rounded-xl text-xs font-bold hover:bg-black shadow-sm transition-colors"
                    >
                        <Maximize size={15}/> Fullscreen Player
                    </button>
                </div>

                {/* DUAL PLAYER CONTAINER */}
                <div 
                    ref={playerRef}
                    className={`flex flex-col md:flex-row gap-px bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-900 aspect-video transition-all ${
                        isFullscreen ? 'fixed inset-0 z-[100] rounded-none border-0 h-full w-full' : 'relative mb-12'
                    }`}
                >
                    {/* Left: Original Lecture */}
                    <div className="flex-1 relative bg-gray-900 flex items-center justify-center group h-full">
                        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center"></div>
                        <div className="relative z-10 bg-red-600 rounded-full p-6 shadow-2xl hover:scale-110 transition-transform cursor-pointer">
                            <Play fill="white" color="white" size={32} />
                        </div>
                        <span className="absolute top-5 left-5 bg-black/70 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-widest">Original Lecture</span>
                    </div>

                    {/* Right: AI Sign Avatar (BESIDE IT) */}
                    {showAvatar && (
                        <div className="w-full md:w-[38%] bg-[#080912] relative flex items-center justify-center border-l border-white/5 h-full">
                            <div className="text-center p-8">
                                <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full animate-pulse mb-6 flex items-center justify-center shadow-[0_0_60px_rgba(59,130,246,0.3)] border-4 border-blue-400/20">
                                    <span className="text-white font-black text-xl tracking-tighter">AI AVATAR</span>
                                </div>
                                <p className="text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase opacity-70">Syncing STEM Signs</p>
                            </div>
                            <span className="absolute top-5 left-5 bg-blue-600 text-white text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-widest">Sign Feed</span>
                        </div>
                    )}
                </div>

                {/* AI TRANSCRIPT */}
                <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                        <div className="bg-blue-50 p-2.5 rounded-xl"><FileText size={20} className="text-[#005a8c]" /></div>
                        <h3 className="text-xs font-black uppercase text-gray-400 tracking-[0.1em]">AI-Generated Simplified Transcript</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg md:text-xl font-medium italic">
                        "In physics, a <span className="text-blue-700 bg-blue-50 px-2 rounded-md font-bold not-italic">Scalar</span> is just a number. But a <span className="text-indigo-700 bg-indigo-50 px-2 rounded-md font-bold not-italic">Vector</span> is a number plus a direction—like where you are going."
                    </p>
                </section>
            </div>
          )}

          {/* VIEW 2: UPLOAD (AI Content Training) */}
          {activeTab === 'upload' && (
            <div className="max-w-3xl mx-auto text-center animate-in fade-in zoom-in duration-500">
                <div className={`bg-white p-16 rounded-[2.5rem] border-4 border-dashed transition-all duration-700 shadow-xl ${
                    uploadStatus === 'uploading' ? 'border-blue-400 bg-blue-50/20 scale-95' : 
                    uploadStatus === 'success' ? 'border-green-400 bg-green-50/20' : 'border-gray-200'
                }`}>
                    <div className="flex flex-col items-center">
                        <div className={`p-8 rounded-full mb-8 transition-all duration-700 ${
                            uploadStatus === 'uploading' ? 'bg-blue-100 animate-pulse scale-110' : 
                            uploadStatus === 'success' ? 'bg-green-100 scale-125' : 'bg-blue-50'
                        }`}>
                            {uploadStatus === 'success' ? (
                                <CheckCircle size={56} className="text-green-600" />
                            ) : (
                                <CloudUpload size={56} className={uploadStatus === 'uploading' ? 'text-blue-600' : 'text-[#005a8c]'} />
                            )}
                        </div>

                        <h3 className="text-3xl font-black mb-3">
                            {uploadStatus === 'uploading' ? 'AI Analyzing Material' : 
                             uploadStatus === 'success' ? 'Analysis Complete!' : 'Upload STEM Material'}
                        </h3>
                        
                        <p className="text-gray-500 text-base mb-10 max-w-sm mx-auto leading-relaxed font-medium">
                            {uploadStatus === 'uploading' ? 'Processing STEM keywords and mapping them to visual sign coordinates.' : 
                             'Drop your textbooks or lecture transcripts to generate sign language context.'}
                        </p>
                        
                        {/* Progress Bar (Visible while processing) */}
                        {uploadStatus === 'uploading' && (
                            <div className="w-full max-w-sm h-3 bg-gray-200 rounded-full mb-10 overflow-hidden shadow-inner">
                                <div className="h-full bg-blue-600 transition-all ease-linear" style={{ width: '100%', animation: 'progress 2.8s linear' }}></div>
                            </div>
                        )}

                        {uploadStatus === 'idle' && (
                            <>
                                <input type="file" id="fileInput" className="hidden" onChange={handleUpload}/>
                                <label htmlFor="fileInput" className="bg-[#005a8c] text-white px-10 py-4 rounded-2xl font-black cursor-pointer hover:bg-blue-800 transition-all shadow-xl hover:-translate-y-1 active:scale-95 text-base tracking-tight">
                                    Analyze New Material
                                </label>
                            </>
                        )}
                    </div>
                </div>

                <div className="mt-12 grid grid-cols-3 gap-6 text-left opacity-60">
                    <div className="p-5 border rounded-2xl bg-white shadow-sm"><Database size={18} className="mb-2 text-blue-600"/><div className="font-bold">1. File Storage</div><div className="text-[10px]">Reference PDF/TXT</div></div>
                    <div className="p-5 border rounded-2xl bg-white shadow-sm"><Cpu size={18} className="mb-2 text-indigo-600"/><div className="font-bold">2. NLP Engine</div><div className="text-[10px]">Keyword Extraction</div></div>
                    <div className="p-5 border rounded-2xl bg-white shadow-sm"><Activity size={18} className="mb-2 text-emerald-600"/><div className="font-bold">3. Visual Sync</div><div className="text-[10px]">Coordinate Mapping</div></div>
                </div>
            </div>
          )}
        </div>
      </main>

      {/* --- RIGHT SIDEBAR (Course Context) --- */}
      <aside className={`bg-white border-l border-gray-200 p-8 flex flex-col transition-all duration-300 z-20 ${isRightOpen ? 'w-80' : 'w-0 overflow-hidden opacity-0 p-0'}`}>
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-8">AI Intelligence</h3>
        
        <div className="space-y-10 whitespace-nowrap">
          <section>
            <h4 className="text-[11px] font-bold text-gray-400 uppercase mb-4 tracking-wider">Sync Keywords</h4>
            <div className="flex flex-wrap gap-2">
              {['Magnitude', 'Direction', 'Scalar', 'Vector', 'Kinematics'].map(t => (
                <span key={t} className="text-[10px] font-bold bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 text-gray-600 hover:text-blue-600 hover:border-blue-200 cursor-default transition-colors">
                  {t}
                </span>
              ))}
            </div>
          </section>

          <section className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 whitespace-normal">
            <h4 className="text-[10px] font-black text-blue-800 uppercase mb-3 flex items-center gap-2">
                <Info size={14}/> Context Source
            </h4>
            <p className="text-[11px] text-blue-700 italic font-bold leading-relaxed">
              {uploadStatus === 'success' || activeTab === 'dashboard' ? 
                '"Physics_Volume1_Ch1.pdf" is being used to map technical terms to sign coordinates.' : 
                'No reference material provided yet.'
              }
            </p>
          </section>
        </div>
      </aside>

      {/* Embedded CSS for the progress animation */}
      <style jsx global>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}

// --- SUB-COMPONENT: NavItem ---
const NavItem = ({ icon, label, active = false, isSub = false, onClick }: { icon?: React.ReactNode, label: string, active?: boolean, isSub?: boolean, onClick?: () => void }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer text-[13px] transition-all whitespace-nowrap ${
        active ? 'bg-blue-50 text-[#005a8c] font-black shadow-sm translate-x-1' : 'hover:bg-gray-50 text-gray-500 font-medium'
    } ${isSub ? 'ml-6 border-l-2 pl-4' : ''}`}
  >
    {icon}
    <span className="truncate">{label}</span>
    {!icon && !isSub && <ChevronRight size={14} className="ml-auto opacity-30" />}
  </div>
);