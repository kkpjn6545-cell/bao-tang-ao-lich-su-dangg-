import React, { useState } from 'react';
import { 
  Building2, 
  Clock, 
  Image as ImageIcon, 
  MapPin, 
  HelpCircle, 
  Info, 
  Award, 
  Compass, 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  BookOpen, 
  Sparkles 
} from 'lucide-react';
import { NavigationTab, RoomId, UserProgress } from '../types';
import { EXHIBITION_ROOMS } from '../data/museumData';
import { museumAudio } from '../services/audioSynthesizer';

interface NavbarProps {
  currentTab: NavigationTab;
  currentRoomId: RoomId;
  progress: UserProgress;
  totalArtifactsCount: number;
  onNavigate: (tab: NavigationTab, roomId?: RoomId) => void;
  onStartGuidedTour: () => void;
  isGuidedTourActive: boolean;
  onOpenCollection: () => void;
  audioPlaying: boolean;
  audioMuted: boolean;
  onToggleAudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  currentRoomId,
  progress,
  totalArtifactsCount,
  onNavigate,
  onStartGuidedTour,
  isGuidedTourActive,
  onOpenCollection,
  audioPlaying,
  audioMuted,
  onToggleAudio
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roomsDropdownOpen, setRoomsDropdownOpen] = useState(false);

  const exploredRoomsCount = progress.visitedRooms.length;
  const exploredArtifactsCount = progress.exploredArtifacts.length;
  const percentExplored = Math.round(
    ((exploredRoomsCount / 6) * 0.4 +
     (Math.min(exploredArtifactsCount, totalArtifactsCount) / Math.max(1, totalArtifactsCount)) * 0.3 +
     (progress.timelineExplored.length / 7) * 0.2 +
     (Object.keys(progress.completedQuizzes).length / 6) * 0.1) * 100
  );

  const handleNav = (tab: NavigationTab, roomId?: RoomId) => {
    museumAudio.playFootstepSound();
    onNavigate(tab, roomId);
    setMobileMenuOpen(false);
    setRoomsDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#1E150F]/95 border-b border-[#C9A227]/40 text-[#F1E7D0] transition-all shadow-lg">
      {/* Museum Top Accent Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#7A1620] via-[#C9A227] to-[#7A1620]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Museum Brand / Emblem */}
          <button 
            id="nav-brand-btn"
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 text-left group transition-all cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-[#A5202A] flex items-center justify-center border-2 border-[#C9A227] shadow-md group-hover:scale-105 transition-transform">
              <span className="text-[#F1E7D0] font-bold text-lg">★</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-widest text-[#C9A227] font-semibold">Bảo Tàng Ảo Lịch Sử Đảng</span>
              <span className="block text-sm sm:text-base font-bold font-display text-[#F1E7D0] leading-tight group-hover:text-[#E4C97A] transition-colors">
                Hành Trình Thống Nhất Đất Nước
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              id="nav-hall-btn"
              onClick={() => handleNav('hall')}
              className={`px-3 py-1.5 rounded-md text-xs xl:text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'hall' 
                  ? 'bg-[#A5202A] text-[#F1E7D0] border border-[#C9A227]' 
                  : 'text-[#E7D8B8] hover:text-[#C9A227] hover:bg-white/5'
              }`}
            >
              <Building2 className="w-4 h-4 text-[#C9A227]" />
              Sảnh Chính
            </button>

            {/* Exhibition Rooms Dropdown */}
            <div className="relative">
              <button
                id="nav-rooms-dropdown-btn"
                onClick={() => setRoomsDropdownOpen(!roomsDropdownOpen)}
                className={`px-3 py-1.5 rounded-md text-xs xl:text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                  currentTab === 'room'
                    ? 'bg-[#A5202A] text-[#F1E7D0] border border-[#C9A227]'
                    : 'text-[#E7D8B8] hover:text-[#C9A227] hover:bg-white/5'
                }`}
              >
                <BookOpen className="w-4 h-4 text-[#C9A227]" />
                6 Phòng Trưng Bày
                <span className="text-[10px] bg-[#C9A227]/20 text-[#E4C97A] px-1.5 py-0.5 rounded-full border border-[#C9A227]/40">
                  {exploredRoomsCount}/6
                </span>
              </button>

              {roomsDropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-[#241A12] border-2 border-[#C9A227]/60 rounded-lg shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#C9A227] border-b border-[#4A3323]">
                    Danh sách phòng triển lãm
                  </div>
                  {EXHIBITION_ROOMS.map((room) => {
                    const isVisited = progress.visitedRooms.includes(room.id);
                    const isCurrent = currentTab === 'room' && currentRoomId === room.id;
                    return (
                      <button
                        key={room.id}
                        onClick={() => handleNav('room', room.id)}
                        className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-start gap-2.5 cursor-pointer ${
                          isCurrent
                            ? 'bg-[#A5202A] text-[#F1E7D0] font-semibold'
                            : 'text-[#E7D8B8] hover:bg-[#35241A] hover:text-[#C9A227]'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 font-bold ${
                          isVisited ? 'bg-[#C9A227]/30 text-[#E4C97A] border border-[#C9A227]' : 'bg-[#35241A] text-[#E7D8B8]/60'
                        }`}>
                          {room.roomNumber}
                        </span>
                        <div className="truncate">
                          <p className="font-medium truncate font-display">{room.title}</p>
                          <p className="text-[10px] text-[#C9A227]/70 truncate">{room.period}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              id="nav-timeline-btn"
              onClick={() => handleNav('timeline')}
              className={`px-3 py-1.5 rounded-md text-xs xl:text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'timeline' 
                  ? 'bg-[#A5202A] text-[#F1E7D0] border border-[#C9A227]' 
                  : 'text-[#E7D8B8] hover:text-[#C9A227] hover:bg-white/5'
              }`}
            >
              <Clock className="w-4 h-4 text-[#C9A227]" />
              Timeline
            </button>

            <button
              id="nav-archive-btn"
              onClick={() => handleNav('archive')}
              className={`px-3 py-1.5 rounded-md text-xs xl:text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'archive' 
                  ? 'bg-[#A5202A] text-[#F1E7D0] border border-[#C9A227]' 
                  : 'text-[#E7D8B8] hover:text-[#C9A227] hover:bg-white/5'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-[#C9A227]" />
              Kho Tư Liệu
            </button>

            <button
              id="nav-map-btn"
              onClick={() => handleNav('map')}
              className={`px-3 py-1.5 rounded-md text-xs xl:text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'map' 
                  ? 'bg-[#A5202A] text-[#F1E7D0] border border-[#C9A227]' 
                  : 'text-[#E7D8B8] hover:text-[#C9A227] hover:bg-white/5'
              }`}
            >
              <MapPin className="w-4 h-4 text-[#C9A227]" />
              Bản Đồ
            </button>

            <button
              id="nav-quiz-btn"
              onClick={() => handleNav('quiz')}
              className={`px-3 py-1.5 rounded-md text-xs xl:text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'quiz' 
                  ? 'bg-[#A5202A] text-[#F1E7D0] border border-[#C9A227]' 
                  : 'text-[#E7D8B8] hover:text-[#C9A227] hover:bg-white/5'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-[#C9A227]" />
              Kiểm Tra
            </button>

            <button
              id="nav-about-btn"
              onClick={() => handleNav('about')}
              className={`px-3 py-1.5 rounded-md text-xs xl:text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'about' 
                  ? 'bg-[#A5202A] text-[#F1E7D0] border border-[#C9A227]' 
                  : 'text-[#E7D8B8] hover:text-[#C9A227] hover:bg-white/5'
              }`}
            >
              <Info className="w-4 h-4 text-[#C9A227]" />
              Về Dự Án
            </button>
          </nav>

          {/* Action Buttons & Collection Badges */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Guided Tour Switch */}
            <button
              id="guided-tour-toggle-btn"
              onClick={onStartGuidedTour}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                isGuidedTourActive
                  ? 'bg-[#A5202A] text-[#F1E7D0] border-[#E4C97A] animate-pulse shadow-md'
                  : 'bg-[#35241A] text-[#E4C97A] border-[#C9A227]/40 hover:bg-[#4A3323]'
              }`}
              title="Khởi động chế độ tham quan có hướng dẫn từng phòng"
            >
              <Compass className="w-3.5 h-3.5 text-[#E4C97A]" />
              <span>{isGuidedTourActive ? 'Đang dẫn Tour' : 'Tham quan có hướng dẫn'}</span>
            </button>

            {/* My Collection Artifacts Badge */}
            <button
              id="my-collection-badge-btn"
              onClick={onOpenCollection}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#35241A] border border-[#C9A227]/50 text-[#E4C97A] hover:border-[#E4C97A] transition-all text-xs cursor-pointer shadow-sm"
              title="Bộ sưu tập hiện vật đã khám phá"
            >
              <Award className="w-4 h-4 text-[#C9A227]" />
              <span className="hidden md:inline">Bộ sưu tập:</span>
              <span className="font-bold text-[#F1E7D0]">{exploredArtifactsCount}</span>
            </button>

            {/* Audio Toggle */}
            <button
              id="audio-quick-toggle-btn"
              onClick={onToggleAudio}
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                audioPlaying && !audioMuted
                  ? 'bg-[#A5202A] text-[#F1E7D0] border-[#E4C97A] shadow-sm'
                  : 'bg-[#35241A] text-[#E7D8B8]/60 border-[#C9A227]/40 hover:text-[#E7D8B8]'
              }`}
              title={audioPlaying && !audioMuted ? "Tắt âm thanh nhạc nền" : "Bật âm thanh bảo tàng"}
            >
              {audioPlaying && !audioMuted ? (
                <Volume2 className="w-4 h-4 animate-pulse text-[#E4C97A]" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#35241A] text-[#E7D8B8] border border-[#C9A227]/40 lg:hidden hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Museum Discovery Progress Bar */}
        <div className="py-1 flex items-center justify-between text-[11px] text-[#E7D8B8]/80 border-t border-[#4A3323]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-[#C9A227]" />
            <span>Tiến trình khám phá: <strong className="text-[#E4C97A]">{percentExplored}%</strong> bảo tàng</span>
          </div>
          <div className="w-32 sm:w-48 bg-[#35241A] rounded-full h-1.5 overflow-hidden border border-[#C9A227]/30">
            <div 
              className="bg-gradient-to-r from-[#A5202A] via-[#C9A227] to-[#E4C97A] h-full rounded-full transition-all duration-500"
              style={{ width: `${percentExplored}%` }}
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-amber-900/40 px-4 py-4 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-800">
            <button
              onClick={() => handleNav('hall')}
              className={`p-2.5 rounded-lg text-xs font-medium flex items-center gap-2 ${
                currentTab === 'hall' ? 'bg-amber-950 text-amber-300 border border-amber-600/40' : 'bg-slate-900 text-slate-300'
              }`}
            >
              <Building2 className="w-4 h-4 text-amber-400" />
              Sảnh Chính
            </button>
            <button
              onClick={() => handleNav('timeline')}
              className={`p-2.5 rounded-lg text-xs font-medium flex items-center gap-2 ${
                currentTab === 'timeline' ? 'bg-amber-950 text-amber-300 border border-amber-600/40' : 'bg-slate-900 text-slate-300'
              }`}
            >
              <Clock className="w-4 h-4 text-amber-400" />
              Timeline
            </button>
            <button
              onClick={() => handleNav('archive')}
              className={`p-2.5 rounded-lg text-xs font-medium flex items-center gap-2 ${
                currentTab === 'archive' ? 'bg-amber-950 text-amber-300 border border-amber-600/40' : 'bg-slate-900 text-slate-300'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-amber-400" />
              Kho Tư Liệu
            </button>
            <button
              onClick={() => handleNav('map')}
              className={`p-2.5 rounded-lg text-xs font-medium flex items-center gap-2 ${
                currentTab === 'map' ? 'bg-amber-950 text-amber-300 border border-amber-600/40' : 'bg-slate-900 text-slate-300'
              }`}
            >
              <MapPin className="w-4 h-4 text-amber-400" />
              Bản Đồ
            </button>
            <button
              onClick={() => handleNav('quiz')}
              className={`p-2.5 rounded-lg text-xs font-medium flex items-center gap-2 ${
                currentTab === 'quiz' ? 'bg-amber-950 text-amber-300 border border-amber-600/40' : 'bg-slate-900 text-slate-300'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-amber-400" />
              Kiểm Tra
            </button>
            <button
              onClick={() => handleNav('about')}
              className={`p-2.5 rounded-lg text-xs font-medium flex items-center gap-2 ${
                currentTab === 'about' ? 'bg-amber-950 text-amber-300 border border-amber-600/40' : 'bg-slate-900 text-slate-300'
              }`}
            >
              <Info className="w-4 h-4 text-amber-400" />
              Về Dự Án
            </button>
          </div>

          <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-400/90 pt-1">
            6 Phòng Trưng Bày Chuyên Đề:
          </p>
          <div className="space-y-1">
            {EXHIBITION_ROOMS.map(room => (
              <button
                key={room.id}
                onClick={() => handleNav('room', room.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-xs flex items-center justify-between ${
                  currentTab === 'room' && currentRoomId === room.id
                    ? 'bg-amber-950 text-amber-300 font-semibold'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <span>Phòng {room.roomNumber}: {room.title}</span>
                {progress.visitedRooms.includes(room.id) && (
                  <span className="text-[10px] text-amber-400 bg-amber-500/20 px-1.5 py-0.5 rounded">Đã xem</span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onStartGuidedTour();
              }}
              className="flex-1 py-2 rounded-md text-xs font-semibold bg-red-700 text-white flex items-center justify-center gap-1.5"
            >
              <Compass className="w-4 h-4" />
              {isGuidedTourActive ? 'Dừng Guided Tour' : 'Tham quan có hướng dẫn'}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleNav('guide');
              }}
              className="px-3 py-2 rounded-md text-xs bg-slate-900 text-slate-300 border border-slate-800"
            >
              Hướng Dẫn
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
