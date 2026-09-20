import React, { useState, useEffect } from 'react';
import { 
  NavigationTab, 
  RoomId, 
  UserProgress, 
  Artifact 
} from './types';
import { 
  EXHIBITION_ROOMS, 
  ALL_ARTIFACTS 
} from './data/museumData';
import { Navbar } from './components/Navbar';
import { WelcomeScreen } from './components/WelcomeScreen';
import { GrandHall } from './components/GrandHall';
import { RoomView } from './components/RoomView';
import { TimelineView } from './components/TimelineView';
import { DigitalArchiveView } from './components/DigitalArchiveView';
import { HistoricalMapView } from './components/HistoricalMapView';
import { QuizView } from './components/QuizView';
import { ArtifactViewer } from './components/ArtifactViewer';
import { CollectionModal } from './components/CollectionModal';
import { ProjectInfoView } from './components/ProjectInfoView';
import { AudioPlayer } from './components/AudioPlayer';
import { museumAudio } from './services/audioSynthesizer';
import { Compass, X, ArrowRight, ArrowLeft } from 'lucide-react';

const STORAGE_KEY = 'baotang_lichsudang_progress_v1';

const defaultProgress: UserProgress = {
  visitedRooms: [],
  exploredArtifacts: [],
  timelineExplored: [],
  completedQuizzes: {},
  achievements: []
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [currentRoomId, setCurrentRoomId] = useState<RoomId>('room1');
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const [isCollectionOpen, setIsCollectionOpen] = useState<boolean>(false);
  const [isGuidedTourActive, setIsGuidedTourActive] = useState<boolean>(false);
  const [activeQuizRoom, setActiveQuizRoom] = useState<RoomId | 'all'>('all');

  // Audio State
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const [audioMuted, setAudioMuted] = useState<boolean>(false);

  // Load persistence
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return defaultProgress;
  });

  // Sync Audio service status
  useEffect(() => {
    const unsub = museumAudio.subscribe(() => {
      const status = museumAudio.getStatus();
      setAudioPlaying(status.isPlaying);
      setAudioMuted(status.isMuted);
    });
    return unsub;
  }, []);

  // Save progress
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore
    }
  }, [progress]);

  // Handle room visit recording
  const handleEnterRoom = (roomId: RoomId) => {
    setCurrentRoomId(roomId);
    setCurrentTab('room');
    museumAudio.setRoom(roomId);

    setProgress(prev => {
      if (!prev.visitedRooms.includes(roomId)) {
        return {
          ...prev,
          visitedRooms: [...prev.visitedRooms, roomId]
        };
      }
      return prev;
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartJourney = (mode: 'free' | 'guided') => {
    if (!audioPlaying) {
      museumAudio.play();
    }
    if (mode === 'guided') {
      setIsGuidedTourActive(true);
      handleEnterRoom('room1');
    } else {
      setIsGuidedTourActive(false);
      setCurrentTab('hall');
      museumAudio.setRoom('hall');
    }
  };

  const handleStartGuidedTour = () => {
    if (isGuidedTourActive) {
      setIsGuidedTourActive(false);
    } else {
      setIsGuidedTourActive(true);
      handleEnterRoom('room1');
    }
  };

  const handleNavigate = (tab: NavigationTab, roomId?: RoomId) => {
    if (tab === 'room') {
      handleEnterRoom(roomId || currentRoomId);
    } else {
      setCurrentTab(tab);
      museumAudio.setRoom('hall');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleToggleCollect = (artifactId: string) => {
    setProgress(prev => {
      const exists = prev.exploredArtifacts.includes(artifactId);
      return {
        ...prev,
        exploredArtifacts: exists 
          ? prev.exploredArtifacts.filter(id => id !== artifactId)
          : [...prev.exploredArtifacts, artifactId]
      };
    });
  };

  const handleMarkTimelineStep = (eventId: string) => {
    setProgress(prev => {
      if (!prev.timelineExplored.includes(eventId)) {
        return {
          ...prev,
          timelineExplored: [...prev.timelineExplored, eventId]
        };
      }
      return prev;
    });
  };

  const handleCompleteRoomQuiz = (roomId: RoomId, score: number) => {
    setProgress(prev => ({
      ...prev,
      completedQuizzes: {
        ...prev.completedQuizzes,
        [roomId]: score
      }
    }));
  };

  const handleResetProgress = () => {
    setProgress(defaultProgress);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setIsCollectionOpen(false);
  };

  const handleOpenRoomQuiz = (roomId: RoomId) => {
    setActiveQuizRoom(roomId);
    setCurrentTab('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentRoom = EXHIBITION_ROOMS.find(r => r.id === currentRoomId) || EXHIBITION_ROOMS[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#F1E7D0] text-[#241A12] selection:bg-[#A5202A] selection:text-[#F1E7D0] relative font-sans">
      
      {/* Global Navigation Header */}
      {currentTab !== 'home' && (
        <Navbar
          currentTab={currentTab}
          currentRoomId={currentRoomId}
          progress={progress}
          totalArtifactsCount={ALL_ARTIFACTS.length}
          onNavigate={handleNavigate}
          onStartGuidedTour={handleStartGuidedTour}
          isGuidedTourActive={isGuidedTourActive}
          onOpenCollection={() => setIsCollectionOpen(true)}
          audioPlaying={audioPlaying}
          audioMuted={audioMuted}
          onToggleAudio={() => museumAudio.togglePlay()}
        />
      )}

      {/* Guided Tour Banner (Sticky Guide Bar when active) */}
      {isGuidedTourActive && currentTab === 'room' && (
        <div className="sticky top-16 z-30 bg-red-950/95 border-b border-amber-500/40 text-amber-200 px-4 py-2 text-xs flex items-center justify-between shadow-lg backdrop-blur">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>
              <strong>CHẾ ĐỘ THAM QUAN CÓ HƯỚNG DẪN:</strong> Chặng 0{currentRoom.roomNumber} / 06 — {currentRoom.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {currentRoom.roomNumber > 1 && (
              <button
                onClick={() => handleEnterRoom(`room${currentRoom.roomNumber - 1}` as RoomId)}
                className="px-2.5 py-1 rounded bg-slate-900 text-slate-300 hover:text-white flex items-center gap-1 border border-slate-700"
              >
                <ArrowLeft className="w-3 h-3" /> Trước
              </button>
            )}

            {currentRoom.roomNumber < 6 ? (
              <button
                onClick={() => handleEnterRoom(`room${currentRoom.roomNumber + 1}` as RoomId)}
                className="px-2.5 py-1 rounded bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 flex items-center gap-1"
              >
                Tiếp tục <ArrowRight className="w-3 h-3" />
              </button>
            ) : (
              <button
                onClick={() => handleNavigate('hall')}
                className="px-2.5 py-1 rounded bg-amber-400 text-slate-950 font-bold hover:bg-amber-300"
              >
                Hoàn thành Tour
              </button>
            )}

            <button
              onClick={() => setIsGuidedTourActive(false)}
              className="p-1 rounded text-slate-400 hover:text-white"
              title="Dừng chế độ hướng dẫn"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <WelcomeScreen
            onStartJourney={handleStartJourney}
            audioPlaying={audioPlaying}
            audioMuted={audioMuted}
            onToggleAudio={() => museumAudio.togglePlay()}
          />
        )}

        {currentTab === 'hall' && (
          <GrandHall
            progress={progress}
            onEnterRoom={handleEnterRoom}
            onNavigateTab={handleNavigate}
            onStartGuidedTour={handleStartGuidedTour}
            totalArtifactsCount={ALL_ARTIFACTS.length}
          />
        )}

        {currentTab === 'room' && (
          <RoomView
            room={currentRoom}
            artifacts={ALL_ARTIFACTS}
            onSelectArtifact={setSelectedArtifact}
            onNavigateRoom={handleEnterRoom}
            onReturnToHall={() => handleNavigate('hall')}
            onOpenRoomQuiz={handleOpenRoomQuiz}
            isQuizCompleted={currentRoom.id in progress.completedQuizzes}
            onMarkTimelineStep={handleMarkTimelineStep}
          />
        )}

        {currentTab === 'timeline' && (
          <TimelineView
            onNavigateRoom={handleEnterRoom}
            onSelectEventArtifact={(id) => {
              const art = ALL_ARTIFACTS.find(a => a.id === id);
              if (art) setSelectedArtifact(art);
            }}
            exploredEvents={progress.timelineExplored}
            onMarkExplored={handleMarkTimelineStep}
          />
        )}

        {currentTab === 'archive' && (
          <DigitalArchiveView
            artifacts={ALL_ARTIFACTS}
            onSelectArtifact={setSelectedArtifact}
            collectedArtifacts={progress.exploredArtifacts}
            onToggleCollect={handleToggleCollect}
          />
        )}

        {currentTab === 'map' && (
          <HistoricalMapView
            onNavigateRoom={handleEnterRoom}
          />
        )}

        {currentTab === 'quiz' && (
          <QuizView
            initialRoomId={activeQuizRoom}
            onCompleteRoomQuiz={handleCompleteRoomQuiz}
            onNavigateRoom={handleEnterRoom}
            completedQuizzes={progress.completedQuizzes}
          />
        )}

        {(currentTab === 'about' || currentTab === 'guide') && (
          <ProjectInfoView />
        )}
      </main>

      {/* Lightbox Artifact Viewer Modal */}
      <ArtifactViewer
        artifact={selectedArtifact}
        artifactsList={ALL_ARTIFACTS}
        onClose={() => setSelectedArtifact(null)}
        onSelectArtifact={setSelectedArtifact}
        isCollected={selectedArtifact ? progress.exploredArtifacts.includes(selectedArtifact.id) : false}
        onCollect={handleToggleCollect}
      />

      {/* Personal Collection & Badges Modal */}
      <CollectionModal
        isOpen={isCollectionOpen}
        onClose={() => setIsCollectionOpen(false)}
        progress={progress}
        allArtifacts={ALL_ARTIFACTS}
        onSelectArtifact={setSelectedArtifact}
        onResetProgress={handleResetProgress}
      />

      {/* Persistent Audio Synthesizer Player Controller */}
      <AudioPlayer
        currentRoomKey={currentTab === 'room' ? currentRoomId : 'hall'}
      />

      {/* Footer */}
      {currentTab !== 'home' && (
        <footer className="border-t border-[#4A3323]/20 bg-[#35241A] text-[#E7D8B8] py-8 px-4 text-xs text-center space-y-2 relative z-10">
          <div className="flex items-center justify-center gap-2 text-[#C9A227]">
            <span>★</span>
            <span className="font-display font-bold text-[#E4C97A] tracking-wider uppercase text-sm">
              Bảo Tàng Ảo Lịch Sử Đảng — Hành Trình Thống Nhất Đất Nước (1975–1976)
            </span>
            <span>★</span>
          </div>
          <p className="max-w-2xl mx-auto text-[#E7D8B8]/80">
            Dự án môn học Lịch sử Đảng Cộng sản Việt Nam • Văn kiện Đảng Toàn tập và tư liệu ảnh lịch sử Thông tấn xã Việt Nam.
          </p>
          <div className="pt-1 text-[11px] text-[#C9A227]/70">
            Ứng dụng số hóa di sản và học tập tương tác • Bảo tồn ký ức lịch sử hào hùng của dân tộc Việt Nam.
          </div>
        </footer>
      )}

    </div>
  );
}
