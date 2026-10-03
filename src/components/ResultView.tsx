import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Question } from '../types';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  ArrowLeft,
  BookOpen,
  Check,
  X,
  Sparkles,
  HelpCircle,
  Filter
} from 'lucide-react';

interface ResultViewProps {
  topicTitle: string;
  questions: Question[];
  userAnswers: Record<number, string>;
  timeSpentSeconds: number;
  onRetry: () => void;
  onBackToDashboard: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  topicTitle,
  questions,
  userAnswers,
  timeSpentSeconds,
  onRetry,
  onBackToDashboard,
}) => {
  const [filterMode, setFilterMode] = useState<'ALL' | 'CORRECT' | 'WRONG'>('ALL');

  // Calculate results
  const totalQuestions = questions.length;
  let correctCount = 0;
  let wrongCount = 0;
  let skippedCount = 0;

  questions.forEach((q, idx) => {
    const chosen = userAnswers[idx];
    if (!chosen) {
      skippedCount++;
    } else if (chosen === q.content.answer) {
      correctCount++;
    } else {
      wrongCount++;
    }
  });

  const percentage = Math.round((correctCount / totalQuestions) * 100);
  const scoreOverTen = ((correctCount / totalQuestions) * 10).toFixed(1);

  // Trigger confetti if score is >= 70%
  useEffect(() => {
    if (percentage >= 70) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        console.warn('Confetti error:', err);
      }
    }
  }, [percentage]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins} phút ${secs} giây`;
  };

  const getEvaluation = () => {
    if (percentage === 100) return { title: 'Tuyệt đối 10/10! Xuất sắc!', desc: 'Bạn đã nắm vững toàn bộ kiến thức của chuyên đề này. Tiếp tục phát huy nhé!', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (percentage >= 80) return { title: 'Kết quả Giỏi!', desc: 'Bạn làm bài rất tốt! Hãy xem lại các câu chưa chính xác để hoàn thiện kiến thức hơn nữa.', color: 'text-sky-700 bg-sky-50 border-sky-200' };
    if (percentage >= 60) return { title: 'Kết quả Khá!', desc: 'Bạn đã nắm được các dạng toán cơ bản. Đọc kĩ lời giải chi tiết bên dưới để đạt điểm cao hơn.', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    return { title: 'Cần cố gắng thêm!', desc: 'Đừng nản lòng, hãy xem kĩ từng lời giải chi tiết bên dưới và làm lại để nhớ kiến thức nhé.', color: 'text-rose-700 bg-rose-50 border-rose-200' };
  };

  const evaluation = getEvaluation();

  const filteredQuestions = questions
    .map((q, originalIndex) => ({
      question: q,
      index: originalIndex,
      userAnswer: userAnswers[originalIndex],
      isCorrect: userAnswers[originalIndex] === q.content.answer,
      isSkipped: !userAnswers[originalIndex],
    }))
    .filter((item) => {
      if (filterMode === 'CORRECT') return item.isCorrect;
      if (filterMode === 'WRONG') return !item.isCorrect;
      return true;
    });

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Top Hero Score Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-sky-100 shadow-md text-center relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600"></div>

        <div className="max-w-xl mx-auto pt-2">
          {/* Trophy Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/25 mb-4">
            <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-amber-300" />
          </div>

          <span className="text-xs uppercase font-bold tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            Kết Quả Kiểm Tra Trắc Nghiệm
          </span>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mt-2 mb-1">
            {topicTitle}
          </h2>

          {/* Main Score Display */}
          <div className="my-6">
            <div className="text-5xl sm:text-6xl font-black text-slate-800 tracking-tight flex items-center justify-center gap-2">
              <span className="text-sky-600">{correctCount}</span>
              <span className="text-slate-300 font-light">/</span>
              <span>{totalQuestions}</span>
            </div>
            <div className="text-sm font-semibold text-slate-500 mt-1">
              Thang điểm 10: <strong className="text-slate-800">{scoreOverTen} điểm</strong> ({percentage}%)
            </div>
          </div>

          {/* Evaluation banner */}
          <div className={`p-4 rounded-2xl border text-sm mb-6 ${evaluation.color}`}>
            <p className="font-bold flex items-center justify-center gap-1.5 mb-0.5">
              <Sparkles className="w-4 h-4" />
              <span>{evaluation.title}</span>
            </p>
            <p className="text-xs opacity-90">{evaluation.desc}</p>
          </div>

          {/* Summary breakdown row */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl mb-8">
            <div className="text-center">
              <div className="text-xs text-slate-500 font-medium">Số câu đúng</div>
              <div className="text-lg sm:text-xl font-bold text-emerald-600 flex items-center justify-center gap-1 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>{correctCount}</span>
              </div>
            </div>

            <div className="text-center border-x border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Số câu sai</div>
              <div className="text-lg sm:text-xl font-bold text-rose-600 flex items-center justify-center gap-1 mt-0.5">
                <XCircle className="w-4 h-4" />
                <span>{wrongCount}</span>
              </div>
            </div>

            <div className="text-center">
              <div className="text-xs text-slate-500 font-medium">Thời gian</div>
              <div className="text-xs sm:text-sm font-bold text-slate-700 flex items-center justify-center gap-1 mt-1">
                <Clock className="w-3.5 h-3.5 text-sky-600" />
                <span>{formatTimer(timeSpentSeconds)}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onRetry}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-sky-600/20 active:scale-95 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Làm lại chuyên đề này</span>
            </button>

            <button
              onClick={onBackToDashboard}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Về danh sách chuyên đề</span>
            </button>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-sky-600" />
              <span>Xem Lại Bài Làm & Lời Giải Chi Tiết</span>
            </h3>
            <p className="text-xs text-slate-500">
              Kiểm tra chi tiết từng phương án và phương pháp giải từng câu
            </p>
          </div>

          {/* Filter options */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setFilterMode('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterMode === 'ALL'
                  ? 'bg-white text-sky-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tất cả ({totalQuestions})
            </button>
            <button
              onClick={() => setFilterMode('CORRECT')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterMode === 'CORRECT'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Câu đúng ({correctCount})
            </button>
            <button
              onClick={() => setFilterMode('WRONG')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterMode === 'WRONG'
                  ? 'bg-white text-rose-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Câu sai/chưa làm ({wrongCount + skippedCount})
            </button>
          </div>
        </div>

        {/* Question Review Cards */}
        <div className="space-y-5">
          {filteredQuestions.map(({ question, index, userAnswer, isCorrect, isSkipped }) => {
            const correctAnswer = question.content.answer;

            return (
              <div
                key={index}
                className={`bg-white rounded-3xl p-6 border shadow-xs transition-all ${
                  isCorrect
                    ? 'border-emerald-200'
                    : isSkipped
                    ? 'border-amber-200'
                    : 'border-rose-200'
                }`}
              >
                {/* Header status */}
                <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-slate-800 text-white text-xs font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-700">
                      Câu {index + 1}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
                      {question.difficulty}
                    </span>
                  </div>

                  <div>
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                        <Check className="w-3.5 h-3.5" />
                        <span>Đúng (+1đ)</span>
                      </span>
                    ) : isSkipped ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Chưa trả lời</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
                        <X className="w-3.5 h-3.5" />
                        <span>Chưa chính xác</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Text */}
                <p className="text-slate-800 text-sm sm:text-base font-semibold leading-relaxed mb-4 whitespace-pre-line">
                  {question.content.text}
                </p>

                {/* Options List */}
                <div className="space-y-2 mb-5">
                  {question.content.options.map((opt, optIdx) => {
                    const letter = ['A', 'B', 'C', 'D'][optIdx];
                    const isUserChoice = userAnswer === letter;
                    const isRightAnswer = correctAnswer === letter;

                    let optionStyle = 'border-slate-200 bg-white text-slate-700';
                    let badge = null;

                    if (isRightAnswer) {
                      optionStyle = 'border-emerald-500 bg-emerald-50/80 text-emerald-900 font-semibold ring-1 ring-emerald-500';
                      badge = (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 ml-auto bg-emerald-100 px-2 py-0.5 rounded-md">
                          <Check className="w-3 h-3" /> Đáp án đúng
                        </span>
                      );
                    } else if (isUserChoice && !isRightAnswer) {
                      optionStyle = 'border-rose-400 bg-rose-50/80 text-rose-900 font-medium ring-1 ring-rose-400';
                      badge = (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 ml-auto bg-rose-100 px-2 py-0.5 rounded-md">
                          <X className="w-3 h-3" /> Bạn đã chọn
                        </span>
                      );
                    }

                    return (
                      <div
                        key={letter}
                        className={`p-3 rounded-xl border text-xs sm:text-sm flex items-center gap-3 transition-colors ${optionStyle}`}
                      >
                        <div
                          className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                            isRightAnswer
                              ? 'bg-emerald-600 text-white'
                              : isUserChoice
                              ? 'bg-rose-600 text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {letter}
                        </div>
                        <span className="flex-1">
                          {opt.replace(/^[A-D]\.\s*/, '')}
                        </span>
                        {badge}
                      </div>
                    );
                  })}
                </div>

                {/* Detailed Explanation */}
                <div className="bg-sky-50/70 border border-sky-200/80 rounded-2xl p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-sky-800 font-bold text-xs uppercase tracking-wider mb-2">
                    <Sparkles className="w-4 h-4 text-sky-600" />
                    <span>Lời giải chi tiết:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line font-normal">
                    {question.content.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
