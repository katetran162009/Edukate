export type DifficultyLevel = 'Nhận biết' | 'Thông hiểu' | 'Vận dụng' | 'Vận dụng cao';

export interface QuestionContent {
  text: string;
  options: [string, string, string, string] | string[];
  answer: 'A' | 'B' | 'C' | 'D' | string;
  explanation: string;
}

export interface Question {
  id?: string;
  grade: 9;
  topic: string;
  difficulty: DifficultyLevel;
  type: 'trắc nghiệm';
  content: QuestionContent;
  createdAt?: string;
  createdBy?: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  role: 'student' | 'teacher' | 'admin';
  createdAt?: string;
  updatedAt?: string;
}

export interface QuizResult {
  id?: string;
  uid: string;
  userEmail?: string;
  userName?: string;
  topic: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
  answers?: Record<number, string>; // question index -> chosen option
}

export interface TopicInfo {
  id: string;
  title: string;
  semester: 'HK1' | 'HK2';
  category: 'Đại số' | 'Hình học' | 'Tổng hợp';
  description: string;
  estimatedTime: string;
  questionCount?: number;
  iconName?: string;
}
