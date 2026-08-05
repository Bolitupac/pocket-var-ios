import { EventType, DecisionType } from '../types';

export interface EventCategory {
  id: EventType;
  label: string;
  emoji: string;
  color: string;
  iconName: string;
}

export const EVENT_CATEGORIES: EventCategory[] = [
  { id: 'Goal', label: 'Goal', emoji: '⚽', color: '#22C55E', iconName: 'football' },
  { id: 'Possible Goal', label: 'Possible Goal', emoji: '🥅', color: '#EAB308', iconName: 'help-circle' },
  { id: 'Foul', label: 'Foul', emoji: '🚨', color: '#FF5708', iconName: 'alert-circle' },
  { id: 'Offside', label: 'Offside', emoji: '🚩', color: '#3B82F6', iconName: 'flag' },
  { id: 'Red Card', label: 'Red Card', emoji: '🟥', color: '#EF4444', iconName: 'square' },
  { id: 'Yellow Card', label: 'Yellow Card', emoji: '🟨', color: '#F59E0B', iconName: 'square-outline' },
  { id: 'Penalty', label: 'Penalty', emoji: '🎯', color: '#A855F7', iconName: 'disc' },
  { id: 'Interesting Moment', label: 'Highlight', emoji: '⭐', color: '#C3F400', iconName: 'star' },
  { id: 'Dribble', label: 'Dribble / Skill', emoji: '⚡', color: '#06B6D4', iconName: 'flash' },
  { id: 'Custom', label: 'Custom Note', emoji: '📝', color: '#9CA3AF', iconName: 'create' },
];

export interface DecisionOption {
  id: DecisionType;
  label: string;
  color: string;
  icon: string;
}

export const DECISION_OPTIONS: DecisionOption[] = [
  { id: 'Goal', label: 'GOAL CONFIRMED', color: '#22C55E', icon: 'checkmark-circle' },
  { id: 'No Goal', label: 'NO GOAL', color: '#EF4444', icon: 'close-circle' },
  { id: 'Foul', label: 'FOUL COMMITTED', color: '#FF5708', icon: 'warning' },
  { id: 'No Foul', label: 'PLAY ON (NO FOUL)', color: '#3B82F6', icon: 'arrow-forward-circle' },
  { id: 'Offside', label: 'OFFSIDE GIVEN', color: '#F59E0B', icon: 'flag' },
  { id: 'Red Card', label: 'RED CARD DISMISSAL', color: '#EF4444', icon: 'square' },
  { id: 'Yellow Card', label: 'YELLOW CARD CAUTION', color: '#EAB308', icon: 'square-outline' },
  { id: 'Penalty', label: 'PENALTY AWARDED', color: '#A855F7', icon: 'disc' },
  { id: 'Other', label: 'OTHER DECISION', color: '#9CA3AF', icon: 'information-circle' },
];
