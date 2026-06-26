import React from 'react';
import { MessageSquare, FileText, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

const navItems = [
  { id: 'chat', label: 'AI Chat', icon: MessageSquare, desc: 'Converse with NEXUS' },
  { id: 'summarizer', label: 'Summarizer', icon: FileText, desc: 'Summarize any text' },
];

export default function Sidebar({ currentPage, setCurrentPage, isOpen, setIsOpen }) {
  return (
    <aside
      className={`relative flex flex-col bg-deep-navy border-r border-border-glow transition-all duration-300 ${
        isOpen ? 'w-56' : 'w-16'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-border-glow">
        <div className="w-8 h-8 rounded-lg bg-neon-violet flex items-center justify-center flex-shrink-0 animate-pulse-slow">
          <Zap size={16} className="text-white" />
        </div>
        {isOpen && (
          <span className="font-display font-bold text-lg gradient-text tracking-wide">
            NEXUS
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-left group ${
                active
                  ? 'bg-neon-violet text-white'
                  : 'text-muted hover:bg-card-bg hover:text-soft-white'
              }`}
            >
              <Icon size={18} className="flex-shrink-0" />
              {isOpen && (
                <div>
                  <p className="text-sm font-medium font-display leading-none">{item.label}</p>
                  {!active && (
                    <p className="text-xs text-muted mt-0.5 group-hover:text-soft-white transition-colors">
                      {item.desc}
                    </p>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-neon-violet text-white flex items-center justify-center shadow-lg hover:bg-neon-violet-light transition-colors z-10"
      >
        {isOpen ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
      </button>

      {/* Footer */}
      {isOpen && (
        <div className="px-4 py-3 border-t border-border-glow">
          <p className="text-xs text-muted font-mono">v1.0.0 · Gemini API</p>
        </div>
      )}
    </aside>
  );
}
