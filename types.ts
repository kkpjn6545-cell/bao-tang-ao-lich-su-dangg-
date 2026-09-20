/**
 * Types definition for "Bảo tàng Ảo Lịch sử Đảng"
 * Chủ đề: Hành trình thống nhất đất nước về mặt Nhà nước (1975–1976)
 */

export type RoomId = 'room1' | 'room2' | 'room3' | 'room4' | 'room5' | 'room6';

export type NavigationTab = 
  | 'home' 
  | 'hall' 
  | 'room' 
  | 'timeline' 
  | 'archive' 
  | 'map' 
  | 'quiz' 
  | 'about' 
  | 'guide';

export type ArtifactCategory = 
  | 'Bối cảnh 1975'
  | 'Hội nghị Trung ương 24'
  | 'Hội nghị Hiệp thương'
  | 'Tổng tuyển cử 25/4/1976'
  | 'Quốc hội'
  | 'Tư liệu Nhà nước'
  | 'Nhân vật'
  | 'Chiến sĩ Việt Nam'
  | 'Văn kiện'
  | 'Hình ảnh lịch sử khác';

export interface Artifact {
  id: string;
  title: string;
  year: string;
  period: string;
  dateStr: string;
  event: string;
  roomId: RoomId;
  description: string;
  source: string;
  category: ArtifactCategory;
  imageUrl: string;
  tags: string[];
  details?: string;
  type?: string;
  historicalContext?: string;
  isPrimaryUserUpload?: boolean;
  verified: boolean;
  comparisonWithId?: string;
  audioUrl?: string;
}

export interface KeyAspect {
  id: string;
  title: string;
  iconName: string;
  summary: string;
  content: string;
  historicalQuotes?: string;
}

export interface VisualStoryStep {
  step: number;
  title: string;
  time: string;
  description: string;
  highlight: string;
}

export interface DocumentRecord {
  id: string;
  title: string;
  decisionNumber?: string;
  date: string;
  significance: string;
  content: string;
  officialTextQuote?: string;
}

export interface ExhibitionRoom {
  id: RoomId;
  roomNumber: number;
  title: string;
  subtitle: string;
  period: string;
  overview: string;
  heroHeading?: string;
  heroSubheading?: string;
  keyQuestion?: string;
  keyQuestionAnswer?: string;
  keyAspects?: KeyAspect[];
  visualStory?: VisualStoryStep[];
  documents?: DocumentRecord[];
  primaryArtifactIds: string[];
  nextRoomId?: RoomId;
  nextRoomActionText?: string;
  quote?: {
    text: string;
    author: string;
    context: string;
  };
}

export interface TimelineNode {
  id: string;
  date: string;
  year: number;
  title: string;
  shortDesc: string;
  summary?: string;
  fullDesc: string;
  roomId: RoomId;
  artifactId?: string;
  significance: string;
  iconType: 'flag' | 'users' | 'vote' | 'landmark' | 'award' | 'calendar';
}

export type TimelineEvent = TimelineNode;

export interface HistoricalLocation {
  id: string;
  name: string;
  historicName?: string;
  coordinates: { x: number; y: number }; // percentage on stylized Vietnam map
  city: string;
  role: string;
  description: string;
  historicalContext?: string;
  event?: string;
  roomId: RoomId;
  relatedArtifactId?: string;
  events: string[];
}

export interface QuizQuestion {
  id: string;
  roomId?: RoomId;
  question: string;
  options: string[] | [string, string, string, string];
  correctIndex?: number;
  correctAnswer?: number;
  explanation: string;
  sourceRef?: string;
}

export interface UserProgress {
  visitedRooms: string[];
  exploredArtifacts: string[];
  completedQuizzes: Record<string, number>; // roomId/quizId -> score percentage
  timelineExplored: string[];
  unlockedAchievements?: string[];
  achievements?: string[];
  hasCompletedTour?: boolean;
  finalQuizScore?: {
    correct: number;
    total: number;
    date: string;
  };
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  description: string;
  criterion: string;
}

export interface ProjectInfo {
  projectName: string;
  course: string;
  instructor: string;
  topic: string;
  groupName: string;
  members: Array<{ name: string; role: string; studentId: string }>;
  objective: string;
  sources: string[];
  evaluationRubric: Array<{ criterion: string; maxPoints: number; description: string }>;
}
