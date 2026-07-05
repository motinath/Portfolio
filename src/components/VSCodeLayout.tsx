import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link, Outlet } from 'react-router-dom';
import { 
  Files, Search, GitBranch, Blocks, User, Settings, 
  ChevronDown, ChevronRight, X, Bell, RefreshCw, AlertCircle, Home,
  Briefcase, Code2, Folder, Mail, Tv, Gamepad2, BookOpen, FileText
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface FileItem {
  name: string;
  path: string;
  type: 'tsx' | 'json' | 'md' | 'pdf';
}

interface FolderItem {
  name: string;
  isOpen: boolean;
  files: FileItem[];
}

const ReactTSXIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 2a2 2 0 00-2 2v16a2 2 0 002 2h16a2 2 0 002-2V8l-6-6H4z" fill="#1e1f29" stroke="#2b2b2b" strokeWidth="1" />
    <path d="M14 2v6h6" fill="#2c2d38" stroke="#2b2b2b" strokeWidth="1" />
    <g transform="translate(6.5, 9.5) scale(0.45)" stroke="#00d8ff" strokeWidth="1.5" fill="none">
      <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(30 12 12)" />
      <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(90 12 12)" />
      <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(150 12 12)" />
      <circle cx="12" cy="12" r="2.2" fill="#00d8ff" />
    </g>
  </svg>
);

const JSONIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 2a2 2 0 00-2 2v16a2 2 0 002 2h16a2 2 0 002-2V8l-6-6H4z" fill="#1e1f29" stroke="#2b2b2b" strokeWidth="1" />
    <path d="M14 2v6h6" fill="#2c2d38" stroke="#2b2b2b" strokeWidth="1" />
    <text x="6" y="16" fill="#cbd352" fontSize="9" fontFamily="monospace" fontWeight="bold">{"{}"}</text>
  </svg>
);

const MarkdownIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 2a2 2 0 00-2 2v16a2 2 0 002 2h16a2 2 0 002-2V8l-6-6H4z" fill="#1e1f29" stroke="#2b2b2b" strokeWidth="1" />
    <path d="M14 2v6h6" fill="#2c2d38" stroke="#2b2b2b" strokeWidth="1" />
    <path d="M6.5 11v5h1.5v-3l1 1.5 1-1.5v3H11.5v-5H10l-1.25 1.75L7.5 11H6.5zm6.5 0v2.5H12v1.5h1v2.5l2.5-3.25L13 11z" fill="#519aba" />
  </svg>
);

const FolderClosedIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 5.25A2.25 2.25 0 015.25 3h3.83a2.25 2.25 0 011.59.66l1.22 1.22c.1.1.23.16.37.16h6.5A2.25 2.25 0 0121 7.29v9.46A2.25 2.25 0 0118.75 19H5.25A2.25 2.25 0 013 16.75V5.25z" fill="#e2b155" />
    <path d="M3 7.5h18v9.25A2.25 2.25 0 0118.75 19H5.25A2.25 2.25 0 013 16.75V7.5z" fill="#d29d38" />
  </svg>
);

const FolderOpenIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 5.25A2.25 2.25 0 015.25 3h3.83a2.25 2.25 0 011.59.66l1.22 1.22c.1.1.23.16.37.16h6.5A2.25 2.25 0 0121 7.29v9.46A2.25 2.25 0 0118.75 19H5.25A2.25 2.25 0 013 16.75V5.25z" fill="#e2b155" />
    <path d="M3 9.5h18v7.25A2.25 2.25 0 0118.75 19H5.25A2.25 2.25 0 013 16.75V9.5z" fill="#d29d38" />
    <path d="M2 9.5h20l-1.5 7.25A2.25 2.25 0 0118.25 19H5.75a2.25 2.25 0 01-2.25-2.25L2 9.5z" fill="#f1c76e" />
  </svg>
);

const VSCodeWatermark = ({ onNavigate }: { onNavigate: (path: string) => void }) => (
  <div className="flex flex-col items-center justify-center h-full text-center text-[var(--vscode-text-muted)] select-none font-sans py-20 bg-[var(--vscode-editor-bg)]">
    <div className="opacity-15 mb-8">
      <svg className="w-24 h-24 text-gray-500 fill-current" viewBox="0 0 24 24">
        <path d="M23.986 6.567l-3.328-1.503a.5.5 0 0 0-.616.147l-8.497 9.87-4.148-3.486a.5.5 0 0 0-.66.024L.15 17.518a.5.5 0 0 0-.016.702l2.361 2.378a.5.5 0 0 0 .707-.006l9.64-9.842 4.149 3.485a.5.5 0 0 0 .659-.023l6.98-8.118 2.36 2.378a.5.5 0 0 0 .72-.036l.995-1.15a.5.5 0 0 0-.015-.716zM12.015 15.688l-4.149-3.485a.5.5 0 0 0-.659.023l-7.07 8.2a.5.5 0 0 0 .736.685l6.983-8.1 4.149 3.486a.5.5 0 0 0 .66-.024l7.069-8.2a.5.5 0 0 0-.737-.685z" />
      </svg>
    </div>
    <div className="flex flex-col gap-4 max-w-sm text-xs md:text-sm px-6">
      <div 
        onClick={() => onNavigate('/')}
        className="flex justify-between items-center gap-16 cursor-pointer hover:text-[var(--vscode-text)] transition-colors group"
      >
        <span className="text-[var(--vscode-text-muted)]/70 group-hover:text-[var(--vscode-text)] transition-colors">Open Welcome file</span>
        <kbd className="px-2 py-0.5 bg-[var(--vscode-tab-inactive-bg)] border border-[var(--vscode-border)] rounded shadow text-[10px] text-[var(--vscode-text)]">Alt+W</kbd>
      </div>
      <div 
        onClick={() => onNavigate('/experience')}
        className="flex justify-between items-center gap-16 cursor-pointer hover:text-[var(--vscode-text)] transition-colors group"
      >
        <span className="text-[var(--vscode-text-muted)]/70 group-hover:text-[var(--vscode-text)] transition-colors">Open Experience file</span>
        <kbd className="px-2 py-0.5 bg-[var(--vscode-tab-inactive-bg)] border border-[var(--vscode-border)] rounded shadow text-[10px] text-[var(--vscode-text)]">Alt+E</kbd>
      </div>
      <div 
        onClick={() => onNavigate('/skills')}
        className="flex justify-between items-center gap-16 cursor-pointer hover:text-[var(--vscode-text)] transition-colors group"
      >
        <span className="text-[var(--vscode-text-muted)]/70 group-hover:text-[var(--vscode-text)] transition-colors">Open Skills file</span>
        <kbd className="px-2 py-0.5 bg-[var(--vscode-tab-inactive-bg)] border border-[var(--vscode-border)] rounded shadow text-[10px] text-[var(--vscode-text)]">Alt+S</kbd>
      </div>
      <div 
        onClick={() => onNavigate('/projects')}
        className="flex justify-between items-center gap-16 cursor-pointer hover:text-[var(--vscode-text)] transition-colors group"
      >
        <span className="text-[var(--vscode-text-muted)]/70 group-hover:text-[var(--vscode-text)] transition-colors">Open Projects file</span>
        <kbd className="px-2 py-0.5 bg-[var(--vscode-tab-inactive-bg)] border border-[var(--vscode-border)] rounded shadow text-[10px] text-[var(--vscode-text)]">Alt+P</kbd>
      </div>
      <div 
        onClick={() => onNavigate('/contact')}
        className="flex justify-between items-center gap-16 cursor-pointer hover:text-[var(--vscode-text)] transition-colors group"
      >
        <span className="text-[var(--vscode-text-muted)]/70 group-hover:text-[var(--vscode-text)] transition-colors">Open Contact file</span>
        <kbd className="px-2 py-0.5 bg-[var(--vscode-tab-inactive-bg)] border border-[var(--vscode-border)] rounded shadow text-[10px] text-[var(--vscode-text)]">Alt+C</kbd>
      </div>
    </div>
  </div>
);

export function VSCodeLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [timeString, setTimeString] = useState<string>('');
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [terminalHistory, setTerminalHistory] = useState<Array<{ text: string, type: 'input' | 'output' }>>([
    { text: 'Microsoft Windows [Version 10.0.22631]', type: 'output' },
    { text: '(c) Microsoft Corporation. All rights reserved.', type: 'output' },
    { text: '', type: 'output' },
    { text: 'Type "help" for a list of available custom portfolio commands.', type: 'output' },
    { text: '', type: 'output' },
  ]);

  // Handle terminal command executions
  const handleTerminalCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const command = terminalInput.trim().toLowerCase();
    if (!command) return;

    const newHistory = [...terminalHistory, { text: `C:\\Users\\motinath_\\portfolio> ${terminalInput}`, type: 'input' as const }];

    switch (command) {
      case 'help':
        newHistory.push(
          { text: 'Available commands:', type: 'output' },
          { text: '  about        - About Motinath', type: 'output' },
          { text: '  skills       - Print key skills', type: 'output' },
          { text: '  experience   - Display career experience paths', type: 'output' },
          { text: '  contact      - Display contact links & email', type: 'output' },
          { text: '  clear        - Clear console screen logs', type: 'output' },
          { text: '  npm run dev  - Launch simulated Vite hot reloading build', type: 'output' }
        );
        break;
      case 'about':
        newHistory.push(
          { text: 'Motinath R - ECE Graduate & Creative 3D Visualizer', type: 'output' },
          { text: 'Creative engineer specialized in building interactive web layout models', type: 'output' },
          { text: 'and designing premium user experiences.', type: 'output' }
        );
        break;
      case 'skills':
        newHistory.push(
          { text: 'Skills Directory:', type: 'output' },
          { text: '  - Web Development: React, TypeScript, Tailwind CSS, Vite', type: 'output' },
          { text: '  - 3D & Design: Blender, Cinema 4D, Visual Compositing', type: 'output' },
          { text: '  - Engineering: Embedded C, Circuit Design, Microcontrollers', type: 'output' }
        );
        break;
      case 'experience':
        newHistory.push(
          { text: 'Latest Career Paths:', type: 'output' },
          { text: '  - ECE Graduate (Tamil Nadu)', type: 'output' },
          { text: '  - Creative Engineer (3D & Web layout design)', type: 'output' }
        );
        break;
      case 'contact':
        newHistory.push(
          { text: 'Contact Information:', type: 'output' },
          { text: '  - Email: motinath.rajendran@gmail.com', type: 'output' },
          { text: '  - GitHub: https://github.com/motinath', type: 'output' },
          { text: '  - LinkedIn: https://www.linkedin.com/in/motinath/', type: 'output' }
        );
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      case 'npm run dev':
        newHistory.push(
          { text: '> portfolio@0.1.0 dev', type: 'output' },
          { text: '> vite', type: 'output' },
          { text: '  VITE v5.2.11  ready in 242 ms', type: 'output' },
          { text: '  ➜  Local:   http://localhost:3000/', type: 'output' },
          { text: '  ➜  Network: use --host to expose', type: 'output' },
          { text: '  ➜  press h + enter to show help', type: 'output' }
        );
        break;
      default:
        newHistory.push({ text: `'${command}' is not recognized as an internal or external command.`, type: 'output' });
        break;
    }

    setTerminalHistory(newHistory);
    setTerminalInput('');
  };

  // Listen for Ctrl + ` backtick keydown to toggle terminal
  useEffect(() => {
    const handleToggleTerminal = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        setIsTerminalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleToggleTerminal);
    return () => window.removeEventListener('keydown', handleToggleTerminal);
  }, []);

  // Clean up any legacy active theme class globally on mount
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-github-dark', 'theme-one-dark-pro', 'theme-dracula', 'theme-ayu-dark', 'theme-nord');
  }, []);

  // Clock in status bar
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setTimeString(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Keep track of which tabs are currently open in the editor header (default only Welcome page '/')
  const [openTabPaths, setOpenTabPaths] = useState<string[]>(() => {
    const initialPath = window.location.pathname;
    if (initialPath && initialPath !== '/') {
      return ['/', initialPath];
    }
    return ['/'];
  });

  // Automatically open the tab when navigating via route
  useEffect(() => {
    if (location.pathname) {
      setOpenTabPaths(prev => {
        if (prev.includes(location.pathname)) return prev;
        return [...prev, location.pathname];
      });
    }
  }, [location.pathname]);

  const closeTab = (e: React.MouseEvent, path: string) => {
    e.stopPropagation();
    
    setOpenTabPaths(prev => {
      const nextTabs = prev.filter(p => p !== path);
      
      // If we closed the currently active tab, find a new active tab
      if (location.pathname === path) {
        if (nextTabs.length > 0) {
          const closedIndex = prev.indexOf(path);
          const nextActiveIndex = Math.min(closedIndex, nextTabs.length - 1);
          const nextActivePath = nextTabs[nextActiveIndex];
          setTimeout(() => navigate(nextActivePath), 0);
        }
      }
      return nextTabs;
    });
  };

  // Register Alt + W/E/S/P/C global shortcut listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey) {
        const key = e.key.toLowerCase();
        if (key === 'w') {
          e.preventDefault();
          navigate('/');
        } else if (key === 'e') {
          e.preventDefault();
          navigate('/experience');
        } else if (key === 's') {
          e.preventDefault();
          navigate('/skills');
        } else if (key === 'p') {
          e.preventDefault();
          navigate('/projects');
        } else if (key === 'c') {
          e.preventDefault();
          navigate('/contact');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  // Directory Folders state matching the reference screenshot exactly
  const [folders, setFolders] = useState<Record<string, FolderItem>>({
    PORTFOLIO: {
      name: 'PORTFOLIO',
      isOpen: true,
      files: [
        { name: 'Welcome.tsx', path: '/', type: 'tsx' },
        { name: 'Experience.tsx', path: '/experience', type: 'tsx' },
        { name: 'Skills.json', path: '/skills', type: 'json' },
        { name: 'Projects.tsx', path: '/projects', type: 'tsx' },
        { name: 'Contact.tsx', path: '/contact', type: 'tsx' },
        { name: 'resume.pdf', path: '/resume.pdf', type: 'pdf' },
      ]
    },
    HOBBIES: {
      name: 'HOBBIES',
      isOpen: true,
      files: [
        { name: 'Movies.tsx', path: '/movies', type: 'tsx' },
        { name: 'Gaming.tsx', path: '/gaming', type: 'tsx' },
        { name: 'Story.md', path: '/story', type: 'md' },
      ]
    }
  });

  const toggleFolder = (key: string) => {
    setFolders(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        isOpen: !prev[key].isOpen
      }
    }));
  };

  // Find current active file details based on route
  const allFiles = [...folders.PORTFOLIO.files, ...folders.HOBBIES.files];
  const activeFile = allFiles.find(f => f.path === location.pathname) || allFiles[0];
  const isCurrentPathOpen = openTabPaths.includes(location.pathname);

  // Helper for file-specific icons matching the reference theme and colors
  const getFileIcon = (fileName: string) => {
    const name = fileName.toLowerCase();
    if (name.includes('resume')) {
      return <FileText className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />;
    }
    if (name.includes('welcome')) {
      return <Home className="w-3.5 h-3.5 text-[#569cd6] flex-shrink-0" />;
    }
    if (name.includes('experience')) {
      return <Briefcase className="w-3.5 h-3.5 text-[#ecc48d] flex-shrink-0" />;
    }
    if (name.includes('skills')) {
      return <Code2 className="w-3.5 h-3.5 text-[#569cd6] flex-shrink-0" />;
    }
    if (name.includes('projects')) {
      return <Folder className="w-3.5 h-3.5 text-[#ecc48d] flex-shrink-0" />;
    }
    if (name.includes('contact')) {
      return <Mail className="w-3.5 h-3.5 text-[#ff79c6] flex-shrink-0" />;
    }
    if (name.includes('movies')) {
      return <Tv className="w-3.5 h-3.5 text-[#c792ea] flex-shrink-0" />;
    }
    if (name.includes('gaming')) {
      return <Gamepad2 className="w-3.5 h-3.5 text-[#4ec9b0] flex-shrink-0" />;
    }
    if (name.includes('story')) {
      return <BookOpen className="w-3.5 h-3.5 text-[#ce9178] flex-shrink-0" />;
    }
    
    // Default fallback
    return <Code2 className="w-3.5 h-3.5 text-[#569cd6] flex-shrink-0" />;
  };

  // Open tabs list containing the open paths
  const tabsList = allFiles.filter(f => openTabPaths.includes(f.path));
  
  // Format tab names: Welcome.tsx is capitalized, other tabs are lowercase
  const formatTabName = (name: string) => {
    if (name.toLowerCase() === 'welcome.tsx') return 'Welcome.tsx';
    return name.toLowerCase();
  };

  return (
    <div className="flex flex-col h-screen h-[100dvh] w-screen bg-[var(--vscode-editor-bg)] text-[var(--vscode-text)] font-mono overflow-hidden select-none">
      
      {/* 1. TOP TITLE BAR */}
      <div className="flex items-center justify-between h-[35px] bg-[var(--vscode-titlebar-bg)] text-[var(--vscode-titlebar-fg)] text-xs px-3 border-b border-[var(--vscode-border)] select-none flex-shrink-0 z-40">
        {/* Left Side: VS Code Menu */}
        <div className="flex items-center gap-3">
          <svg className="w-4 h-4 text-[#007ACC] fill-current" viewBox="0 0 24 24">
            <path d="M23.986 6.567l-3.328-1.503a.5.5 0 0 0-.616.147l-8.497 9.87-4.148-3.486a.5.5 0 0 0-.66.024L.15 17.518a.5.5 0 0 0-.016.702l2.361 2.378a.5.5 0 0 0 .707-.006l9.64-9.842 4.149 3.485a.5.5 0 0 0 .659-.023l6.98-8.118 2.36 2.378a.5.5 0 0 0 .72-.036l.995-1.15a.5.5 0 0 0-.015-.716zM12.015 15.688l-4.149-3.485a.5.5 0 0 0-.659.023l-7.07 8.2a.5.5 0 0 0 .736.685l6.983-8.1 4.149 3.486a.5.5 0 0 0 .66-.024l7.069-8.2a.5.5 0 0 0-.737-.685z" />
          </svg>
          <div className="hidden md:flex items-center gap-3 font-sans">
            <span className="cursor-pointer hover:bg-[#2c2d38] px-2 py-0.5 rounded">File</span>
            <span className="cursor-pointer hover:bg-[#2c2d38] px-2 py-0.5 rounded">Edit</span>
            <span className="cursor-pointer hover:bg-[#2c2d38] px-2 py-0.5 rounded">View</span>
            <span className="cursor-pointer hover:bg-[#2c2d38] px-2 py-0.5 rounded">Go</span>
            <span className="cursor-pointer hover:bg-[#2c2d38] px-2 py-0.5 rounded">Help</span>
          </div>
        </div>

        {/* Center: File Title with green dot matching reference */}
        <div className="text-[11px] md:text-xs text-[#858585] font-sans flex items-center justify-center gap-2 truncate max-w-[40%] text-center">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
          <span>Motinath R — Portfolio</span>
        </div>

        {/* Right Side: Windows Window Controls */}
        <div className="flex items-center h-full">
          <div className="flex items-center justify-center w-[45px] h-full hover:bg-[#2c2d38] cursor-pointer">
            <div className="w-[10px] h-[1px] bg-[#CCCCCC]" />
          </div>
          <div className="flex items-center justify-center w-[45px] h-full hover:bg-[#2c2d38] cursor-pointer">
            <div className="w-2.5 h-2.5 border border-[#CCCCCC]" />
          </div>
          <div className="flex items-center justify-center w-[45px] h-full hover:bg-[#E81123] hover:text-white cursor-pointer transition-colors">
            <X className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* 2. MAIN MIDDLE INTERFACE CONTAINER */}
      <div className="flex flex-row flex-grow w-full overflow-hidden relative">
        
        {/* Backdrop for mobile */}
        {isSidebarOpen && (
          <div 
            className="sm:hidden absolute inset-0 left-[50px] bg-black/50 backdrop-blur-xs z-25 cursor-pointer"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        {/* A. LEFT ACTIVITY BAR */}
        <div className="flex flex-col justify-between w-[50px] bg-[var(--vscode-activity-bg)] border-r border-[var(--vscode-border)] flex-shrink-0 z-35 py-2">
          {/* Top Icons */}
          <div className="flex flex-col items-center gap-4 w-full">
            <div 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={cn(
                "relative group w-full flex items-center justify-center cursor-pointer py-1.5 border-l-2 transition-all duration-200",
                isSidebarOpen 
                  ? "border-[#007ACC] text-[var(--vscode-text)]" 
                  : "border-transparent text-[var(--vscode-text-muted)] hover:text-[var(--vscode-text)] hover:border-[var(--vscode-text-muted)]/30"
              )}
            >
              <Files className="w-6 h-6" />
              <div className="absolute left-[54px] bg-[var(--vscode-titlebar-bg)] border border-[var(--vscode-border)] text-[var(--vscode-text)] text-xs px-2.5 py-1 rounded shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 whitespace-nowrap">
                Explorer
              </div>
            </div>
            <div className="relative group w-full flex items-center justify-center cursor-pointer py-1.5 border-l-2 border-transparent hover:border-[#D4D4D4]/30">
              <Search className="w-6 h-6 text-[#858585] hover:text-[#D4D4D4] transition-colors" />
              <div className="absolute left-[54px] bg-[var(--vscode-titlebar-bg)] border border-[var(--vscode-border)] text-[var(--vscode-text)] text-xs px-2.5 py-1 rounded shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 whitespace-nowrap">
                Search
              </div>
            </div>
            <div className="relative group w-full flex items-center justify-center cursor-pointer py-1.5 border-l-2 border-transparent hover:border-[#D4D4D4]/30">
              <GitBranch className="w-6 h-6 text-[#858585] hover:text-[#D4D4D4] transition-colors" />
              <div className="absolute left-[54px] bg-[var(--vscode-titlebar-bg)] border border-[var(--vscode-border)] text-[var(--vscode-text)] text-xs px-2.5 py-1 rounded shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 whitespace-nowrap">
                Source Control
              </div>
            </div>
            <div className="relative group w-full flex items-center justify-center cursor-pointer py-1.5 border-l-2 border-transparent hover:border-[#D4D4D4]/30">
              <Blocks className="w-6 h-6 text-[#858585] hover:text-[#D4D4D4] transition-colors" />
              <div className="absolute left-[54px] bg-[var(--vscode-titlebar-bg)] border border-[var(--vscode-border)] text-[var(--vscode-text)] text-xs px-2.5 py-1 rounded shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 whitespace-nowrap">
                Extensions
              </div>
            </div>
          </div>

          {/* Bottom Icons */}
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="relative group w-full flex items-center justify-center cursor-pointer py-1">
              <User className="w-5 h-5 text-[#858585] hover:text-[#D4D4D4] transition-colors" />
              <div className="absolute left-[54px] bg-[var(--vscode-titlebar-bg)] border border-[var(--vscode-border)] text-[var(--vscode-text)] text-xs px-2.5 py-1 rounded shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 whitespace-nowrap">
                Accounts
              </div>
            </div>
            <div 
              className="relative group w-full flex items-center justify-center cursor-pointer py-1"
            >
              <Settings className="w-5 h-5 text-[#858585] hover:text-[#D4D4D4] transition-colors" />
              <div className="absolute left-[54px] bg-[var(--vscode-titlebar-bg)] border border-[var(--vscode-border)] text-[var(--vscode-text)] text-xs px-2.5 py-1 rounded shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 whitespace-nowrap">
                Ayu Dark Theme Enabled
              </div>
            </div>
          </div>
        </div>        {/* B. SIDEBAR (EXPLORER) */}
        <motion.div
          initial={{ width: 230 }}
          animate={{ 
            width: isSidebarOpen ? 230 : 0,
            opacity: isSidebarOpen ? 1 : 0
          }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col bg-[var(--vscode-sidebar-bg)] border-r border-[var(--vscode-border)] flex-shrink-0 z-30 select-none overflow-hidden h-full absolute sm:relative left-[50px] sm:left-0 top-0 bottom-0 shadow-2xl sm:shadow-none"
        >
          <div className="w-[230px] h-full flex flex-col">
            <div className="p-3 text-[11px] uppercase tracking-wider font-semibold text-[var(--vscode-text-muted)] border-b border-[var(--vscode-border)] flex justify-between items-center font-sans">
              <span>Explorer</span>
              <span>...</span>
            </div>

            {/* Collapsible Section: Root level directories */}
            <div className="flex-grow overflow-y-auto py-1 flex flex-col gap-0.5 font-sans">
              
              {/* PORTFOLIO FOLDER */}
              <div>
                <button
                  onClick={() => toggleFolder('PORTFOLIO')}
                  className="w-full flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[var(--vscode-text)] hover:bg-[#2c2d38]/40 select-none text-left"
                >
                  {folders.PORTFOLIO.isOpen ? <ChevronDown className="w-3.5 h-3.5 text-[var(--vscode-text-muted)]" /> : <ChevronRight className="w-3.5 h-3.5 text-[var(--vscode-text-muted)]" />}
                  {folders.PORTFOLIO.isOpen ? <FolderOpenIcon className="w-3.5 h-3.5 flex-shrink-0" /> : <FolderClosedIcon className="w-3.5 h-3.5 flex-shrink-0" />}
                  <span>PORTFOLIO</span>
                </button>
                {folders.PORTFOLIO.isOpen && (
                  <div className="flex flex-col mt-0.5">
                    {folders.PORTFOLIO.files.map((file, idx) => {
                      const isPdf = file.type === 'pdf';
                      return isPdf ? (
                        <a
                          key={idx}
                          href={file.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative flex items-center gap-2 px-8 py-1.5 text-xs text-[var(--vscode-text-muted)] hover:text-[var(--vscode-text)] hover:bg-[#2c2d38]/50 select-none no-underline transition-colors duration-150"
                        >
                          {getFileIcon(file.name)}
                          <span>{file.name}</span>
                        </a>
                      ) : (
                        <Link
                          key={idx}
                          to={file.path}
                          onClick={() => {
                            setOpenTabPaths(prev => {
                              if (prev.includes(file.path)) return prev;
                              return [...prev, file.path];
                            });
                            if (window.innerWidth < 640) {
                              setIsSidebarOpen(false);
                            }
                          }}
                          className={cn(
                            "relative flex items-center gap-2 px-8 py-1.5 text-xs text-[var(--vscode-text-muted)] hover:text-[var(--vscode-text)] hover:bg-[#2c2d38]/50 select-none no-underline transition-colors duration-150",
                            location.pathname === file.path && "bg-[var(--vscode-border)] text-[var(--vscode-text)] font-medium"
                          )}
                        >
                          {location.pathname === file.path && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-full bg-[var(--vscode-tab-active-border)]" />
                          )}
                          {getFileIcon(file.name)}
                          <span>{file.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* HOBBIES FOLDER */}
              <div className="mt-1">
                <button
                  onClick={() => toggleFolder('HOBBIES')}
                  className="w-full flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[var(--vscode-text)] hover:bg-[#2c2d38]/40 select-none text-left"
                >
                  {folders.HOBBIES.isOpen ? <ChevronDown className="w-3.5 h-3.5 text-[var(--vscode-text-muted)]" /> : <ChevronRight className="w-3.5 h-3.5 text-[var(--vscode-text-muted)]" />}
                  {folders.HOBBIES.isOpen ? <FolderOpenIcon className="w-3.5 h-3.5 flex-shrink-0" /> : <FolderClosedIcon className="w-3.5 h-3.5 flex-shrink-0" />}
                  <span>HOBBIES</span>
                </button>

                {folders.HOBBIES.isOpen && (
                  <div className="flex flex-col mt-0.5">
                    {folders.HOBBIES.files.map((file, idx) => (
                      <Link
                        key={idx}
                        to={file.path}
                        onClick={() => {
                          setOpenTabPaths(prev => {
                            if (prev.includes(file.path)) return prev;
                            return [...prev, file.path];
                          });
                          if (window.innerWidth < 640) {
                            setIsSidebarOpen(false);
                          }
                        }}
                        className={cn(
                          "relative flex items-center justify-between gap-2 px-8 py-1.5 text-xs text-[var(--vscode-text-muted)]/60 hover:text-[var(--vscode-text)] hover:bg-[#2c2d38]/50 select-none no-underline transition-colors duration-150",
                          location.pathname === file.path && "bg-[var(--vscode-border)] text-[var(--vscode-text)] font-medium"
                        )}
                      >
                        <div className="flex items-center gap-2 truncate">
                          {location.pathname === file.path && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-full bg-[var(--vscode-tab-active-border)]" />
                          )}
                          {getFileIcon(file.name)}
                          <span className="truncate">{file.name}</span>
                        </div>
                        <span className="text-[9px] font-mono opacity-40 text-[var(--vscode-text-muted)] pr-1 font-normal">ignored</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        </motion.div>

        {/* C. EDITOR PANE WORKSPACE */}
        <div className="flex-grow flex flex-col h-full bg-[var(--vscode-editor-bg)] overflow-hidden relative">
          
          {/* Editor Header: Tabs List */}
          <div className="flex flex-row items-center h-[35px] bg-[var(--vscode-tabs-bg)] border-b border-[var(--vscode-border)] overflow-x-auto select-none flex-shrink-0 hide-scrollbar scroll-smooth">
            {tabsList.map((tab, idx) => {
              const isActive = location.pathname === tab.path;
              return (
                <div
                  key={idx}
                  onClick={() => navigate(tab.path)}
                  className={cn(
                    "group relative flex items-center gap-2 h-[calc(100%-10px)] my-[5px] mx-1 px-3 min-w-[110px] max-w-[180px] rounded-lg cursor-pointer select-none font-sans font-medium text-[11px] md:text-xs transition-all duration-200 ease-in-out border border-transparent",
                    isActive 
                      ? "bg-[var(--vscode-tab-active-bg)] text-[var(--vscode-text)]" 
                      : "bg-[var(--vscode-tab-inactive-bg)] text-[var(--vscode-text-muted)] hover:bg-[var(--vscode-editor-bg)]/80 hover:text-[var(--vscode-text)]"
                  )}
                >
                  {isActive && (
                    <span className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--vscode-tab-active-border)]" />
                  )}
                  {getFileIcon(tab.name)}
                  <span className="truncate flex-grow">{formatTabName(tab.name)}</span>
                  {isActive ? (
                    <div 
                      onClick={(e) => closeTab(e, tab.path)}
                      className="w-3.5 h-3.5 hover:bg-[#353535]/30 rounded flex items-center justify-center ml-1 p-0.5 transition-colors duration-150"
                    >
                      <X className="w-2.5 h-2.5 text-white" />
                    </div>
                  ) : (
                    <div 
                      onClick={(e) => closeTab(e, tab.path)}
                      className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 hover:bg-[#353535]/20 rounded flex items-center justify-center ml-1 p-0.5 transition-all duration-150"
                    >
                      <X className="w-2.5 h-2.5 text-[#858585] hover:text-[#cccccc]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
                    {/* Breadcrumbs Panel with Home Icon */}
          {isCurrentPathOpen && activeFile && (
            <div className="flex items-center h-[22px] bg-[var(--vscode-editor-bg)] border-b border-[var(--vscode-border)] text-[10px] text-[var(--vscode-text-muted)] px-4 font-sans select-none flex-shrink-0 gap-1.5">
              <span className="flex items-center gap-1.5">
                <Home className="w-3 h-3 text-[var(--vscode-text-muted)]" />
                <ChevronRight className="w-2.5 h-2.5 text-[var(--vscode-text-muted)]/60" />
                <span>{activeFile.name}</span>
              </span>
            </div>
          )}

          {/* Real Work Area: Renders routing pages inside editor or blank watermark screen */}
          <div className="flex-grow overflow-y-auto overflow-x-hidden relative bg-[var(--vscode-editor-bg)]">
            {isCurrentPathOpen && activeFile ? (
              <Outlet />
            ) : (
              <VSCodeWatermark onNavigate={navigate} />
            )}
          </div>

          {/* Collapsible bottom terminal panel */}
          {isTerminalOpen && (
            <div className="h-[200px] border-t border-[var(--vscode-border)] bg-[var(--vscode-activity-bg)] text-[var(--vscode-text)] flex flex-col font-mono text-[11px] sm:text-xs z-35 flex-shrink-0 select-text">
              {/* Terminal Header Tabs */}
              <div className="flex justify-between items-center h-[26px] bg-[var(--vscode-titlebar-bg)] px-3 text-[var(--vscode-text-muted)] border-b border-[var(--vscode-border)] select-none">
                <div className="flex gap-4">
                  <span className="text-[var(--vscode-text)] border-b border-[var(--vscode-tab-active-border)] pb-0.5 font-sans font-medium cursor-pointer">Terminal</span>
                  <span className="hover:text-[var(--vscode-text)] font-sans cursor-pointer">Problems</span>
                  <span className="hover:text-[var(--vscode-text)] font-sans cursor-pointer">Output</span>
                  <span className="hover:text-[var(--vscode-text)] font-sans cursor-pointer">Debug Console</span>
                </div>
                <button 
                  onClick={() => setIsTerminalOpen(false)}
                  className="hover:bg-[var(--vscode-border)] rounded p-0.5"
                >
                  <X className="w-3.5 h-3.5 text-[var(--vscode-text-muted)] hover:text-white" />
                </button>
              </div>
              
              {/* Terminal Logs Window */}
              <div className="flex-grow overflow-y-auto p-3 flex flex-col gap-1 select-text scrollbar-thin bg-[var(--vscode-editor-bg)]">
                {terminalHistory.map((line, idx) => (
                  <div key={idx} className={line.type === 'input' ? 'text-[var(--vscode-text)] font-semibold' : 'text-[var(--vscode-text-muted)] font-medium'}>
                    {line.text}
                  </div>
                ))}
                
                {/* Active Terminal Input Row */}
                <form onSubmit={handleTerminalCommand} className="flex items-center gap-1 text-[var(--vscode-text)]">
                  <span className="hidden sm:inline">C:\Users\motinath_\portfolio&gt;</span>
                  <span className="sm:hidden">portfolio&gt;</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    className="flex-grow bg-transparent outline-none border-none text-[var(--vscode-text)] select-text"
                    autoFocus
                  />
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. BOTTOM STATUS BAR with Remote Icon block */}
      <div className="flex items-center justify-between h-[22px] bg-[var(--vscode-statusbar-bg)] border-t border-[var(--vscode-border)] text-[var(--vscode-statusbar-fg)] text-[11px] select-none flex-shrink-0 z-45 font-sans">
        
        {/* Left Status group with Remote Block */}
        <div className="flex items-center gap-0 h-full">
          {/* Authentic VS Code Remote solid green block */}
          <div className="flex items-center justify-center gap-1 bg-[#4EC9B0] text-[#0c0d12] px-3 font-semibold h-full cursor-pointer hover:bg-emerald-400 select-none mr-3">
            <span className="font-extrabold text-[12px]"><span className="hidden md:inline">Remote</span> &gt;&lt;</span>
          </div>
          
          <div className="flex items-center gap-1 cursor-pointer hover:bg-[#20212e] px-2 py-0.5 h-full">
            <GitBranch className="w-3 h-3 text-[#a9b1d6]" />
            <span>main</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:bg-[#20212e] px-2 py-0.5 h-full">
            <RefreshCw className="w-3 h-3 animate-spin duration-3000" />
          </div>
          <div className="flex items-center gap-1.5 cursor-pointer hover:bg-[#20212e] px-2.5 py-0.5 h-full">
            <AlertCircle className="w-3 h-3" />
            <span>0</span>
            <AlertCircle className="w-3 h-3 rotate-90" />
            <span>0</span>
          </div>
        </div>

        {/* Right Status group */}
        <div className="flex items-center gap-3 pr-3 h-full">
          <span className="hidden md:inline text-[10px] text-[#858585]">Ln 1, Col 1</span>
          <span className="hidden md:inline text-[10px] text-[#858585]">Spaces: 2</span>
          <span className="hidden md:inline text-[10px] text-[#858585]">UTF-8</span>
          <span className="hidden md:inline text-[10px] text-[#858585]">LF</span>
          <span className="cursor-pointer hover:bg-[#20212e] px-2 py-0.5 h-full">
            {activeFile.type === 'tsx' ? 'TypeScript React' : activeFile.type === 'json' ? 'JSON' : activeFile.type === 'md' ? 'Markdown' : 'PDF'}
          </span>
          <div 
            onClick={() => setIsTerminalOpen(!isTerminalOpen)}
            className="flex items-center gap-1 cursor-pointer hover:bg-[#20212e]/40 px-2 py-0.5 h-full"
          >
            <span>Port: 3000</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:bg-[#20212e] px-2 py-0.5 h-full">
            <Bell className="w-3 h-3" />
          </div>
          <span>{timeString}</span>
        </div>
      </div>
      
    </div>
  );
}

export default VSCodeLayout;
