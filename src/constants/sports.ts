import { SportType, VideoQuality } from '../types';

export interface SportOption {
  id: SportType;
  label: string;
  icon: string;
  defaultDuration: number;
}

export const SPORTS_OPTIONS: SportOption[] = [
  { id: 'Football', label: 'Football / Soccer', icon: 'soccer', defaultDuration: 90 },
  { id: 'Basketball', label: 'Basketball', icon: 'basketball', defaultDuration: 48 },
  { id: 'Tennis', label: 'Tennis', icon: 'tennis-ball', defaultDuration: 120 },
  { id: 'Rugby', label: 'Rugby', icon: 'rugby', defaultDuration: 80 },
  { id: 'Hockey', label: 'Hockey', icon: 'hockey-puck', defaultDuration: 60 },
  { id: 'Volleyball', label: 'Volleyball', icon: 'volleyball', defaultDuration: 75 },
  { id: 'Other', label: 'Other Sports', icon: 'trophy-outline', defaultDuration: 60 },
];

export const BUFFER_PRESETS = [20, 30, 40];

export const QUALITY_OPTIONS: VideoQuality[] = ['720p', '1080p', '4K'];
