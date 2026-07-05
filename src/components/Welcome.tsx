import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, FolderOpen, Code2, Hash, MessageSquare,
  Linkedin, Github, Instagram, Mail, FileText
} from 'lucide-react';

export function Welcome() {
  const navigate = useNavigate();

  const handleExternalClick = (url: string) => {
    if (url.startsWith('mailto:')) {
      window.location.href = url;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="h-full min-h-[calc(100vh-114px)] w-full bg-transparent text-[var(--vscode-text)] flex flex-col justify-center items-center font-sans select-none animate-fadeIn py-12">
      <div className="w-full max-w-2xl px-8 sm:px-16 flex flex-col text-left">
        
        {/* 1. Header Name Block */}
        <div className="mb-12 select-text">
          <h1 className="text-4xl sm:text-5xl font-light text-[var(--vscode-text)] tracking-tight">
            Motinath R
          </h1>
        </div>

        {/* 2. Start & Connect Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 sm:gap-x-24 gap-y-10 w-full">
          
          {/* Start Column */}
          <div>
            <h2 className="text-sm font-semibold text-[var(--vscode-text)] font-sans uppercase tracking-wider mb-5">
              Start
            </h2>
            <div className="flex flex-col gap-4 text-xs sm:text-sm">
              
              <button 
                onClick={() => navigate('/experience')}
                className="flex items-center gap-3 text-left text-blue-400 hover:text-blue-300 hover:underline bg-transparent border-0 p-0 cursor-pointer outline-none group w-fit"
              >
                <Briefcase className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Experience...</span>
              </button>

              <button 
                onClick={() => navigate('/projects')}
                className="flex items-center gap-3 text-left text-blue-400 hover:text-blue-300 hover:underline bg-transparent border-0 p-0 cursor-pointer outline-none group w-fit"
              >
                <FolderOpen className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Open Projects...</span>
              </button>

              <button 
                onClick={() => navigate('/skills')}
                className="flex items-center gap-3 text-left text-blue-400 hover:text-blue-300 hover:underline bg-transparent border-0 p-0 cursor-pointer outline-none group w-fit"
              >
                <Code2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>View Skills...</span>
              </button>

              <button 
                onClick={() => navigate('/story')}
                className="flex items-center gap-3 text-left text-blue-400 hover:text-blue-300 hover:underline bg-transparent border-0 p-0 cursor-pointer outline-none group w-fit"
              >
                <Hash className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Explore Story...</span>
              </button>

              <button 
                onClick={() => handleExternalClick('/resume.pdf')}
                className="flex items-center gap-3 text-left text-blue-400 hover:text-blue-300 hover:underline bg-transparent border-0 p-0 cursor-pointer outline-none group w-fit"
              >
                <FileText className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>View Resume...</span>
              </button>

              <button 
                onClick={() => navigate('/contact')}
                className="flex items-center gap-3 text-left text-blue-400 hover:text-blue-300 hover:underline bg-transparent border-0 p-0 cursor-pointer outline-none group w-fit"
              >
                <MessageSquare className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Connect to...</span>
              </button>

            </div>
          </div>

          {/* Connect Column */}
          <div>
            <h2 className="text-sm font-semibold text-[var(--vscode-text)] font-sans uppercase tracking-wider mb-5">
              Connect
            </h2>
            <div className="flex flex-col gap-4 text-xs sm:text-sm">
              
              <button 
                onClick={() => handleExternalClick('https://www.linkedin.com/in/motinath/')}
                className="flex items-center gap-3 text-left text-blue-400 hover:text-blue-300 hover:underline bg-transparent border-0 p-0 cursor-pointer outline-none group w-fit"
              >
                <Linkedin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>LinkedIn</span>
              </button>

              <button 
                onClick={() => handleExternalClick('https://github.com/motinath')}
                className="flex items-center gap-3 text-left text-blue-400 hover:text-blue-300 hover:underline bg-transparent border-0 p-0 cursor-pointer outline-none group w-fit"
              >
                <Github className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>GitHub</span>
              </button>

              <button 
                onClick={() => handleExternalClick('https://www.instagram.com/motinath_/')}
                className="flex items-center gap-3 text-left text-blue-400 hover:text-blue-300 hover:underline bg-transparent border-0 p-0 cursor-pointer outline-none group w-fit"
              >
                <Instagram className="w-4 h-4 text-blue-400" />
                <span>Instagram</span>
              </button>

              <button 
                onClick={() => handleExternalClick('mailto:motinath.rajendran@gmail.com')}
                className="flex items-center gap-3 text-left text-blue-400 hover:text-blue-300 hover:underline bg-transparent border-0 p-0 cursor-pointer outline-none group w-fit"
              >
                <Mail className="w-4 h-4 text-blue-400" />
                <span>Email</span>
              </button>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Welcome;
