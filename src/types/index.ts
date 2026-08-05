// TypeScript definitions for Pocket VAR application

export type SportType =
  | 'Football'
  | 'Basketball'
  | 'Tennis'
  | 'Rugby'
  | 'Hockey'
  | 'Volleyball'
  | 'Other';

export type RecordingMode = 'FULL_MATCH' | 'OPTIMIZED_BUFFER';

export type VideoQuality = '720p' | '1080p' | '4K';

export type EventType =
  | 'Goal'
  | 'Possible Goal'
  | 'Foul'
  | 'Offside'
  | 'Red Card'
  | 'Yellow Card'
  | 'Penalty'
  | 'Interesting Moment'
  | 'Dribble'
  | 'Custom';

export type DecisionType =
  | 'Goal'
  | 'No Goal'
  | 'Foul'
  | 'No Foul'
  | 'Offside'
  | 'Red Card'
  | 'Yellow Card'
  | 'Penalty'
  | 'Other';

export type AnnotationTool = 'pencil' | 'line' | 'rectangle' | 'circle' | 'arrow';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'referee' | 'camera_operator' | 'coach' | 'viewer';
  avatarUrl?: string;
}

export interface CameraDevice {
  id: string;
  name: string;
  angleLabel: string; // e.g., 'Main Cam', 'Left Wing', 'Right Wing', 'Behind Goal'
  isPrimary: boolean;
  batteryLevel?: number;
  status: 'connected' | 'recording' | 'idle' | 'disconnected';
}

export interface RecordingSettings {
  mode: RecordingMode;
  bufferBeforeSeconds: number; // 20s, 30s, 40s
  bufferAfterSeconds: number; // 20s, 30s, 40s
  quality: VideoQuality;
  autoUpload: boolean;
  gridOverlayEnabled: boolean;
  audioEnabled: boolean;
}

export interface Match {
  id: string;
  title: string;
  sport: SportType;
  homeTeam: string;
  awayTeam: string;
  venue: string;
  date: string;
  durationMinutes: number;
  homeScore?: number;
  awayScore?: number;
  status: 'upcoming' | 'live' | 'completed';
  recordingSettings: RecordingSettings;
  connectedDevicesCount: number;
  highlightCount: number;
  thumbnailUrl?: string;
  code?: string;
}

export interface HighlightEvent {
  id: string;
  matchId: string;
  type: EventType;
  timestamp: string; // e.g. "42:15"
  timestampSeconds: number;
  tag: string;
  cameraAngles: string[];
  thumbnailUrl: string;
  videoUrl: string;
  decision?: ReviewDecision;
  note?: string;
}

export interface ReviewDecision {
  id: string;
  eventId: string;
  verdict: DecisionType;
  refereeNotes?: string;
  decidedAt: string;
}

export interface Annotation {
  id: string;
  tool: AnnotationTool;
  points: { x: number; y: number }[];
  color: string;
  strokeWidth: number;
}

export interface RecordingSession {
  id: string;
  matchId: string;
  startTime: string;
  mode: RecordingMode;
  isRecording: boolean;
  elapsedSeconds: number;
  eventsCount: number;
  activeAngle: string;
}

export type ScreenName =
  | 'Splash'
  | 'Onboarding'
  | 'Auth'
  | 'Home'
  | 'MatchDashboard'
  | 'CreateMatch'
  | 'JoinMatch'
  | 'CameraView'
  | 'Recording'
  | 'ReplayViewer'
  | 'Timeline'
  | 'MatchDetails'
  | 'UserProfile'
  | 'Settings'
  | 'Notifications'
  | 'HelpSupport';
