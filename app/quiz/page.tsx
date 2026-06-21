'use client';

import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, PlayCircle, RotateCcw, ShieldCheck, X } from 'lucide-react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import quizData from '@/lib/onboardingQuizzes.json';

type Audience = 'driver' | 'car_owner';
type Phase = 'role' | 'loading' | 'quiz' | 'result';
type AnswerLetter = 'A' | 'B' | 'C' | 'D';

interface QuizQuestion {
  number: number;
  question: string;
  options: Record<AnswerLetter, string>;
  correct_answer: AnswerLetter;
}

interface QuizSection {
  audience: Audience;
  title: string;
  questions: QuizQuestion[];
}

interface QuizLanguage {
  language: string;
  sections: QuizSection[];
}

const languages = quizData.languages as QuizLanguage[];
const languageLabels: Record<string, string> = {
  English: 'English',
  Twi: 'Twi',
  Ga: 'Ga',
  Ewe: 'Ewe',
};

function TranslateIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="m11.9 21l4.358-11h1.023l4.358 11h-1.081l-1.19-3.05H14.17L12.981 21zm2.608-3.954h4.523l-2.262-5.811zM6.523 16q-1.477 0-2.683-.818t-1.817-2.136l.916-.457q.505 1.05 1.44 1.73q.935.681 2.08.681q1.143 0 1.842-.684Q9 13.633 9 12.577q0-1.113-.732-1.845T6.5 10H4.73V9H6.5q.817 0 1.409-.601q.591-.601.591-1.476q0-.779-.502-1.351T6.621 5q-.613 0-1.063.308t-.8.796l-.767-.61q.496-.665 1.144-1.08Q5.783 4 6.646 4q1.271 0 2.063.859q.791.858.791 2.039q0 .79-.385 1.476q-.384.686-1.051 1.07q.327.154.597.35q.27.194.489.437h4.35V5h-2.384V4h5.769v1H14.5v4.016l-.929 2.215H9.692q.154.294.231.636T10 12.6q0 1.556-.967 2.478T6.523 16" />
    </svg>
  );
}

function LoaderPanel() {
  return (
    <div className="fixed inset-0 z-[9998] overflow-hidden bg-[#0d1b2e] text-white">
      <div className="relative flex h-dvh w-full items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,201,106,0.14),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.06),transparent_38%)]" />
        <div className="relative h-[min(70vw,70dvh,420px)] w-[min(70vw,70dvh,420px)]">
          <div className="absolute inset-0 rounded-full bg-[#081424]/45 blur-3xl" />
          <div className="loader-piece inficir-left-piece absolute inset-0">
            <img src="/loader/leftlogo.png" alt="" draggable={false} className="h-full w-full select-none object-contain" />
          </div>
          <div className="loader-piece inficir-right-piece absolute inset-0">
            <img src="/loader/rightlogo.png" alt="" draggable={false} className="h-full w-full select-none object-contain" />
          </div>
        </div>
      </div>
      <style>{`
        .loader-piece { transform-origin: 50% 50%; will-change: transform; filter: drop-shadow(0 24px 42px rgba(0,0,0,.28)); }
        .inficir-left-piece { animation: quiz-inficir-left-loop 2.8s linear infinite; }
        .inficir-right-piece { animation: quiz-inficir-right-loop 2.8s linear infinite; }
        @keyframes quiz-inficir-left-loop {
          0%, 71.43%, 100% { transform: translate3d(0,0,0) scale(1); }
          75% { transform: translate3d(-5%,-4%,0) scale(.998); }
          78.57% { transform: translate3d(-13%,-7%,0) scale(.994); }
          82.14% { transform: translate3d(-20%,-4%,0) scale(.99); }
          85.71% { transform: translate3d(-23%,0,0) scale(.988); }
          89.29% { transform: translate3d(-20%,4%,0) scale(.99); }
          92.86% { transform: translate3d(-13%,7%,0) scale(.994); }
          96.43% { transform: translate3d(-5%,4%,0) scale(.998); }
        }
        @keyframes quiz-inficir-right-loop {
          0%, 71.43%, 100% { transform: translate3d(0,0,0) scale(1); }
          75% { transform: translate3d(5%,4%,0) scale(.998); }
          78.57% { transform: translate3d(13%,7%,0) scale(.994); }
          82.14% { transform: translate3d(20%,4%,0) scale(.99); }
          85.71% { transform: translate3d(23%,0,0) scale(.988); }
          89.29% { transform: translate3d(20%,-4%,0) scale(.99); }
          92.86% { transform: translate3d(13%,-7%,0) scale(.994); }
          96.43% { transform: translate3d(5%,-4%,0) scale(.998); }
        }
      `}</style>
    </div>
  );
}

export default function QuizPage() {
  const [phase, setPhase] = useState<Phase>('role');
  const [audience, setAudience] = useState<Audience | null>(null);
  const [language, setLanguage] = useState('English');
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, AnswerLetter>>({});
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [slideKey, setSlideKey] = useState(0);

  const selectedLanguage = useMemo(
    () => languages.find((item) => item.language === language) ?? languages[0],
    [language]
  );

  const section = useMemo(() => {
    const target = audience ?? 'driver';
    return selectedLanguage.sections.find((item) => item.audience === target) ?? selectedLanguage.sections[0];
  }, [audience, selectedLanguage]);

  const questions = section.questions;
  const current = questions[Math.min(index, questions.length - 1)];
  const selectedAnswer = answers[current?.number];
  const answeredCount = questions.filter((q) => answers[q.number]).length;
  const score = questions.reduce((total, q) => total + (answers[q.number] === q.correct_answer ? 1 : 0), 0);
  const passMark = Math.ceil(questions.length * 0.8);
  const belowFive = score < 5;

  const startQuiz = (role: Audience) => {
    setAudience(role);
    setAnswers({});
    setIndex(0);
    setFeedback(null);
    setPhase('loading');
    window.setTimeout(() => {
      setPhase('quiz');
      setSlideKey((key) => key + 1);
    }, 3000);
  };

  const changeLanguage = (nextLanguage: string) => {
    setLanguage(nextLanguage);
    setFeedback(null);
    setSlideKey((key) => key + 1);
    const nextSection = languages
      .find((item) => item.language === nextLanguage)
      ?.sections.find((item) => item.audience === audience);
    if (nextSection && index >= nextSection.questions.length) {
      setIndex(nextSection.questions.length - 1);
    }
  };

  const chooseAnswer = (letter: AnswerLetter) => {
    if (!current || selectedAnswer) return;
    const isCorrect = letter === current.correct_answer;
    setAnswers((prev) => ({ ...prev, [current.number]: letter }));
    setFeedback(isCorrect ? 'correct' : 'wrong');
  };

  const goNext = () => {
    setFeedback(null);
    if (index >= questions.length - 1) {
      setPhase('result');
      return;
    }
    setIndex((value) => value + 1);
    setSlideKey((key) => key + 1);
  };

  const goBack = () => {
    if (index === 0) return;
    setFeedback(null);
    setIndex((value) => value - 1);
    setSlideKey((key) => key + 1);
  };

  const restart = () => {
    setAnswers({});
    setIndex(0);
    setFeedback(null);
    setPhase('quiz');
    setSlideKey((key) => key + 1);
  };

  return (
    <div className="min-h-screen bg-[#0d1b2e] text-white">
      <Header />
      {phase === 'loading' && <LoaderPanel />}

      <main className="relative overflow-hidden px-6 py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,201,106,0.08),transparent_28%)]" />
        <div className="relative mx-auto max-w-6xl">
          {phase === 'role' && (
            <section className="quiz-enter py-8">
              <div className="mb-10 max-w-3xl">
                <p className="mb-3 text-sm font-bold tracking-[0.32em] text-[#e8c96a]">CARLYNK ONBOARDING</p>
                <h1 className="text-4xl font-black leading-tight sm:text-5xl">Choose your quiz path</h1>
                <p className="mt-4 text-white/70">
                  Select whether you are joining as a driver or car owner. You can switch languages anytime during the quiz without losing your answers.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <button
                  type="button"
                  onClick={() => startQuiz('driver')}
                  className="group rounded-3xl border border-[#e8c96a]/20 bg-[#122844] p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#e8c96a]/40"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1d4ed8] text-white">
                    <ShieldCheck size={28} />
                  </div>
                  <h2 className="text-2xl font-black text-white">I am a Driver</h2>
                  <p className="mt-3 text-sm leading-6 text-white/60">Training, safety, medical, vehicle matching and handover questions.</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-bold text-[#e8c96a]">
                    Start driver quiz <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => startQuiz('car_owner')}
                  className="group rounded-3xl border border-[#e8c96a]/20 bg-[#122844] p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#e8c96a]/40"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0f766e] text-white">
                    <ShieldCheck size={28} />
                  </div>
                  <h2 className="text-2xl font-black text-white">I am a Car Owner</h2>
                  <p className="mt-3 text-sm leading-6 text-white/60">Vehicle listing, inspection, monitoring, matching and activation questions.</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-bold text-[#e8c96a]">
                    Start owner quiz <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              </div>
            </section>
          )}

          {phase === 'quiz' && current && audience && (
            <section className="quiz-enter">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#e8c96a]">
                    {audience === 'driver' ? 'Driver quiz' : 'Car owner quiz'}
                  </p>
                  <h1 className="text-3xl font-black">Question {index + 1} of {questions.length}</h1>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-[#e8c96a]/20 bg-[#152440] p-1">
                  <TranslateIcon className="ml-3 text-xl text-[#e8c96a]" />
                  {languages.map((item) => (
                    <button
                      key={item.language}
                      type="button"
                      onClick={() => changeLanguage(item.language)}
                      className={`rounded-full px-3 py-2 text-xs font-bold transition-all ${
                        language === item.language ? 'bg-[#e8c96a] text-[#0d1b2e]' : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {languageLabels[item.language] ?? item.language}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6 h-3 overflow-hidden rounded-full bg-[#152440]">
                <div
                  className="h-full rounded-full bg-[#e8c96a] transition-all duration-500"
                  style={{ width: `${((index + 1) / questions.length) * 100}%` }}
                />
              </div>

              <div key={slideKey} className={`question-card rounded-3xl border border-[#e8c96a]/15 bg-[#122844] p-5 sm:p-8 ${feedback === 'wrong' ? 'shake-card' : ''} ${feedback === 'correct' ? 'correct-glow' : ''}`}>
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full bg-[#0d1b2e] px-4 py-2 text-xs font-bold text-[#e8c96a]">
                    {language} · {answeredCount}/{questions.length} answered
                  </span>
                  {selectedAnswer && (
                    <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold ${feedback === 'wrong' ? 'bg-red-500/15 text-red-400' : 'bg-[#1B6B45]/15 text-[#4ade80]'}`}>
                      {feedback === 'wrong' ? <X size={15} /> : <Check size={15} />}
                      {feedback === 'wrong' ? 'Review this answer' : 'Correct answer'}
                    </span>
                  )}
                </div>

                <h2 className="mb-7 text-2xl font-black leading-tight sm:text-3xl">{current.question}</h2>

                <div className="grid gap-3">
                  {(Object.keys(current.options) as AnswerLetter[]).map((letter) => {
                    const isSelected = selectedAnswer === letter;
                    const isCorrect = current.correct_answer === letter;
                    const revealCorrect = Boolean(selectedAnswer) && isCorrect;
                    const wrongSelected = isSelected && !isCorrect;

                    return (
                      <button
                        key={letter}
                        type="button"
                        onClick={() => chooseAnswer(letter)}
                        className={`answer-option flex items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300 ${
                          revealCorrect
                            ? 'border-[#1B6B45] bg-[#1B6B45]/15 shadow-[0_8px_30px_rgba(27,107,69,.18)]'
                            : wrongSelected
                              ? 'border-red-500 bg-red-500/10'
                              : 'border-white/15 bg-[#152440] hover:-translate-y-0.5 hover:border-[#e8c96a]/30'
                        }`}
                      >
                        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black ${
                          revealCorrect ? 'bg-[#1B6B45] text-white' : wrongSelected ? 'bg-red-600 text-white' : 'bg-[#e8c96a] text-[#0d1b2e]'
                        }`}>
                          {letter}
                        </span>
                        <span className="font-semibold">{current.options[letter]}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={index === 0}
                    className="inline-flex items-center gap-2 rounded-full border-2 border-[#e8c96a]/30 px-5 py-3 font-bold text-[#e8c96a] transition-all disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ArrowLeft size={18} /> Back
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={!selectedAnswer}
                    className="inline-flex items-center gap-2 rounded-full bg-[#e8c96a] px-6 py-3 font-bold text-[#0d1b2e] transition-all hover:bg-[#d4b556] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {index >= questions.length - 1 ? 'Finish quiz' : 'Next question'} <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </section>
          )}

          {phase === 'result' && audience && (
            <section className="quiz-enter rounded-3xl border border-[#e8c96a]/15 bg-[#122844] p-6 text-center sm:p-10">
              <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full ${score >= passMark ? 'bg-[#1B6B45]/15 text-[#4ade80]' : 'bg-red-500/15 text-red-400'}`}>
                {score >= passMark ? <ShieldCheck size={42} /> : <PlayCircle size={42} />}
              </div>
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.28em] text-[#e8c96a]">Quiz complete</p>
              <h1 className="text-4xl font-black">{score}/{questions.length}</h1>
              <p className="mx-auto mt-4 max-w-xl text-white/70">
                {score >= passMark
                  ? 'Strong result. You have passed this onboarding quiz and can continue the training flow.'
                  : belowFive
                    ? 'You scored below 5. Please rewatch the onboarding video, review the safety points, then try again.'
                    : `You need at least ${passMark}/${questions.length} to pass. Review the training and try again.`}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button type="button" onClick={restart} className="inline-flex items-center gap-2 rounded-full bg-[#e8c96a] px-6 py-3 font-bold text-[#0d1b2e] hover:bg-[#d4b556]">
                  <RotateCcw size={18} /> Retry quiz
                </button>
                <button type="button" onClick={() => setPhase('role')} className="inline-flex items-center gap-2 rounded-full border-2 border-[#e8c96a]/30 px-6 py-3 font-bold text-[#e8c96a]">
                  Change path
                </button>
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />

      <style>{`
        .quiz-enter { animation: quiz-enter .48s cubic-bezier(.16, 1, .3, 1) both; }
        .question-card { animation: question-slide .42s cubic-bezier(.16, 1, .3, 1) both; }
        .answer-option { transform-origin: center; }
        .shake-card { animation: question-slide .42s cubic-bezier(.16, 1, .3, 1) both, quiz-shake .34s ease-in-out .08s; }
        .correct-glow { box-shadow: 0 12px 40px rgba(27, 107, 69, .18); }
        @keyframes quiz-enter {
          from { opacity: 0; transform: translateY(18px) scale(.985); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes question-slide {
          from { opacity: 0; transform: translateX(28px) scale(.985); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes quiz-shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(7px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}
