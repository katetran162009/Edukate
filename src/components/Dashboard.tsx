import React, { useState, useMemo } from 'react';
import { TopicInfo, QuizResult } from '../types';
import { TOPICS } from '../data/seedQuestions';
import { useAuth } from '../context/AuthContext';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Search,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  Layers,
  ChevronRight,
  Zap,
  Filter
} from 'lucide-react';

interface DashboardProps {
  onSelectTopic: (topic: TopicInfo) => void;
  onStartExamTest: () => void;
  history: QuizResult[];
  onOpenAuth: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onSelectTopic,
  onStartExamTest,
  history,
  onOpenAuth,
}) => {
  const { userProfile } = useAuth();
  const [selectedSemester, setSelectedSemester] = useState<'ALL' | 'HK1' | 'HK2'>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'Đại số' | 'Hình học'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Map latest score for each topic
  const topicLatestScore = useMemo(() => {
    const map: Record<string, QuizResult> = {};
    history.forEach((res) => {
      if (!map[res.topic] || new Date(res.completedAt) > new Date(map[res.topic].completedAt)) {
        map[res.topic] = res;
      }
    });
    return map;
  }, [history]);

  const filteredTopics = useMemo(() => {
    return TOPICS.filter((topic) => {
      const matchSemester = selectedSemester === 'ALL' || topic.semester === selectedSemester;
      const matchCategory = selectedCategory === 'ALL' || topic.category === selectedCategory;
      const matchQuery =
        searchQuery.trim() === '' ||
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSemester && matchCategory && matchQuery;
    });
  }, [selectedSemester, selectedCategory, searchQuery]);

  const totalCompleted = history.length;
  const averagePercentage = totalCompleted > 0
    ? Math.round(history.reduce((acc, cur) => acc + cur.percentage, 0) / totalCompleted)
    : 0;

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 text-white p-6 sm:p-10 shadow-xl shadow-sky-900/10">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-sky-100 text-xs font-semibold mb-4 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Chương trình Toán THCS Lớp 9 - Ôn thi vào 10</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            {userProfile ? `Chào mừng bạn ${userProfile.name}! 👋` : 'Luyện Thi Trắc Nghiệm Toán 9'}
          </h1>
          <p className="text-sky-100 text-sm sm:text-base leading-relaxed mb-6 font-normal">
            Ngân hàng câu hỏi trắc nghiệm bám sát chương trình Giáo dục Phổ thông Lớp 9 (Học kỳ 1 & Học kỳ 2). 
            Đầy đủ các mức độ Nhận biết, Thông hiểu, Vận dụng cùng <strong className="text-white font-semibold">100% lời giải chi tiết từng bước</strong>.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onStartExamTest}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-sky-700 hover:bg-sky-50 font-bold text-sm shadow-lg shadow-black/10 hover:shadow-xl transition-all transform active:scale-95"
            >
              <Zap className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>Làm Đề Thi Thử Vào Lớp 10</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {!userProfile && (
              <button
                onClick={onOpenAuth}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/15 hover:bg-white/20 text-white text-sm font-semibold border border-white/20 backdrop-blur-xs transition-colors"
              >
                Đăng nhập để lưu điểm
              </button>
            )}
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute right-12 top-10 w-40 h-40 bg-sky-400/20 rounded-full blur-xl pointer-events-none"></div>
      </div>

      {/* Quick Statistics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-sky-100/80 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg sm:text-2xl font-bold text-slate-800">9</div>
            <div className="text-xs text-slate-500 font-medium">Chuyên đề HK1 & HK2</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-sky-100/80 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg sm:text-2xl font-bold text-slate-800">{totalCompleted}</div>
            <div className="text-xs text-slate-500 font-medium">Lượt bài đã làm</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-sky-100/80 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg sm:text-2xl font-bold text-slate-800">
              {totalCompleted > 0 ? `${averagePercentage}%` : 'Chưa có'}
            </div>
            <div className="text-xs text-slate-500 font-medium">Điểm trung bình</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-sky-100/80 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg sm:text-2xl font-bold text-slate-800">100%</div>
            <div className="text-xs text-slate-500 font-medium">Có giải chi tiết</div>
          </div>
        </div>
      </div>

      {/* Topics Control Bar: Filter Tabs & Search */}
      <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Semester Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setSelectedSemester('ALL')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedSemester === 'ALL'
                  ? 'bg-white text-sky-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tất cả (9)
            </button>
            <button
              onClick={() => setSelectedSemester('HK1')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedSemester === 'HK1'
                  ? 'bg-white text-sky-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Học kỳ 1 (5)
            </button>
            <button
              onClick={() => setSelectedSemester('HK2')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedSemester === 'HK2'
                  ? 'bg-white text-sky-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Học kỳ 2 (4)
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs text-slate-500 font-medium mr-1 hidden sm:flex">
              <Filter className="w-3.5 h-3.5" />
              <span>Môn:</span>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setSelectedCategory('ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  selectedCategory === 'ALL'
                    ? 'border-sky-500 bg-sky-50 text-sky-700 font-semibold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Cả hai
              </button>
              <button
                onClick={() => setSelectedCategory('Đại số')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  selectedCategory === 'Đại số'
                    ? 'border-sky-500 bg-sky-50 text-sky-700 font-semibold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Đại số
              </button>
              <button
                onClick={() => setSelectedCategory('Hình học')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  selectedCategory === 'Hình học'
                    ? 'border-sky-500 bg-sky-50 text-sky-700 font-semibold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Hình học
              </button>
            </div>
          </div>

          {/* Search box */}
          <div className="relative min-w-[200px] lg:min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm chuyên đề..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-hidden transition-all"
            />
          </div>
        </div>
      </div>

      {/* Topic Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-600" />
            <span>Danh Sách Chuyên Đề Kiểm Tra ({filteredTopics.length})</span>
          </h2>
          <span className="text-xs text-slate-500">
            Toán lớp 9 THCS
          </span>
        </div>

        {filteredTopics.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-sky-100">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-700 mb-1">Không tìm thấy chuyên đề phù hợp</h3>
            <p className="text-xs text-slate-500 mb-4">Vui lòng thử điều chỉnh lại từ khóa tìm kiếm hoặc bộ lọc học kỳ.</p>
            <button
              onClick={() => {
                setSelectedSemester('ALL');
                setSelectedCategory('ALL');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-sky-50 text-sky-700 text-xs font-semibold rounded-xl hover:bg-sky-100"
            >
              Xem lại tất cả chuyên đề
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTopics.map((topic) => {
              const prevResult = topicLatestScore[topic.title];
              const isHK1 = topic.semester === 'HK1';
              const isAlgebra = topic.category === 'Đại số';

              return (
                <div
                  key={topic.id}
                  className="group bg-white rounded-2xl p-5 border border-sky-100 hover:border-sky-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header Chips */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                            isHK1
                              ? 'bg-sky-100 text-sky-700'
                              : 'bg-indigo-100 text-indigo-700'
                          }`}
                        >
                          {topic.semester}
                        </span>
                        <span
                          className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${
                            isAlgebra
                              ? 'bg-amber-50 text-amber-700 border border-amber-200/50'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
                          }`}
                        >
                          {topic.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{topic.estimatedTime}</span>
                      </div>
                    </div>

                    {/* Topic Title */}
                    <h3 className="font-bold text-slate-800 text-base mb-2 group-hover:text-sky-600 transition-colors line-clamp-1">
                      {topic.title}
                    </h3>

                    {/* Topic Description */}
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
                      {topic.description}
                    </p>
                  </div>

                  <div>
                    {/* Previous Result status if attempted */}
                    {prevResult && (
                      <div className="mb-3 p-2 bg-slate-50 rounded-xl flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">Kết quả gần nhất:</span>
                        <span
                          className={`font-bold ${
                            prevResult.percentage >= 80
                              ? 'text-emerald-600'
                              : prevResult.percentage >= 50
                              ? 'text-sky-600'
                              : 'text-amber-600'
                          }`}
                        >
                          {prevResult.score}/{prevResult.totalQuestions} ({prevResult.percentage}%)
                        </span>
                      </div>
                    )}

                    {/* Action Button */}
                    <button
                      onClick={() => onSelectTopic(topic)}
                      className="w-full py-2.5 px-4 bg-sky-50 hover:bg-sky-600 text-sky-700 hover:text-white rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      <span>Bắt đầu làm bài</span>
                      <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
