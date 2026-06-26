import React, { useEffect, useState } from 'react';
import { Zap, ArrowRight, Brain, FileSearch, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Conversational AI',
    desc: 'Ask anything — research, coding, writing, analysis. NEXUS thinks with you.',
  },
  {
    icon: FileSearch,
    title: 'Smart Summarizer',
    desc: 'Paste any wall of text and get crisp, structured insights in seconds.',
  },
  {
    icon: Sparkles,
    title: 'Context-Aware',
    desc: 'NEXUS remembers your conversation and builds on prior context naturally.',
  },
];

export default function LandingPage({ onEnter }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-space-black grid-bg flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-violet opacity-10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-electric-cyan opacity-10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" style={{ animationDelay: '1.5s' }} />

      <div
        className={`max-w-2xl w-full text-center transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-card-bg border border-border-glow rounded-full px-4 py-1.5 mb-8">
          <div className="w-2 h-2 rounded-full bg-electric-cyan animate-pulse" />
          <span className="text-xs text-muted font-mono tracking-wider uppercase">
            Powered by Gemini AI
          </span>
        </div>

        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-6 animate-float">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neon-violet to-electric-cyan flex items-center justify-center shadow-lg">
            <Zap size={28} className="text-white" />
          </div>
        </div>

        {/* Headline */}
        <h1 className="font-display text-6xl font-bold mb-4 leading-tight">
          <span className="gradient-text">NEXUS</span>
        </h1>
        <p className="text-xl text-muted font-body mb-3 leading-relaxed">
          Your AI co-pilot for research, writing, and thinking.
        </p>
        <p className="text-sm text-muted font-body mb-10 max-w-md mx-auto">
          Built on Claude's frontier intelligence — ask complex questions, summarize documents, 
          and accelerate your work at the speed of thought.
        </p>

        {/* CTA */}
        <button
          onClick={onEnter}
          className="group inline-flex items-center gap-3 bg-neon-violet hover:bg-neon-violet-light text-white font-display font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-neon-violet/40 hover:scale-105"
        >
          Launch NEXUS
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 mt-16">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="bg-card-bg border border-border-glow rounded-xl p-5 text-left hover:border-neon-violet/50 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-neon-violet/15 flex items-center justify-center mb-3 group-hover:bg-neon-violet/25 transition-colors">
                  <Icon size={18} className="text-neon-violet-light" />
                </div>
                <h3 className="font-display font-semibold text-soft-white text-sm mb-1">{f.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
