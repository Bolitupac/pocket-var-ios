import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadii, Typography, Spacing } from '../../constants/theme';

interface TimelineScrubberProps {
  durationSeconds?: number;
  onSeek?: (seconds: number) => void;
}

export const TimelineScrubber: React.FC<TimelineScrubberProps> = ({
  durationSeconds = 60,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSec, setCurrentSec] = useState<number>(20);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [loopSec, setLoopSec] = useState<number | null>(10);

  const speedOptions = [0.25, 0.5, 1.0];
  const loopOptions = [5, 10, 20];

  const handleStepBack = () => {
    setCurrentSec((prev) => Math.max(0, prev - 1));
  };

  const handleStepForward = () => {
    setCurrentSec((prev) => Math.min(durationSeconds, prev + 1));
  };

  const formatSec = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      {/* Timeline Track */}
      <View style={styles.trackContainer}>
        <View style={styles.timeLabelRow}>
          <Text style={styles.timeText}>{formatSec(currentSec)}</Text>
          <Text style={styles.timeText}>{formatSec(durationSeconds)}</Text>
        </View>

        {/* Scrub Bar */}
        <View style={styles.trackBackground}>
          <View style={[styles.trackFilled, { width: `${(currentSec / durationSeconds) * 100}%` }]} />
          {/* Incident Marker Pip */}
          <View style={[styles.incidentMarker, { left: '33%' }]} />
          <View style={[styles.scrubHandle, { left: `${(currentSec / durationSeconds) * 100}%` }]} />
        </View>
      </View>

      {/* Playback Controls & Frame Navigation */}
      <View style={styles.controlsRow}>
        {/* Frame Back */}
        <TouchableOpacity style={styles.controlBtn} onPress={handleStepBack} activeOpacity={0.8}>
          <Ionicons name="play-back" size={18} color={Colors.onBackground} />
          <Text style={styles.btnSubText}>-1 FRAME</Text>
        </TouchableOpacity>

        {/* Play/Pause */}
        <TouchableOpacity
          style={styles.playPauseBtn}
          onPress={() => setIsPlaying(!isPlaying)}
          activeOpacity={0.8}
        >
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color={Colors.onPrimary} />
        </TouchableOpacity>

        {/* Frame Forward */}
        <TouchableOpacity style={styles.controlBtn} onPress={handleStepForward} activeOpacity={0.8}>
          <Ionicons name="play-forward" size={18} color={Colors.onBackground} />
          <Text style={styles.btnSubText}>+1 FRAME</Text>
        </TouchableOpacity>
      </View>

      {/* Speed & Loop Bar */}
      <View style={styles.settingsRow}>
        {/* Slow Motion Selector */}
        <View style={styles.settingGroup}>
          <Text style={styles.groupLabel}>SPEED:</Text>
          <View style={styles.pillsRow}>
            {speedOptions.map((speed) => (
              <TouchableOpacity
                key={speed.toString()}
                style={[styles.pill, playbackSpeed === speed && styles.pillActive]}
                onPress={() => setPlaybackSpeed(speed)}
              >
                <Text style={[styles.pillText, playbackSpeed === speed && styles.pillTextActive]}>
                  {speed}x
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Loop System Selector */}
        <View style={styles.settingGroup}>
          <Text style={styles.groupLabel}>LOOP:</Text>
          <View style={styles.pillsRow}>
            {loopOptions.map((sec) => (
              <TouchableOpacity
                key={sec.toString()}
                style={[styles.pill, loopSec === sec && styles.pillActive]}
                onPress={() => setLoopSec(loopSec === sec ? null : sec)}
              >
                <Text style={[styles.pillText, loopSec === sec && styles.pillTextActive]}>
                  {sec}s
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surfaceLow,
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
    borderRadius: BorderRadii.md,
    padding: Spacing.sm,
    marginVertical: Spacing.xs,
  },
  trackContainer: {
    marginBottom: Spacing.sm,
  },
  timeLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  timeText: {
    ...Typography.monoData,
    fontSize: 11,
    color: Colors.mutedText,
  },
  trackBackground: {
    height: 12,
    backgroundColor: Colors.surfaceHighest,
    borderRadius: 6,
    position: 'relative',
    justifyContent: 'center',
  },
  trackFilled: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 6,
  },
  incidentMarker: {
    position: 'absolute',
    width: 4,
    height: 16,
    top: -2,
    backgroundColor: Colors.secondary,
    borderRadius: 2,
    zIndex: 4,
  },
  scrubHandle: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: Colors.primary,
    marginLeft: -9,
    zIndex: 5,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  controlBtn: {
    alignItems: 'center',
  },
  btnSubText: {
    ...Typography.caption,
    fontSize: 9,
    color: Colors.mutedText,
    marginTop: 2,
  },
  playPauseBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceHigh,
    paddingTop: Spacing.xs,
  },
  settingGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  groupLabel: {
    ...Typography.caption,
    fontSize: 9,
    color: Colors.mutedText,
    fontWeight: '700',
  },
  pillsRow: {
    flexDirection: 'row',
    gap: 4,
  },
  pill: {
    backgroundColor: Colors.surfaceContainer,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadii.xs,
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
  },
  pillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  pillText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.onBackground,
  },
  pillTextActive: {
    color: Colors.onPrimary,
  },
});
