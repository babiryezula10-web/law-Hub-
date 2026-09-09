import React, { useState } from 'react';
import { WatermarkBackground } from './WatermarkBackground';
import {
  Award,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  RotateCcw,
  Trophy,
  Download,
  Flame,
  ChevronRight
} from 'lucide-react';
import { quizPresets } from '../data/mockData';
import { Quiz, QuizQuestion } from '../types';

interface QuizAttempt {
  id: string;
  quizTitle: string;
  score: number;
  total: number;
  percentage: number;
  date: string;
}

export const QuizCentre: React.FC = () => {
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(quizPresets[0]);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Performance history state
  const [history, setHistory] = useState<QuizAttempt[]>([
    {
      id: 'att_01',
      quizTitle: 'Constitutional Law & Chapter IV Mastery',
      score: 5,
      total: 5,
      percentage: 100,
      date: '2025-02-10'
    },
    {
      id: 'att_02',
      quizTitle: 'Civil Procedure & Pleadings (LDC)',
      score: 4,
      total: 5,
      percentage: 80,
      date: '2025-02-08'
    }
  ]);

  // AI Quiz Generation Form State
  const [genTopic, setGenTopic] = useState('Land Law Customary Tenure');
  const [genCourse, setGenCourse] = useState('Land Law');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSelectOption = (qId: string, option: string) => {
    if (submitted) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const handleSubmitQuiz = () => {
    if (!activeQuiz) return;
    let correctCount = 0;
    activeQuiz.questions.forEach((q) => {
      const uAns = userAnswers[q.id] || '';
      if (uAns.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setSubmitted(true);

    // Save performance history
    const attempt: QuizAttempt = {
      id: `att_${Date.now()}`,
      quizTitle: activeQuiz.title,
      score: correctCount,
      total: activeQuiz.totalQuestions,
      percentage: Math.round((correctCount / activeQuiz.totalQuestions) * 100),
      date: new Date().toISOString().split('T')[0]
    };
    setHistory((prev) => [attempt, ...prev]);
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const handleGenerateAiQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!genTopic.trim() || isGenerating) return;

    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseTitle: genCourse, topic: genTopic, questionCount: 4 })
      });

      const data = await res.json();
      if (data.questions && data.questions.length > 0) {
        const newQuiz: Quiz = {
          id: `quiz_ai_${Date.now()}`,
          title: `AI Generated Quiz: ${genTopic}`,
          courseTitle: genCourse,
          durationMinutes: 10,
          totalQuestions: data.questions.length,
          difficulty: 'LDC Bar Level',
          questions: data.questions
        };
        setActiveQuiz(newQuiz);
        handleResetQuiz();
      }
    } catch (err) {
      console.error('Quiz Generation Error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative space-y-8 pb-12 text-slate-100">
      <WatermarkBackground type="golden_tome" opacity={0.18} blendMode="normal" withVignette={false} withGradientOverlay={false} />
      
      {/* Header & AI Quiz Generator Form */}
      <div className="relative z-10 bg-slate-950/40 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-[#c89d42]">
                <Award className="w-5 h-5" />
              </span>
              <h1 className="font-heading font-extrabold text-2xl text-slate-100">
                LawHub Quiz & Examination Centre
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Test your knowledge with multiple choice, true/false, and timed problem questions. Generate unlimited quizzes on demand!
            </p>
          </div>

          <div className="flex items-center gap-2 bg-black/30 p-2 rounded-2xl border border-white/10 text-xs backdrop-blur-sm">
            <Trophy className="w-4 h-4 text-[#c89d42]" />
            <span className="text-slate-200 font-semibold">Rank: <strong>Top 5% Student</strong></span>
          </div>
        </div>

        {/* Preset Quizzes Selector */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-300">Curated Exam Presets:</p>
          <div className="flex flex-wrap gap-2">
            {quizPresets.map((qp) => {
              const isSelected = activeQuiz?.id === qp.id;
              return (
                <button
                  key={qp.id}
                  onClick={() => {
                    setActiveQuiz(qp);
                    handleResetQuiz();
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer backdrop-blur-sm ${
                    isSelected
                      ? 'bg-[#c89d42] text-neutral-950 shadow-md'
                      : 'bg-black/30 text-slate-300 hover:text-[#c89d42] border border-white/10'
                  }`}
                >
                  <span>{qp.title}</span>
                  <span className="text-[10px] opacity-75">({qp.totalQuestions} Qs)</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* AI Quiz Generator Card */}
        <form onSubmit={handleGenerateAiQuiz} className="bg-black/30 p-4 sm:p-5 rounded-2xl border border-[#c89d42]/30 space-y-3 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-[#c89d42]">
            <Sparkles className="w-4 h-4" />
            <span>Generate Custom AI Quiz for Any Topic</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Law Course</label>
              <select
                value={genCourse}
                onChange={(e) => setGenCourse(e.target.value)}
                className="w-full bg-[#18181c] border border-white/10 text-slate-200 text-xs rounded-xl p-2.5 focus:outline-none"
              >
                <option value="Constitutional Law">Constitutional Law</option>
                <option value="Criminal Law">Criminal Law</option>
                <option value="Land Law">Land Law</option>
                <option value="Law of Contract">Law of Contract</option>
                <option value="Company Law">Company Law</option>
                <option value="Civil Procedure">Civil Procedure (LDC)</option>
              </select>
            </div>

            <div className="md:col-span-2 flex gap-2 items-end">
              <div className="flex-1">
                <label className="text-[10px] text-slate-400 block mb-1">Specific Topic or Statute Section</label>
                <input
                  type="text"
                  value={genTopic}
                  onChange={(e) => setGenTopic(e.target.value)}
                  placeholder="e.g. S.39 Land Act consent, Article 28 Fair Trial..."
                  className="w-full bg-[#18181c] border border-white/10 text-slate-100 text-xs rounded-xl p-2.5 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="px-5 py-2.5 rounded-xl bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 font-bold text-xs transition flex items-center gap-1.5 whitespace-nowrap shadow-md cursor-pointer"
              >
                {isGenerating ? <Sparkles className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>{isGenerating ? 'Generating...' : 'Generate Quiz'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Active Quiz Window */}
      {activeQuiz && (
        <div className="bg-slate-950/40 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-bold text-[#c89d42] bg-white/[0.05] px-3 py-1 rounded-full border border-[#c89d42]/30">
                {activeQuiz.courseTitle}
              </span>
              <h2 className="font-heading font-extrabold text-xl text-slate-100 mt-1">{activeQuiz.title}</h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-4 h-4 text-[#c89d42]" /> {activeQuiz.durationMinutes} Mins
              </span>
              <button
                onClick={handleResetQuiz}
                className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-400 hover:text-[#c89d42] transition cursor-pointer"
                title="Restart Quiz"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quiz Score Banner */}
          {submitted && (
            <div className="p-6 rounded-2xl bg-black/40 border border-[#c89d42]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left backdrop-blur-sm">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Exam Results Completed</span>
                <h3 className="font-heading font-extrabold text-2xl text-slate-100 mt-1">
                  Score: <span className="text-[#c89d42]">{score} / {activeQuiz.totalQuestions}</span> ({Math.round((score / activeQuiz.totalQuestions) * 100)}%)
                </h3>
                <p className="text-xs text-slate-300">
                  {score === activeQuiz.totalQuestions
                    ? '🎉 Perfect Score! Outstanding mastery of Ugandan legal precedent.'
                    : 'Great effort! Review statutory explanations below to strengthen your bar prep.'}
                </p>
              </div>

              {score >= Math.ceil(activeQuiz.totalQuestions * 0.7) && (
                <a
                  href={`data:text/plain;charset=utf-8,${encodeURIComponent(`LAWHUB UGANDA CERTIFICATE OF COMPLETION\n\nThis certifies that Student Babirye Zula has successfully passed the exam "${activeQuiz.title}" with a score of ${score}/${activeQuiz.totalQuestions}.\n\nDate: 12th August 2025\nIssuer: LawHub AI Examination Board`)}`}
                  download="LawHub_Quiz_Certificate.txt"
                  className="px-5 py-2.5 rounded-xl bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 font-bold text-xs transition flex items-center gap-2 whitespace-nowrap shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  <Award className="w-4 h-4" /> Download Certificate
                </a>
              )}
            </div>
          )}

          {/* Questions List */}
          <div className="space-y-6">
            {activeQuiz.questions.map((q, idx) => {
              const uAns = userAnswers[q.id] || '';
              const isCorrect = uAns.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();

              return (
                <div key={q.id} className="bg-black/30 p-5 rounded-2xl border border-white/10 space-y-4 backdrop-blur-sm">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-bold text-sm text-slate-100">
                      Q{idx + 1}. {q.question}
                    </p>
                    {submitted && (
                      <span className="shrink-0">
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-rose-400" />
                        )}
                      </span>
                    )}
                  </div>

                  {/* Options for MCQ / True False */}
                  {q.options ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = uAns === opt;
                        let optionStyle = 'bg-white/[0.04] border-white/10 text-slate-300 hover:border-[#c89d42]/40';

                        if (submitted) {
                          if (opt.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()) {
                            optionStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                          } else if (isSelected) {
                            optionStyle = 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold';
                          }
                        } else if (isSelected) {
                          optionStyle = 'bg-[#c89d42]/20 border-[#c89d42] text-[#c89d42] font-bold';
                        }

                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleSelectOption(q.id, opt)}
                            className={`p-3 rounded-xl border text-xs text-left transition cursor-pointer ${optionStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    /* Text input for Fill in blanks or Essay */
                    <input
                      type="text"
                      value={uAns}
                      onChange={(e) => handleSelectOption(q.id, e.target.value)}
                      placeholder="Type your answer here..."
                      disabled={submitted}
                      className="w-full bg-[#18181c] border border-white/10 text-slate-100 text-xs rounded-xl p-3 focus:outline-none"
                    />
                  )}

                  {/* Explanation Banner */}
                  {submitted && (
                    <div className="p-3.5 bg-black/40 rounded-xl border border-white/10 space-y-1 text-xs backdrop-blur-sm">
                      <p className="font-bold text-[#c89d42]">Statutory & Case Law Explanation:</p>
                      <p className="text-slate-300">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit Action */}
          {!submitted ? (
            <button
              onClick={handleSubmitQuiz}
              className="w-full py-3.5 rounded-2xl bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 font-bold text-sm transition shadow-lg cursor-pointer"
            >
              Submit Examination Answers
            </button>
          ) : (
            <button
              onClick={handleResetQuiz}
              className="w-full py-3.5 rounded-2xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-slate-100 font-bold text-sm transition cursor-pointer"
            >
              Retake Quiz
            </button>
          )}
        </div>
      )}

      {/* Performance History Section */}
      <div className="bg-slate-950/40 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#c89d42]" />
            <h2 className="font-heading font-extrabold text-lg text-slate-100">Your Exam Performance History</h2>
          </div>
          <span className="text-xs text-slate-400 font-semibold">{history.length} Attempt{history.length !== 1 ? 's' : ''} Recorded</span>
        </div>

        <div className="space-y-2">
          {history.map((att) => (
            <div
              key={att.id}
              className="bg-black/30 p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs backdrop-blur-sm"
            >
              <div>
                <h4 className="font-bold text-slate-100">{att.quizTitle}</h4>
                <p className="text-slate-400 text-[11px]">Completed on {att.date}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono text-slate-300 font-bold">{att.score} / {att.total} ({att.percentage}%)</span>
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-extrabold ${
                    att.percentage >= 70
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}
                >
                  {att.percentage >= 70 ? 'PASS' : 'NEEDS REVISION'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
