import React from 'react';
import { 
  X, 
  Award, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  Building2, 
  Eye, 
  RotateCcw, 
  Share2 
} from 'lucide-react';
import { Artifact, UserProgress, Achievement } from '../types';
import { ACHIEVEMENTS_LIST } from '../data/museumData';
import { museumAudio } from '../services/audioSynthesizer';

interface CollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  allArtifacts: Artifact[];
  onSelectArtifact: (art: Artifact) => void;
  onResetProgress: () => void;
}

export const CollectionModal: React.FC<CollectionModalProps> = ({
  isOpen,
  onClose,
  progress,
  allArtifacts,
  onSelectArtifact,
  onResetProgress
}) => {
  if (!isOpen) return null;

  const collectedArtifactsList = allArtifacts.filter(a => progress.exploredArtifacts.includes(a.id));

  // Determine unlocked achievements
  const unlockedBadges = ACHIEVEMENTS_LIST.map(ach => {
    let unlocked = false;
    if (ach.id === 'ach_first_step') unlocked = progress.visitedRooms.length >= 1;
    if (ach.id === 'ach_curator_1') unlocked = progress.exploredArtifacts.length >= 4;
    if (ach.id === 'ach_historian') unlocked = progress.visitedRooms.length >= 6;
    if (ach.id === 'ach_quiz_master') unlocked = Object.keys(progress.completedQuizzes).length >= 3;
    if (ach.id === 'ach_full_archive') unlocked = progress.exploredArtifacts.length >= allArtifacts.length;
    return { ...ach, unlocked };
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      
      <div className="museum-frame rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col bg-slate-950 border border-amber-600/50 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90 shrink-0">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-base sm:text-lg font-bold font-serif-historic text-amber-100">
                Kho Sưu Tập & Huy Hiệu Cá Nhân
              </h3>
              <p className="text-[11px] text-slate-400">
                Ghi nhận hành trình nghiên cứu và khám phá tư liệu lịch sử của bạn
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Tabs / Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-mono">Phòng đã xem</span>
              <p className="text-xl font-bold font-mono text-amber-300">{progress.visitedRooms.length} / 6</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-mono">Hiện vật đã lưu</span>
              <p className="text-xl font-bold font-mono text-amber-300">{progress.exploredArtifacts.length} / {allArtifacts.length}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-mono">Quiz hoàn thành</span>
              <p className="text-xl font-bold font-mono text-amber-300">{Object.keys(progress.completedQuizzes).length} / 6</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-mono">Huy hiệu đạt</span>
              <p className="text-xl font-bold font-mono text-amber-300">{unlockedBadges.filter(b => b.unlocked).length} / {unlockedBadges.length}</p>
            </div>
          </div>

          {/* Badges Section */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold font-serif-historic text-amber-200 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Huy Hiệu Khám Phá</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {unlockedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all ${
                    badge.unlocked
                      ? 'bg-amber-950/40 border-amber-500/60 text-amber-100 shadow-md'
                      : 'bg-slate-900/40 border-slate-800/80 text-slate-500 opacity-60'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 border ${
                    badge.unlocked ? 'bg-amber-500/20 border-amber-400 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-600'
                  }`}>
                    {badge.unlocked ? badge.icon : <Lock className="w-4 h-4" />}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold font-serif-historic leading-snug">{badge.title}</h5>
                    <p className="text-[10px] text-slate-400 mt-0.5">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Collected Artifacts Section */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold font-serif-historic text-amber-200 uppercase tracking-wider flex items-center gap-2">
              <Eye className="w-4 h-4 text-amber-400" />
              <span>Hiện Vật Trong Bộ Sưu Tập Của Bạn ({collectedArtifactsList.length})</span>
            </h4>

            {collectedArtifactsList.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {collectedArtifactsList.map(art => (
                  <div
                    key={art.id}
                    onClick={() => {
                      museumAudio.playArtifactClickSound();
                      onSelectArtifact(art);
                      onClose();
                    }}
                    className="museum-frame rounded-xl overflow-hidden cursor-pointer hover:border-amber-500 transition-all group"
                  >
                    <div className="aspect-4/3 bg-slate-900 relative">
                      <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="p-2 space-y-0.5">
                      <p className="text-[11px] font-bold text-amber-100 truncate">{art.title}</p>
                      <p className="text-[10px] text-slate-400 font-mono truncate">{art.dateStr}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-xs text-slate-500 bg-slate-900/40 rounded-xl border border-slate-800/60 p-6">
                Bạn chưa lưu hiện vật nào. Hãy bấm vào các biểu tượng huy hiệu hoặc nút "Lưu vào bộ sưu tập" trong từng phòng triển lãm để sưu tầm nhé!
              </div>
            )}
          </div>

        </div>

        {/* Footer with Reset Option */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between text-xs text-slate-400">
          <button
            onClick={() => {
              if (window.confirm('Bạn có chắc chắn muốn đặt lại toàn bộ tiến trình tham quan để bắt đầu lại từ đầu không?')) {
                onResetProgress();
              }
            }}
            className="flex items-center gap-1.5 text-slate-500 hover:text-red-400 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Đặt lại tiến trình bảo tàng</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
};
