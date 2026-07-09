import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { cn } from '../lib/utils';

// 1. FADE IN UTILITY
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  as?: string;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = '',
  as = 'div',
}: FadeInProps) {
  const Component = (motion as unknown as Record<string, React.ElementType>)[as] || motion.div;

  return (
    <Component
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{
        delay,
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </Component>
  );
}

// 2. MOUSE FOLLOWING MAGNETIC UTILITY
interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [transitionStyle, setTransitionStyle] = useState(inactiveTransition);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const maxDistance = Math.max(rect.width, rect.height) / 2 + padding;

      if (dist < maxDistance) {
        setTransitionStyle(activeTransition);
        const targetX = dx / strength;
        const targetY = dy / strength;
        setPosition({ x: targetX, y: targetY });
      } else {
        setTransitionStyle(inactiveTransition);
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setTransitionStyle(inactiveTransition);
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    node.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (node) {
        node.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [padding, strength, activeTransition, inactiveTransition]);

  return (
    <div
      ref={ref}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: transitionStyle,
        willChange: 'transform',
      }}
      className={className}
    >
      {children}
    </div>
  );
}

// 3. CHARACTER-BY-CHARACTER SCROLL REVEAL UTILITY
interface AnimatedCharProps {
  char: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}

function AnimatedChar({ char, progress, start, end }: AnimatedCharProps) {
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  return (
    <span className="relative inline-block">
      {/* Invisible layout placeholder */}
      <span className="invisible">{char}</span>
      {/* Absolute positioned animated span */}
      <motion.span style={{ opacity }} className="absolute inset-0 select-none">
        {char}
      </motion.span>
    </span>
  );
}

export function AnimatedText({ text, className = '' }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  const total = text.replace(/\s/g, '').length || 1;
  let charCount = 0;

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, wordIdx) => {
        const characters = Array.from(word);
        return (
          <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
            {characters.map((char, charIdx) => {
              const index = charCount++;
              const start = index / total;
              const end = Math.min(1, (index + 4) / total);

              return (
                <AnimatedChar
                  key={charIdx}
                  char={char}
                  progress={scrollYProgress}
                  start={start}
                  end={end}
                />
              );
            })}
          </span>
        );
      })}
    </p>
  );
}

// 4. CUSTOM CONTACT PILL UTILITY
interface ContactButtonProps {
  onClick?: () => void;
  label?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  dataCursorLabel?: string;
}

export function ContactButton({
  onClick,
  label = 'CONTACT ME',
  className = '',
  type = 'button',
  dataCursorLabel = '',
}: ContactButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      data-cursor-label={dataCursorLabel}
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
        outline: '2px solid #FFFFFF',
        outlineOffset: '-3px',
      }}
      className={`rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base transition-transform hover:scale-105 active:scale-95 duration-200 cursor-pointer ${className}`}
    >
      {label}
    </button>
  );
}

// 5. LIVE PROJECT OUTLINE BUTTON UTILITY
interface LiveProjectButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

export function LiveProjectButton({
  label,
  onClick,
  className = '',
}: LiveProjectButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border-2 border-[var(--text)] text-[var(--text)] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[var(--text)]/10 transition-all duration-250 cursor-pointer ${className}`}
    >
      {label}
    </button>
  );
}

// 6. CHARACTER SCRAMBLER TEXT REVEAL UTILITY
interface ScrambleTextProps {
  text: string;
  trigger?: boolean;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export function ScrambleText({
  text,
  trigger = true,
  delay = 0,
  className = '',
  onComplete,
}: ScrambleTextProps) {
  const chars = "▓▒░█▄▀■□◆◇●○⊕⊗∆∇∞≡≠±×√∫∂∑";
  const [displayText, setDisplayText] = useState(() => 
    text.split('').map(() => chars[Math.floor(Math.random() * chars.length)]).join('')
  );

  useEffect(() => {
    if (!trigger) return;

    let intervalId: number;

    const startScramble = () => {
      const len = text.length;
      let ticks = 0;

      intervalId = window.setInterval(() => {
        ticks++;
        const lockedIndex = ticks;

        if (lockedIndex >= len) {
          setDisplayText(text);
          clearInterval(intervalId);
          if (onComplete) onComplete();
          return;
        }

        let result = '';
        for (let i = 0; i < len; i++) {
          if (i < lockedIndex) {
            result += text[i];
          } else {
            result += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        setDisplayText(result);
      }, 40);
    };

    const timerId = window.setTimeout(startScramble, delay);

    return () => {
      clearTimeout(timerId);
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, trigger, delay]);

  return <span className={className}>{displayText}</span>;
}

// 7. BROADCAST TICKER UTILITY
export function BroadcastTicker() {
  const tickerText = "MOTINATH R IS ONLINE · ECE GRADUATE · PHOTOGRAPHER · BASKETBALL POINT GUARD · WATCHED 400+ FILMS · BUILT HIS OWN PC · DEBUGS AT 2AM · TAMIL NADU INDIA · REFUSES TO HAVE JUST ONE THING · CIRCUITS AND CODE AND CAMERAS · AVAILABLE · ";
  
  return (
    <div className="fixed top-0 left-0 right-0 h-5 bg-[var(--bg)] border-b border-[var(--text)]/[0.08] z-[9999] w-full flex items-center overflow-hidden select-none transition-colors duration-300">
      <div className="ticker-scroll-inner font-mono text-[9px] text-[var(--text)]/35 uppercase font-light tracking-[0.3em] py-0.5 transition-colors duration-300">
        <span>{tickerText}</span>
        <span>{tickerText}</span>
      </div>
    </div>
  );
}

// 8. CARD UTILITY
export function Card({ children, className, hover = false, onClick }: { children: React.ReactNode, className?: string, hover?: boolean, onClick?: () => void }) {
  return (
    <div 
      className={cn(
        "bg-[#14151b]/60 border border-[#1e1f29] rounded-xl p-4 shadow-lg transition-all duration-300",
        hover && "hover:border-[#007ACC]/50 hover:bg-[#1a1b24]/70 hover:-translate-y-0.5 hover:shadow-2xl",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// 9. SECTION HEADER UTILITY
export function SectionHeader({ title, description }: { title: string, description: string }) {
  return (
    <FadeIn delay={0.1} y={20} className="border-b border-[#1e1f29] pb-4 mb-8">
      <div className="flex items-center gap-2 mb-1 select-none">
        <span className="text-white/30 text-3xl font-extralight">|</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#FFFFFF] tracking-tight uppercase">
          {title}
        </h1>
      </div>
      <p className="text-xs text-[#858585] mt-1 font-mono">// {description}</p>
    </FadeIn>
  );
}

