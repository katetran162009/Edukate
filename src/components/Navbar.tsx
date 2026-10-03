import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  GraduationCap, 
  User as UserIcon, 
  LogOut, 
  LogIn, 
  History, 
  Database,
  BookOpen
} from 'lucide-react';

interface NavbarProps {
  onOpenAuth: () => void;
  onOpenHistory: () => void;
  onOpenDatabaseManager: () => void;
  onGoHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  onOpenHistory,
  onOpenDatabaseManager,
  onGoHome,
}) => {
  const { userProfile, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <button
            onClick={onGoHome}
            className="flex items-center gap-3 text-left group focus:outline-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-slate-800 tracking-tight">TOÁN 9 THCS</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-100 text-sky-700">
                  HK1 & HK2
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Hệ thống ôn luyện trắc nghiệm & thi vào 10
              </p>
            </div>
          </button>

          {/* Action Navigation */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenDatabaseManager}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-sky-700 hover:bg-sky-50 rounded-lg transition-colors border border-transparent hover:border-sky-200"
              title="Quản lý và đồng bộ ngân hàng câu hỏi Firestore"
            >
              <Database className="w-4 h-4 text-sky-600" />
              <span className="hidden md:inline">Kho câu hỏi</span>
            </button>

            {userProfile ? (
              <>
                <button
                  onClick={onOpenHistory}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-sky-700 hover:bg-sky-50 rounded-lg transition-colors"
                  title="Xem lịch sử làm bài"
                >
                  <History className="w-4 h-4 text-sky-600" />
                  <span className="hidden sm:inline">Lịch sử bài làm</span>
                </button>

                {/* User Dropdown / Chip */}
                <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-sky-500/10 text-sky-700 flex items-center justify-center font-semibold text-xs border border-sky-200">
                    {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : <UserIcon className="w-4 h-4" />}
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-xs font-semibold text-slate-800 leading-none truncate max-w-[120px]">
                      {userProfile.name}
                    </p>
                    <span className="text-[10px] text-sky-600 font-medium">Học sinh</span>
                  </div>
                  <button
                    onClick={() => logout()}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Đăng xuất"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={onOpenAuth}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-xl shadow-xs transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>Đăng nhập</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
