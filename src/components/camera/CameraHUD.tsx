import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, BorderRadii, Typography } from '../../constants/theme';
import { CircularHUDButton } from './CircularHUDButton';
import { GlassEventFlagButton } from './GlassEventFlagButton';

interface CameraHUDProps {
  matchTitle: string;
  isRecording: boolean;
  elapsedSeconds: number;
  mode: 'FULL_MATCH' | 'OPTIMIZED_BUFFER';
  flashOn: boolean;
  onToggleFlash: () => void;
  onToggleCamera: () => void;
  onOpenEventSelector: () => void;
  onExit: () => void;
}

export const CameraHUD: React.FC<CameraHUDProps> = ({
  matchTitle,
  isRecording,
  elapsedSeconds,
  mode,
  flashOn,
  onToggleFlash,
  onToggleCamera,
  onOpenEventSelector,
  onExit,
}) => {
  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      {/* Top Bar Controls */}
      <View style={styles.topRow}>
        <CircularHUDButton onPress={onExit} iconName="arrow-back" />

        <GlassEventFlagButton onPress={onOpenEventSelector} />

        <View style={styles.rightIcons}>
          <CircularHUDButton
            onPress={onToggleFlash}
            iconName={flashOn ? 'flash' : 'flash-off'}
            color={flashOn ? Colors.warningGold : Colors.onBackground}
          />
          <CircularHUDButton onPress={onToggleCamera} iconName="camera-reverse" />
        </View>
      </View>

      {/* Center Match Info & Timer */}
      <View style={styles.infoRow}>
        <View style={styles.matchBadge}>
          <Text style={styles.matchTitleText} numberOfLines={1}>
            {matchTitle}
          </Text>
        </View>

        <View style={styles.timerBadge}>
          <View style={[styles.redDot, isRecording && styles.redDotActive]} />
          <Text style={styles.timerText}>{formatTime(elapsedSeconds)}</Text>
        </View>

        <View style={styles.modeBadge}>
          <Text style={styles.modeText}>
            {mode === 'OPTIMIZED_BUFFER' ? 'BUFFER 60S' : 'FULL MATCH'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    right: Spacing.md,
    zIndex: 20,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  rightIcons: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
  },
  matchBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadii.xs,
    maxWidth: 140,
  },
  matchTitleText: {
    color: Colors.onBackground,
    fontSize: 11,
    fontWeight: '600',
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadii.xs,
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#666',
    marginRight: 6,
  },
  redDotActive: {
    backgroundColor: Colors.liveRed,
  },
  timerText: {
    ...Typography.monoData,
    color: Colors.onBackground,
    fontSize: 12,
  },
  modeBadge: {
    backgroundColor: 'rgba(195, 244, 0, 0.15)',
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingHorizontal: Spacing.xs + 2,
    paddingVertical: 4,
    borderRadius: BorderRadii.xs,
  },
  modeText: {
    ...Typography.caption,
    color: Colors.primary,
    fontSize: 9,
    fontWeight: '800',
  },
});
