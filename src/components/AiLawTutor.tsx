import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  User,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  Scale,
  Award,
  Lightbulb,
  GraduationCap
} from 'lucide-react';
import { ChatMessage, UserRole } from '../types';
import { WatermarkBackground } from './WatermarkBackground';

interface AiLawTutorProps {
  userRole: UserRole;
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
}

export const AiLawTutor: React.FC<AiLawTutorProps> = ({
  userRole,
  initialPrompt,
  onClearInitialPrompt
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_001',
      sender: 'ai',
      text: `Greetings! I am the LawHub AI Legal Tutor, your specialized research and reasoning assistant for Ugandan law.\n\nI am configured with verified knowledge of the 1995 Constitution of Uganda, Acts of Parliament, landmark High Court, Court of Appeal, and Supreme Court judgments, and the LLB and Bar Course curricula.\n\nHow may I assist your legal study today?\n• Statutory interpretation (e.g. S.10 Contracts Act 2010, S.39 Land Act)\n• Landmark case law ratios (e.g. Grace Ibingira, Tinyefuza, Obbo & Mwenda)\n• Structured IRAC legal answers (Issue, Rule, Application, Conclusion)\n• Legal drafting principles and civil/criminal procedure`,
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('Constitutional Law');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      handleSendPrompt(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  const handleSendPrompt = async (promptText: string) => {
    if (!promptText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          courseContext: selectedCourse,
          role: userRole,
          history: messages.map((m) => ({ role: m.sender === 'user' ? 'user' : 'model', parts: [{ text: m.text }] }))
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to connect to Academic Assistant service.');
      }

      const aiMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `err_${Date.now()}`,
        sender: 'ai',
        text: `⚠️ **Notice**: ${err?.message || 'Unable to connect to LawHub Academic Assistant service.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendPrompt(input);
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const resetChat = () => {
    setMessages([
      {
        id: 'msg_001',
        sender: 'ai',
        text: `Conversation cleared. Ask me any question on Ugandan Law, case ratios, or examination preparation!`,
        timestamp: 'Just now'
      }
    ]);
  };

  const promptChips = [
    'Explain Section 10 of Contracts Act 2010',
    'Summarize Ratio Decidendi in Grace Ibingira v Uganda',
    'Compare Murder vs Manslaughter under S.188 Penal Code',
    'Requirements for spousal consent under S.39 Land Act',
    'Draft an IRAC model answer on Article 28 Right to Fair Hearing'
  ];

  return (
    <div className="relative max-w-5xl mx-auto space-y-5 pb-12 text-slate-100">
      {/* Robot Hand & Cyber Scale Watermark */}
      <WatermarkBackground type="scales" opacity={0.18} blendMode="normal" withVignette={false} withGradientOverlay={false} />

      {/* Header Bar */}
      <div className="relative z-10 bg-slate-950/40 border border-white/10 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#c89d42]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading font-extrabold text-xl text-slate-100">LawHub AI Legal Tutor</h1>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#c89d42] bg-white/[0.05] px-2 py-0.5 rounded border border-[#c89d42]/30 backdrop-blur-sm">
                IRAC Assistant
              </span>
            </div>
            <p className="text-xs text-slate-400">Interactive statutory guidance and judicial precedent reasoning</p>
          </div>
        </div>

        {/* Course Filter Dropdown & Reset */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="flex-1 sm:flex-initial bg-[#18181c] border border-white/10 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-[#c89d42]"
          >
            <option value="Constitutional Law">Constitutional Law</option>
            <option value="Criminal Law">Criminal Law</option>
            <option value="Law of Contract">Law of Contract</option>
            <option value="Land Law">Land Law</option>
            <option value="Company Law">Company Law</option>
            <option value="Civil Procedure">Civil Procedure</option>
            <option value="Law of Evidence">Law of Evidence</option>
            <option value="Legal Ethics">Legal Ethics & Practice</option>
          </select>

          <button
            onClick={resetChat}
            className="p-2 rounded-xl bg-black/30 border border-white/10 text-slate-400 hover:text-[#c89d42] transition cursor-pointer"
            title="Reset Chat"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="relative z-10 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-400 flex items-center gap-1 font-semibold text-[11px]">
          <Lightbulb className="w-3.5 h-3.5 text-[#c89d42]" /> Suggested Prompts:
        </span>
        {promptChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSendPrompt(chip)}
            disabled={isLoading}
            className="px-3 py-1.5 rounded-xl bg-slate-950/40 hover:bg-slate-900/60 border border-white/10 hover:border-[#c89d42]/40 text-slate-300 hover:text-[#c89d42] text-xs transition font-medium cursor-pointer backdrop-blur-md"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Chat Messages Display Window */}
      <div className="relative z-10 bg-slate-950/40 border border-white/10 rounded-3xl p-4 sm:p-6 min-h-[460px] max-h-[600px] overflow-y-auto space-y-5 shadow-2xl backdrop-blur-md">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div key={msg.id} className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
              {/* Avatar Icon */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  isUser
                    ? 'bg-[#c89d42] text-neutral-950 font-bold text-xs'
                    : 'bg-white/[0.05] border border-white/10 text-[#c89d42]'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              </div>

              {/* Message Content Bubble */}
              <div className={`space-y-1 max-w-[85%] sm:max-w-[80%]`}>
                <div className={`flex items-center gap-2 text-[10px] text-slate-400 ${isUser ? 'justify-end' : ''}`}>
                  <span className="font-semibold">{isUser ? 'You' : 'LawHub AI Tutor'}</span>
                  <span>&bull; {msg.timestamp}</span>
                </div>

                <div
                  className={`rounded-2xl p-4 text-xs leading-relaxed space-y-2 relative group backdrop-blur-sm ${
                    isUser
                      ? 'bg-[#c89d42] text-neutral-950 font-medium shadow-md'
                      : 'bg-black/30 border border-white/10 text-slate-100'
                  }`}
                >
                  <div className="whitespace-pre-wrap font-sans">
                    {msg.text}
                  </div>

                  {/* Copy Button & Badges for AI Messages */}
                  {!isUser && (
                    <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2 py-0.5 bg-white/[0.05] text-[#c89d42] font-bold rounded border border-[#c89d42]/30">
                          ✓ Statutory Ratio
                        </span>
                        <span className="px-2 py-0.5 bg-white/[0.05] text-slate-300 font-bold rounded border border-white/10">
                          ✓ IRAC Analysis
                        </span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(msg.id, msg.text)}
                        className="p-1 hover:text-[#c89d42] transition flex items-center gap-1 shrink-0 ml-auto cursor-pointer"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#c89d42]" />
                            <span className="text-[#c89d42] font-semibold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Notes</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-3 items-center text-xs text-[#c89d42] bg-white/[0.04] p-4 rounded-2xl border border-[#c89d42]/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>Analyzing Constitution, Acts of Parliament & Judicial Precedents...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Bar */}
      <form onSubmit={handleFormSubmit} className="relative z-10 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask LawHub AI Tutor a question regarding ${selectedCourse}...`}
          disabled={isLoading}
          className="flex-1 bg-black/30 border border-white/10 text-slate-100 text-xs sm:text-sm rounded-2xl px-4 py-3.5 focus:outline-none focus:border-[#c89d42] backdrop-blur-md"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-5 py-3.5 rounded-2xl bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 font-heading font-bold text-xs sm:text-sm transition disabled:opacity-50 flex items-center gap-2 shadow-md cursor-pointer"
        >
          <span>Send</span>
          <Send className="w-4 h-4 stroke-[2.2]" />
        </button>
      </form>

      {/* Educational Disclaimer Banner */}
      <div className="relative z-10 p-3 bg-slate-950/40 border border-white/10 rounded-2xl text-[11px] text-slate-400 text-center flex items-center justify-center gap-2 backdrop-blur-md">
        <Scale className="w-3.5 h-3.5 text-[#c89d42] shrink-0" />
        <span>
          <strong>Academic Research Notice:</strong> LawHub AI outputs are designed for study and exam preparation. Always verify with primary statutory texts.
        </span>
      </div>

    </div>
  );
};
