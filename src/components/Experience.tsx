import React, { useRef } from 'react';
import { MapPin, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { FadeIn } from './ReusableComponents';
import { cn } from '../lib/utils';

// High-fidelity custom SVG logos matching the screenshot
const SilicofellerLogo = () => (
  <svg viewBox="0 0 100 100" className="w-6 h-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="84" height="84" fill="none" stroke="#7C3AED" strokeWidth="8" rx="2" />
    <text x="50" y="44" textAnchor="middle" fontSize="17" fontWeight="bold" fontFamily="sans-serif" fill="#7C3AED" letterSpacing="0.5">SILICO</text>
    <text x="50" y="70" textAnchor="middle" fontSize="17" fontWeight="bold" fontFamily="sans-serif" fill="#7C3AED" letterSpacing="0.5">FELLER</text>
  </svg>
);

const NTILogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-[#0284C7] stroke-2 flex-shrink-0">
    <rect x="3" y="3" width="18" height="18" rx="3" stroke="#0284C7" />
    <path d="M8 16V8l8 8V8" stroke="#0284C7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GGNLogo = () => (
  <svg viewBox="0 0 100 100" className="w-6 h-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
    {/* Left G Ring */}
    <path
      d="M 38 28 
         C 20 28, 12 40, 12 55 
         C 12 70, 20 82, 38 82 
         C 48 82, 54 75, 54 64 
         L 38 64 
         L 38 52 
         L 60 52 
         C 60 53, 60 83, 38 83 
         C 18 83, 2 69, 2 55 
         C 2 41, 18 27, 38 27 Z"
      fill="#10B981"
    />
    {/* Right G Ring */}
    <path
      d="M 62 28 
         C 44 28, 36 40, 36 55 
         C 36 70, 44 82, 62 82 
         C 72 82, 78 75, 78 64 
         L 62 64 
         L 62 52 
         L 84 52 
         C 84 53, 84 83, 62 83 
         C 42 83, 26 69, 26 55 
         C 26 41, 42 27, 62 27 Z"
      fill="#10B981"
    />
    {/* NATION text below */}
    <text x="50" y="98" textAnchor="middle" fontSize="13" fontWeight="900" fontFamily="sans-serif" fill="#10B981" letterSpacing="0.5">NATION</text>
  </svg>
);

interface TimelineEvent {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  icon: React.ReactNode;
  nodeClass: string;
  colorHex: string;
  position: 'top' | 'bottom';
  year: string;
  badges: string[];
  commitHash: string;
}

export function Experience() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const TIMELINE_EVENTS: TimelineEvent[] = [
    {
      role: 'Content Creator',
      company: 'GoodGameNation',
      period: 'Sep 2022 — Dec 2023',
      location: 'Remote',
      description: 'Created engaging gaming content and managed brand distribution.',
      icon: <GGNLogo />,
      nodeClass: 'bg-[#10B981] border-[#10B981] text-white shadow-[#10B981]/30',
      colorHex: '#10B981',
      position: 'top',
      year: '2022',
      commitHash: 'commit ggn_01',
      badges: ['Content Creation', 'Remote Collaboration', 'Digital Media', 'Marketing']
    },
    {
      role: 'Full Stack Developer Intern',
      company: 'New Technology Institutions',
      period: 'Dec 2023',
      location: 'India',
      description: 'Translated requirements into structured UI specifications and built tested React components.',
      icon: <NTILogo />,
      nodeClass: 'bg-[#0284C7] border-[#0284C7] text-white shadow-[#0284C7]/30',
      colorHex: '#0284C7',
      position: 'bottom',
      year: '2023',
      commitHash: 'commit nti_02',
      badges: ['React', 'UI/UX', 'Full Stack Development', 'Unit Testing']
    },
    {
      role: 'Quantum Engineer',
      company: 'Silicofeller',
      period: 'May 2026 — Present',
      location: 'India',
      description: 'Developed core AI capabilities to automate chip design and validation.',
      icon: <SilicofellerLogo />,
      nodeClass: 'bg-[#7C3AED] border-[#7C3AED] text-white shadow-[#7C3AED]/30',
      colorHex: '#7C3AED',
      position: 'top',
      year: '2026',
      commitHash: 'commit sf_03',
      badges: ['Quantum Computing', 'AI Engineering', 'EDA', 'Superconducting Chips']
    }
  ];

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-full w-full bg-transparent text-[var(--vscode-text)] p-4 sm:p-8 flex flex-col font-sans select-none animate-fadeIn relative overflow-visible">

      {/* Decorative starry backdrop */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent pointer-events-none z-0" />

      {/* Page Header */}
      <FadeIn delay={0.1} y={20} className="border-b border-[var(--vscode-border)] pb-3 mb-6 flex-shrink-0 relative z-10">
        <div className="flex items-center gap-2 mb-1 select-none">
          <span className="text-[var(--vscode-text-muted)] text-3xl font-extralight select-none">|</span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--vscode-text)] tracking-tight uppercase">
            Experience
          </h1>
        </div>
      </FadeIn>

      {/* Horizontal Timeline Container */}
      <div className="flex-grow flex items-center justify-center relative w-full z-10 min-h-[460px] py-2">

        {/* Left Arrow button */}
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-0 z-30 w-8 h-8 rounded-full bg-[var(--vscode-titlebar-bg)] border border-[var(--vscode-border)] text-[var(--vscode-text-muted)] hover:text-[var(--vscode-text)] hover:bg-[var(--vscode-border)] flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Horizontal Scrolling Box */}
        <div
          ref={scrollContainerRef}
          className="flex-grow overflow-x-auto hide-scrollbar w-full flex items-center py-4 px-10 min-h-[460px] relative select-none scroll-smooth"
        >
          <div className="flex flex-row items-center gap-10 sm:gap-14 relative py-2">

            {/* Main Horizontal Timeline Line with gradient */}
            <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 top-1/2 -translate-y-1/2 z-0" />

            {/* Timeline Columns */}
            {TIMELINE_EVENTS.map((event, index) => (
              <div key={index} className="flex flex-col items-center w-[270px] sm:w-[300px] flex-shrink-0 z-10 relative group">
                {/* Backdrop Year Mark - Clean filled text */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[55px] sm:text-[70px] font-extrabold text-current opacity-20 font-sans tracking-tighter pointer-events-none select-none z-0 transition-all duration-300 group-hover:opacity-35"
                >
                  {event.year}
                </div>

                {/* Top Slot Container */}
                <div className="h-[175px] w-full flex items-end justify-center pb-4">
                  {event.position === 'top' && (
                    <div className="relative w-full bg-[var(--vscode-tab-inactive-bg)]/80 backdrop-blur-sm border border-[var(--vscode-border)] p-4 rounded-xl shadow-xl transition-all duration-300 hover:border-blue-500/40 hover:bg-[var(--vscode-tab-inactive-bg)] hover:-translate-y-1 group">
                      {/* Line connector pointing to Timeline */}
                      <div
                        className="absolute left-1/2 -translate-x-1/2 bottom-[-40px] w-[1.5px] h-[56px] opacity-35 group-hover:opacity-80 transition-opacity"
                        style={{ backgroundColor: event.colorHex }}
                      />
                      <CardContent event={event} />
                    </div>
                  )}
                </div>

                {/* Middle Connector - Empty spacer to allow clean background years and vertical spacing */}
                <div className="h-20 w-10 flex items-center justify-center relative z-20" />

                {/* Bottom Slot Container */}
                <div className="h-[175px] w-full flex items-start justify-center pt-4">
                  {event.position === 'bottom' && (
                    <div className="relative w-full bg-[var(--vscode-tab-inactive-bg)]/80 backdrop-blur-sm border border-[var(--vscode-border)] p-4 rounded-xl shadow-xl transition-all duration-300 hover:border-blue-500/40 hover:bg-[var(--vscode-tab-inactive-bg)]/80 hover:translate-y-1 group">
                      {/* Line connector pointing to Timeline */}
                      <div
                        className="absolute left-1/2 -translate-x-1/2 top-[-40px] w-[1.5px] h-[56px] opacity-35 group-hover:opacity-80 transition-opacity"
                        style={{ backgroundColor: event.colorHex }}
                      />
                      <CardContent event={event} />
                    </div>
                  )}
                </div>

              </div>
            ))}

          </div>
        </div>

        {/* Right Arrow button */}
        <button
          onClick={() => handleScroll('right')}
          className="absolute right-0 z-30 w-8 h-8 rounded-full bg-[var(--vscode-titlebar-bg)] border border-[var(--vscode-border)] text-[var(--vscode-text-muted)] hover:text-[var(--vscode-text)] hover:bg-[var(--vscode-border)] flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

      </div>

    </div>
  );
}

// Inner Card Content component - Optimized for vertical height
const CardContent = ({ event }: { event: TimelineEvent }) => (
  <div className="select-text flex flex-col justify-between h-full">
    {/* Header detail */}
    <div className="flex gap-3 items-center mb-2.5">
      <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white border border-[var(--vscode-border)] flex-shrink-0 p-1.5">
        {event.icon}
      </div>
      <div className="min-w-0 text-left">
        <h3 className="font-bold text-xs sm:text-sm text-[var(--vscode-text)] leading-tight select-text truncate">
          {event.role}
        </h3>
        <p className="text-[11px] text-[var(--vscode-text-muted)] font-semibold mt-0.5 select-text truncate">
          {event.company}
        </p>
      </div>
    </div>

    {/* Date and Location Row */}
    <div className="flex items-center gap-4 text-[10px] text-[var(--vscode-text-muted)] mb-2.5 text-left font-sans select-none">
      <div className="flex items-center gap-1">
        <Calendar className="w-3.5 h-3.5 text-[var(--vscode-text-muted)]" />
        <span>{event.period}</span>
      </div>
      <div className="flex items-center gap-1">
        <MapPin className="w-3.5 h-3.5 text-[var(--vscode-text-muted)]" />
        <span>{event.location}</span>
      </div>
    </div>

    <p className="text-[10px] sm:text-[11px] text-[var(--vscode-text)]/85 leading-relaxed mb-3 text-left font-sans select-text">
      {event.description}
    </p>

    <div className="flex flex-wrap gap-1.5">
      {event.badges.slice(0, 4).map((badge, bIdx) => (
        <span
          key={bIdx}
          className="bg-[var(--vscode-editor-bg)]/45 text-[9px] text-[#4EC9B0] font-mono px-2 py-0.5 rounded border border-[var(--vscode-border)] select-none hover:bg-[#4EC9B0]/5 transition-colors"
        >
          {badge}
        </span>
      ))}
      {event.badges.length > 4 && (
        <span className="text-[10px] text-[var(--vscode-text-muted)] font-mono px-1 select-none font-bold">
          +{event.badges.length - 4}
        </span>
      )}
    </div>
  </div>
);

export default Experience;
