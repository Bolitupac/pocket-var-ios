// Storage Manager Service for local match and clip state
import { Match, HighlightEvent, User, RecordingSettings } from '../types';
import { initialMatches, initialHighlights } from '../utils/mockData';

class StorageManager {
  private matches: Match[] = [...initialMatches];
  private highlights: HighlightEvent[] = [...initialHighlights];
  private currentUser: User = {
    id: 'user_1',
    name: 'Coach Marcus',
    email: 'marcus@grassrootsfc.com',
    role: 'referee',
  };
  private userSettings: RecordingSettings = {
    mode: 'OPTIMIZED_BUFFER',
    bufferBeforeSeconds: 20,
    bufferAfterSeconds: 20,
    quality: '1080p',
    autoUpload: true,
    gridOverlayEnabled: true,
    audioEnabled: true,
  };

  public getMatches(): Match[] {
    return this.matches;
  }

  public getMatchById(id: string): Match | undefined {
    return this.matches.find((m) => m.id === id);
  }

  public saveMatch(match: Match): Match {
    const existingIndex = this.matches.findIndex((m) => m.id === match.id);
    if (existingIndex >= 0) {
      this.matches[existingIndex] = match;
    } else {
      this.matches.unshift(match);
    }
    return match;
  }

  public getHighlights(matchId?: string): HighlightEvent[] {
    if (matchId) {
      return this.highlights.filter((h) => h.matchId === matchId);
    }
    return this.highlights;
  }

  public addHighlight(event: HighlightEvent): HighlightEvent {
    this.highlights.unshift(event);
    const match = this.getMatchById(event.matchId);
    if (match) {
      match.highlightCount = (match.highlightCount || 0) + 1;
      this.saveMatch(match);
    }
    return event;
  }

  public deleteHighlight(id: string) {
    this.highlights = this.highlights.filter((h) => h.id !== id);
  }

  public getUser(): User {
    return this.currentUser;
  }

  public updateUser(userData: Partial<User>): User {
    this.currentUser = { ...this.currentUser, ...userData };
    return this.currentUser;
  }

  public getSettings(): RecordingSettings {
    return this.userSettings;
  }

  public updateSettings(settings: Partial<RecordingSettings>): RecordingSettings {
    this.userSettings = { ...this.userSettings, ...settings };
    return this.userSettings;
  }
}

export const storageManager = new StorageManager();
