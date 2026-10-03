import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  Send,
  Grid,
  X
} from 'lucide-react';

interface QuizViewProps {
  topicTitle: string;
  questions: Question[];
  onFinishQuiz: (selectedAnswers: Record<number, string>, timeSpentSeconds: number) => void;
  onExit: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  topicTitle,
  questions,
  onFinishQuiz,
  onExit,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showQuestionPalette, setShowQuestionPalette] = useState(false);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if modal is open or typing in input
      if (showConfirmModal || showExitConfirm) return;
      const key = e.key.toUpperCase();

      if (['A', 'B', 'C', 'D'].includes(key)) {
        handleSelectOption(key);
      } else if (['1', '2', '3', '4'].includes(key)) {
        const optionMap: Record<string, string> = { '1': 'A', '2': 'B', '3': 'C', '4': 'D' };
        handleSelectOption(optionMap[key]);
      } else if (e.key === 'ArrowRight' && !isLastQuestion) {
        setCurrentIndex((prev) => Math.min(prev + 1, totalQuestions - 1));
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isLastQuestion, totalQuestions, showConfirmModal, showExitConfirm]);

  const handleSelectOption = (optionLetter: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionLetter,
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleAttemptSubmit = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = () => {
    setShowConfirmModal(false);
    onFinishQuiz(selectedAnswers, secondsElapsed);
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentQuestion) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-sky-100">
        <p className="text-slate-600 mb-4">Không có câu hỏi nào cho chuyên đề này.</p>
        <button
          onClick={onExit}
          className="px-4 py-2 bg-sky-600 text-white rounded-xl text-sm font-semibold"
        >
          Quay lại danh sách
        </button>
      </div>
    );
  }

  // Difficulty badge colors
  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'Nhận biết':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Thông hiểu':
        return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'Vận dụng':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Vận dụng cao':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Top Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-sky-100 shadow-xs">
        <div className="flex items-center justify-between gap-3 mb-3">
          <button
            onClick={() => setShowExitConfirm(true)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Rời bài thi</span>
          </button>

          <div className="text-center flex-1 truncate px-2">
            <h2 className="text-sm sm:text-base font-bold text-slate-800 truncate">
              {topicTitle}
            </h2>
            <p className="text-[11px] text-slate-400 font-medium">
              Chương trình Toán 9 THCS
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Timer */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 text-sky-700 font-mono text-xs sm:text-sm font-bold border border-sky-100">
              <Clock className="w-3.5 h-3.5 text-sky-600" />
              <span>{formatTimer(secondsElapsed)}</span>
            </div>

            {/* Palette Drawer Button */}
            <button
              onClick={() => setShowQuestionPalette(!showQuestionPalette)}
              className="p-1.5 rounded-xl text-slate-600 hover:text-sky-600 hover:bg-sky-50 border border-slate-200 sm:hidden"
              title="Danh sách câu hỏi"
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between items-center text-xs text-slate-500 font-medium mb-1.5">
            <span className="font-semibold text-sky-700">
              Câu {currentIndex + 1} / {totalQuestions}
            </span>
            <span>
              Đã làm: <strong className="text-slate-700">{answeredCount}/{totalQuestions}</strong> câu
            </span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-blue-600 transition-all duration-300 rounded-full"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-sm relative">
        {/* Question Header: Tag & Difficulty */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-sky-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
              {currentIndex + 1}
            </span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Câu hỏi số {currentIndex + 1}
            </span>
          </div>

          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getDifficultyBadge(
              currentQuestion.difficulty
            )}`}
          >
            {currentQuestion.difficulty}
          </span>
        </div>

        {/* Question Content */}
        <div className="mb-8">
          <p className="text-slate-800 text-base sm:text-lg font-medium leading-relaxed whitespace-pre-line">
            {currentQuestion.content.text}
          </p>
        </div>

        {/* Option Choices */}
        <div className="space-y-3">
          {currentQuestion.content.options.map((option, idx) => {
            const letter = ['A', 'B', 'C', 'D'][idx];
            const isSelected = selectedAnswers[currentIndex] === letter;

            return (
              <button
                key={letter}
                onClick={() => handleSelectOption(letter)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 group relative ${
                  isSelected
                    ? 'border-sky-500 bg-sky-50/70 shadow-xs'
                    : 'border-slate-200 hover:border-sky-200 hover:bg-slate-50/70 bg-white'
                }`}
              >
                {/* Letter Circle */}
                <div
                  className={`w-8 h-8 rounded-xl font-bold text-sm flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-sky-600 text-white'
                      : 'bg-slate-100 text-slate-700 group-hover:bg-sky-100 group-hover:text-sky-700'
                  }`}
                >
                  {letter}
                </div>

                {/* Option text */}
                <div className="flex-1 pt-1">
                  <span className="text-sm sm:text-base text-slate-800 font-medium leading-snug">
                    {/* Remove redundant "A. ", "B. " if already part of string */}
                    {option.replace(/^[A-D]\.\s*/, '')}
                  </span>
                </div>

                {/* Selected Indicator */}
                {isSelected && (
                  <CheckCircle className="w-5 h-5 text-sky-600 shrink-0 mt-1" />
                )}
              </button>
            );
          })}
        </div>

        {/* Helper footnote */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span className="hidden sm:inline">
            Mẹo: Nhấn phím <kbd className="px-1.5 py-0.5 bg-slate-100 border rounded-md font-mono text-[11px]">A</kbd>, <kbd className="px-1.5 py-0.5 bg-slate-100 border rounded-md font-mono text-[11px]">B</kbd>, <kbd className="px-1.5 py-0.5 bg-slate-100 border rounded-md font-mono text-[11px]">C</kbd>, <kbd className="px-1.5 py-0.5 bg-slate-100 border rounded-md font-mono text-[11px]">D</kbd> để chọn nhanh.
          </span>
          <span className="italic ml-auto">
            {selectedAnswers[currentIndex] ? '✓ Đã chọn đáp án' : 'Chưa chọn đáp án'}
          </span>
        </div>
      </div>

      {/* Question Palette for quick jump */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-sky-100 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
            Bảng câu hỏi
          </span>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-600"></span> Đã làm ({answeredCount})
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span> Chưa làm ({totalQuestions - answeredCount})
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {questions.map((_, idx) => {
            const isAnswered = selectedAnswers[idx] !== undefined;
            const isCurrent = currentIndex === idx;

            return (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${
                  isCurrent
                    ? 'ring-2 ring-sky-500 ring-offset-2 bg-sky-600 text-white shadow-xs'
                    : isAnswered
                    ? 'bg-sky-100 text-sky-800 hover:bg-sky-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation Buttons */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Câu trước</span>
        </button>

        <div className="flex items-center gap-3">
          {isLastQuestion ? (
            <button
              onClick={handleAttemptSubmit}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Nộp bài</span>
            </button>
          ) : (
            <>
              <button
                onClick={handleAttemptSubmit}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-emerald-700 bg-emerald-50 hover:bg-emerald-100 font-semibold text-xs transition-colors"
              >
                <span>Nộp bài sớm</span>
              </button>
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-sky-600/20 active:scale-95 transition-all"
              >
                <span>Câu tiếp theo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Confirm Submission Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-sky-100 text-center animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <Send className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-800 mb-2">
              Xác Nhận Nộp Bài Kiểm Tra?
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 mb-4">
              Bạn đã trả lời được <strong className="text-sky-700">{answeredCount}/{totalQuestions}</strong> câu hỏi.
              {answeredCount < totalQuestions && (
                <span className="block mt-1 text-amber-600 font-medium">
                  ⚠️ Còn {totalQuestions - answeredCount} câu hỏi bạn chưa chọn đáp án.
                </span>
              )}
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-xs sm:text-sm transition-colors"
              >
                Tiếp tục làm
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all"
              >
                Đồng ý nộp bài
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Exit Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1">
              Rời khỏi bài thi?
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Kết quả làm bài hiện tại sẽ không được lưu nếu bạn thoát ra lúc này.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
              >
                Ở lại làm tiếp
              </button>
              <button
                onClick={onExit}
                className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold"
              >
                Thoát bài thi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
