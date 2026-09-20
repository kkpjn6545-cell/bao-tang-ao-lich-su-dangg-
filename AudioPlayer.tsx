import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Music, 
  Upload, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  Headphones 
} from 'lucide-react';
import { museumAudio, ROOM_TRACK_INFO } from '../services/audioSynthesizer';

interface AudioPlayerProps {
  currentRoomKey: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ currentRoomKey }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [customAudioActive, setCustomAudioActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    museumAudio.setRoom(currentRoomKey);
  }, [currentRoomKey]);

  useEffect(() => {
    const unsubscribe = museumAudio.subscribe(() => {
      const status = museumAudio.getStatus();
      setIsPlaying(status.isPlaying);
      setIsMuted(status.isMuted);
      setVolume(status.volume);
      setCustomAudioActive(status.hasCustomAudio);
    });
    return unsubscribe;
  }, []);

  const currentTrack = ROOM_TRACK_INFO[currentRoomKey] || ROOM_TRACK_INFO.hall;

  const handleTogglePlay = () => {
    museumAudio.togglePlay();
  };

  const handleToggleMute = () => {
    museumAudio.toggleMute();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    museumAudio.setVolume(val);
  };

  const handleCustomAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      museumAudio.loadCustomAudio(file);
      setIsPlaying(true);
    }
  };

  const handleResetDefaultAudio = () => {
    museumAudio.clearCustomAudio();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-50 transition-all max-w-sm w-[calc(100vw-1.5rem)] sm:w-auto">
      <div className="museum-frame bg-slate-950/95 border border-amber-600/40 rounded-xl shadow-2xl p-3 text-slate-200">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-md ${isPlaying && !isMuted ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'}`}>
              <Music className={`w-4 h-4 ${isPlaying && !isMuted ? 'animate-bounce' : ''}`} />
            </div>
            <div className="truncate max-w-[170px] sm:max-w-[210px]">
              <p className="text-xs font-semibold text-amber-200 truncate font-serif-historic">
                {customAudioActive ? 'Nhạc do bạn tải lên' : currentTrack.name}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {isPlaying ? (isMuted ? 'Đã tắt tiếng' : 'Đang phát âm thanh nhẹ') : 'Đang tạm dừng'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Play / Pause */}
            <button
              id="audio-play-pause-btn"
              onClick={handleTogglePlay}
              className="p-1.5 rounded-lg bg-amber-900/60 hover:bg-amber-800 text-amber-200 border border-amber-600/40 transition-colors"
              title={isPlaying ? "Tạm dừng" : "Phát nhạc nền"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-amber-200" />}
            </button>

            {/* Mute toggle */}
            <button
              id="audio-mute-btn"
              onClick={handleToggleMute}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors"
              title={isMuted ? "Bật âm" : "Tắt âm"}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
            </button>

            {/* Expand / Collapse Controls */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800"
              title={isCollapsed ? "Mở rộng tùy chỉnh âm thanh" : "Thu nhỏ"}
            >
              {isCollapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Expanded Controls Panel */}
        {!isCollapsed && (
          <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-3 animate-in fade-in duration-150 text-xs">
            {/* Volume Slider */}
            <div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                <span>Âm lượng bảo tàng:</span>
                <span className="text-amber-300 font-mono">{Math.round((isMuted ? 0 : volume) * 100)}%</span>
              </div>
              <input
                id="audio-volume-slider"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Room Mood Description */}
            <div className="bg-slate-900/80 p-2 rounded border border-slate-800 text-[11px] text-slate-300">
              <span className="text-amber-400 font-medium">Sắc thái: </span>
              <span>{currentTrack.mood}</span>
              <p className="text-[10px] text-slate-400 mt-0.5">{currentTrack.roomDesc}</p>
            </div>

            {/* Audio Upload / Custom Track */}
            <div className="pt-1 flex items-center justify-between gap-2">
              <input
                type="file"
                ref={fileInputRef}
                accept="audio/*"
                onChange={handleCustomAudioUpload}
                className="hidden"
                id="user-audio-upload-input"
              />
              <button
                id="audio-custom-upload-btn"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-600/30 text-[11px]"
                title="Tải lên tệp nhạc MP3/WAV riêng của bạn"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Tải nhạc của bạn</span>
              </button>

              {customAudioActive && (
                <button
                  id="audio-reset-default-btn"
                  onClick={handleResetDefaultAudio}
                  className="flex items-center gap-1 px-2 py-1.5 rounded bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800/40 text-[11px]"
                  title="Khôi phục nhạc nền mặc định"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Mặc định</span>
                </button>
              )}

              <div className="flex items-center gap-1 text-[10px] text-slate-400">
                <Headphones className="w-3 h-3 text-amber-500" />
                <span>Âm sắc nhẹ</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
