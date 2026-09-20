import React from 'react';
import { 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Image as ImageIcon, 
  Compass, 
  Award, 
  MapPin, 
  HelpCircle, 
  ChevronRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { EXHIBITION_ROOMS } from '../data/museumData';
import { RoomId, UserProgress } from '../types';
import { museumAudio } from '../services/audioSynthesizer';

interface GrandHallProps {
  progress: UserProgress;
  onEnterRoom: (roomId: RoomId) => void;
  onNavigateTab: (tab: 'timeline' | 'archive' | 'map' | 'quiz' | 'about') => void;
  onStartGuidedTour: () => void;
  totalArtifactsCount: number;
}

export const GrandHall: React.FC<GrandHallProps> = ({
  progress,
  onEnterRoom,
  onNavigateTab,
  onStartGuidedTour,
  totalArtifactsCount
}) => {
  const visitedCount = progress.visitedRooms.length;

  return (
    <div className="relative min-h-screen py-10">
      {/* Background Museum Wall */}
      <div className="museum-wall" />
      <div className="museum-spotlight" />
      <div className="museum-floor" />

      {/* Flanking Waving National Flags with Golden Star */}
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Atrium Hero Header with Visible Waving Flag */}
        <div className="relative bg-[#FAF4E8]/92 backdrop-blur rounded-2xl p-6 sm:p-10 overflow-hidden border-2 border-[#C9A227]/50 shadow-xl">
          {/* Prominent Red Flag with Yellow Star Background Layer */}
          <div className="absolute right-0 top-0 bottom-0 w-full sm:w-2/3 md:w-1/2 pointer-events-none overflow-hidden opacity-30 sm:opacity-40">
            <div className="absolute -right-10 -top-10 w-[420px] sm:w-[520px] h-full flex items-center justify-end">
              <img
                src="/assets/images/la-co.gif"
                alt="Cờ đỏ sao vàng"
                className="w-full h-auto object-contain filter drop-shadow-xl"
              />
            </div>
          </div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E7D8B8] border border-[#C9A227] text-[#4A3323] text-xs font-bold uppercase tracking-wider shadow-sm">
              <span className="text-[#A5202A]">★</span>
              <span>Sảnh Đại Triển Lãm Bảo Tàng</span>
              <span className="text-[#A5202A]">★</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold font-display text-[#241A12] tracking-tight leading-tight uppercase">
              Hành Trình Thống Nhất Đất Nước Về Mặt Nhà Nước
              <span className="text-[#A5202A] block text-xl sm:text-2xl mt-1 font-semibold">(1975 – 1976)</span>
            </h1>

            <p className="text-sm sm:text-base text-[#35241A] leading-relaxed">
              Chào mừng quý khách đến với Sảnh chính. Tại đây, quý khách có thể lựa chọn bước vào 
              từng phòng trong <strong>6 không gian trưng bày chuyên đề</strong>, hoặc chọn 
              chế độ <strong>tham quan có hướng dẫn</strong> theo đúng trình tự lịch sử để trải nghiệm trọn vẹn hành trình.
            </p>

            {/* Quick Action Navigation Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                id="grandhall-guided-tour-btn"
                onClick={() => {
                  museumAudio.playFootstepSound();
                  onStartGuidedTour();
                }}
                className="px-5 py-2.5 rounded-xl btn-museum-primary font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md cursor-pointer border border-[#E4C97A]"
              >
                <Compass className="w-4 h-4 text-[#F1E7D0]" />
                <span>Bắt đầu Tham quan có Hướng dẫn</span>
              </button>

              <button
                id="grandhall-timeline-shortcut-btn"
                onClick={() => {
                  museumAudio.playFootstepSound();
                  onNavigateTab('timeline');
                }}
                className="px-4 py-2.5 rounded-xl btn-museum-outline font-semibold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Clock className="w-4 h-4 text-[#A5202A]" />
                <span>Xem Trục Thời Gian (Timeline)</span>
              </button>

              <button
                id="grandhall-archive-shortcut-btn"
                onClick={() => {
                  museumAudio.playFootstepSound();
                  onNavigateTab('archive');
                }}
                className="px-4 py-2.5 rounded-xl bg-[#E7D8B8] hover:bg-[#DBC9A2] text-[#241A12] border border-[#C9A227] font-semibold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <ImageIcon className="w-4 h-4 text-[#A5202A]" />
                <span>Kho Tư Liệu Số ({totalArtifactsCount} hiện vật)</span>
              </button>
            </div>
          </div>

          {/* Discovery Progress Meter */}
          <div className="mt-8 pt-6 border-t border-[#C9A227]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#55483A]">
            <div className="flex items-center gap-4">
              <div>
                <span>Phòng triển lãm: </span>
                <strong className="text-[#A5202A] font-bold text-sm">{visitedCount}/6</strong> đã tham quan
              </div>
              <div>
                <span>Hiện vật đã xem: </span>
                <strong className="text-[#A5202A] font-bold text-sm">{progress.exploredArtifacts.length}/{totalArtifactsCount}</strong>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-[#7A1620] font-medium">
              <span className="text-[#A5202A]">★ Gợi ý:</span>
              <span>Khám phá tuần tự từ Phòng 1 đến Phòng 6 để nắm trọn mạch logic lịch sử.</span>
            </div>
          </div>
        </div>

        {/* 6 Exhibition Rooms Wings Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#C9A227]/30 pb-3">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A5202A] mb-1">
                <Building2 className="w-4 h-4 text-[#A5202A]" />
                <span>Hệ Thống Không Gian Triển Lãm</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#241A12]">
                6 Phòng Trưng Bày Chuyên Đề Lịch Sử
              </h2>
              <p className="text-xs text-[#55483A]">
                Bấm vào bất kỳ phòng nào để bước vào không gian triển lãm chi tiết
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXHIBITION_ROOMS.map((room) => {
              const isVisited = progress.visitedRooms.includes(room.id);
              const isQuizDone = room.id in progress.completedQuizzes;

              return (
                <div
                  key={room.id}
                  id={`room-card-${room.id}`}
                  onClick={() => {
                    museumAudio.playFootstepSound();
                    onEnterRoom(room.id);
                  }}
                  className="bg-[#FAF4E8] rounded-xl p-6 flex flex-col justify-between border-2 border-[#C9A227]/50 hover:border-[#A5202A] hover:shadow-xl transition-all cursor-pointer relative overflow-hidden group shadow-md"
                >
                  <div className="space-y-4">
                    {/* Room Number Badge & Visited Indicator */}
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded bg-[#A5202A] text-[#F1E7D0] font-display text-xs font-bold border border-[#C9A227]">
                        PHÒNG 0{room.roomNumber}
                      </span>

                      <div className="flex items-center gap-1.5">
                        {isVisited ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                            <span>Đã tham quan</span>
                          </span>
                        ) : (
                          <span className="text-[11px] text-[#55483A] bg-[#E7D8B8] px-2 py-0.5 rounded-full border border-[#C9A227]/40">
                            Chưa xem
                          </span>
                        )}

                        {isQuizDone && (
                          <span className="text-[11px] font-bold text-[#A5202A] bg-[#E7D8B8] border border-[#C9A227] px-2 py-0.5 rounded-full" title="Đã làm bài kiểm tra">
                            ✓ Quiz
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Room Title & Subtitle */}
                    <div>
                      <h3 className="text-lg font-bold font-display text-[#241A12] group-hover:text-[#A5202A] transition-colors leading-snug">
                        {room.title}
                      </h3>
                      <p className="text-xs font-semibold text-[#A5202A] mt-1">
                        {room.period}
                      </p>
                    </div>

                    {/* Overview excerpt */}
                    <p className="text-xs text-[#35241A] line-clamp-3 leading-relaxed">
                      {room.overview}
                    </p>

                    {/* Key Question / Theme Badge if present */}
                    {room.keyQuestion && (
                      <div className="p-3 rounded-lg bg-[#E7D8B8]/80 border-l-4 border-[#A5202A] text-[11px] text-[#241A12]">
                        <span className="font-bold text-[#A5202A] block mb-0.5">Câu hỏi định hướng: </span>
                        <span className="italic">{room.keyQuestion}</span>
                      </div>
                    )}
                  </div>

                  {/* Enter Room Button Link */}
                  <div className="pt-5 mt-4 border-t border-[#C9A227]/30 flex items-center justify-between text-xs font-semibold text-[#A5202A] group-hover:text-[#7A1620]">
                    <span>Bước vào tham quan phòng 0{room.roomNumber}</span>
                    <div className="w-7 h-7 rounded-full bg-[#E7D8B8] border border-[#C9A227] flex items-center justify-center group-hover:bg-[#A5202A] group-hover:text-[#F1E7D0] transition-all">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vietnamese Soldier Tribute Showcase */}
        <div className="pt-2">
          <div className="bg-[#FAF4E8]/90 backdrop-blur rounded-2xl p-6 sm:p-8 border-2 border-[#C9A227]/60 shadow-lg space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#C9A227]/30 pb-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A5202A] mb-1">
                  <span>★</span>
                  <span>Tôn Vinh Biểu Tượng Lịch Sử</span>
                  <span>★</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-[#241A12]">
                  Hình Tượng Người Chiến Sĩ Việt Nam (1975 – 1976)
                </h2>
                <p className="text-xs text-[#55483A]">
                  Những người con kiên trung của dân tộc đã cống hiến trọn vẹn tuổi thanh xuân vì độc lập, tự do và non sông liền một dải
                </p>
              </div>

              <button
                onClick={() => onNavigateTab('archive')}
                className="px-4 py-2 rounded-xl bg-[#E7D8B8] hover:bg-[#DBC9A2] text-[#241A12] border border-[#C9A227] text-xs font-semibold flex items-center gap-1.5 shadow-sm self-start sm:self-auto cursor-pointer"
              >
                <span>Xem trong Kho tư liệu</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#A5202A]" />
              </button>
            </div>

            {/* Soldier Cards Carousel / Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {/* Card 1: Bui Quang Than */}
              <div 
                onClick={() => onEnterRoom('room1')}
                className="bg-[#F1E7D0] rounded-xl overflow-hidden border-2 border-[#C9A227]/40 hover:border-[#A5202A] shadow-md hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-[#241A12]">
                  <img
                    src="/assets/images/bui_quang_than.jpg"
                    alt="Chiến sĩ Bùi Quang Thận cắm cờ"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#241A12]/80 text-[#FFD700] text-[10px] font-mono border border-[#C9A227]/40">
                    Phòng 01
                  </div>
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#A5202A] text-[#F1E7D0] text-[10px] font-bold shadow flex items-center gap-1">
                    <span>★</span> Người cắm cờ
                  </div>
                </div>
                <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-sm font-display text-[#241A12] group-hover:text-[#A5202A] transition-colors">
                      Trung úy Bùi Quang Thận
                    </h4>
                    <p className="text-xs text-[#55483A] line-clamp-2 mt-1">
                      Chỉ huy xe tăng 843, người trực tiếp giương cao lá cờ cách mạng trên nóc Dinh Độc Lập trưa 30/4/1975.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#C9A227]/30 text-[11px] text-[#A5202A] font-semibold flex items-center justify-between">
                    <span>Xem hiện vật tại Phòng 01</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>

              {/* Card 2: Xe tang 390 & Kip chien si */}
              <div 
                onClick={() => onEnterRoom('room1')}
                className="bg-[#F1E7D0] rounded-xl overflow-hidden border-2 border-[#C9A227]/40 hover:border-[#A5202A] shadow-md hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-[#241A12]">
                  <img
                    src="/assets/images/xe_tang_390_va_chien_si.jpg"
                    alt="Xe tăng 390 và các chiến sĩ"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#241A12]/80 text-[#FFD700] text-[10px] font-mono border border-[#C9A227]/40">
                    Phòng 01
                  </div>
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#A5202A] text-[#F1E7D0] text-[10px] font-bold shadow flex items-center gap-1">
                    <span>★</span> Kíp xe 390
                  </div>
                </div>
                <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-sm font-display text-[#241A12] group-hover:text-[#A5202A] transition-colors">
                      Xe tăng 390 & Kíp chiến sĩ quả cảm
                    </h4>
                    <p className="text-xs text-[#55483A] line-clamp-2 mt-1">
                      Vũ Đăng Toàn, Ngô Sĩ Nguyên, Nguyễn Văn Tập, Lê Văn Phượng dũng mãnh húc tung cổng Dinh Độc Lập.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#C9A227]/30 text-[11px] text-[#A5202A] font-semibold flex items-center justify-between">
                    <span>Xem hiện vật tại Phòng 01</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>

              {/* Card 3: Dai tuong Vo Nguyen Giap */}
              <div 
                onClick={() => onEnterRoom('room2')}
                className="bg-[#F1E7D0] rounded-xl overflow-hidden border-2 border-[#C9A227]/40 hover:border-[#A5202A] shadow-md hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-[#241A12]">
                  <img
                    src="/assets/images/dai_tuong_vo_nguyen_giap_bo_tong_tu_lenh.jpg"
                    alt="Đại tướng Võ Nguyên Giáp"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#241A12]/80 text-[#FFD700] text-[10px] font-mono border border-[#C9A227]/40">
                    Phòng 02
                  </div>
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#A5202A] text-[#F1E7D0] text-[10px] font-bold shadow flex items-center gap-1">
                    <span>★</span> Người Anh Cả QĐND
                  </div>
                </div>
                <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-sm font-display text-[#241A12] group-hover:text-[#A5202A] transition-colors">
                      Đại tướng Võ Nguyên Giáp
                    </h4>
                    <p className="text-xs text-[#55483A] line-clamp-2 mt-1">
                      Vị tướng huyền thoại chỉ huy các cánh quân thần tốc tiến về giải phóng Sài Gòn, thống nhất Tổ quốc.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#C9A227]/30 text-[11px] text-[#A5202A] font-semibold flex items-center justify-between">
                    <span>Xem hiện vật tại Phòng 02</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>

              {/* Card 4: Nu tuong Nguyen Thi Dinh */}
              <div 
                onClick={() => onEnterRoom('room3')}
                className="bg-[#F1E7D0] rounded-xl overflow-hidden border-2 border-[#C9A227]/40 hover:border-[#A5202A] shadow-md hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-[#241A12]">
                  <img
                    src="/assets/images/nguyen_thi_dinh.jpg"
                    alt="Nữ tướng Nguyễn Thị Định"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#241A12]/80 text-[#FFD700] text-[10px] font-mono border border-[#C9A227]/40">
                    Phòng 03
                  </div>
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#A5202A] text-[#F1E7D0] text-[10px] font-bold shadow flex items-center gap-1">
                    <span>★</span> Nữ tướng huyền thoại
                  </div>
                </div>
                <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-sm font-display text-[#241A12] group-hover:text-[#A5202A] transition-colors">
                      Nữ tướng Nguyễn Thị Định
                    </h4>
                    <p className="text-xs text-[#55483A] line-clamp-2 mt-1">
                      Phó Tư lệnh Quân Giải phóng miền Nam, người có đóng góp xuất sắc vào công tác hiệp thương thống nhất non sông.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#C9A227]/30 text-[11px] text-[#A5202A] font-semibold flex items-center justify-between">
                    <span>Xem hiện vật tại Phòng 03</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>

              {/* Card 5: Chien si truoc Dinh Doc Lap */}
              <div 
                onClick={() => onEnterRoom('room1')}
                className="bg-[#F1E7D0] rounded-xl overflow-hidden border-2 border-[#C9A227]/40 hover:border-[#A5202A] shadow-md hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-[#241A12]">
                  <img
                    src="/assets/images/chien_si_truoc_dinh_doc_lap.jpg"
                    alt="Chiến sĩ giải phóng quân tiếp quản Dinh Độc Lập"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#241A12]/80 text-[#FFD700] text-[10px] font-mono border border-[#C9A227]/40">
                    Phòng 01
                  </div>
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#A5202A] text-[#F1E7D0] text-[10px] font-bold shadow flex items-center gap-1">
                    <span>★</span> Giờ phút lịch sử
                  </div>
                </div>
                <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-sm font-display text-[#241A12] group-hover:text-[#A5202A] transition-colors">
                      Chiến sĩ Giải phóng quân tiếp quản Dinh
                    </h4>
                    <p className="text-xs text-[#55483A] line-clamp-2 mt-1">
                      Hình ảnh những người lính bình dị mang lại hòa bình trọn vẹn cho nhân dân cả nước trưa ngày 30/4/1975.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#C9A227]/30 text-[11px] text-[#A5202A] font-semibold flex items-center justify-between">
                    <span>Xem hiện vật tại Phòng 01</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>

              {/* Card 6: Y chi Bo doi Cu Ho */}
              <div 
                onClick={() => onEnterRoom('room6')}
                className="bg-[#F1E7D0] rounded-xl overflow-hidden border-2 border-[#C9A227]/40 hover:border-[#A5202A] shadow-md hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-[#241A12]">
                  <img
                    src="/assets/images/chien_si_quan_doi_tien_cong.jpg"
                    alt="Ý chí quật cường của Bộ đội Cụ Hồ"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#241A12]/80 text-[#FFD700] text-[10px] font-mono border border-[#C9A227]/40">
                    Phòng 06
                  </div>
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#A5202A] text-[#F1E7D0] text-[10px] font-bold shadow flex items-center gap-1">
                    <span>★</span> Bảo vệ Tổ quốc
                  </div>
                </div>
                <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-sm font-display text-[#241A12] group-hover:text-[#A5202A] transition-colors">
                      Ý chí Bộ đội Cụ Hồ
                    </h4>
                    <p className="text-xs text-[#55483A] line-clamp-2 mt-1">
                      Từ mũi tiến công thần tốc đến nhiệm vụ thiêng liêng giữ vững biển đảo, biên cương và kiến thiết đất nước thống nhất.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#C9A227]/30 text-[11px] text-[#A5202A] font-semibold flex items-center justify-between">
                    <span>Xem hiện vật tại Phòng 06</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Auxiliary Discovery Hub (Map, Artifacts, Quiz, Rubric) */}
        <div className="pt-4">
          <div className="border-b border-[#C9A227]/30 pb-3 mb-6">
            <h2 className="text-xl font-bold font-display text-[#241A12]">
              Các Khu Vực Trải Nghiệm & Tra Cứu Số
            </h2>
            <p className="text-xs text-[#55483A]">
              Khai thác toàn diện tư liệu qua các công cụ trực quan hóa hiện đại
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div 
              onClick={() => onNavigateTab('timeline')}
              className="bg-[#FAF4E8] rounded-xl p-4 border-2 border-[#C9A227]/40 hover:border-[#A5202A] cursor-pointer transition-all flex items-start gap-3 shadow-sm hover:shadow-md group"
            >
              <div className="p-2.5 rounded-lg bg-[#E7D8B8] border border-[#C9A227] text-[#A5202A] shrink-0 group-hover:bg-[#A5202A] group-hover:text-[#F1E7D0] transition-colors">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#241A12] font-display">Interactive Timeline</h4>
                <p className="text-xs text-[#55483A] mt-0.5">Trục thời gian 1975–1976 click từng sự kiện lịch sử</p>
              </div>
            </div>

            <div 
              onClick={() => onNavigateTab('archive')}
              className="bg-[#FAF4E8] rounded-xl p-4 border-2 border-[#C9A227]/40 hover:border-[#A5202A] cursor-pointer transition-all flex items-start gap-3 shadow-sm hover:shadow-md group"
            >
              <div className="p-2.5 rounded-lg bg-[#E7D8B8] border border-[#C9A227] text-[#A5202A] shrink-0 group-hover:bg-[#A5202A] group-hover:text-[#F1E7D0] transition-colors">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#241A12] font-display">Kho Tư Liệu Số</h4>
                <p className="text-xs text-[#55483A] mt-0.5">Tường ảnh tư liệu, phóng to zoom và so sánh ảnh</p>
              </div>
            </div>

            <div 
              onClick={() => onNavigateTab('map')}
              className="bg-[#FAF4E8] rounded-xl p-4 border-2 border-[#C9A227]/40 hover:border-[#A5202A] cursor-pointer transition-all flex items-start gap-3 shadow-sm hover:shadow-md group"
            >
              <div className="p-2.5 rounded-lg bg-[#E7D8B8] border border-[#C9A227] text-[#A5202A] shrink-0 group-hover:bg-[#A5202A] group-hover:text-[#F1E7D0] transition-colors">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#241A12] font-display">Bản Đồ Lịch Sử</h4>
                <p className="text-xs text-[#55483A] mt-0.5">Địa danh gắn liền với các mốc quyết sách của Đảng</p>
              </div>
            </div>

            <div 
              onClick={() => onNavigateTab('quiz')}
              className="bg-[#FAF4E8] rounded-xl p-4 border-2 border-[#C9A227]/40 hover:border-[#A5202A] cursor-pointer transition-all flex items-start gap-3 shadow-sm hover:shadow-md group"
            >
              <div className="p-2.5 rounded-lg bg-[#E7D8B8] border border-[#C9A227] text-[#A5202A] shrink-0 group-hover:bg-[#A5202A] group-hover:text-[#F1E7D0] transition-colors">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#241A12] font-display">Kiểm Tra Kiến Thức</h4>
                <p className="text-xs text-[#55483A] mt-0.5">Thử thách trắc nghiệm có giải thích chi tiết</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
