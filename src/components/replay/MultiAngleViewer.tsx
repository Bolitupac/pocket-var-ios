import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadii, Typography, Spacing } from '../../constants/theme';

interface CameraAngle {
  id: string;
  name: string;
  thumbnailUrl: string;
}

interface MultiAngleViewerProps {
  angles?: CameraAngle[];
  activeEventTag?: string;
  timestamp?: string;
}

const DEFAULT_ANGLES: CameraAngle[] = [
  { id: 'cam1', name: 'Main Stand (Cam 1)', thumbnailUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=500' },
  { id: 'cam2', name: 'Behind North Goal (Cam 2)', thumbnailUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500' },
  { id: 'cam3', name: 'Left Wing (Cam 3)', thumbnailUrl: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=500' },
  { id: 'cam4', name: 'Tactical High View (Cam 4)', thumbnailUrl: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=500' },
];

export const MultiAngleViewer: React.FC<MultiAngleViewerProps> = ({
  angles = DEFAULT_ANGLES,
  activeEventTag = 'INCIDENT REVIEW',
  timestamp = '42:15',
}) => {
  const [mainAngleIndex, setMainAngleIndex] = useState<number>(0);
  const mainAngle = angles[mainAngleIndex] || angles[0];
  const sideAngles = angles.filter((_, idx) => idx !== mainAngleIndex);

  return (
    <View style={styles.container}>
      {/* Large Main Video Feed */}
      <View style={styles.mainFeed}>
        <Image source={{ uri: mainAngle.thumbnailUrl }} style={styles.mainVideoImage} />
        
        {/* Top HUD overlay inside video */}
        <View style={styles.feedHudTop}>
          <View style={styles.angleTag}>
            <View style={styles.recPip} />
            <Text style={styles.angleTagText}>{mainAngle.name}</Text>
          </View>
          <View style={styles.timestampTag}>
            <Text style={styles.timestampText}>{timestamp}</Text>
          </View>
        </View>

        {/* Play Overlay Placeholder */}
        <View style={styles.centerPlayIcon}>
          <Ionicons name="play-circle" size={54} color="rgba(255, 255, 255, 0.85)" />
        </View>
      </View>

      {/* 3 Stacked Camera Thumbnails */}
      <View style={styles.sideStack}>
        {sideAngles.map((angle) => {
          const originalIndex = angles.findIndex((a) => a.id === angle.id);
          return (
            <TouchableOpacity
              key={angle.id}
              style={styles.thumbCard}
              onPress={() => setMainAngleIndex(originalIndex)}
              activeOpacity={0.8}
            >
              <Image source={{ uri: angle.thumbnailUrl }} style={styles.thumbImage} />
              <View style={styles.thumbBadge}>
                <Text style={styles.thumbText} numberOfLines={1}>
                  {angle.name.split(' ')[0]}
                </Text>
              </View>
              <View style={styles.swapIconOverlay}>
                <Ionicons name="swap-horizontal" size={14} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 220,
    backgroundColor: Colors.background,
    gap: Spacing.xs,
    padding: Spacing.xs,
  },
  mainFeed: {
    flex: 1,
    borderRadius: BorderRadii.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.glassActiveBorder,
    position: 'relative',
  },
  mainVideoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  feedHudTop: {
    position: 'absolute',
    top: Spacing.xs,
    left: Spacing.xs,
    right: Spacing.xs,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  angleTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: Spacing.xs + 2,
    paddingVertical: 3,
    borderRadius: BorderRadii.xs,
  },
  recPip: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginRight: 4,
  },
  angleTagText: {
    ...Typography.caption,
    fontSize: 10,
    color: Colors.onBackground,
  },
  timestampTag: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: Spacing.xs + 2,
    paddingVertical: 3,
    borderRadius: BorderRadii.xs,
  },
  timestampText: {
    ...Typography.monoData,
    fontSize: 11,
    color: Colors.primary,
  },
  centerPlayIcon: {
    position: 'absolute',
    top: '35%',
    left: '42%',
  },
  sideStack: {
    width: 90,
    justifyContent: 'space-between',
    gap: Spacing.xs,
  },
  thumbCard: {
    flex: 1,
    borderRadius: BorderRadii.xs,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
    position: 'relative',
  },
  thumbImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  thumbBadge: {
    position: 'absolute',
    bottom: 2,
    left: 2,
    right: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 2,
    paddingVertical: 1,
    borderRadius: 2,
  },
  thumbText: {
    color: Colors.onBackground,
    fontSize: 8,
    fontWeight: '700',
    textAlign: 'center',
  },
  swapIconOverlay: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 2,
    borderRadius: 8,
  },
});
