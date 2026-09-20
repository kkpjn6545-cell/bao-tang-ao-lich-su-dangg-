import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Award, 
  RotateCcw, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  ChevronRight, 
  Building2 
} from 'lucide-react';
import { QuizQuestion, RoomId } from '../types';
import { QUIZ_COLLECTION, EXHIBITION_ROOMS } from '../data/museumData';
import { museumAudio } from '../services/audioSynthesizer';

interface QuizViewProps {
  initialRoomId?: RoomId | 'all';
  onCompleteRoomQuiz: (roomId: RoomId, score: number) => void;
  onNavigateRoom: (roomId: RoomId) => void;
  completedQuizzes: Record<string, number>;
}

export const QuizView: React.FC<QuizViewProps> = ({
  initialRoomId = 'all',
  onCompleteRoomQuiz,
  onNavigateRoom,
  completedQuizzes
}) => {
  const [selectedRoom, setSelectedRoom] = useState<RoomId | 'all'>(initialRoomId);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Determine question pool
  const questions: QuizQuestion[] = selectedRoom === 'all'
    ? Object.values(QUIZ_COLLECTION).flat()
    : QUIZ_COLLECTION[selectedRoom] || [];

  const currentQ = questions[currentQuestionIdx];

  const handleSelectOption = (idx: number) => {
    if (!isAnswerSubmitted) {
      setSelectedOption(idx);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    const correctIdx = currentQ.correctIndex ?? currentQ.correctAnswer ?? 0;
    const isCorrect = selectedOption === correctIdx;

    if (isCorrect) {
      setScore(prev => prev + 1);
      museumAudio.playQuizSuccessSound();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Finished
      setIsFinished(true);
      const correctIdx = currentQ.correctIndex ?? currentQ.correctAnswer ?? 0;
      const finalScore = score + (selectedOption === correctIdx ? 1 : 0);
      
      if (selectedRoom !== 'all') {
        onCompleteRoomQuiz(selectedRoom, finalScore);
      }

      if (finalScore >= Math.floor(questions.length * 0.7)) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handleResetQuiz = (roomTarget: RoomId | 'all') => {
    setSelectedRoom(roomTarget);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="museum-frame rounded-2xl p-6 sm:p-8 border border-amber-600/30">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-950/80 border border-amber-600/40 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Kiểm Tra & Đánh Giá Kiến Thức Lịch Sử Đảng</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-historic text-amber-100">
            Trắc Nghiệm Kiến Thức Lịch Sử (1975 – 1976)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Thử thách bản thân qua hệ thống câu hỏi chuẩn mực theo giáo trình Lịch sử Đảng Cộng sản Việt Nam 
            về quá trình thống nhất đất nước về mặt Nhà nước.
          </p>

          {/* Room Selector Filter Buttons */}
          <div className="pt-3 flex flex-wrap gap-2 text-xs">
            <button
              id="quiz-filter-all-btn"
              onClick={() => handleResetQuiz('all')}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                selectedRoom === 'all'
                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'
              }`}
            >
              Tất cả các phòng ({Object.values(QUIZ_COLLECTION).flat().length} câu)
            </button>

            {EXHIBITION_ROOMS.map(r => {
              const isDone = r.id in completedQuizzes;
              const isCurrent = selectedRoom === r.id;

              return (
                <button
                  key={r.id}
                  id={`quiz-filter-${r.id}-btn`}
                  onClick={() => handleResetQuiz(r.id)}
                  className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                    isCurrent
                      ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'
                  }`}
                >
                  <span>P.0{r.roomNumber}</span>
                  {isDone && <span className="text-[10px] text-emerald-400">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Quiz Card */}
      {!isFinished && currentQ ? (
        <div className="museum-frame rounded-2xl p-6 sm:p-8 border border-amber-600/40 bg-slate-900/95 shadow-2xl space-y-6">
          
          {/* Progress Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 text-xs">
            <span className="font-mono text-amber-400 font-bold">
              CÂU HỎI {currentQuestionIdx + 1} / {questions.length}
            </span>

            <div className="flex items-center gap-3">
              <span className="text-slate-400">
                Điểm số hiện tại: <strong className="text-amber-300 font-mono">{score}</strong>
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800 font-mono">
                {currentQ.roomId ? currentQ.roomId.toUpperCase() : 'TOÀN CẢNH'}
              </span>
            </div>
          </div>

          {/* Question Prompt */}
          <div>
            <h3 className="text-base sm:text-xl font-bold font-serif-historic text-amber-100 leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const correctIdx = currentQ.correctIndex ?? currentQ.correctAnswer ?? 0;
              const isCorrectAnswer = idx === correctIdx;

              let optionStyle = 'bg-slate-950/80 border-slate-800 text-slate-200 hover:bg-slate-900 hover:border-slate-700';

              if (isAnswerSubmitted) {
                if (isCorrectAnswer) {
                  optionStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-medium';
                } else if (isSelected && !isCorrectAnswer) {
                  optionStyle = 'bg-red-950/80 border-red-500 text-red-200';
                } else {
                  optionStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
                }
              } else if (isSelected) {
                optionStyle = 'bg-amber-950/70 border-amber-500 text-amber-200';
              }

              return (
                <button
                  key={idx}
                  id={`quiz-option-${idx}`}
                  disabled={isAnswerSubmitted}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-xl text-left border transition-all flex items-start gap-3 text-xs sm:text-sm ${optionStyle}`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono shrink-0 border ${
                    isSelected ? 'border-amber-400 text-amber-300' : 'border-slate-700 text-slate-400'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-relaxed flex-1">{option}</span>

                  {isAnswerSubmitted && isCorrectAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrectAnswer && (
                    <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box when answer submitted */}
          {isAnswerSubmitted && (
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-700/40 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-1.5 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 font-bold text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span>Giải thích lịch sử:</span>
              </div>
              <p>{currentQ.explanation}</p>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-800">
            <div className="text-xs text-slate-500">
              {isAnswerSubmitted ? 'Đã ghi nhận câu trả lời' : 'Chọn 1 phương án và nhấn Xác nhận'}
            </div>

            {!isAnswerSubmitted ? (
              <button
                id="quiz-submit-btn"
                disabled={selectedOption === null}
                onClick={handleSubmitAnswer}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold text-xs sm:text-sm shadow-lg transition-all"
              >
                Xác nhận câu trả lời
              </button>
            ) : (
              <button
                id="quiz-next-btn"
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-700 to-amber-800 hover:from-red-600 hover:to-amber-700 text-white font-semibold text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-all"
              >
                <span>{currentQuestionIdx < questions.length - 1 ? 'Câu hỏi tiếp theo' : 'Xem kết quả tổng kết'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      ) : (
        /* Quiz Finished Summary Card */
        <div className="museum-frame rounded-2xl p-8 sm:p-10 text-center space-y-6 border border-amber-500/60 bg-slate-900/95 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center mx-auto text-amber-300 text-2xl shadow-xl shadow-amber-500/20">
            <Award className="w-8 h-8 text-amber-400" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-400">Tổng kết kết quả</span>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif-historic text-amber-100">
              Bạn Đã Hoàn Thành Bài Kiểm Tra!
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Kết quả của bạn: <strong className="text-amber-300 text-lg font-mono">{score} / {questions.length}</strong> câu đúng 
              ({Math.round((score / Math.max(1, questions.length)) * 100)}%)
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 max-w-md mx-auto text-xs text-slate-300 leading-relaxed">
            {score === questions.length ? (
              <p className="text-emerald-400 font-semibold">
                Xuất sắc! Bạn nắm rất vững bản chất và diễn biến lịch sử giai đoạn 1975–1976.
              </p>
            ) : score >= questions.length * 0.7 ? (
              <p className="text-amber-300">
                Rất tốt! Bạn đã nắm được phần lớn các mốc quyết sách quan trọng của Đảng.
              </p>
            ) : (
              <p className="text-slate-400">
                Hãy tiếp tục tham quan các phòng triển lãm và đọc kỹ các văn kiện lịch sử để đạt điểm số cao hơn.
              </p>
            )}
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => handleResetQuiz(selectedRoom)}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Làm lại bài kiểm tra này</span>
            </button>

            {selectedRoom !== 'all' && (
              <button
                onClick={() => onNavigateRoom(selectedRoom)}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-bold flex items-center gap-2"
              >
                <span>Quay lại Phòng 0{selectedRoom.replace('room', '')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
