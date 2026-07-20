import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  KeyRound, ShieldCheck, Globe, MousePointerClick, RefreshCw, Lock, 
  CopyX, PhoneCall, WifiOff, AlertTriangle, Link2, SpellCheck, 
  Clock, ShieldAlert, Gift, Globe2, Shield, Play, RotateCcw, 
  CheckCircle, XCircle, Info, ChevronRight, Menu, X, ArrowRight,
  Sparkles, Award, ExternalLink, BookOpen, AlertCircle, Check
} from 'lucide-react';

import { SCENARIOS } from './data/scenarios';
import { CHECKLIST_ITEMS } from './data/checklist';
import { CYBER_TIPS } from './data/tips';
import { InteractiveMockup } from './components/InteractiveMockup';

export default function App() {
  // Navigation & View state
  const [activeTab, setActiveTab] = useState<'home' | 'simulator' | 'checklist' | 'tips'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Simulator/Quiz states
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Array<'selamat' | 'phishing' | null>>([null, null, null, null, null]);
  const [quizState, setQuizState] = useState<'idle' | 'answered' | 'completed'>('idle');
  const [selectedRedFlagId, setSelectedRedFlagId] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  // Active checklist details modal / focus
  const [activeChecklistId, setActiveChecklistId] = useState<string | null>('link_pelik');

  // Active expanded cyber tip
  const [expandedTipId, setExpandedTipId] = useState<number | null>(1);

  // Reset simulator
  const resetSimulator = () => {
    setCurrentScenarioIndex(0);
    setQuizAnswers([null, null, null, null, null]);
    setQuizState('idle');
    setSelectedRedFlagId(null);
    setScore(0);
    setActiveTab('simulator');
  };

  // Handle quiz selection
  const handleAnswer = (answer: 'selamat' | 'phishing') => {
    if (quizState === 'answered') return;

    const currentScenario = SCENARIOS[currentScenarioIndex];
    const isCorrect = answer === currentScenario.correctAnswer;
    
    // Update quiz answers array
    const updatedAnswers = [...quizAnswers];
    updatedAnswers[currentScenarioIndex] = answer;
    setQuizAnswers(updatedAnswers);

    // Update score
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setQuizState('answered');
    
    // Set first red flag as active to educate
    if (currentScenario.redFlags.length > 0) {
      setSelectedRedFlagId(currentScenario.redFlags[0].id);
    }
  };

  // Move to next scenario or complete
  const handleNext = () => {
    setSelectedRedFlagId(null);
    if (currentScenarioIndex < SCENARIOS.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
      setQuizState('idle');
    } else {
      setQuizState('completed');
    }
  };

  // Helper to map checklist icons
  const renderChecklistIcon = (iconName: string, className?: string) => {
    switch (iconName) {
      case 'Link2': return <Link2 className={className} />;
      case 'SpellCheck': return <SpellCheck className={className} />;
      case 'Clock': return <Clock className={className} />;
      case 'ShieldAlert': return <ShieldAlert className={className} />;
      case 'Gift': return <Gift className={className} />;
      case 'Globe2': return <Globe2 className={className} />;
      default: return <Info className={className} />;
    }
  };

  // Helper to map cyber tip icons
  const renderTipIcon = (iconName: string, className?: string) => {
    switch (iconName) {
      case 'KeyRound': return <KeyRound className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'Globe': return <Globe className={className} />;
      case 'MousePointerClick': return <MousePointerClick className={className} />;
      case 'RefreshCw': return <RefreshCw className={className} />;
      case 'Lock': return <Lock className={className} />;
      case 'CopyX': return <CopyX className={className} />;
      case 'PhoneCall': return <PhoneCall className={className} />;
      case 'WifiOff': return <WifiOff className={className} />;
      case 'AlertTriangle': return <AlertTriangle className={className} />;
      default: return <Info className={className} />;
    }
  };

  // Get Score Badge Details
  const getScoreResultDetails = (finalScore: number) => {
    if (finalScore <= 2) {
      return {
        badge: 'Perlu Lebih Berhati-hati',
        colorClass: 'bg-red-100 text-red-800 border-red-300',
        textColor: 'text-red-500',
        advice: 'Jangan bimbang! Anda baru sahaja memulakan langkah pertama. Luangkan masa untuk membaca Petunjuk Red Flag dan 10 Tips Keselamatan Siber di bawah untuk mengasah deria siber anda.',
        bgAccent: 'from-red-500/10 to-transparent'
      };
    } else if (finalScore <= 4) {
      return {
        badge: 'Baik, Tetapi Masih Perlu Semak',
        colorClass: 'bg-amber-100 text-amber-800 border-amber-300',
        textColor: 'text-amber-600',
        advice: 'Pencapaian yang baik! Anda berjaya mengenal pasti sebahagian besar taktik penipuan. Walau bagaimanapun, scammer sentiasa memperbaharui taktik mereka. Kekalkan sikap skeptikal sebelum menekan sebarang pautan.',
        bgAccent: 'from-amber-500/10 to-transparent'
      };
    } else {
      return {
        badge: 'Cyber Smart!',
        colorClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        textColor: 'text-emerald-500',
        advice: 'Syabas! Anda adalah pengawal keselamatan siber diri sendiri yang hebat. Anda mempunyai pengetahuan mendalam tentang ciri-ciri phishing. Teruskan berkongsi ilmu ini dengan keluarga dan rakan-rakan untuk mengelakkan mereka menjadi mangsa.',
        bgAccent: 'from-emerald-500/10 to-transparent'
      };
    }
  };

  const scoreDetails = getScoreResultDetails(score);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col selection:bg-cyan-500 selection:text-slate-900">
      
      {/* 1. Header Navbar */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800" id="app-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo and Brand */}
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-900 font-bold shadow-md shadow-cyan-500/15">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="font-display font-black text-sm sm:text-base tracking-tight text-white block">
                  Simulator Kesedaran Phishing
                </span>
                <span className="text-[10px] text-cyan-400 font-mono tracking-wider uppercase block -mt-1">
                  LATIHAN KESELAMATAN SIBER
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => setActiveTab('home')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'home' 
                    ? 'bg-slate-800 text-cyan-400 font-semibold' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                Halaman Utama
              </button>
              <button
                onClick={() => {
                  if (quizState === 'completed') {
                    resetSimulator();
                  } else {
                    setActiveTab('simulator');
                  }
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                  activeTab === 'simulator' 
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/20' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Play className="h-3.5 w-3.5 shrink-0" />
                Mula Simulasi
              </button>
              <button
                onClick={() => setActiveTab('checklist')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'checklist' 
                    ? 'bg-slate-800 text-cyan-400 font-semibold' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                Petunjuk Red Flag
              </button>
              <button
                onClick={() => setActiveTab('tips')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'tips' 
                    ? 'bg-slate-800 text-cyan-400 font-semibold' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                10 Tips Siber
              </button>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile menu navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-3 space-y-1">
            <button
              onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                activeTab === 'home' ? 'bg-slate-800 text-cyan-400' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Halaman Utama
            </button>
            <button
              onClick={() => { 
                if (quizState === 'completed') {
                  resetSimulator();
                } else {
                  setActiveTab('simulator');
                }
                setMobileMenuOpen(false); 
              }}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center gap-1.5 ${
                activeTab === 'simulator' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Play className="h-4 w-4 shrink-0" />
              Mula Simulasi
            </button>
            <button
              onClick={() => { setActiveTab('checklist'); setMobileMenuOpen(false); }}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                activeTab === 'checklist' ? 'bg-slate-800 text-cyan-400' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Petunjuk Red Flag
            </button>
            <button
              onClick={() => { setActiveTab('tips'); setMobileMenuOpen(false); }}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                activeTab === 'tips' ? 'bg-slate-800 text-cyan-400' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              10 Tips Keselamatan Siber
            </button>
          </div>
        )}
      </header>

      {/* 2. Main Content Views (Faded state animations) */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8" id="main-content-area">
        
        <AnimatePresence mode="wait">
          
          {/* ==================== VIEW A: HOME PAGE ==================== */}
          {activeTab === 'home' && (
            <motion.div
              key="home-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
              id="home-view-container"
            >
              {/* Hero Banner Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4 md:pt-10">
                
                {/* Hero Text */}
                <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-400 font-mono">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Latihan Kesedaran Keselamatan Siber</span>
                  </div>
                  
                  <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-none">
                    Phishing Awareness <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Simulator</span>
                  </h1>
                  
                  <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                    Kenali taktik penipuan siber, mesej palsu bank, bungkusan kurier, dan perangkap QR code sebelum anda menjadi mangsa kerugian wang ringgit.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                    <button
                      onClick={() => {
                        if (quizState === 'completed') resetSimulator();
                        else setActiveTab('simulator');
                      }}
                      className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-black text-base rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-95"
                    >
                      <Play className="h-5 w-5 fill-slate-950" />
                      Mula Simulasi Sekarang
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </button>
                    
                    <button
                      onClick={() => setActiveTab('checklist')}
                      className="w-full sm:w-auto px-6 py-4 bg-slate-800 text-slate-200 font-medium text-sm rounded-xl hover:bg-slate-700/80 hover:text-white transition-all border border-slate-700/50 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <BookOpen className="h-4 w-4 text-cyan-400" />
                      Ketahui Petunjuk Red Flag
                    </button>
                  </div>
                </div>

                {/* Hero Visual Mockups representation */}
                <div className="lg:col-span-5 relative flex justify-center">
                  <div className="relative w-full max-w-[360px] h-[340px] flex items-center justify-center">
                    
                    {/* Background glowing cyan grid */}
                    <div className="absolute inset-0 bg-cyan-500/10 rounded-3xl blur-3xl -z-10 animate-pulse"></div>
                    
                    {/* Floating simulated cards */}
                    <div className="absolute top-4 left-4 bg-slate-800 border border-slate-700 p-4 rounded-xl shadow-lg w-[240px] transform -rotate-6 transition-transform hover:rotate-0 duration-300 z-10">
                      <div className="flex gap-1.5 mb-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                      </div>
                      <div className="h-2 w-3/4 bg-slate-600 rounded mb-2"></div>
                      <div className="h-2 w-1/2 bg-red-500 rounded mb-1"></div>
                      <div className="text-[9px] font-mono text-red-400">⚠️ Domain Palsu Dikesan</div>
                    </div>

                    <div className="absolute bottom-4 right-4 bg-slate-800 border border-slate-700 p-4 rounded-xl shadow-xl w-[260px] transform rotate-6 transition-transform hover:rotate-0 duration-300 z-20">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-6 w-6 rounded-full bg-green-600 flex items-center justify-center text-[8px] font-bold">PL</div>
                        <div className="h-2 w-16 bg-slate-600 rounded"></div>
                      </div>
                      <div className="h-2 w-full bg-slate-500 rounded mb-1"></div>
                      <div className="h-2 w-4/5 bg-slate-500 rounded mb-2"></div>
                      <div className="text-[10px] text-amber-400 font-mono font-bold">http://poslaju-delivery.icu</div>
                    </div>

                    {/* Central Shield Graphic */}
                    <div className="h-32 w-32 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-2xl relative z-0 animate-bounce" style={{ animationDuration: '6s' }}>
                      <Shield className="h-16 w-16 text-slate-900" />
                    </div>

                  </div>
                </div>

              </div>

              {/* Course & Statistics Bento Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-slate-800">
                
                {/* Block 1: Statistics */}
                <div className="bg-slate-800/50 border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700/80 transition-all">
                  <div className="h-10 w-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-white">Serangan Bermula Di Sini</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Lebih daripada <strong>90% serangan siber</strong> ke atas organisasi bermula dengan emel atau mesej phishing yang berjaya memperdayakan kakitangan.
                  </p>
                </div>

                {/* Block 2: 2-Hour NTW Syllabus suitable */}
                <div className="bg-slate-800/50 border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700/80 transition-all">
                  <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-white">Sesuai untuk Kursus Keselamatan Siber</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Simulator interaktif ini dirangka khusus bagi menyokong modul LATIHAN<strong>AWARENESS</strong> di Malaysia.
                  </p>
                </div>

                {/* Block 3: Interactive Hotspots */}
                <div className="bg-slate-800/50 border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700/80 transition-all">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-white">Latihan Hotspot Interaktif</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Uji keupayaan dengan melihat mockup emel, laman web, QR, dan WhatsApp sebenar. Klik pada penunjuk merah (Red Flags) selepas menjawab untuk belajar.
                  </p>
                </div>

              </div>

              {/* Safety Policy Box */}
              <div className="p-6 bg-slate-800/60 border border-cyan-500/20 rounded-2xl flex flex-col md:flex-row items-center gap-4 shadow-inner" id="disclaimer-hero">
                <div className="h-12 w-12 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-cyan-300">Jaminan Keselamatan Data & Privasi</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Aplikasi ini adalah <strong>simulator fiksyen pendidikan sahaja</strong>. Kami tidak mengumpul, meminta, atau menyimpan sebarang kata laluan, nombor pin, OTP perbankan, atau butiran kad kredit sebenar. Tiada data peribadi anda yang direkodkan ke pelayan luar.
                  </p>
                </div>
              </div>

            </motion.div>
          )}

          {/* ==================== VIEW B: SIMULATOR MODULE ==================== */}
          {activeTab === 'simulator' && quizState !== 'completed' && (
            <motion.div
              key="simulator-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
              id="simulator-view-container"
            >
              {/* Scenario Header Tracker */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-slate-800/50 border border-slate-800 p-4 rounded-2xl">
                <div>
                  <span className="text-xs text-cyan-400 font-mono uppercase tracking-wider block">MODUL SIMULASI ({currentScenarioIndex + 1} / 5)</span>
                  <h2 className="font-display font-bold text-xl text-white mt-0.5">
                    {SCENARIOS[currentScenarioIndex].title}
                  </h2>
                </div>
                {/* Progress Indicators */}
                <div className="flex items-center gap-1.5 w-full sm:w-auto">
                  {SCENARIOS.map((s, idx) => (
                    <div 
                      key={s.id}
                      className={`h-2 flex-1 sm:w-10 rounded-full transition-all duration-300 ${
                        idx === currentScenarioIndex
                          ? 'bg-cyan-500 shadow-sm shadow-cyan-500/50'
                          : idx < currentScenarioIndex
                          ? 'bg-blue-600'
                          : 'bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Main Quiz Arena Split Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left Side: Mockup Frame (7 Cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="bg-slate-950 p-2 sm:p-4 rounded-2xl border border-slate-800 shadow-xl">
                    <InteractiveMockup
                      scenario={SCENARIOS[currentScenarioIndex]}
                      revealRedFlags={quizState === 'answered'}
                      selectedRedFlagId={selectedRedFlagId}
                      onSelectRedFlag={(id) => setSelectedRedFlagId(id)}
                    />
                  </div>
                  <div className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1">
                    <Info className="h-3 w-3" />
                    <span>Halaman di atas adalah lakaran simulasi fiksyen untuk tujuan pendidikan keselamatan.</span>
                  </div>
                </div>

                {/* Right Side: Quiz Actions and Explanations (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Phase 1: Question Form */}
                  {quizState === 'idle' && (
                    <div className="bg-slate-800 border border-slate-700/80 rounded-2xl p-6 shadow-lg space-y-6 animate-fadeIn">
                      <div className="space-y-2">
                        <span className="px-2.5 py-1 rounded bg-slate-700 text-slate-300 text-xs font-mono">Keputusan Anda</span>
                        <h3 className="font-display font-black text-xl text-white pt-2 leading-tight">
                          Adakah mesej atau paparan di sebelah selamat atau phishing?
                        </h3>
                        <p className="text-xs text-slate-400">
                          Periksa maklumat pengirim, alamat URL, nada mesej, dan sebarang tawaran dengan teliti sebelum membuat pilihan.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {/* SAFE Button */}
                        <button
                          onClick={() => handleAnswer('selamat')}
                          className="py-4 px-4 bg-emerald-600/10 hover:bg-emerald-600/25 text-emerald-400 border border-emerald-500/30 rounded-xl font-bold text-sm tracking-wide transition-all hover:scale-[1.02] flex flex-col items-center justify-center gap-2 group cursor-pointer"
                        >
                          <CheckCircle className="h-6 w-6 text-emerald-500 group-hover:scale-110 transition-transform" />
                          <span>Selamat (Safe)</span>
                        </button>

                        {/* PHISHING Button */}
                        <button
                          onClick={() => handleAnswer('phishing')}
                          className="py-4 px-4 bg-red-600/10 hover:bg-red-600/25 text-red-400 border border-red-500/30 rounded-xl font-bold text-sm tracking-wide transition-all hover:scale-[1.02] flex flex-col items-center justify-center gap-2 group cursor-pointer"
                        >
                          <ShieldAlert className="h-6 w-6 text-red-500 group-hover:scale-110 transition-transform animate-pulse" />
                          <span>Phishing / Scam</span>
                        </button>
                      </div>

                      {/* Sticky Hint block */}
                      <div className="p-3 bg-slate-900/60 rounded-xl text-[11px] text-slate-400 leading-normal flex gap-2">
                        <span className="text-sm">💡</span>
                        <span><strong>Petunjuk:</strong> Anda boleh melihat pautan yang dipaparkan dalam bar alamat web pelayar atau teks e-mel pengirim untuk mencari keganjilan.</span>
                      </div>
                    </div>
                  )}

                  {/* Phase 2: Immediate Feedback with Red Flag Explanations */}
                  {quizState === 'answered' && (
                    <div className="space-y-6 animate-fadeIn">
                      
                      {/* Correct / Incorrect Header Card */}
                      <div className={`border rounded-2xl p-5 shadow-lg ${
                        quizAnswers[currentScenarioIndex] === SCENARIOS[currentScenarioIndex].correctAnswer
                          ? 'bg-emerald-950/40 border-emerald-500/40'
                          : 'bg-red-950/40 border-red-500/40'
                      }`}>
                        <div className="flex items-center gap-3">
                          {quizAnswers[currentScenarioIndex] === SCENARIOS[currentScenarioIndex].correctAnswer ? (
                            <div className="h-10 w-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/50">
                              <Check className="h-6 w-6 stroke-[3]" />
                            </div>
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 border border-red-500/50">
                              <X className="h-6 w-6 stroke-[3]" />
                            </div>
                          )}
                          <div>
                            <h3 className="font-display font-bold text-base text-white">
                              {quizAnswers[currentScenarioIndex] === SCENARIOS[currentScenarioIndex].correctAnswer
                                ? 'Jawapan Anda Betul!'
                                : 'Jawapan Anda Kurang Tepat!'}
                            </h3>
                            <p className="text-xs text-slate-300 mt-0.5">
                              Senario ini adalah <strong>Phishing / Scam</strong>.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Educational Explanation Details Box */}
                      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 space-y-4 shadow-md">
                        <div>
                          <h4 className="text-xs text-cyan-400 font-mono uppercase tracking-wider">Bagaimana Mengenal Pasti?</h4>
                          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                            {SCENARIOS[currentScenarioIndex].fullExplanation}
                          </p>
                        </div>

                        {/* Interactive red flags indicator tabs inside panel */}
                        <div className="space-y-2">
                          <span className="text-[11px] text-amber-400 font-bold block">Petunjuk Red Flag Tersembunyi (Klik untuk lihat):</span>
                          <div className="flex flex-wrap gap-1.5">
                            {SCENARIOS[currentScenarioIndex].redFlags.map((flag) => (
                              <button
                                key={flag.id}
                                onClick={() => setSelectedRedFlagId(flag.id)}
                                className={`text-[11px] py-1.5 px-3 rounded-lg border transition-all text-left flex items-center gap-1.5 ${
                                  selectedRedFlagId === flag.id
                                    ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-600'
                                }`}
                              >
                                <span className={`h-1.5 w-1.5 rounded-full ${
                                  selectedRedFlagId === flag.id ? 'bg-slate-950' : 'bg-amber-400'
                                }`} />
                                {flag.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Safety Tip */}
                        <div className="p-3 bg-cyan-950/30 border border-cyan-500/20 rounded-xl">
                          <h5 className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                            <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
                            Tips Pencegahan Siber:
                          </h5>
                          <p className="text-xs text-slate-200 mt-1.5 leading-relaxed font-sans">
                            {SCENARIOS[currentScenarioIndex].safetyTip}
                          </p>
                        </div>
                      </div>

                      {/* Action Button: Next Question */}
                      <button
                        onClick={handleNext}
                        className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-black rounded-xl hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {currentScenarioIndex < SCENARIOS.length - 1 ? (
                          <>
                            <span>Senario Seterusnya</span>
                            <ChevronRight className="h-5 w-5" />
                          </>
                        ) : (
                          <>
                            <span>Lihat Keputusan Simulasi</span>
                            <Award className="h-5 w-5" />
                          </>
                        )}
                      </button>

                    </div>
                  )}

                </div>

              </div>

            </motion.div>
          )}

          {/* ==================== VIEW C: SCORE REPORT ==================== */}
          {quizState === 'completed' && activeTab === 'simulator' && (
            <motion.div
              key="score-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto space-y-6"
              id="score-view-container"
            >
              <div className="bg-slate-800 border border-slate-700/80 rounded-3xl p-8 shadow-2xl relative overflow-hidden text-center">
                
                {/* Background score accent */}
                <div className={`absolute top-0 inset-x-0 h-32 bg-gradient-to-b ${scoreDetails.bgAccent} -z-10`} />

                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 border-2 border-cyan-500 text-cyan-400 mb-4 animate-bounce">
                  <Award className="h-8 w-8" />
                </div>

                <span className="text-xs text-cyan-400 font-mono uppercase tracking-wider block">KAD PRESTASI KESEDARAN SIBER</span>
                <h1 className="font-display font-black text-3xl text-white mt-1">Simulator Selesai!</h1>

                {/* Main Score Bubble */}
                <div className="my-8 relative inline-block">
                  <div className="h-36 w-36 rounded-full border-4 border-slate-700 flex flex-col items-center justify-center bg-slate-900 mx-auto shadow-inner relative">
                    <span className="text-5xl font-black text-white">{score}</span>
                    <span className="text-xs text-slate-400 font-mono mt-1">daripada 5</span>
                    
                    {/* Ring indicator based on score */}
                    <svg className="absolute inset-0 -m-1 h-38 w-38 transform -rotate-90">
                      <circle
                        cx="76"
                        cy="76"
                        r="72"
                        className="stroke-cyan-500 fill-none"
                        strokeWidth="4"
                        strokeDasharray={`${(2 * Math.PI * 72)}`}
                        strokeDashoffset={`${(2 * Math.PI * 72) * (1 - score / 5)}`}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Score Evaluation Badge */}
                <div className="max-w-md mx-auto space-y-4">
                  <div className="flex justify-center">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border ${scoreDetails.colorClass}`}>
                      {scoreDetails.badge}
                    </span>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed font-sans px-4">
                    {scoreDetails.advice}
                  </p>
                </div>

                {/* Breakdown summary cards */}
                <div className="grid grid-cols-5 gap-2 max-w-sm mx-auto mt-8">
                  {quizAnswers.map((ans, idx) => (
                    <div 
                      key={idx}
                      className={`p-2.5 rounded-lg border text-center ${
                        ans === SCENARIOS[idx].correctAnswer
                          ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-400'
                          : 'bg-red-950/20 border-red-500/30 text-red-400'
                      }`}
                    >
                      <div className="text-[10px] font-mono text-slate-400">#0{idx + 1}</div>
                      <div className="text-xs font-bold mt-1">
                        {ans === SCENARIOS[idx].correctAnswer ? '✓' : '✗'}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick actions inside card */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
                  <button
                    onClick={resetSimulator}
                    className="w-full sm:w-auto px-6 py-3 bg-cyan-500 text-slate-950 font-black rounded-xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="h-4 w-4 shrink-0" />
                    Uji Semula (Reset)
                  </button>
                  <button
                    onClick={() => setActiveTab('checklist')}
                    className="w-full sm:w-auto px-6 py-3 bg-slate-700 text-slate-200 hover:bg-slate-600 transition-all rounded-xl font-medium flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen className="h-4 w-4 text-cyan-400" />
                    Ulang Kaji Red Flags
                  </button>
                </div>

              </div>

              {/* Shared course info card for NTW course */}
              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-5 text-center text-xs text-slate-400 leading-relaxed">
                📢 Terima kasih kerana menyelesaikan modul simulasi ini. Kongsikan prestasi anda bersama pengajar kursus <strong>KESELAMATAN SIBER</strong> untuk mencatat kehadiran latihan kesedaran keselamatan siber anda.
              </div>

            </motion.div>
          )}

          {/* ==================== VIEW D: RED FLAGS CHECKLIST ==================== */}
          {activeTab === 'checklist' && (
            <motion.div
              key="checklist-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
              id="checklist-view-container"
            >
              {/* Checklist Headers */}
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <h1 className="font-display font-black text-3xl text-white tracking-tight">
                  Petunjuk Red Flag Siber
                </h1>
                <p className="text-sm text-slate-400">
                  Pelajari 6 tanda merah kritikal yang sering ditemui dalam setiap mesej atau e-mel penipuan siber.
                </p>
              </div>

              {/* Interactive Checklist Explorer Split Box */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                
                {/* Left navigation column (5 Cols) */}
                <div className="md:col-span-5 space-y-2.5">
                  {CHECKLIST_ITEMS.map((item) => {
                    const active = activeChecklistId === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveChecklistId(item.id)}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4 ${
                          active
                            ? 'bg-gradient-to-r from-slate-800 to-slate-800/80 border-cyan-500 text-white shadow-md'
                            : 'bg-slate-800/40 border-slate-800/80 text-slate-300 hover:bg-slate-800/60 hover:text-white'
                        }`}
                      >
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          active ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-cyan-400'
                        }`}>
                          {renderChecklistIcon(item.iconName, 'h-5 w-5')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm truncate">{item.title}</div>
                          <div className="text-[11px] text-slate-400 truncate mt-0.5">{item.description}</div>
                        </div>
                        <ChevronRight className={`h-4 w-4 shrink-0 transition-transform ${
                          active ? 'text-cyan-400 translate-x-1' : 'text-slate-500'
                        }`} />
                      </button>
                    );
                  })}
                </div>

                {/* Right detailed display column (7 Cols) */}
                <div className="md:col-span-7 bg-slate-800/80 border border-slate-700/50 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-xl">
                  {activeChecklistId ? (
                    (() => {
                      const item = CHECKLIST_ITEMS.find(i => i.id === activeChecklistId)!;
                      return (
                        <div className="space-y-6 flex-1 flex flex-col justify-between">
                          <div className="space-y-4">
                            
                            {/* Icon & Title */}
                            <div className="flex items-center gap-3">
                              <div className="h-12 w-12 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
                                {renderChecklistIcon(item.iconName, 'h-6 w-6')}
                              </div>
                              <div>
                                <h3 className="font-display font-black text-xl text-white">{item.title}</h3>
                                <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-wider">CIRI BAHAYA SIBER</span>
                              </div>
                            </div>

                            {/* Long Description */}
                            <p className="text-sm text-slate-300 leading-relaxed font-sans pt-2">
                              {item.description}
                            </p>

                            {/* Example box (styled elegantly in monospace or dark block) */}
                            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/80 space-y-2">
                              <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest block">Contoh Taktik Scam:</span>
                              <p className="text-xs text-slate-200 font-mono leading-relaxed bg-slate-950/40 p-3 rounded border border-slate-800">
                                {item.example}
                              </p>
                            </div>

                          </div>

                          {/* Quick educational checklist reminder */}
                          <div className="pt-6 border-t border-slate-700/80 flex items-center gap-2 text-xs text-slate-400">
                            <Info className="h-4 w-4 text-cyan-400 shrink-0" />
                            <span>Sentiasa berwaspada apabila terjumpa ciri di atas pada sebarang kiriman rawak.</span>
                          </div>
                        </div>
                      );
                    })()
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 p-8">
                      <ShieldAlert className="h-12 w-12 text-slate-600 mb-2 animate-pulse" />
                      <span>Sila pilih salah satu petunjuk red flag di sebelah kiri untuk melihat penerangan lanjut.</span>
                    </div>
                  )}
                </div>

              </div>

            </motion.div>
          )}

          {/* ==================== VIEW E: 10 CYBER TIPS PAGE ==================== */}
          {activeTab === 'tips' && (
            <motion.div
              key="tips-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
              id="tips-view-container"
            >
              {/* Tips Headers */}
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h1 className="font-display font-black text-3xl text-white tracking-tight">
                  10 Tips Amalan Kebersihan Siber
                </h1>
                <p className="text-sm text-slate-400">
                  Ikuti langkah-langkah pertahanan siber (Cyber Hygiene) untuk mengurangkan risiko digodam dan melindungi maklumat peribadi anda.
                </p>
              </div>

              {/* Tips Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left Side: Tips list cards (7 Cols) */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {CYBER_TIPS.map((tip) => {
                    const expanded = expandedTipId === tip.id;
                    return (
                      <button
                        key={tip.id}
                        onClick={() => setExpandedTipId(tip.id)}
                        className={`text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 group cursor-pointer ${
                          expanded
                            ? 'bg-slate-800 border-cyan-500 shadow-md ring-1 ring-cyan-500/30'
                            : 'bg-slate-800/40 border-slate-800/80 hover:bg-slate-800/60'
                        }`}
                      >
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                          expanded ? 'bg-cyan-500 text-slate-950 scale-105' : 'bg-slate-800 text-cyan-400 group-hover:text-cyan-300'
                        }`}>
                          {renderTipIcon(tip.iconName, 'h-5 w-5')}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] font-mono text-cyan-400">Tips #{tip.id}</span>
                          </div>
                          <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-cyan-300 transition-colors leading-tight">
                            {tip.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                            {tip.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Right Side: Detailed expanded card container (5 Cols) */}
                <div className="lg:col-span-5 bg-slate-800/90 border border-slate-700/50 rounded-2xl p-6 md:p-8 shadow-xl sticky top-24">
                  {expandedTipId ? (
                    (() => {
                      const tip = CYBER_TIPS.find(t => t.id === expandedTipId)!;
                      return (
                        <div className="space-y-6">
                          
                          {/* Title block */}
                          <div className="space-y-2">
                            <span className="text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2.5 py-1 rounded font-mono">
                              HURAIAN LENGKAP TIPS KESELAMATAN #{tip.id}
                            </span>
                            <div className="flex items-center gap-3 pt-3">
                              <div className="h-12 w-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                                {renderTipIcon(tip.iconName, 'h-6 w-6')}
                              </div>
                              <h3 className="font-display font-black text-lg text-white leading-tight">
                                {tip.title}
                              </h3>
                            </div>
                          </div>

                          <hr className="border-slate-700/80" />

                          {/* Detail Content */}
                          <div className="space-y-4">
                            <p className="text-xs text-slate-400 italic">
                              &quot;{tip.description}&quot;
                            </p>
                            <p className="text-xs text-slate-300 leading-relaxed font-sans pt-1">
                              {tip.expandedDetails}
                            </p>
                          </div>

                          {/* Quick warning list or CTA */}
                          <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2 leading-relaxed">
                            <AlertCircle className="h-4 w-4 text-cyan-400 shrink-0" />
                            <span>Mengamalkan petunjuk ini secara rutin dapat menghalang sehingga <strong>95% pencerobohan siber</strong> peribadi.</span>
                          </div>

                        </div>
                      );
                    })()
                  ) : (
                    <div className="text-center p-10 text-slate-500">
                      <ShieldCheck className="h-10 w-10 text-slate-700 mx-auto mb-2" />
                      <span>Klik salah satu kotak tips di sebelah untuk membaca huraian terperinci.</span>
                    </div>
                  )}
                </div>

              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* 3. Global Sticky Footer & Disclaimer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-8 mt-12 text-xs text-slate-500" id="global-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Branding details */}
            <div className="space-y-1">
              <span className="font-display font-bold text-slate-300 block">🛡️ Phishing Awareness Simulator</span>
              <p className="text-[11px]">Simulasi pendidikan keselamatan siber interaktif, dibangunkan untuk komuniti digital Malaysia.</p>
            </div>

            {/* Quick footer tab links */}
            <div className="flex flex-wrap justify-center gap-4 text-[11px] text-slate-400">
              <button onClick={() => setActiveTab('home')} className="hover:text-cyan-400 transition-colors">Utama</button>
              <button onClick={() => { if(quizState === 'completed') resetSimulator(); else setActiveTab('simulator'); }} className="hover:text-cyan-400 transition-colors">Simulasi</button>
              <button onClick={() => setActiveTab('checklist')} className="hover:text-cyan-400 transition-colors">Petunjuk Red Flag</button>
              <button onClick={() => setActiveTab('tips')} className="hover:text-cyan-400 transition-colors">Tips Amalan</button>
            </div>

          </div>

          <hr className="border-slate-850" />

          {/* Absolute Mandatory Security Disclaimer */}
          <div className="p-3.5 bg-slate-900/60 rounded-xl border border-red-500/10 text-[11px] leading-relaxed text-slate-400 max-w-4xl mx-auto text-center" id="mandatory-security-disclaimer">
            <span className="font-bold text-red-400 block mb-1">⚠️ PENAFIAN KESELAMATAN (SAFETY DISCLAIMER)</span>
            Simulasi ini dibina hanya untuk <strong>tujuan latihan kesedaran keselamatan siber</strong> sahaja. Laman-laman yang dipaparkan adalah fiksyen dan dipermudahkan bagi membantu pemahaman pengguna. Aplikasi ini <strong>tidak mengumpul, memohon, atau menyimpan</strong> sebarang kata laluan, nombor PIN, kod pengesahan SMS (OTP/TAC), kad bank, atau sebarang data peribadi pengguna yang sebenar. Sila jangan masukkan butiran sulit sebenar anda semasa mencuba simulasi ini.
          </div>

          <div className="text-center text-[10px] text-slate-600 mt-4">
            © 2026 Simulator Kesedaran Phishing. Hak Cipta Terpelihara. 
                      </div>
        </div>
      </footer>

    </div>
  );
}
