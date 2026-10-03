import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  query,
  where
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase/config';
import { Question, QuizResult, UserProfile } from '../types';
import { INITIAL_QUESTIONS } from '../data/seedQuestions';

const USERS_PATH = 'users';
const QUESTIONS_PATH = 'questions';
const RESULTS_PATH = 'quiz_results';

/**
 * Tạo hoặc cập nhật hồ sơ người dùng trong Firestore collection `users`
 */
export async function syncUserProfile(
  uid: string,
  email: string | null,
  displayName: string | null
): Promise<UserProfile> {
  const userDocRef = doc(db, USERS_PATH, uid);
  try {
    const existingDoc = await getDoc(userDocRef);
    if (existingDoc.exists()) {
      const data = existingDoc.data() as UserProfile;
      return data;
    }

    const newUser: UserProfile = {
      uid,
      email: email || '',
      name: displayName || (email ? email.split('@')[0] : 'Học sinh Lớp 9'),
      role: 'student',
      createdAt: new Date().toISOString(),
    };

    await setDoc(userDocRef, newUser);
    return newUser;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${USERS_PATH}/${uid}`);
    // Fallback profile if offline
    return {
      uid,
      email: email || '',
      name: displayName || 'Học sinh Lớp 9',
      role: 'student',
      createdAt: new Date().toISOString(),
    };
  }
}

/**
 * Lấy thông tin người dùng từ Firestore
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const userDocRef = doc(db, USERS_PATH, uid);
  try {
    const snapshot = await getDoc(userDocRef);
    if (snapshot.exists()) {
      return snapshot.data() as UserProfile;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `${USERS_PATH}/${uid}`);
    return null;
  }
}

/**
 * Nạp ngân hàng câu hỏi ban đầu vào Firestore nếu chưa có
 */
export async function seedInitialQuestionsIfEmpty(): Promise<number> {
  try {
    const qSnapshot = await getDocs(collection(db, QUESTIONS_PATH));
    if (!qSnapshot.empty && qSnapshot.size >= INITIAL_QUESTIONS.length) {
      return qSnapshot.size;
    }

    let addedCount = 0;
    // Thêm các câu hỏi vào Firestore
    for (const q of INITIAL_QUESTIONS) {
      await addDoc(collection(db, QUESTIONS_PATH), {
        ...q,
        createdAt: new Date().toISOString(),
      });
      addedCount++;
    }
    return addedCount;
  } catch (error) {
    console.warn('Lỗi khi nạp dữ liệu câu hỏi vào Firestore (sử dụng câu hỏi có sẵn):', error);
    return INITIAL_QUESTIONS.length;
  }
}

/**
 * Lấy danh sách câu hỏi theo chuyên đề
 */
export async function getQuestionsForTopic(topicTitle: string): Promise<Question[]> {
  try {
    const q = query(
      collection(db, QUESTIONS_PATH),
      where('topic', '==', topicTitle)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const questions: Question[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data() as Question;
        questions.push({
          ...data,
          id: docSnap.id,
        });
      });
      return questions;
    }
  } catch (error) {
    console.warn(`Không thể truy vấn Firestore cho chuyên đề: ${topicTitle}, sử dụng dữ liệu cục bộ dự phòng.`, error);
  }

  // Fallback sang dữ liệu mẫu đã biên soạn
  const localQuestions = INITIAL_QUESTIONS.filter((q) => q.topic === topicTitle);
  if (localQuestions.length > 0) {
    return localQuestions;
  }

  // Nếu là đề tổng hợp hoặc chuyên đề chưa có câu hỏi riêng, lấy tập hợp các câu hỏi
  return INITIAL_QUESTIONS.slice(0, 5);
}

/**
 * Lưu kết quả làm bài trắc nghiệm vào Firestore
 */
export async function saveQuizResult(result: QuizResult): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, RESULTS_PATH), {
      ...result,
      completedAt: new Date().toISOString(),
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, RESULTS_PATH);
    return 'local-id';
  }
}

/**
 * Lấy lịch sử làm bài của học sinh
 */
export async function getUserQuizHistory(uid: string): Promise<QuizResult[]> {
  try {
    const q = query(
      collection(db, RESULTS_PATH),
      where('uid', '==', uid)
    );
    const querySnapshot = await getDocs(q);
    const results: QuizResult[] = [];
    querySnapshot.forEach((docSnap) => {
      results.push({
        id: docSnap.id,
        ...(docSnap.data() as Omit<QuizResult, 'id'>),
      });
    });
    // Sắp xếp thời gian mới nhất lên đầu
    return results.sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
  } catch (error) {
    console.warn('Lỗi khi tải lịch sử bài làm:', error);
    return [];
  }
}
