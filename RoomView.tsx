import React, { useState, useRef } from 'react';
import { 
  Building2, 
  ArrowLeft, 
  ArrowRight, 
  ChevronRight, 
  HelpCircle, 
  BookOpen, 
  Calendar, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  Eye, 
  Quote, 
  ShieldCheck, 
  Award, 
  Users, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause,
  ExternalLink 
} from 'lucide-react';
import { ExhibitionRoom, Artifact, RoomId, DocumentRecord, KeyAspect } from '../types';
import { EXHIBITION_ROOMS } from '../data/museumData';
import { museumAudio } from '../services/audioSynthesizer';

interface RoomViewProps {
  room: ExhibitionRoom;
  artifacts: Artifact[];
  onSelectArtifact: (artifact: Artifact) => void;
  onNavigateRoom: (roomId: RoomId) => void;
  onReturnToHall: () => void;
  onOpenRoomQuiz: (roomId: RoomId) => void;
  isQuizCompleted: boolean;
  onMarkTimelineStep: (id: string) => void;
}

export const RoomView: React.FC<RoomViewProps> = ({
  room,
  artifacts,
  onSelectArtifact,
  onNavigateRoom,
  onReturnToHall,
  onOpenRoomQuiz,
  isQuizCompleted
}) => {
  const [selectedAspect, setSelectedAspect] = useState<KeyAspect | null>(
    room.keyAspects?.[0] || null
  );
  const [selectedDoc, setSelectedDoc] = useState<DocumentRecord | null>(null);
  const [showKeyQuestionModal, setShowKeyQuestionModal] = useState(false);
  const [activeStoryStep, setActiveStoryStep] = useState<number>(1);

  // Anthem Audio Player state (for Room 5)
  const [anthemPlaying, setAnthemPlaying] = useState(false);
  const anthemAudioRef = useRef<HTMLAudioElement | null>(null);

  // Filter artifacts belonging to this room
  const roomArtifacts = artifacts.filter(a => a.roomId === room.id);

  const handleNextRoom = () => {
    if (room.nextRoomId) {
      museumAudio.playFootstepSound();
      onNavigateRoom(room.nextRoomId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevRoom = () => {
    const prevRoomNumber = room.roomNumber - 1;
    if (prevRoomNumber >= 1) {
      museumAudio.playFootstepSound();
      onNavigateRoom(`room${prevRoomNumber}` as RoomId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onReturnToHall();
    }
  };

  const toggleAnthem = (url: string) => {
    if (!anthemAudioRef.current) {
      anthemAudioRef.current = new Audio(url);
      anthemAudioRef.current.onended = () => setAnthemPlaying(false);
    }

    if (anthemPlaying) {
      anthemAudioRef.current.pause();
      setAnthemPlaying(false);
    } else {
      anthemAudioRef.current.play().catch(e => console.log('Audio playback error:', e));
      setAnthemPlaying(true);
    }
  };

  return (
    <div className="relative min-h-screen pb-32">
      {/* Background Museum Wall with Waving Flag & Subtle Spotlight */}
      <div className="museum-wall" />
      <div className="museum-spotlight" />
      <div className="museum-floor" />

      {/* Flanking Waving National Flags with Golden Star (Visible along room sides) */}
      <div className="museum-side-flag-left hidden 2xl:flex flex-col items-center gap-1">
        <div className="w-1.5 h-10 bg-gradient-to-b from-[#C9A227] to-[#4A3323] rounded-t-full shadow-md" />
        <img
          src="/assets/images/la-co.gif"
          alt="Cờ đỏ sao vàng"
          className="w-24 h-auto object-contain"
        />
        <div className="mt-1 px-2.5 py-0.5 rounded bg-[#FAF4E8] border border-[#C9A227] text-[10px] text-[#A5202A] font-bold font-display uppercase tracking-wider shadow-sm">
          Việt Nam
        </div>
      </div>

      <div className="museum-side-flag-right hidden 2xl:flex flex-col items-center gap-1">
        <div className="w-1.5 h-10 bg-gradient-to-b from-[#C9A227] to-[#4A3323] rounded-t-full shadow-md" />
        <img
          src="/assets/images/la-co.gif"
          alt="Cờ đỏ sao vàng"
          className="w-24 h-auto object-contain"
        />
        <div className="mt-1 px-2.5 py-0.5 rounded bg-[#FAF4E8] border border-[#C9A227] text-[10px] text-[#A5202A] font-bold font-display uppercase tracking-wider shadow-sm">
          Thống Nhất
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* Museum Breadcrumb & Quick Nav */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#55483A] border-b border-[#C9A227]/30 pb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button 
              onClick={onReturnToHall}
              className="hover:text-[#A5202A] flex items-center gap-1 font-medium transition-colors cursor-pointer"
            >
              <Building2 className="w-4 h-4 text-[#A5202A]" />
              <span>Sảnh chính</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#C9A227]" />
            <span className="text-[#A5202A] font-semibold">Phòng 0{room.roomNumber}</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#C9A227]" />
            <span className="text-[#241A12] font-display font-semibold">{room.title}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="room-prev-btn"
              onClick={handlePrevRoom}
              className="px-3 py-1 rounded bg-[#E7D8B8] hover:bg-[#DBC9A2] text-[#241A12] border border-[#C9A227]/40 flex items-center gap-1 transition-colors cursor-pointer text-xs font-medium shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{room.roomNumber > 1 ? `Phòng 0${room.roomNumber - 1}` : 'Về Sảnh'}</span>
            </button>

            {room.nextRoomId && (
              <button
                id="room-next-btn"
                onClick={handleNextRoom}
                className="px-3 py-1 rounded bg-[#A5202A] hover:bg-[#7A1620] text-[#F1E7D0] border border-[#C9A227] flex items-center gap-1 transition-colors cursor-pointer text-xs font-medium shadow-sm"
              >
                <span>Phòng 0{room.roomNumber + 1}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Room Header Exhibition Banner with Visible Waving Flag */}
        <div className="bg-[#FAF4E8]/92 backdrop-blur rounded-xl p-6 sm:p-10 relative overflow-hidden border-2 border-[#C9A227]/50 shadow-xl">
          {/* Prominent Red Flag with Yellow Star Background Layer */}
          <div className="absolute right-0 top-0 bottom-0 w-full sm:w-2/3 md:w-1/2 pointer-events-none overflow-hidden opacity-30 sm:opacity-40">
            <div className="absolute -right-12 -top-8 w-[380px] sm:w-[460px] h-full flex items-center justify-end">
              <img
                src="/assets/images/la-co.gif"
                alt="Cờ đỏ sao vàng"
                className="w-full h-auto object-contain filter drop-shadow-xl"
              />
            </div>
          </div>

          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1 rounded-md bg-[#A5202A] border border-[#C9A227] text-[#F1E7D0] font-display text-xs font-bold uppercase tracking-wider shadow-sm">
                Phòng Trưng Bày 0{room.roomNumber}
              </span>
              <span className="px-3 py-1 rounded-md bg-[#E7D8B8] text-[#4A3323] text-xs font-semibold border border-[#C9A227]/40">
                {room.period}
              </span>
              {isQuizCompleted && (
                <span className="px-3 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs border border-emerald-300 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  Đã hoàn thành Quiz phòng
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold font-display text-[#241A12] tracking-tight leading-tight uppercase">
              {room.heroHeading || room.title}
            </h1>

            <p className="text-base sm:text-lg text-[#7A1620] font-display italic font-semibold">
              {room.heroSubheading || room.subtitle}
            </p>

            <p className="text-sm sm:text-base text-[#35241A] leading-relaxed max-w-3xl">
              {room.overview}
            </p>

            {/* Key Question Orienting Card (Special for Room 1) */}
            {room.keyQuestion && (
              <div className="mt-4 p-4 rounded-lg bg-[#E7D8B8]/80 border-l-4 border-[#A5202A] shadow space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 text-[#A5202A] font-bold text-xs sm:text-sm">
                    <HelpCircle className="w-4 h-4 text-[#A5202A] shrink-0" />
                    <span>CÂU HỎI ĐỊNH HƯỚNG MÔN HỌC:</span>
                  </div>
                  <button
                    id="room1-toggle-answer-btn"
                    onClick={() => setShowKeyQuestionModal(!showKeyQuestionModal)}
                    className="text-xs font-semibold text-[#A5202A] hover:underline cursor-pointer"
                  >
                    {showKeyQuestionModal ? 'Ẩn lời giải' : 'Xem giải thích lịch sử'}
                  </button>
                </div>

                <p className="text-xs sm:text-sm font-medium text-[#241A12] italic">
                  "{room.keyQuestion}"
                </p>

                {showKeyQuestionModal && room.keyQuestionAnswer && (
                  <div className="mt-3 pt-3 border-t border-[#C9A227]/30 text-xs text-[#35241A] leading-relaxed bg-[#FAF4E8] p-3 rounded">
                    <strong className="text-[#A5202A] block mb-1">Luận giải khoa học:</strong>
                    {room.keyQuestionAnswer}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* ROOM EXHIBITS GALLERY: Main Visual Artifacts Wall */}
        {/* ========================================================= */}
        {roomArtifacts.length > 0 && (
          <div className="space-y-6 pt-2">
            <div className="flex items-center justify-between border-b border-[#C9A227]/30 pb-3">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A5202A] mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#A5202A]" />
                  <span>Không Gian Trưng Bày Hiện Vật</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-[#241A12]">
                  Hiện Vật & Hình Ảnh Tư Liệu Lịch Sử
                </h2>
                <p className="text-xs text-[#55483A]">
                  Nhấn vào từng hình ảnh để xem ảnh lớn chi tiết và tra cứu nguồn lưu trữ
                </p>
              </div>
            </div>

            {/* Grid Layout depending on number of artifacts */}
            <div className={`grid gap-8 ${
              roomArtifacts.length === 2 
                ? 'grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto' 
                : roomArtifacts.length === 4 
                ? 'grid-cols-1 md:grid-cols-2' 
                : roomArtifacts.length >= 5 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            }`}>
              {roomArtifacts.map((art) => (
                <div
                  key={art.id}
                  id={`artifact-card-${art.id}`}
                  className="flex flex-col bg-[#FAF4E8] rounded-lg border-2 border-[#C9A227]/50 shadow-md overflow-hidden hover:shadow-xl transition-all group"
                >
                  {/* Exhibit Vintage Frame */}
                  <div 
                    onClick={() => {
                      museumAudio.playArtifactClickSound();
                      onSelectArtifact(art);
                    }}
                    className="exhibit-frame cursor-pointer"
                  >
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />

                    {/* Badge Year / Period */}
                    <div className="absolute top-2 left-2 z-10">
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#241A12]/80 text-[#E4C97A] border border-[#C9A227]/50">
                        {art.dateStr || art.year}
                      </span>
                    </div>

                    {/* Patriotic Soldier Badge */}
                    {art.category === 'Chiến sĩ Việt Nam' && (
                      <div className="absolute top-2 right-2 z-10">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#A5202A] text-[#FFD700] border border-[#FFD700]/80 shadow-md flex items-center gap-1 font-display tracking-wider">
                          <span className="text-xs">★</span> Người Chiến Sĩ
                        </span>
                      </div>
                    )}

                    {/* Hover Explore Indicator */}
                    <div className="absolute inset-0 bg-[#241A12]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-[#A5202A] text-[#F1E7D0] font-bold shadow-lg">
                        <Eye className="w-3.5 h-3.5" /> Phóng to chi tiết
                      </span>
                    </div>
                  </div>

                  {/* Fact Panel / Label Plaque below image */}
                  <div className="fact-panel flex-1 justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <h3 
                          onClick={() => {
                            museumAudio.playArtifactClickSound();
                            onSelectArtifact(art);
                          }}
                          className="font-display font-bold text-base text-[#241A12] group-hover:text-[#A5202A] transition-colors cursor-pointer"
                        >
                          {art.title}
                        </h3>
                      </div>

                      <p className="text-xs text-[#35241A] leading-relaxed">
                        {art.description}
                      </p>

                      {/* Special Audio Player for Quoc Ca */}
                      {art.audioUrl && (
                        <div className="mt-3 p-2.5 rounded bg-[#E7D8B8] border border-[#C9A227] flex items-center justify-between gap-3 shadow-inner">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleAnthem(art.audioUrl!)}
                              className="w-8 h-8 rounded-full bg-[#A5202A] hover:bg-[#7A1620] text-[#F1E7D0] flex items-center justify-center shadow transition-all cursor-pointer"
                              title={anthemPlaying ? 'Dừng phát' : 'Nghe bài Tiến quân ca'}
                            >
                              {anthemPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                            </button>
                            <div>
                              <span className="text-xs font-bold text-[#241A12] block">Tiến quân ca (Quốc ca)</span>
                              <span className="text-[10px] text-[#55483A]">Nhạc sĩ: Văn Cao</span>
                            </div>
                          </div>
                          <span className="text-[11px] font-semibold text-[#A5202A] animate-pulse">
                            {anthemPlaying ? 'Đang phát...' : 'Nhấn để nghe'}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-[#C9A227]/30 text-[11px] text-[#55483A] flex items-center justify-between">
                      <span className="truncate max-w-[200px]">Nguồn: {art.source}</span>
                      <button
                        onClick={() => {
                          museumAudio.playArtifactClickSound();
                          onSelectArtifact(art);
                        }}
                        className="text-[#A5202A] hover:underline font-semibold flex items-center gap-0.5 cursor-pointer"
                      >
                        Chi tiết <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* ROOM 1 SPECIAL: Interactive Key Aspect Clickable Tabs */}
        {/* ========================================================= */}
        {room.keyAspects && room.keyAspects.length > 0 && (
          <div className="space-y-6 pt-4">
            <div className="border-t border-[#C9A227]/30 pt-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A5202A] mb-1">
                <BookOpen className="w-4 h-4" />
                <span>Hồ Sơ Chuyên Đề Lịch Sử</span>
              </div>
              <h2 className="text-xl font-bold font-display text-[#241A12]">
                {room.id === 'room1' 
                  ? 'Các Phương Diện Đất Nước Sau 30/4/1975' 
                  : room.id === 'room6' 
                  ? 'Đánh Giá Toàn Diện Tầm Vóc Lịch Sử' 
                  : 'Nội Dung Trọng Tâm Của Phòng Triển Lãm'}
              </h2>
              <p className="text-xs text-[#55483A]">
                Bấm vào từng thẻ chuyên đề để mở chi tiết tư liệu phân tích
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {room.keyAspects.map((aspect) => {
                const isSelected = selectedAspect?.id === aspect.id;
                return (
                  <button
                    key={aspect.id}
                    id={`aspect-btn-${aspect.id}`}
                    onClick={() => {
                      museumAudio.playPageFlipSound();
                      setSelectedAspect(aspect);
                    }}
                    className={`p-3.5 rounded-lg text-left border-2 transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#E7D8B8] border-[#A5202A] text-[#241A12] shadow-md -translate-y-0.5'
                        : 'bg-[#FAF4E8] border-[#C9A227]/40 text-[#4A3323] hover:bg-[#F1E7D0]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-bold font-display text-[#A5202A]">[{aspect.title}]</span>
                      {isSelected && <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />}
                    </div>
                    <p className="text-[11px] text-[#55483A] line-clamp-2 leading-relaxed">
                      {aspect.summary}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Detailed Aspect Display */}
            {selectedAspect && (
              <div className="rounded-xl p-6 border-2 border-[#C9A227] bg-[#FAF4E8] shadow-md space-y-3 animate-in fade-in duration-150">
                <div className="flex items-center gap-3 border-b border-[#C9A227]/30 pb-3">
                  <div className="w-8 h-8 rounded-full bg-[#A5202A] text-[#F1E7D0] flex items-center justify-center font-bold text-sm">
                    ★
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold font-display text-[#241A12]">
                      Chuyên đề: {selectedAspect.title}
                    </h3>
                    <p className="text-xs text-[#A5202A] font-semibold">{selectedAspect.summary}</p>
                  </div>
                </div>

                <div className="text-xs sm:text-sm text-[#35241A] leading-relaxed space-y-3">
                  <p>{selectedAspect.content}</p>
                  {selectedAspect.historicalQuotes && (
                    <div className="p-3.5 rounded bg-[#E7D8B8]/80 border-l-4 border-[#A5202A] text-[#241A12] italic flex items-start gap-2 text-xs">
                      <Quote className="w-4 h-4 text-[#A5202A] shrink-0 mt-0.5" />
                      <span>"{selectedAspect.historicalQuotes}"</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* ROOM 3 SPECIAL: Visual Storytelling Pipeline */}
        {/* ========================================================= */}
        {room.visualStory && (
          <div className="space-y-6 pt-4">
            <div className="border-t border-[#C9A227]/30 pt-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A5202A] mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Tiến Trình Kể Chuyện Lịch Sử (Visual Storytelling)</span>
              </div>
              <h2 className="text-xl font-bold font-display text-[#241A12]">
                Diễn Biến Quá Trình Hiệp Thương Bắc – Nam (11/1975)
              </h2>
              <p className="text-xs text-[#55483A]">
                Theo dõi 4 giai đoạn chuẩn bị và đồng thuận lịch sử giữa hai đoàn đại biểu
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {room.visualStory.map((step) => {
                const isActive = activeStoryStep === step.step;
                return (
                  <div
                    key={step.step}
                    onClick={() => {
                      museumAudio.playPageFlipSound();
                      setActiveStoryStep(step.step);
                    }}
                    className={`rounded-xl p-4 cursor-pointer transition-all border-2 flex flex-col justify-between ${
                      isActive
                        ? 'bg-[#E7D8B8] border-[#A5202A] text-[#241A12] shadow-md'
                        : 'bg-[#FAF4E8] border-[#C9A227]/40 text-[#4A3323] hover:border-[#C9A227]'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="w-6 h-6 rounded-full bg-[#A5202A] text-[#F1E7D0] font-mono text-xs flex items-center justify-center font-bold">
                          {step.step}
                        </span>
                        <span className="text-[10px] font-mono text-[#55483A] font-semibold">{step.time}</span>
                      </div>
                      <h4 className="text-sm font-bold font-display text-[#241A12]">
                        {step.title}
                      </h4>
                      <p className="text-xs text-[#35241A] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-[#C9A227]/30 text-[11px] text-[#A5202A] font-semibold">
                      ★ {step.highlight}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* ROOM 4 SPECIAL: Interactive Election Cards */}
        {/* ========================================================= */}
        {room.id === 'room4' && (
          <div className="space-y-6 pt-4">
            <div className="border-t border-[#C9A227]/30 pt-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A5202A] mb-1">
                <Award className="w-4 h-4" />
                <span>Số Liệu Lịch Sử Ngày Hội Non Sông</span>
              </div>
              <h2 className="text-xl font-bold font-display text-[#241A12]">
                Dữ Liệu Ngày Hội Tổng Tuyển Cử 25/4/1976
              </h2>
              <p className="text-xs text-[#55483A]">
                Khám phá các con số lịch sử và tinh thần đại đoàn kết toàn dân tộc
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              
              <div className="rounded-xl p-5 border-2 border-[#C9A227]/60 bg-[#FAF4E8] shadow-sm space-y-3">
                <span className="text-xs font-mono text-[#A5202A] font-bold uppercase tracking-wider">Cử tri tham gia</span>
                <div className="text-3xl font-bold text-[#A5202A] font-mono">
                  23.118.599
                </div>
                <p className="text-xs text-[#35241A] leading-relaxed">
                  Đạt tỷ lệ <strong className="text-[#A5202A] font-mono">98,77%</strong> cử tri trong cả nước 
                  (miền Bắc: 99,36%, miền Nam: 98,59%).
                </p>
                <div className="text-[11px] text-[#55483A] italic">
                  Nguồn: Báo cáo kết quả của Hội đồng Bầu cử Toàn quốc
                </div>
              </div>

              <div className="rounded-xl p-5 border-2 border-[#C9A227]/60 bg-[#FAF4E8] shadow-sm space-y-3">
                <span className="text-xs font-mono text-[#A5202A] font-bold uppercase tracking-wider">Đại biểu Quốc hội khóa VI</span>
                <div className="text-3xl font-bold text-[#A5202A] font-mono">
                  492 đại biểu
                </div>
                <p className="text-xs text-[#35241A] leading-relaxed">
                  Miền Bắc bầu được <strong>249 đại biểu</strong>; Miền Nam bầu được <strong>243 đại biểu</strong>.
                </p>
                <div className="text-[11px] text-[#55483A] italic">
                  Tiêu biểu cho mọi giai tầng, dân tộc, tôn giáo và giới tính
                </div>
              </div>

              <div className="rounded-xl p-5 border-2 border-[#C9A227]/60 bg-[#FAF4E8] shadow-sm space-y-3">
                <span className="text-xs font-mono text-[#A5202A] font-bold uppercase tracking-wider">Cơ cấu đại đoàn kết</span>
                <div className="space-y-1.5 text-xs text-[#35241A]">
                  <div className="flex justify-between"><span>Công nhân:</span><strong className="font-mono text-[#A5202A]">80</strong></div>
                  <div className="flex justify-between"><span>Nông dân:</span><strong className="font-mono text-[#A5202A]">100</strong></div>
                  <div className="flex justify-between"><span>Trí thức, văn nghệ sĩ:</span><strong className="font-mono text-[#A5202A]">98</strong></div>
                  <div className="flex justify-between"><span>Dân tộc thiểu số:</span><strong className="font-mono text-[#A5202A]">67</strong></div>
                  <div className="flex justify-between"><span>Đại biểu nữ:</span><strong className="font-mono text-[#A5202A]">132</strong></div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* ROOM 5 SPECIAL: Document Table & Rename Banner */}
        {/* ========================================================= */}
        {room.id === 'room5' && (
          <div className="space-y-6 pt-4">
            {/* Rename Banner */}
            <div className="rename-banner shadow-md">
              <div className="flex items-center gap-3">
                <span className="text-xl text-[#C9A227]">★</span>
                <div>
                  <strong className="block text-sm sm:text-base uppercase tracking-wider font-display">
                    Nghị Quyết Đổi Tên Thành Phố Sài Gòn – Gia Định
                  </strong>
                  <span className="text-xs text-[#E7D8B8]">
                    Ngày 02/07/1976: Quốc hội chính thức quyết nghị đổi tên thành phố Sài Gòn - Gia Định thành <strong>THÀNH PHỐ HỒ CHÍ MINH</strong>, thể hiện lòng kính trọng và tri ân vô hạn đối với Chủ tịch Hồ Chí Minh vĩ đại.
                  </span>
                </div>
              </div>
            </div>

            {/* Document Table Model */}
            {room.documents && room.documents.length > 0 && (
              <div className="space-y-6">
                <div className="border-t border-[#C9A227]/30 pt-6">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A5202A] mb-1">
                    <FileText className="w-4 h-4" />
                    <span>Bàn Trưng Bày Văn Kiện Lịch Sử (Document Table)</span>
                  </div>
                  <h2 className="text-xl font-bold font-display text-[#241A12]">
                    Các Quyết Sách Khai Sinh Nước CHXHCN Việt Nam (Kỳ Họp Khóa VI)
                  </h2>
                  <p className="text-xs text-[#55483A]">
                    Bấm vào từng văn kiện để mở bản trích sao chính văn và ý nghĩa lịch sử
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {room.documents.map((doc) => (
                    <div
                      key={doc.id}
                      id={`doc-card-${doc.id}`}
                      onClick={() => {
                        museumAudio.playArtifactClickSound();
                        setSelectedDoc(doc);
                      }}
                      className="bg-[#FAF4E8] rounded-xl p-5 cursor-pointer hover:border-[#A5202A] transition-all border-2 border-[#C9A227]/50 shadow-sm flex flex-col justify-between group"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono text-[#A5202A] font-bold bg-[#E7D8B8] px-2 py-0.5 rounded border border-[#C9A227]/40">
                            {doc.date}
                          </span>
                          <span className="text-xs text-[#55483A] group-hover:text-[#A5202A] flex items-center gap-1 font-medium">
                            Xem văn bản <ExternalLink className="w-3 h-3" />
                          </span>
                        </div>

                        <h3 className="text-sm font-bold font-display text-[#241A12] group-hover:text-[#A5202A] transition-colors">
                          {doc.title}
                        </h3>

                        <p className="text-xs text-[#35241A] line-clamp-2 leading-relaxed">
                          {doc.significance}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#C9A227]/30 text-[11px] text-[#A5202A] font-semibold">
                        {doc.decisionNumber}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Modal for selected document */}
                {selectedDoc && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
                    <div className="rounded-2xl max-w-2xl w-full p-6 sm:p-8 bg-[#FAF4E8] border-2 border-[#C9A227] shadow-2xl relative space-y-6">
                      <div className="flex items-start justify-between border-b border-[#C9A227]/40 pb-4">
                        <div>
                          <span className="text-xs font-mono text-[#A5202A] font-bold">{selectedDoc.decisionNumber}</span>
                          <h3 className="text-lg sm:text-xl font-bold font-display text-[#241A12] mt-1">
                            {selectedDoc.title}
                          </h3>
                        </div>
                        <button
                          onClick={() => setSelectedDoc(null)}
                          className="p-1.5 rounded-lg hover:bg-[#E7D8B8] text-[#55483A] hover:text-[#241A12] cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="space-y-4 text-xs sm:text-sm text-[#35241A]">
                        <div>
                          <h4 className="font-bold text-[#A5202A] mb-1">Nội dung quyết nghị:</h4>
                          <p className="leading-relaxed">{selectedDoc.content}</p>
                        </div>

                        {selectedDoc.officialTextQuote && (
                          <div className="p-4 rounded-xl bg-[#E7D8B8]/80 border-l-4 border-[#A5202A] text-[#241A12] italic font-display leading-relaxed">
                            "{selectedDoc.officialTextQuote}"
                          </div>
                        )}

                        <div>
                          <h4 className="font-bold text-[#A5202A] mb-1">Tầm vóc & Ý nghĩa lịch sử:</h4>
                          <p className="leading-relaxed">{selectedDoc.significance}</p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#C9A227]/40 flex justify-end">
                        <button
                          onClick={() => setSelectedDoc(null)}
                          className="px-4 py-2 rounded-lg btn-museum-primary text-xs font-semibold cursor-pointer"
                        >
                          Đóng văn kiện
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* ROOM 6 SPECIAL: Final Journey Completion Badge & Timeline */}
        {/* ========================================================= */}
        {room.id === 'room6' && (
          <div className="rounded-2xl p-6 sm:p-10 bg-[#FAF4E8] border-2 border-[#C9A227] text-center space-y-6 shadow-xl">
            <div className="w-16 h-16 rounded-full bg-[#A5202A] text-[#F1E7D0] flex items-center justify-center mx-auto text-2xl shadow-lg border-2 border-[#C9A227]">
              ★
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-3xl font-bold font-display text-[#241A12] uppercase">
                BẠN ĐÃ HOÀN THÀNH TOÀN BỘ HÀNH TRÌNH BẢO TÀNG!
              </h3>
              <p className="text-xs sm:text-sm text-[#35241A] max-w-2xl mx-auto leading-relaxed">
                Bạn đã khám phá trọn vẹn 6 mốc son chói lọi từ ngày giải phóng 30/4/1975, 
                Hội nghị Trung ương 24, Hội nghị Hiệp thương, ngày hội Tổng tuyển cử 25/4/1976 
                đến Kỳ họp thứ nhất Quốc hội khóa VI khai sinh nước Cộng hòa XHCN Việt Nam.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onOpenRoomQuiz('room6')}
                className="px-6 py-3 rounded-xl btn-museum-primary font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <HelpCircle className="w-4 h-4 text-[#F1E7D0]" />
                <span>Làm bài kiểm tra kết thúc (Final Quiz)</span>
              </button>

              <button
                onClick={() => onNavigateRoom('room1')}
                className="px-5 py-3 rounded-xl btn-museum-outline font-medium text-xs sm:text-sm cursor-pointer shadow"
              >
                Xem lại từ Phòng 1
              </button>

              <button
                onClick={onReturnToHall}
                className="px-5 py-3 rounded-xl bg-[#E7D8B8] hover:bg-[#DBC9A2] text-[#241A12] border border-[#C9A227] font-semibold text-xs sm:text-sm cursor-pointer shadow"
              >
                Quay về Sảnh chính
              </button>
            </div>
          </div>
        )}

        {/* Quote Plaque */}
        {room.quote && (
          <div className="rounded-xl p-6 text-center max-w-3xl mx-auto space-y-2 bg-[#FAF4E8] border-2 border-[#C9A227]/40 shadow-sm">
            <Quote className="w-6 h-6 text-[#A5202A] mx-auto opacity-80" />
            <p className="text-base sm:text-lg font-display italic text-[#241A12] leading-relaxed">
              "{room.quote.text}"
            </p>
            <p className="text-xs text-[#A5202A] font-bold uppercase tracking-wider mt-2">
              — {room.quote.author}
            </p>
            <p className="text-[11px] text-[#55483A]">
              ({room.quote.context})
            </p>
          </div>
        )}

        {/* Room Footer Navigation (Quiz & Next Room) */}
        <div className="pt-6 border-t border-[#C9A227]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            id={`room-quiz-btn-${room.id}`}
            onClick={() => {
              museumAudio.playArtifactClickSound();
              onOpenRoomQuiz(room.id);
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#E7D8B8] hover:bg-[#DBC9A2] text-[#241A12] border border-[#C9A227] flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-sm"
          >
            <HelpCircle className="w-4 h-4 text-[#A5202A]" />
            <span>
              {isQuizCompleted ? 'Làm lại kiểm tra Phòng 0' + room.roomNumber : 'Kiểm tra kiến thức Phòng 0' + room.roomNumber}
            </span>
          </button>

          {room.nextRoomId ? (
            <button
              id={`room-continue-btn-${room.id}`}
              onClick={handleNextRoom}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl btn-museum-primary flex items-center justify-center gap-2 text-xs sm:text-sm font-bold shadow-md cursor-pointer border border-[#E4C97A]"
            >
              <span>{room.nextRoomActionText || `Đến Phòng 0${room.roomNumber + 1}`}</span>
              <ArrowRight className="w-4 h-4 text-[#F1E7D0]" />
            </button>
          ) : (
            <button
              onClick={onReturnToHall}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl btn-museum-primary font-bold flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
            >
              <span>Quay về Sảnh Chính</span>
              <Building2 className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

      {/* ========================================================= */}
      {/* FLOATING ROOM NAVIGATOR BAR: Bottom Quick Jump Controls */}
      {/* ========================================================= */}
      <div className="room-floating-nav">
        <button
          onClick={onReturnToHall}
          className="px-3 py-1 rounded-full text-xs font-semibold text-[#E7D8B8] hover:text-[#C9A227] transition-colors flex items-center gap-1 cursor-pointer"
          title="Về Sảnh Chính"
        >
          <Building2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Sảnh</span>
        </button>

        <div className="h-4 w-px bg-[#C9A227]/30 mx-1" />

        {EXHIBITION_ROOMS.map((r) => {
          const isActive = r.id === room.id;
          return (
            <button
              key={r.id}
              onClick={() => {
                if (!isActive) {
                  museumAudio.playFootstepSound();
                  onNavigateRoom(r.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-[#A5202A] text-[#F1E7D0] border border-[#C9A227] shadow'
                  : 'text-[#E7D8B8] hover:text-[#C9A227] hover:bg-white/5'
              }`}
            >
              Phòng 0{r.roomNumber}
            </button>
          );
        })}
      </div>

    </div>
  );
};
