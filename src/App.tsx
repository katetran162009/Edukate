import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { QuizView } from './components/QuizView';
import { ResultView } from './components/ResultView';
import { AuthModal } from './components/AuthModal';
import { HistoryModal } from './components/HistoryModal';
import { QuestionsManagerModal } from './components/QuestionsManagerModal';
import { TopicInfo, Question, QuizResult } from './types';
import { TOPICS, INITIAL_QUESTIONS } from './data/seedQuestions';
import {
  getQuestionsForTopic,
  saveQuizResult,
  getUserQuizHistory,
  seedInitialQuestionsIfEmpty,
} from './services/firestoreService';
import { Loader2 } from 'lucide-react';

function MainAppContent() {
  const { userProfile, user } = useAuth();

  // App Navigation View
  const [currentView, setCurrentView] = useState<'dashboard' | 'quiz' | 'result'>('dashboard');

  // Active Quiz State
  const [selectedTopic, setSelectedTopic] = useState<TopicInfo | null>(null);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [quizUserAnswers, setQuizUserAnswers] = useState<Record<number, string>>({});
  const [quizTimeSpent, setQuizTimeSpent] = useState<number>(0);
  const [loadingQuestions, setLoadingQuestions] = useState<boolean>(false);

  // History & Modals State
  const [history, setHistory] = useState<QuizResult[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean>(false);
  const [isQuestionsManagerOpen, setIsQuestionsManagerOpen] = useState<boolean>(false);

  // Initialize questions in Firestore on start & load local history
  useEffect(() => {
    seedInitialQuestionsIfEmpty().catch(console.warn);

    // Load cached history
    const cachedHistory = localStorage.getItem('toan9_quiz_history');
    if (cachedHistory) {
      try {
        setHistory(JSON.parse(cachedHistory));
      } catch {
        // ignore
      }
    }
  }, []);

  // Fetch Firestore history when user logs in
  useEffect(() => {
    const fetchUserHistory = async () => {
      if (userProfile?.uid) {
        try {
          const results = await getUserQuizHistory(userProfile.uid);
          if (results.length > 0) {
            setHistory(results);
            localStorage.setItem('toan9_quiz_history', JSON.stringify(results));
          }
        } catch (e) {
          console.warn('Lỗi khi tải lịch sử:', e);
        }
      }
    };
    fetchUserHistory();
  }, [userProfile?.uid]);

  // Start quiz for a chosen topic
  const handleSelectTopic = async (topic: TopicInfo) => {
    setLoadingQuestions(true);
    setSelectedTopic(topic);
    try {
      const questions = await getQuestionsForTopic(topic.title);
      setActiveQuestions(questions.length > 0 ? questions : INITIAL_QUESTIONS.slice(0, 5));
      setQuizUserAnswers({});
      setQuizTimeSpent(0);
      setCurrentView('quiz');
    } catch (e) {
      console.error('Lỗi khi tải câu hỏi:', e);
      const fallback = INITIAL_QUESTIONS.filter((q) => q.topic === topic.title);
      setActiveQuestions(fallback.length > 0 ? fallback : INITIAL_QUESTIONS.slice(0, 5));
      setCurrentView('quiz');
    } finally {
      setLoadingQuestions(false);
    }
  };

  // Start exam test (Đề thi thử tổng hợp)
  const handleStartExamTest = () => {
    const examTopic = TOPICS.find((t) => t.id === 'de-thi-thu-vao-10') || TOPICS[TOPICS.length - 1];
    handleSelectTopic(examTopic);
  };

  // When user finishes quiz
  const handleFinishQuiz = async (
    answers: Record<number, string>,
    timeSpentSeconds: number
  ) => {
    setQuizUserAnswers(answers);
    setQuizTimeSpent(timeSpentSeconds);

    if (selectedTopic && activeQuestions.length > 0) {
      let correctCount = 0;
      activeQuestions.forEach((q, idx) => {
        if (answers[idx] === q.content.answer) {
          correctCount++;
        }
      });

      const total = activeQuestions.length;
      const pct = Math.round((correctCount / total) * 100);

      const newResult: QuizResult = {
        uid: userProfile?.uid || 'guest_user',
        userEmail: userProfile?.email || (user?.email ?? undefined),
        userName: userProfile?.name || 'Học sinh',
        topic: selectedTopic.title,
        score: correctCount,
        totalQuestions: total,
        percentage: pct,
        completedAt: new Date().toISOString(),
        answers: answers,
      };

      // Save locally
      const updatedHistory = [newResult, ...history];
      setHistory(updatedHistory);
      localStorage.setItem('toan9_quiz_history', JSON.stringify(updatedHistory));

      // Save to Firestore if user profile exists
      if (userProfile?.uid && !userProfile.uid.startsWith('guest_')) {
        try {
          await saveQuizResult(newResult);
        } catch (e) {
          console.warn('Lỗi khi lưu kết quả vào Firestore:', e);
        }
      }
    }

    setCurrentView('result');
  };

  // Retry same quiz
  const handleRetryQuiz = () => {
    setQuizUserAnswers({});
    setQuizTimeSpent(0);
    setCurrentView('quiz');
  };

  // Back to dashboard
  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50/60 font-sans text-slate-800 flex flex-col">
      {/* Navigation Bar */}
      <Navbar
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenHistory={() => setIsHistoryModalOpen(true)}
        onOpenDatabaseManager={() => setIsQuestionsManagerOpen(true)}
        onGoHome={handleBackToDashboard}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {loadingQuestions && (
          <div className="flex flex-col items-center justify-center py-20 text-sky-600 gap-3">
            <Loader2 className="w-8 h-8 animate-spin" />
            <p className="text-sm font-semibold text-slate-600">Đang tải đề thi và câu hỏi từ Firestore...</p>
          </div>
        )}

        {!loadingQuestions && currentView === 'dashboard' && (
          <Dashboard
            onSelectTopic={handleSelectTopic}
            onStartExamTest={handleStartExamTest}
            history={history}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />
        )}

        {!loadingQuestions && currentView === 'quiz' && selectedTopic && (
          <QuizView
            topicTitle={selectedTopic.title}
            questions={activeQuestions}
            onFinishQuiz={handleFinishQuiz}
            onExit={handleBackToDashboard}
          />
        )}

        {!loadingQuestions && currentView === 'result' && selectedTopic && (
          <ResultView
            topicTitle={selectedTopic.title}
            questions={activeQuestions}
            userAnswers={quizUserAnswers}
            timeSpentSeconds={quizTimeSpent}
            onRetry={handleRetryQuiz}
            onBackToDashboard={handleBackToDashboard}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 border-t border-sky-100 bg-white text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Nền Tảng Ôn Luyện Trắc Nghiệm Toán 9 THCS. Chuẩn chương trình GDPT.</p>
          <p className="text-slate-400">Tích hợp Firebase Auth & Cloud Firestore</p>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        history={history}
        onSelectTopicByName={(topicTitle) => {
          const found = TOPICS.find((t) => t.title === topicTitle);
          if (found) handleSelectTopic(found);
        }}
      />

      <QuestionsManagerModal
        isOpen={isQuestionsManagerOpen}
        onClose={() => setIsQuestionsManagerOpen(false)}
        onQuestionsUpdated={() => {
          if (selectedTopic) {
            getQuestionsForTopic(selectedTopic.title).then(setActiveQuestions);
          }
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
