import React, { useState } from 'react';
import { 
  MapPin, 
  Building2, 
  ArrowRight, 
  Compass, 
  Calendar, 
  Sparkles, 
  ExternalLink 
} from 'lucide-react';
import { HISTORICAL_LOCATIONS } from '../data/museumData';
import { HistoricalLocation, RoomId } from '../types';
import { museumAudio } from '../services/audioSynthesizer';

interface HistoricalMapViewProps {
  onNavigateRoom: (roomId: RoomId) => void;
}

export const HistoricalMapView: React.FC<HistoricalMapViewProps> = ({
  onNavigateRoom
}) => {
  const [selectedLoc, setSelectedLoc] = useState<HistoricalLocation>(HISTORICAL_LOCATIONS[0]);

  const handleSelectLocation = (loc: HistoricalLocation) => {
    museumAudio.playArtifactClickSound();
    setSelectedLoc(loc);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="museum-frame rounded-2xl p-6 sm:p-8 border border-amber-600/30">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-950/80 border border-amber-600/40 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Địa Danh Lịch Sử (Historical Map)</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold font-serif-historic text-amber-100">
            Bản Đồ Các Tọa Độ Quyết Sách Lịch Sử (1975 – 1976)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Khám phá các địa danh lịch sử trọng yếu – nơi chứng kiến những thời khắc 
            chuyển mình của vận mệnh dân tộc từ Hà Nội, Sài Gòn, cầu Hiền Lương đến Hải Phòng, Cần Thơ.
          </p>
        </div>
      </div>

      {/* Map Layout: Left Interactive Map Canvas, Right Selected Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Visual Map Stage (7 cols) */}
        <div className="lg:col-span-7 museum-frame rounded-2xl p-6 sm:p-8 border border-amber-600/40 bg-slate-950/90 relative overflow-hidden min-h-[520px] flex flex-col justify-between">
          
          {/* Map Top Guide */}
          <div className="flex items-center justify-between z-10">
            <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
              Bản đồ định vị địa danh (Bấm vào các điểm mốc)
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              Bắc – Trung – Nam nối liền một dải
            </span>
          </div>

          {/* Stylized S-Shaped Vietnam Graphic Canvas with Interactive Pins */}
          <div className="relative w-full h-[460px] my-4 flex items-center justify-center">
            
            {/* Background Map Silhouette with subtle dotted lines */}
            <svg 
              viewBox="0 0 400 700" 
              className="h-full max-h-[460px] w-auto opacity-30 drop-shadow-xl"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Generalized graceful curve of Vietnam S-shape */}
              <path
                d="M180,40 Q250,50 230,120 Q190,180 180,240 Q170,300 210,380 Q250,470 200,560 Q170,620 130,640 Q150,580 170,520 Q150,440 140,360 Q130,280 140,200 Q150,120 180,40 Z"
                fill="#b45309"
                stroke="#f59e0b"
                strokeWidth="2"
              />
              {/* Islands indication */}
              <circle cx="280" cy="330" r="8" fill="#f59e0b" opacity="0.6" />
              <circle cx="310" cy="345" r="6" fill="#f59e0b" opacity="0.6" />
              <circle cx="290" cy="520" r="10" fill="#f59e0b" opacity="0.6" />
              <circle cx="320" cy="540" r="7" fill="#f59e0b" opacity="0.6" />
              {/* 17th Parallel dashed line */}
              <line x1="80" y1="310" x2="330" y2="310" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
              <text x="85" y="305" fill="#f87171" fontSize="10" fontFamily="sans-serif">Vĩ tuyến 17 (Bến Hải)</text>
            </svg>

            {/* Positioned Marker Pins */}
            {HISTORICAL_LOCATIONS.map((loc) => {
              const isSelected = selectedLoc.id === loc.id;

              return (
                <button
                  key={loc.id}
                  id={`map-pin-${loc.id}`}
                  onClick={() => handleSelectLocation(loc)}
                  style={{ top: `${loc.coordinates.y}%`, left: `${loc.coordinates.x}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all z-20 flex items-center gap-1.5 p-1 rounded-full ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all shadow-lg ${
                    isSelected
                      ? 'bg-amber-400 border-white text-slate-950 shadow-amber-500/50'
                      : 'bg-red-700 border-amber-400/80 text-amber-200'
                  }`}>
                    <MapPin className="w-4 h-4 fill-current" />
                  </div>

                  {/* Marker Label Badge */}
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-serif-historic whitespace-nowrap shadow border transition-all ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 border-amber-300'
                      : 'bg-slate-900/90 text-amber-200 border-slate-700 group-hover:border-amber-500'
                  }`}>
                    {loc.name}
                  </span>
                </button>
              );
            })}

          </div>

          <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 flex items-center justify-between">
            <span>Nhấn vào từng địa danh để khám phá các quyết sách lịch sử</span>
            <span className="text-amber-400">★ {HISTORICAL_LOCATIONS.length} tọa độ lịch sử</span>
          </div>

        </div>

        {/* Selected Location Details Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="museum-frame rounded-2xl p-6 sm:p-7 border border-amber-600/40 bg-slate-900/95 space-y-5 shadow-2xl">
            
            <div className="space-y-2 border-b border-slate-800 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-amber-400 bg-amber-950/90 px-2.5 py-0.5 rounded border border-amber-600/50">
                  {selectedLoc.historicalContext}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Phòng 0{selectedLoc.roomId.replace('room', '')}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-serif-historic text-amber-100">
                {selectedLoc.name}
              </h3>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <div>
                <h4 className="font-semibold text-amber-300 mb-1">Sự kiện lịch sử trọng đại:</h4>
                <p>{selectedLoc.event}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <h4 className="font-semibold text-amber-400 mb-1">Ý nghĩa & Dấu ấn:</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{selectedLoc.description}</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                id="map-jump-to-room-btn"
                onClick={() => {
                  museumAudio.playFootstepSound();
                  onNavigateRoom(selectedLoc.roomId);
                }}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <span>Vào Phòng 0{selectedLoc.roomId.replace('room', '')} để xem tư liệu địa danh này</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
