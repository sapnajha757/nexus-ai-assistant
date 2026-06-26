import React, { useState, useRef, useEffect } from 'react';
import { Send, Trash2, Bot, User, Zap, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useClaudeAPI } from '../hooks/useClaudeAPI';

const SYSTEM_PROMPT = `You are NEXUS, an advanced AI assistant built to help users with research, writing, coding, analysis, and everyday problem-solving. You are intelligent, concise, and thoughtful. Format your responses using markdown when helpful — use code blocks for code, bullet points for lists, and headers for structure. Be direct and genuinely useful.`;

const SUGGESTIONS = [
  'Explain quantum computing simply',
  'Write a Python function to sort a list',
  'Give me a productivity framework for deep work',
  'What are the latest trends in AI?',
];

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const { sendMessage, loading, error } = useClaudeAPI();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;

    const userMsg = { role: 'user', content: userText };
    const updatedMessages = [...messages, userMsg];

    setMessages(updatedMessages);
    setInput('');

    try {
      const reply = await sendMessage(updatedMessages, SYSTEM_PROMPT);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `⚠️ Error: ${err.message}`, isError: true },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-space-black">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border-glow bg-deep-navy">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-violet to-electric-cyan flex items-center justify-center">
            <Bot size={16} className="text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-soft-white text-sm">NEXUS Chat</h1>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-muted font-mono">Gemini 1.5 Flash · Online</span>
            </div>
          </div>
        </div>
        {messages.length > 0 && (
          <button
            onClick={() => setMessages([])}
            className="flex items-center gap-1.5 text-xs text-muted hover:text-red-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-400/10"
          >
            <Trash2 size={13} />
            Clear
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-2xl bg-neon-violet/10 border border-neon-violet/20 flex items-center justify-center mb-4 animate-float">
              <Zap size={28} className="text-neon-violet-light" />
            </div>
            <h2 className="font-display font-semibold text-soft-white text-xl mb-2">
              Start a conversation
            </h2>
            <p className="text-muted text-sm mb-8 max-w-xs">
              Ask anything — from complex research to quick questions, NEXUS has you covered.
            </p>
            <div className="grid grid-cols-2 gap-2 max-w-md w-full">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="text-left text-xs text-muted border border-border-glow rounded-lg px-3 py-2.5 hover:border-neon-violet/50 hover:text-soft-white hover:bg-card-bg transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 message-enter ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user'
                  ? 'bg-neon-violet'
                  : 'bg-gradient-to-br from-neon-violet to-electric-cyan'
              }`}
            >
              {msg.role === 'user' ? (
                <User size={14} className="text-white" />
              ) : (
                <Bot size={14} className="text-white" />
              )}
            </div>
            <div
              className={`max-w-xl rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-neon-violet text-white rounded-tr-sm'
                  : msg.isError
                  ? 'bg-red-950/50 border border-red-800 rounded-tl-sm'
                  : 'bg-card-bg border border-border-glow rounded-tl-sm'
              }`}
            >
              {msg.role === 'user' ? (
                <p className="text-sm leading-relaxed">{msg.content}</p>
              ) : (
                <div className="prose-dark text-sm">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 message-enter">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-violet to-electric-cyan flex items-center justify-center flex-shrink-0">
              <Bot size={14} className="text-white" />
            </div>
            <div className="bg-card-bg border border-border-glow rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1.5 items-center h-5">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-neon-violet-light animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 pb-4">
        {error && (
          <div className="flex items-center gap-2 text-xs text-red-400 mb-2 px-1">
            <AlertCircle size={12} />
            {error}
          </div>
        )}
        <div className="flex gap-3 bg-card-bg border border-border-glow rounded-2xl px-4 py-3 focus-within:border-neon-violet/50 transition-colors">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask NEXUS anything…"
            rows={1}
            className="flex-1 bg-transparent text-soft-white text-sm placeholder-muted resize-none outline-none font-body leading-relaxed max-h-32"
            style={{ minHeight: '24px' }}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="self-end w-8 h-8 rounded-lg bg-neon-violet hover:bg-neon-violet-light disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center flex-shrink-0"
          >
            <Send size={14} className="text-white" />
          </button>
        </div>
        <p className="text-center text-xs text-muted mt-2 font-mono">
          Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
