import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Mail, Lock, User, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'login',
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [guestName, setGuestName] = useState('Học sinh Lớp 9');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showGuestForm, setShowGuestForm] = useState(false);

  const {
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    loginAsGuestStudent,
    authError,
    setAuthError,
  } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let success = false;
      if (mode === 'login') {
        success = await signInWithEmail(email, password);
      } else {
        success = await signUpWithEmail(email, password, name || 'Học sinh Lớp 9');
      }
      if (success) {
        onClose();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    try {
      const success = await signInWithGoogle();
      if (success) {
        onClose();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGuestLogin = () => {
    loginAsGuestStudent(guestName);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-sky-100 overflow-hidden">
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-blue-600 px-6 py-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-2 backdrop-blur-xs">
            <User className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold">
            {mode === 'login' ? 'Đăng Nhập Tài Khoản' : 'Đăng Ký Tài Khoản Học Sinh'}
          </h2>
          <p className="text-xs text-sky-100 mt-1">
            Lưu lại kết quả kiểm tra trắc nghiệm Toán 9 và theo dõi sự tiến bộ
          </p>
        </div>

        <div className="p-6">
          {/* Mode switch tabs */}
          <div className="flex bg-slate-100 p-1 rounded-xl mb-5">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setAuthError(null);
              }}
              className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                mode === 'login'
                  ? 'bg-white text-sky-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Đăng nhập
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setAuthError(null);
              }}
              className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                mode === 'register'
                  ? 'bg-white text-sky-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Đăng ký mới
            </button>
          </div>

          {/* Error notification */}
          {authError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          {/* Google Sign In button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 shadow-xs transition-all hover:border-slate-400 active:scale-[0.99] disabled:opacity-60 mb-4"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Đăng nhập với Google</span>
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-slate-400 font-medium">hoặc dùng Email</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Họ và tên học sinh
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ví dụ: Nguyễn Văn An"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-hidden transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Địa chỉ Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hocsinh@thcs.edu.vn"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-hidden transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mật khẩu {mode === 'register' && '(tối thiểu 6 ký tự)'}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-hidden transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-semibold rounded-xl text-sm shadow-md shadow-sky-600/20 transition-all disabled:opacity-60 flex items-center justify-center gap-2 mt-4"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>{mode === 'login' ? 'Đăng nhập ngay' : 'Tạo tài khoản'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick guest testing mode option */}
          <div className="mt-5 pt-4 border-t border-slate-100 text-center">
            {!showGuestForm ? (
              <button
                type="button"
                onClick={() => setShowGuestForm(true)}
                className="text-xs text-sky-600 hover:text-sky-700 font-semibold inline-flex items-center gap-1.5 hover:underline"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Trải nghiệm nhanh không cần mật khẩu</span>
              </button>
            ) : (
              <div className="bg-sky-50 p-3 rounded-xl border border-sky-100 text-left">
                <p className="text-xs font-semibold text-sky-800 mb-1.5">
                  Nhập tên của bạn để bắt đầu làm bài:
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Tên học sinh..."
                    className="flex-1 px-2.5 py-1.5 text-xs bg-white border border-sky-200 rounded-lg outline-hidden focus:ring-1 focus:ring-sky-500"
                  />
                  <button
                    type="button"
                    onClick={handleGuestLogin}
                    className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-semibold"
                  >
                    Bắt đầu
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
