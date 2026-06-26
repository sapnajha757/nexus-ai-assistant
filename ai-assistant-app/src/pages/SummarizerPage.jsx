import React, { useState } from 'react';
import { FileText, Wand2, Copy, Check, AlertCircle, ChevronDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useClaudeAPI } from '../hooks/useClaudeAPI';

const MODES = [
  { id: 'concise', label: 'Concise', desc: '3-5 bullet points' },
  { id: 'detailed', label: 'Detailed', desc: 'Full structured breakdown' },
  { id: 'eli5', label: 'Simple', desc: 'Explain like I\'m 5' },
  { id: 'bullets', label: 'Key Points', desc: 'Actionable takeaways only' },
];

export default function SummarizerPage() {
  const [inputText, setInputText] = useState('');
  const [mode, setMode] = useState('concise');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const { sendMessage, loading, error } = useClaudeAPI();

  const buildPrompt = () => {
    const modeInstructions = {
      concise: 'Summarize the following text in 3-5 concise bullet points. Capture the most important ideas.',
      detailed: 'Provide a detailed, structured summary of the following text. Use headers and sub-points. Identify key themes, arguments, and conclusions.',
      eli5: 'Explain the following text in very simple language, as if explaining to someone with no background in the topic. Use plain English and avoid jargon.',
      bullets: 'Extract the key actionable takeaways from the following text as a numbered list. Focus on what a reader should know or do.',
    };
    return `${modeInstructions[mode]}\n\nText to summarize:\n\n${inputText}`;
  };

  const handleSummarize = async () => {
    if (!inputText.trim() || loading) return;
    setResult('');
    try {
      const reply = await sendMessage([{ role: 'user', content: buildPrompt() }]);
      setResult(reply);
    } catch (err) {
      // error handled via hook
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

  return (
    <div className="flex flex-col h-full bg-space-black">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-border-glow bg-deep-navy">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric-cyan to-neon-violet flex items-center justify-center">
          <FileText size={16} className="text-white" />
        </div>
        <div>
          <h1 className="font-display font-bold text-soft-white text-sm">Smart Summarizer</h1>
          <p className="text-xs text-muted font-mono">Paste any text, get instant insight</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto space-y-5">
          {/* Mode selector */}
          <div>
            <label className="block text-xs text-muted font-mono mb-2 uppercase tracking-wider">
              Summary Style
            </label>
            <div className="grid grid-cols-4 gap-2">
              {MODES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={`rounded-xl px-3 py-2.5 text-left transition-all border ${
                    mode === m.id
                      ? 'bg-neon-violet border-neon-violet text-white'
                      : 'bg-card-bg border-border-glow text-muted hover:border-neon-violet/40 hover:text-soft-white'
                  }`}
                >
                  <p className="text-xs font-display font-semibold">{m.label}</p>
                  <p className="text-xs opacity-70 mt-0.5">{m.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-muted font-mono uppercase tracking-wider">
                Input Text
              </label>
              <span className="text-xs text-muted font-mono">{wordCount} words</span>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste an article, research paper, meeting notes, or any long text here…"
              className="w-full h-52 bg-card-bg border border-border-glow rounded-xl px-4 py-3 text-soft-white text-sm placeholder-muted resize-none outline-none font-body leading-relaxed focus:border-neon-violet/50 transition-colors"
            />
          </div>

          {/* Summarize button */}
          {error && (
            <div className="flex items-center gap-2 text-xs text-red-400">
              <AlertCircle size={12} />
              {error}
            </div>
          )}
          <button
            onClick={handleSummarize}
            disabled={!inputText.trim() || loading}
            className="w-full flex items-center justify-center gap-2 bg-neon-violet hover:bg-neon-violet-light disabled:opacity-40 disabled:cursor-not-allowed text-white font-display font-semibold py-3 rounded-xl transition-all duration-200"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Summarizing…
              </>
            ) : (
              <>
                <Wand2 size={16} />
                Summarize
              </>
            )}
          </button>

          {/* Result */}
          {result && (
            <div className="bg-card-bg border border-border-glow rounded-xl overflow-hidden message-enter">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border-glow">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-electric-cyan animate-pulse" />
                  <span className="text-xs text-muted font-mono uppercase tracking-wider">
                    Summary · {MODES.find((m) => m.id === mode)?.label}
                  </span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs text-muted hover:text-soft-white transition-colors"
                >
                  {copied ? (
                    <>
                      <Check size={12} className="text-green-400" />
                      <span className="text-green-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <div className="px-4 py-4 prose-dark text-sm">
                <ReactMarkdown>{result}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
