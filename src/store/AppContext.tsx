import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Match,
  HighlightEvent,
  User,
  RecordingSettings,
  ScreenName,
  EventType,
  DecisionType,
  ReviewDecision,
  Annotation,
} from '../types';
import { storageManager } from '../services/StorageManager';
import { bufferManager } from '../services/BufferManager';

interface AppContextType {
  currentScreen: ScreenName;
  setCurrentScreen: (screen: ScreenName) => void;
  matches: Match[];
  activeMatch: Match | null;
  setActiveMatch: (match: Match | null) => void;
  highlights: HighlightEvent[];
  activeHighlight: HighlightEvent | null;
  setActiveHighlight: (event: HighlightEvent | null) => void;
  user: User;
  settings: RecordingSettings;
  updateSettings: (newSettings: Partial<RecordingSettings>) => void;
  
  // Recording State
  isRecording: boolean;
  recordingMode: 'FULL_MATCH' | 'OPTIMIZED_BUFFER';
  elapsedSeconds: number;
  startRecording: (match: Match) => void;
  stopRecording: () => void;
  triggerEventFlag: (type: EventType, customTag?: string) => HighlightEvent;
  
  // VAR Review State
  activeAnnotations: Annotation[];
  addAnnotation: (annotation: Annotation) => void;
  clearAnnotations: () => void;
  saveDecision: (eventId: string, verdict: DecisionType, notes?: string) => void;
  
  // Helper Actions
  createNewMatch: (matchData: Omit<Match, 'id' | 'status' | 'connectedDevicesCount' | 'highlightCount'>) => Match;
  joinMatchByCode: (code: string) => Match | undefined;
  deleteHighlightClip: (id: string) => void;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('Splash');
  const [matches, setMatches] = useState<Match[]>(storageManager.getMatches());
  const [activeMatch, setActiveMatch] = useState<Match | null>(matches[0] || null);
  const [highlights, setHighlights] = useState<HighlightEvent[]>(storageManager.getHighlights());
  const [activeHighlight, setActiveHighlight] = useState<HighlightEvent | null>(highlights[0] || null);
  const [user, setUser] = useState<User>(storageManager.getUser());
  const [settings, setSettings] = useState<RecordingSettings>(storageManager.getSettings());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  // Recording engine state
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingMode, setRecordingMode] = useState<'FULL_MATCH' | 'OPTIMIZED_BUFFER'>(settings.mode);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [activeAnnotations, setActiveAnnotations] = useState<Annotation[]>([]);

  useEffect(() => {
    let timer: any;
    if (isRecording) {
      timer = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const updateSettings = (newSettings: Partial<RecordingSettings>) => {
    const updated = storageManager.updateSettings(newSettings);
    setSettings(updated);
    if (newSettings.mode) {
      setRecordingMode(newSettings.mode);
    }
    bufferManager.setConfig(updated.bufferBeforeSeconds, updated.bufferAfterSeconds);
  };

  const startRecording = (match: Match) => {
    setActiveMatch(match);
    setIsRecording(true);
    setElapsedSeconds(0);
    bufferManager.startBuffering();
  };

  const stopRecording = () => {
    setIsRecording(false);
    bufferManager.stopBuffering();
  };

  const triggerEventFlag = (type: EventType, customTag?: string): HighlightEvent => {
    const minutes = Math.floor(elapsedSeconds / 60);
    const secs = elapsedSeconds % 60;
    const formattedTimestamp = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    const newEvent: HighlightEvent = {
      id: `h_${Date.now()}`,
      matchId: activeMatch ? activeMatch.id : 'm1',
      type,
      timestamp: formattedTimestamp,
      timestampSeconds: elapsedSeconds,
      tag: customTag || `${type} Event`,
      cameraAngles: ['Main Camera', 'Tactical Cam 1', 'Behind Goal'],
      thumbnailUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=500',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    };

    bufferManager.captureEventClip(newEvent.id);
    const savedEvent = storageManager.addHighlight(newEvent);
    setHighlights([...storageManager.getHighlights()]);
    setMatches([...storageManager.getMatches()]);
    setActiveHighlight(savedEvent);
    return savedEvent;
  };

  const addAnnotation = (annotation: Annotation) => {
    setActiveAnnotations((prev) => [...prev, annotation]);
  };

  const clearAnnotations = () => {
    setActiveAnnotations([]);
  };

  const saveDecision = (eventId: string, verdict: DecisionType, notes?: string) => {
    const decision: ReviewDecision = {
      id: `dec_${Date.now()}`,
      eventId,
      verdict,
      refereeNotes: notes || `Official VAR decision: ${verdict}`,
      decidedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setHighlights((prev) =>
      prev.map((h) => {
        if (h.id === eventId) {
          return { ...h, decision };
        }
        return h;
      })
    );

    if (activeHighlight && activeHighlight.id === eventId) {
      setActiveHighlight({ ...activeHighlight, decision });
    }
  };

  const createNewMatch = (matchData: Omit<Match, 'id' | 'status' | 'connectedDevicesCount' | 'highlightCount'>): Match => {
    const codeDigits = Math.floor(1000 + Math.random() * 9000);
    const newMatch: Match = {
      ...matchData,
      id: `m_${Date.now()}`,
      status: 'upcoming',
      connectedDevicesCount: 1,
      highlightCount: 0,
      code: `PV-${codeDigits}`,
    };
    const saved = storageManager.saveMatch(newMatch);
    setMatches([...storageManager.getMatches()]);
    setActiveMatch(saved);
    return saved;
  };

  const joinMatchByCode = (code: string): Match | undefined => {
    const match = matches.find((m) => m.code?.toUpperCase() === code.trim().toUpperCase());
    if (match) {
      match.connectedDevicesCount += 1;
      storageManager.saveMatch(match);
      setMatches([...storageManager.getMatches()]);
      setActiveMatch(match);
    }
    return match;
  };

  const deleteHighlightClip = (id: string) => {
    storageManager.deleteHighlight(id);
    setHighlights([...storageManager.getHighlights()]);
  };

  const login = (email: string) => {
    const updatedUser = storageManager.updateUser({ email, name: email.split('@')[0] });
    setUser(updatedUser);
    setIsAuthenticated(true);
    setCurrentScreen('Home');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('Auth');
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        matches,
        activeMatch,
        setActiveMatch,
        highlights,
        activeHighlight,
        setActiveHighlight,
        user,
        settings,
        updateSettings,
        isRecording,
        recordingMode,
        elapsedSeconds,
        startRecording,
        stopRecording,
        triggerEventFlag,
        activeAnnotations,
        addAnnotation,
        clearAnnotations,
        saveDecision,
        createNewMatch,
        joinMatchByCode,
        deleteHighlightClip,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
