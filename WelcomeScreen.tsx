import React from 'react';
import { Compass, Volume2, VolumeX, ShieldCheck, ArrowRight, BookOpen } from 'lucide-react';
import { museumAudio } from '../services/audioSynthesizer';

interface WelcomeScreenProps {
  onStartJourney: (mode: 'free' | 'guided') => void;
  audioPlaying: boolean;
  audioMuted: boolean;
  onToggleAudio: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStartJourney,
  audioPlaying,
  audioMuted,
  onToggleAudio
}) => {
  return (
    <div className="relative min-h-[calc(100vh-4.5rem)] flex items-center justify-center overflow-hidden px-4 py-16">
      {/* Museum Wall Background with subtle wavy flag & warm spotlight */}
      <div className="museum-wall" />
      <div className="museum-spotlight" />
      <div className="museum-floor" />

      <div className="relative max-w-4xl mx-auto text-center space-y-8 z-10">
        
        {/* Emblem & Historical Category Header */}
        <div className="inline-flex items-center gap-2.5 px-5 py-1.5 rounded-full bg-[#E7D8B8] border border-[#C9A227] text-[#4A3323] text-xs tracking-widest uppercase shadow-md">
          <span className="text-[#A5202A] font-bold">★</span>
          <span className="font-semibold">Dự án môn học Lịch sử Đảng Cộng sản Việt Nam</span>
          <span className="text-[#A5202A] font-bold">★</span>
        </div>

        {/* Main Titles */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight text-[#241A12] drop-shadow-sm uppercase">
            Bảo Tàng Ảo Lịch Sử Đảng
          </h1>
          
          <div className="inline-block relative">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-medium font-display text-[#7A1620] max-w-3xl mx-auto leading-relaxed">
              HÀNH TRÌNH THỐNG NHẤT ĐẤT NƯỚC VỀ MẶT NHÀ NƯỚC
              <span className="block text-base sm:text-xl text-[#C9A227] font-semibold mt-1">(1975 – 1976)</span>
            </h2>
            <div className="h-0.5 w-48 mx-auto mt-4 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent" />
          </div>
        </div>

        {/* Introduction Narrative */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#35241A] leading-relaxed font-normal">
          Chào mừng quý khách đến với không gian triển lãm số tái hiện sống động 6 chặng đường lịch sử 
          từ Đại thắng mùa Xuân 30/4/1975, Hội nghị Trung ương 24, Hội nghị Hiệp thương, 
          ngày hội Tổng tuyển cử 25/4/1976 đến Kỳ họp thứ nhất Quốc hội khóa VI 
          chính thức khai sinh thể chế Nhà nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.
        </p>

        {/* 6 Exhibition Highlights Pill Badges */}
        <div className="flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto text-xs text-[#241A12] pt-2">
          <span className="px-3.5 py-1.5 rounded-full bg-[#E7D8B8]/90 border border-[#C9A227]/60 shadow-sm font-medium">1. Bối cảnh sau 30/4/1975</span>
          <span className="px-3.5 py-1.5 rounded-full bg-[#E7D8B8]/90 border border-[#C9A227]/60 shadow-sm font-medium">2. Hội nghị Trung ương 24</span>
          <span className="px-3.5 py-1.5 rounded-full bg-[#E7D8B8]/90 border border-[#C9A227]/60 shadow-sm font-medium">3. Hội nghị Hiệp thương</span>
          <span className="px-3.5 py-1.5 rounded-full bg-[#E7D8B8]/90 border border-[#C9A227]/60 shadow-sm font-medium">4. Tổng tuyển cử 25/4/1976</span>
          <span className="px-3.5 py-1.5 rounded-full bg-[#E7D8B8]/90 border border-[#C9A227]/60 shadow-sm font-medium">5. Kỳ họp Quốc hội đầu tiên</span>
          <span className="px-3.5 py-1.5 rounded-full bg-[#E7D8B8]/90 border border-[#C9A227]/60 shadow-sm font-medium">6. Đánh giá sự kiện hợp nhất</span>
        </div>

        {/* Call to Action Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Start Main Journey */}
          <button
            id="welcome-start-journey-btn"
            onClick={() => {
              museumAudio.playFootstepSound();
              onStartJourney('free');
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-display text-base sm:text-lg font-bold btn-museum-primary flex items-center justify-center gap-3 border border-[#E4C97A] cursor-pointer"
          >
            <span>BẮT ĐẦU HÀNH TRÌNH</span>
            <ArrowRight className="w-5 h-5 text-[#F1E7D0]" />
          </button>

          {/* Start Guided Tour */}
          <button
            id="welcome-start-guided-tour-btn"
            onClick={() => {
              museumAudio.playFootstepSound();
              onStartJourney('guided');
            }}
            className="w-full sm:w-auto px-6 py-4 rounded-xl font-medium text-sm sm:text-base btn-museum-outline flex items-center justify-center gap-2.5 shadow-md cursor-pointer"
          >
            <Compass className="w-5 h-5 text-[#A5202A]" />
            <span>Tham quan có hướng dẫn (Guided Tour)</span>
          </button>
        </div>

        {/* Ambient Music Control Button & Audio Notice */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-[#55483A]">
          <button
            id="welcome-audio-toggle-btn"
            onClick={onToggleAudio}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#E7D8B8] border border-[#C9A227]/60 hover:border-[#A5202A] text-[#241A12] transition-colors shadow-sm"
          >
            {audioPlaying && !audioMuted ? (
              <>
                <Volume2 className="w-4 h-4 text-[#A5202A] animate-pulse" />
                <span>Âm thanh bảo tàng: <strong className="text-[#A5202A]">Đang phát</strong></span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-[#55483A]" />
                <span>Âm thanh bảo tàng: <strong>Tắt (Nhấn để bật)</strong></span>
              </>
            )}
          </button>

          <div className="flex items-center gap-1.5 text-[#55483A]">
            <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
            <span>Tư liệu lịch sử xác thực & Trích dẫn văn kiện chuẩn mực</span>
          </div>
        </div>

      </div>
    </div>
  );
};
