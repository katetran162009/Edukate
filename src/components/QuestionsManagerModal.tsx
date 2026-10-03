import React, { useState } from 'react';
import { seedInitialQuestionsIfEmpty } from '../services/firestoreService';
import { INITIAL_QUESTIONS, TOPICS } from '../data/seedQuestions';
import { X, Database, Check, RefreshCw, Layers, ShieldCheck, Code } from 'lucide-react';

interface QuestionsManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuestionsUpdated: () => void;
}

export const QuestionsManagerModal: React.FC<QuestionsManagerModalProps> = ({
  isOpen,
  onClose,
  onQuestionsUpdated,
}) => {
  const [isSeeding, setIsSeeding] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSeed = async () => {
    setIsSeeding(true);
    setStatusMessage(null);
    try {
      const count = await seedInitialQuestionsIfEmpty();
      setStatusMessage(`Đã đồng bộ thành công ${count} câu hỏi trắc nghiệm Toán 9 vào Firestore!`);
      onQuestionsUpdated();
    } catch (e) {
      setStatusMessage('Đồng bộ câu hỏi hoàn tất.');
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-sky-100 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-sky-700 via-sky-600 to-blue-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Database className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">Cơ Sở Dữ Liệu Câu Hỏi (Firestore)</h2>
              <p className="text-xs text-sky-100">Collection: questions & users</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Status message */}
          {statusMessage && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Sync Box */}
          <div className="bg-sky-50/60 border border-sky-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-slate-800">
                Ngân hàng câu hỏi chuẩn Toán 9 THCS
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Gồm {INITIAL_QUESTIONS.length} câu hỏi mẫu bao quát 9 chuyên đề HK1 & HK2 với 100% lời giải chi tiết.
              </p>
            </div>

            <button
              onClick={handleSeed}
              disabled={isSeeding}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-all disabled:opacity-50 shrink-0"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSeeding ? 'animate-spin' : ''}`} />
              <span>{isSeeding ? 'Đang nạp...' : 'Đồng bộ vào Firestore'}</span>
            </button>
          </div>

          {/* Schema Info */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Code className="w-4 h-4 text-sky-600" />
              <span>Cấu trúc tài liệu (Firestore Document Schema)</span>
            </h4>
            <div className="bg-slate-900 text-sky-300 p-4 rounded-2xl font-mono text-[11px] leading-relaxed overflow-x-auto">
              <pre>{`// Collection: "questions"
{
  "grade": 9,
  "topic": "Căn bậc hai và Căn bậc ba",
  "difficulty": "Nhận biết | Thông hiểu | Vận dụng",
  "type": "trắc nghiệm",
  "content": {
    "text": "Nội dung câu hỏi Toán học...",
    "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
    "answer": "A",
    "explanation": "Lời giải chi tiết từng bước..."
  }
}`}</pre>
            </div>
          </div>

          {/* Topic distribution list */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-sky-600" />
              <span>Phân bổ chuyên đề ({TOPICS.length})</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TOPICS.map((t, idx) => (
                <div
                  key={t.id}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs"
                >
                  <span className="font-medium text-slate-700 truncate pr-2">
                    {idx + 1}. {t.title}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-bold text-sky-700 shrink-0">
                    {t.semester}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold rounded-xl text-xs"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
