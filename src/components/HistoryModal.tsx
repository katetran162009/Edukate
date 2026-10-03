import React from 'react';
import { QuizResult } from '../types';
import { X, History, Trophy, Clock, Calendar, CheckCircle2, ChevronRight } from 'lucide-react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: QuizResult[];
  onSelectTopicByName?: (topicTitle: string) => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  onSelectTopicByName,
}) => {
  if (!isOpen) return null;

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return `${d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} - ${d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}`;
    } catch {
      return isoString;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-sky-100 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-sky-600 to-blue-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <History className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">Lịch Sử Làm Bài Trắc Nghiệm</h2>
              <p className="text-xs text-sky-100">Được đồng bộ trên cơ sở dữ liệu Firestore</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="p-6 overflow-y-auto space-y-3 divide-y divide-slate-100">
          {history.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 font-semibold text-sm">Chưa có lịch sử làm bài</p>
              <p className="text-slate-400 text-xs mt-1">
                Hãy chọn một chuyên đề bất kỳ ở trang chủ và hoàn thành bài thi trắc nghiệm đầu tiên!
              </p>
            </div>
          ) : (
            history.map((item, idx) => (
              <div
                key={item.id || idx}
                className="pt-3 first:pt-0 flex items-center justify-between gap-4 group"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-800 truncate group-hover:text-sky-600 transition-colors">
                    {item.topic}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{formatDate(item.completedAt)}</span>
                    </span>
                    <span>•</span>
                    <span className="text-slate-500">
                      Tổng số: {item.totalQuestions} câu
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div
                      className={`text-base sm:text-lg font-black ${
                        item.percentage >= 80
                          ? 'text-emerald-600'
                          : item.percentage >= 50
                          ? 'text-sky-600'
                          : 'text-amber-600'
                      }`}
                    >
                      {item.score}/{item.totalQuestions}
                    </div>
                    <div className="text-[11px] font-semibold text-slate-400">
                      {item.percentage}%
                    </div>
                  </div>

                  {onSelectTopicByName && (
                    <button
                      onClick={() => {
                        onSelectTopicByName(item.topic);
                        onClose();
                      }}
                      className="p-2 rounded-xl text-slate-400 hover:text-sky-600 hover:bg-sky-50 transition-colors"
                      title="Làm lại đề này"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Tổng số lượt hoàn thành: <strong className="text-slate-700">{history.length} bài</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold rounded-xl"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
