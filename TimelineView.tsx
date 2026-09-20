import React, { useState } from 'react';
import { 
  Clock, 
  ArrowRight, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  Filter, 
  ChevronRight, 
  Building2 
} from 'lucide-react';
import { TIMELINE_EVENTS } from '../data/museumData';
import { TimelineEvent, RoomId } from '../types';
import { museumAudio } from '../services/audioSynthesizer';

interface TimelineViewProps {
  onNavigateRoom: (roomId: RoomId) => void;
  onSelectEventArtifact?: (artifactId: string) => void;
  exploredEvents: string[];
  onMarkExplored: (eventId: string) => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  onNavigateRoom,
  onSelectEventArtifact,
  exploredEvents,
  onMarkExplored
}) => {
  const [filterYear, setFilterYear] = useState<'all' | '1975' | '1976'>('all');
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent>(TIMELINE_EVENTS[0]);

  const filteredEvents = TIMELINE_EVENTS.filter(ev => {
    if (filterYear === '1975') return ev.year === 1975;
    if (filterYear === '1976') return ev.year === 1976;
    return true;
  });

  const handleSelectEvent = (ev: TimelineEvent) => {
    museumAudio.playPageFlipSound();
    setSelectedEvent(ev);
    onMarkExplored(ev.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="museum-frame rounded-2xl p-6 sm:p-8 border border-amber-600/30">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-950/80 border border-amber-600/40 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>Trục Thời Gian Lịch Sử (Interactive Timeline)</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold font-serif-historic text-amber-100">
            Biên Niên Sử Thống Nhất Non Sông (1975 – 1976)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Theo dõi từng bước đi mang tầm chiến lược của Đảng và nhân dân ta từ ngày 
            đất nước hoàn toàn giải phóng đến khi Quốc hội khóa VI chính thức hoàn thành 
            thống nhất đất nước về mặt Nhà nước.
          </p>

          {/* Filter Pills */}
          <div className="pt-2 flex items-center gap-2 text-xs">
            <span className="text-slate-400">Lọc theo giai đoạn:</span>
            <button
              id="timeline-filter-all"
              onClick={() => setFilterYear('all')}
              className={`px-3 py-1 rounded-full border transition-all ${
                filterYear === 'all'
                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              Tất cả các mốc ({TIMELINE_EVENTS.length})
            </button>
            <button
              id="timeline-filter-1975"
              onClick={() => setFilterYear('1975')}
              className={`px-3 py-1 rounded-full border transition-all ${
                filterYear === '1975'
                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              Năm 1975
            </button>
            <button
              id="timeline-filter-1976"
              onClick={() => setFilterYear('1976')}
              className={`px-3 py-1 rounded-full border transition-all ${
                filterYear === '1976'
                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              Năm 1976
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage: Left side Timeline Track, Right side Event Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Timeline Event Vertical Spine Track (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative pl-6 sm:pl-8 border-l-2 border-amber-600/40 space-y-6">
            {filteredEvents.map((ev, index) => {
              const isSelected = selectedEvent.id === ev.id;
              const isExplored = exploredEvents.includes(ev.id);

              return (
                <div
                  key={ev.id}
                  id={`timeline-event-${ev.id}`}
                  onClick={() => handleSelectEvent(ev)}
                  className={`relative p-4 sm:p-5 rounded-xl border transition-all cursor-pointer select-none ${
                    isSelected
                      ? 'museum-frame-gold bg-slate-900 border-amber-400 shadow-xl shadow-amber-950/40 translate-x-1'
                      : 'museum-frame bg-slate-950/80 border-slate-800 hover:border-amber-600/40 hover:bg-slate-900/60'
                  }`}
                >
                  {/* Spine Node Dot */}
                  <div className={`absolute -left-[31px] sm:-left-[39px] top-6 w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all ${
                    isSelected
                      ? 'bg-amber-400 border-amber-200 text-slate-950 scale-125'
                      : isExplored
                      ? 'bg-emerald-600 border-emerald-400 text-white'
                      : 'bg-slate-950 border-amber-700/60 text-amber-500'
                  }`}>
                    <span className="text-[10px] font-bold">★</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-700/40">
                        {ev.date}
                      </span>

                      <div className="flex items-center gap-2">
                        {isExplored && (
                          <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Đã xem
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400 font-mono">
                          Phòng 0{ev.roomId.replace('room', '')}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold font-serif-historic text-slate-100">
                      {ev.title}
                    </h3>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {ev.shortDesc || ev.summary}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Details Panel of Selected Event (5 Cols Sticky) */}
        <div className="lg:col-span-5 sticky top-24 space-y-6">
          <div className="museum-frame rounded-2xl p-6 border border-amber-600/40 bg-slate-900/95 space-y-5 shadow-2xl">
            <div className="space-y-2">
              <span className="text-xs font-mono text-amber-400 bg-amber-950/90 px-2.5 py-1 rounded border border-amber-600/50 inline-block">
                {selectedEvent.date}
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-serif-historic text-amber-100">
                {selectedEvent.title}
              </h3>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <div>
                <h4 className="font-semibold text-amber-300 mb-1">Tóm lược diễn biến:</h4>
                <p>{selectedEvent.fullDesc || selectedEvent.shortDesc || selectedEvent.summary}</p>
              </div>

              <div>
                <h4 className="font-semibold text-amber-300 mb-1">Tầm vóc & Quyết sách cốt lõi:</h4>
                <p>{selectedEvent.significance}</p>
              </div>
            </div>

            {/* Room Jump Button */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <button
                id="timeline-jump-room-btn"
                onClick={() => {
                  museumAudio.playFootstepSound();
                  onNavigateRoom(selectedEvent.roomId);
                }}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <span>Đến Phòng 0{selectedEvent.roomId.replace('room', '')} để xem chi tiết</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
