import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Award, 
  Check, 
  Calendar, 
  Tag, 
  ShieldCheck, 
  Star,
  Play,
  Pause,
  Volume2,
  BookOpen
} from 'lucide-react';
import { Artifact } from '../types';
import { museumAudio } from '../services/audioSynthesizer';

interface ArtifactViewerProps {
  artifact: Artifact | null;
  artifactsList: Artifact[];
  onClose: () => void;
  onSelectArtifact: (art: Artifact) => void;
  isCollected: boolean;
  onCollect: (artifactId: string) => void;
}

export const ArtifactViewer: React.FC<ArtifactViewerProps> = ({
  artifact,
  artifactsList,
  onClose,
  onSelectArtifact,
  isCollected,
  onCollect
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Reset zoom & audio when artifact changes
  useEffect(() => {
    setZoomLevel(1);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlayingAudio(false);
    }
  }, [artifact?.id]);

  if (!artifact) return null;

  const currentIndex = artifactsList.findIndex(a => a.id === artifact.id);
  const prevArtifact = currentIndex > 0 ? artifactsList[currentIndex - 1] : null;
  const nextArtifact = currentIndex < artifactsList.length - 1 ? artifactsList[currentIndex + 1] : null;

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.8));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  const handlePrev = () => {
    if (prevArtifact) {
      museumAudio.playPageFlipSound();
      onSelectArtifact(prevArtifact);
    }
  };

  const handleNext = () => {
    if (nextArtifact) {
      museumAudio.playPageFlipSound();
      onSelectArtifact(nextArtifact);
    }
  };

  const toggleArtifactAudio = () => {
    if (!artifact.audioUrl) return;
    
    if (!audioRef.current) {
      audioRef.current = new Audio(artifact.audioUrl);
      audioRef.current.onended = () => setIsPlayingAudio(false);
    }

    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingAudio(true);
      }).catch(err => {
        console.warn('Audio playback failed:', err);
      });
    }
  };

  const isSoldier = artifact.category === 'Chiến sĩ Việt Nam';
  const detailText = artifact.details || artifact.historicalContext;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#140D07]/85 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Dialog Card - Elegant Vietnamese History Museum Aesthetic */}
      <div className="rounded-2xl w-full max-w-5xl h-[92vh] max-h-[860px] flex flex-col bg-[#FAF4E8] border-2 border-[#C9A227] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden relative">
        
        {/* Top Header Bar - Distinguished Party Crimson with Golden Star Accents */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-gradient-to-r from-[#7A1620] via-[#A5202A] to-[#7A1620] border-b-2 border-[#C9A227]/80 text-[#FAF4E8] shrink-0 shadow-md">
          <div className="flex items-center gap-2.5">
            <span className="text-[#FFD700] text-sm">★</span>
            <span className="text-xs sm:text-sm font-display font-bold uppercase tracking-wider text-[#FFD700]">
              {isSoldier ? 'Hồ Sơ Tôn Vinh Người Chiến Sĩ' : 'Hồ Sơ Tư Liệu Lịch Sử'}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded bg-[#FAF4E8] text-[#7A1620] font-mono font-bold border border-[#FFD700] shadow-sm">
              {artifact.dateStr || artifact.year}
            </span>
            <span className="text-xs text-[#F1E7D0]/90 hidden md:inline font-mono">
              ({currentIndex + 1} / {artifactsList.length})
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Collect Button */}
            <button
              id="artifact-collect-btn"
              onClick={() => onCollect(artifact.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer shadow-sm ${
                isCollected
                  ? 'bg-[#FAF4E8] text-emerald-800 border-2 border-emerald-600'
                  : 'bg-[#FAF4E8] hover:bg-[#F1E7D0] text-[#7A1620] border border-[#FFD700]'
              }`}
              title="Lưu hiện vật vào kho sưu tập cá nhân của bạn"
            >
              {isCollected ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  <span>Đã lưu vào bộ sưu tập</span>
                </>
              ) : (
                <>
                  <Award className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>Lưu vào Bộ sưu tập</span>
                </>
              )}
            </button>

            {/* Close Button */}
            <button
              id="artifact-modal-close-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#FAF4E8]/20 hover:bg-[#FAF4E8] text-[#FAF4E8] hover:text-[#7A1620] border border-[#FFD700]/40 transition-colors cursor-pointer"
              title="Đóng cửa sổ hiện vật (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Body (Visual Exhibition Stage + Detail Plaque) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-[#FAF4E8]">
          
          {/* Visual Exhibition Stage (Deep warm gallery atmosphere with gold framing) */}
          <div className="lg:col-span-7 xl:col-span-8 bg-[#20150E] relative flex items-center justify-center overflow-hidden p-4 sm:p-8 select-none">
            
            {/* Ambient warm museum spotlight backdrop */}
            <div 
              className="absolute inset-0 pointer-events-none" 
              style={{
                backgroundImage: 'radial-gradient(circle at center, rgba(201, 162, 39, 0.16) 0%, rgba(20, 13, 8, 0.95) 75%)'
              }}
            />

            {/* Image display container with museum mounting mat */}
            <div 
              className="relative z-10 w-full h-full flex items-center justify-center transition-transform duration-200"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <div className="p-2 sm:p-3 bg-[#FAF4E8] rounded-xl border-2 border-[#C9A227] shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex items-center justify-center max-h-full max-w-full">
                <img
                  src={artifact.imageUrl}
                  alt={artifact.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[58vh] sm:max-h-[62vh] max-w-full object-contain rounded border border-[#C9A227]/40 shadow-inner"
                />
              </div>
            </div>

            {/* Zoom Controls Overlay - Warm Antique Brass Theme */}
            <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-[#FAF4E8]/95 border-2 border-[#C9A227] rounded-xl p-1.5 backdrop-blur shadow-xl z-20">
              <button
                id="artifact-zoom-out-btn"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.8}
                className="p-1.5 rounded-lg hover:bg-[#E7D8B8] text-[#241A12] disabled:opacity-40 cursor-pointer transition-colors"
                title="Thu nhỏ"
              >
                <ZoomOut className="w-4 h-4 text-[#A5202A]" />
              </button>
              
              <span className="text-xs font-mono font-bold text-[#A5202A] px-2 min-w-[44px] text-center">
                {Math.round(zoomLevel * 100)}%
              </span>

              <button
                id="artifact-zoom-in-btn"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 2.5}
                className="p-1.5 rounded-lg hover:bg-[#E7D8B8] text-[#241A12] disabled:opacity-40 cursor-pointer transition-colors"
                title="Phóng to"
              >
                <ZoomIn className="w-4 h-4 text-[#A5202A]" />
              </button>

              <div className="w-px h-4 bg-[#C9A227]/50 mx-0.5" />

              <button
                id="artifact-reset-zoom-btn"
                onClick={handleResetZoom}
                className="p-1.5 rounded-lg hover:bg-[#E7D8B8] text-[#55483A] hover:text-[#A5202A] cursor-pointer transition-colors"
                title="Đặt lại kích thước chuẩn (100%)"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Navigation Arrows on Left and Right */}
            {prevArtifact && (
              <button
                id="artifact-prev-btn"
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#FAF4E8]/95 hover:bg-[#A5202A] text-[#A5202A] hover:text-[#FAF4E8] border-2 border-[#C9A227] shadow-xl z-20 cursor-pointer transition-all duration-200"
                title="Tư liệu trước"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              </button>
            )}

            {nextArtifact && (
              <button
                id="artifact-next-btn"
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#FAF4E8]/95 hover:bg-[#A5202A] text-[#A5202A] hover:text-[#FAF4E8] border-2 border-[#C9A227] shadow-xl z-20 cursor-pointer transition-all duration-200"
                title="Tư liệu kế tiếp"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            )}

          </div>

          {/* Exhibition Plaque Panel (Highly readable, warm parchment tone, crisp contrast) */}
          <div className="lg:col-span-5 xl:col-span-4 bg-[#FAF4E8] border-t lg:border-t-0 lg:border-l-2 border-[#C9A227]/60 p-5 sm:p-6 overflow-y-auto space-y-5 flex flex-col justify-between text-[#241A12]">
            
            <div className="space-y-4">
              
              {/* Category & Badge */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  {isSoldier ? (
                    <span className="px-2.5 py-0.5 rounded-md bg-[#A5202A] text-[#FFD700] border border-[#FFD700] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm font-display">
                      <span>★</span> Người Chiến Sĩ Việt Nam
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-md bg-[#E7D8B8] text-[#A5202A] border border-[#C9A227] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#A5202A]" />
                      <span>{artifact.category}</span>
                    </span>
                  )}

                  {artifact.verified && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-400 font-semibold">
                      Tư liệu xác thực
                    </span>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-display text-[#241A12] leading-snug pt-1">
                  {artifact.title}
                </h3>
              </div>

              {/* Time & Location Plaque Card */}
              <div className="p-3.5 rounded-xl bg-[#F1E7D0] border border-[#C9A227]/60 text-xs space-y-2 shadow-inner">
                <div className="flex items-center justify-between border-b border-[#C9A227]/30 pb-1.5">
                  <span className="text-[#55483A] font-semibold">Thời điểm lịch sử:</span>
                  <strong className="text-[#A5202A] font-mono text-sm">{artifact.dateStr || artifact.year}</strong>
                </div>

                <div className="flex items-center justify-between border-b border-[#C9A227]/30 pb-1.5">
                  <span className="text-[#55483A] font-semibold">Sự kiện / Chặng:</span>
                  <span className="text-[#241A12] font-medium text-right max-w-[200px] truncate">{artifact.event}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#55483A] font-semibold">Nguồn lưu trữ:</span>
                  <span className="text-[#A5202A] font-semibold text-right max-w-[210px] truncate" title={artifact.source}>
                    {artifact.source}
                  </span>
                </div>
              </div>

              {/* Special Anthem Audio Player (e.g. Quoc Ca in Room 5) */}
              {artifact.audioUrl && (
                <div className="p-3 rounded-xl bg-[#E7D8B8] border-2 border-[#C9A227] flex items-center justify-between gap-3 shadow-md">
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={toggleArtifactAudio}
                      className="w-9 h-9 rounded-full bg-[#A5202A] hover:bg-[#7A1620] text-[#FAF4E8] flex items-center justify-center shadow transition-all cursor-pointer"
                      title={isPlayingAudio ? 'Tạm dừng bài hát' : 'Nghe Quốc ca Việt Nam'}
                    >
                      {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </button>
                    <div>
                      <span className="text-xs font-bold text-[#241A12] block">Tiến quân ca (Quốc ca)</span>
                      <span className="text-[10px] text-[#55483A]">Nhạc sĩ: Văn Cao</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#A5202A] animate-pulse">
                    {isPlayingAudio ? 'Đang phát...' : 'Nghe Quốc ca'}
                  </span>
                </div>
              )}

              {/* Description Section */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#A5202A] flex items-center gap-1.5 border-b border-[#C9A227]/30 pb-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Nội dung tư liệu</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#241A12] leading-relaxed">
                  {artifact.description}
                </p>
              </div>

              {/* Historical Context & Detailed Analysis */}
              {detailText && (
                <div className="bg-[#FAF0E1] border-l-4 border-[#A5202A] p-3.5 rounded-r-xl border-t border-r border-b border-[#C9A227]/40 shadow-sm space-y-1.5">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#A5202A] flex items-center gap-1.5">
                    <span>★</span>
                    <span>Bối cảnh & Ý nghĩa lịch sử</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-[#35241A] leading-relaxed">
                    {detailText}
                  </p>
                </div>
              )}

              {/* Tags */}
              {artifact.tags && artifact.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {artifact.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-[#F1E7D0] border border-[#C9A227]/50 text-[10px] font-medium text-[#55483A]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

            </div>

            {/* Bottom Quick Switcher & Counter */}
            <div className="pt-4 border-t border-[#C9A227]/40 flex items-center justify-between text-xs">
              <button
                onClick={handlePrev}
                disabled={!prevArtifact}
                className="px-3 py-1.5 rounded-lg bg-[#E7D8B8] hover:bg-[#DBC9A2] text-[#241A12] disabled:opacity-40 disabled:hover:bg-[#E7D8B8] flex items-center gap-1 font-semibold border border-[#C9A227]/60 cursor-pointer shadow-sm"
              >
                <ChevronLeft className="w-3.5 h-3.5 text-[#A5202A]" /> Trước
              </button>

              <span className="text-[#55483A] font-mono text-[11px] font-bold">
                Tư liệu {currentIndex + 1} / {artifactsList.length}
              </span>

              <button
                onClick={handleNext}
                disabled={!nextArtifact}
                className="px-3 py-1.5 rounded-lg bg-[#E7D8B8] hover:bg-[#DBC9A2] text-[#241A12] disabled:opacity-40 disabled:hover:bg-[#E7D8B8] flex items-center gap-1 font-semibold border border-[#C9A227]/60 cursor-pointer shadow-sm"
              >
                Kế tiếp <ChevronRight className="w-3.5 h-3.5 text-[#A5202A]" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
