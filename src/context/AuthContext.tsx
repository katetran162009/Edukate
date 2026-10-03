import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';
import { syncUserProfile } from '../services/firestoreService';
import { UserProfile } from '../types';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<boolean>;
  signInWithEmail: (email: string, pass: string) => Promise<boolean>;
  signUpWithEmail: (email: string, pass: string, name: string) => Promise<boolean>;
  loginAsGuestStudent: (name?: string) => void;
  logout: () => Promise<void>;
  authError: string | null;
  setAuthError: (err: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const profile = await syncUserProfile(
            currentUser.uid,
            currentUser.email,
            currentUser.displayName
          );
          setUserProfile(profile);
        } catch (e) {
          console.warn('Lỗi đồng bộ hồ sơ người dùng:', e);
        }
      } else {
        // Kiểm tra xem có phiên khách tạm thời trong sessionStorage không
        const cachedGuest = sessionStorage.getItem('toan9_guest_profile');
        if (cachedGuest) {
          try {
            setUserProfile(JSON.parse(cachedGuest));
          } catch {
            setUserProfile(null);
          }
        } else {
          setUserProfile(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setAuthError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        const profile = await syncUserProfile(
          result.user.uid,
          result.user.email,
          result.user.displayName
        );
        setUserProfile(profile);
        sessionStorage.removeItem('toan9_guest_profile');
        return true;
      }
      return false;
    } catch (err: unknown) {
      const errorCode = (err as { code?: string })?.code;
      if (errorCode === 'auth/popup-closed-by-user') {
        // User deliberately closed the popup window - this is not a system error
        setAuthError('Bạn đã đóng cửa sổ đăng nhập Google. Hãy bấm thử lại hoặc dùng Đăng nhập bằng Email.');
        return false;
      } else if (errorCode === 'auth/cancelled-popup-request') {
        setAuthError('Yêu cầu đăng nhập đã bị hủy.');
        return false;
      } else if (errorCode === 'auth/popup-blocked') {
        setAuthError('Trình duyệt đã chặn popup đăng nhập. Vui lòng cho phép mở popup trên trình duyệt của bạn.');
        return false;
      } else if (errorCode === 'auth/network-request-failed') {
        setAuthError('Không thể kết nối máy chủ Google. Vui lòng kiểm tra lại mạng.');
        return false;
      } else {
        console.warn('Google Sign In Warning:', err);
        setAuthError('Đăng nhập Google chưa thành công. Vui lòng thử lại hoặc chọn cách đăng nhập khác.');
        return false;
      }
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    setAuthError(null);
    try {
      const result = await signInWithEmailAndPassword(auth, email, pass);
      if (result.user) {
        const profile = await syncUserProfile(
          result.user.uid,
          result.user.email,
          result.user.displayName
        );
        setUserProfile(profile);
        sessionStorage.removeItem('toan9_guest_profile');
        return true;
      }
      return false;
    } catch (err: unknown) {
      const errorCode = (err as { code?: string })?.code;
      if (errorCode === 'auth/invalid-credential' || errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
        setAuthError('Email hoặc mật khẩu không chính xác.');
      } else if (errorCode === 'auth/operation-not-allowed') {
        setAuthError('Phương thức Email/Mật khẩu chưa được bật trên Firebase Console. Bạn hãy dùng nút "Đăng nhập với Google" hoặc "Trải nghiệm học sinh nhanh".');
      } else {
        console.warn('Email Sign In Warning:', err);
        setAuthError('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.');
      }
      return false;
    }
  };

  const signUpWithEmail = async (email: string, pass: string, name: string) => {
    setAuthError(null);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, pass);
      if (result.user) {
        await updateProfile(result.user, { displayName: name });
        const profile = await syncUserProfile(
          result.user.uid,
          result.user.email,
          name
        );
        setUserProfile(profile);
        sessionStorage.removeItem('toan9_guest_profile');
        return true;
      }
      return false;
    } catch (err: unknown) {
      const errorCode = (err as { code?: string })?.code;
      if (errorCode === 'auth/email-already-in-use') {
        setAuthError('Email này đã được sử dụng. Vui lòng chọn đăng nhập.');
      } else if (errorCode === 'auth/weak-password') {
        setAuthError('Mật khẩu quá ngắn, vui lòng nhập tối thiểu 6 ký tự.');
      } else if (errorCode === 'auth/operation-not-allowed') {
        setAuthError('Phương thức Email/Mật khẩu chưa được bật trên Firebase Console. Bạn hãy dùng nút "Đăng nhập với Google" hoặc "Trải nghiệm học sinh nhanh".');
      } else {
        console.warn('Email Sign Up Warning:', err);
        setAuthError('Đăng ký không thành công. Vui lòng thử lại.');
      }
      return false;
    }
  };

  const loginAsGuestStudent = (name: string = 'Học sinh Lớp 9') => {
    const guestUid = 'guest_' + Math.random().toString(36).substring(2, 9);
    const guestUser: UserProfile = {
      uid: guestUid,
      email: `${guestUid}@thcs.edu.vn`,
      name: name.trim() || 'Học sinh Lớp 9',
      role: 'student',
      createdAt: new Date().toISOString(),
    };
    setUserProfile(guestUser);
    sessionStorage.setItem('toan9_guest_profile', JSON.stringify(guestUser));
    setAuthError(null);
  };

  const logout = async () => {
    sessionStorage.removeItem('toan9_guest_profile');
    setUserProfile(null);
    if (auth.currentUser) {
      await signOut(auth);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        loginAsGuestStudent,
        logout,
        authError,
        setAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
