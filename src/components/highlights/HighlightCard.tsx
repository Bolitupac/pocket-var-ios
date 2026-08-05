import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HighlightEvent } from '../../types';
import { Colors, BorderRadii, Typography, Spacing } from '../../constants/theme';
import { EVENT_CATEGORIES } from '../../constants/events';

interface HighlightCardProps {
  event: HighlightEvent;
  onPlay: (event: HighlightEvent) => void;
  onOpenMultiAngle?: (event: HighlightEvent) => void;
  onDelete?: (id: string) => void;
}

export const HighlightCard: React.FC<HighlightCardProps> = ({
  event,
  onPlay,
  onOpenMultiAngle,
  onDelete,
}) => {
  const categoryInfo = EVENT_CATEGORIES.find((c) => c.id === event.type) || EVENT_CATEGORIES[0];

  const handleShare = () => {
    Alert.alert('Share Highlight', `Sharing ${event.type} clip at ${event.timestamp}`);
  };

  const handleExport = () => {
    Alert.alert('Export Clip', `Exporting 1080p MP4 clip for ${event.tag}`);
  };

  return (
    <View style={styles.card}>
      {/* Thumbnail + Overlay Badge */}
      <TouchableOpacity style={styles.thumbWrapper} onPress={() => onPlay(event)} activeOpacity={0.8}>
        <Image source={{ uri: event.thumbnailUrl }} style={styles.thumbnail} />
        <View style={styles.playOverlay}>
          <Ionicons name="play-circle" size={36} color="rgba(255, 255, 255, 0.9)" />
        </View>
        <View style={styles.timeTag}>
          <Text style={styles.timeText}>{event.timestamp}</Text>
        </View>
      </TouchableOpacity>

      {/* Info & Metadata */}
      <View style={styles.infoWrapper}>
        <View style={styles.typeRow}>
          <View style={[styles.typeBadge, { borderColor: categoryInfo.color }]}>
            <Text style={styles.typeEmoji}>{categoryInfo.emoji}</Text>
            <Text style={[styles.typeLabel, { color: categoryInfo.color }]}>{event.type}</Text>
          </View>
          {event.decision && (
            <View style={styles.decisionBadge}>
              <Ionicons name="checkmark-circle" size={12} color={Colors.primary} />
              <Text style={styles.decisionText}>{event.decision.verdict}</Text>
            </View>
          )}
        </View>

        <Text style={styles.tagTitle} numberOfLines={1}>
          {event.tag}
        </Text>

        <Text style={styles.anglesText}>
          🎥 {event.cameraAngles.length} Angle{event.cameraAngles.length > 1 ? 's' : ''} captured
        </Text>

        {/* Action Buttons Row */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionBtn} onPress={() => onPlay(event)}>
            <Ionicons name="play" size={14} color={Colors.primary} />
            <Text style={styles.actionText}>Review</Text>
          </TouchableOpacity>

          {onOpenMultiAngle && (
            <TouchableOpacity style={styles.actionBtn} onPress={() => onOpenMultiAngle(event)}>
              <Ionicons name="film" size={14} color={Colors.onBackground} />
              <Text style={styles.actionText}>4-Angle</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.actionBtn} onPress={handleExport}>
            <Ionicons name="download-outline" size={14} color={Colors.onBackground} />
            <Text style={styles.actionText}>Export</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn} onPress={handleShare}>
            <Ionicons name="share-social-outline" size={14} color={Colors.onBackground} />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>

          {onDelete && (
            <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(event.id)}>
              <Ionicons name="trash-outline" size={14} color={Colors.liveRed} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surfaceLow,
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
    borderRadius: BorderRadii.md,
    padding: Spacing.sm,
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  thumbWrapper: {
    width: 110,
    height: 95,
    borderRadius: BorderRadii.sm,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#000',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeTag: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 2,
  },
  timeText: {
    ...Typography.monoData,
    fontSize: 9,
    color: Colors.primary,
  },
  infoWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  typeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    flexWrap: 'wrap',
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadii.xs,
    backgroundColor: Colors.surfaceContainer,
  },
  typeEmoji: {
    fontSize: 10,
  },
  typeLabel: {
    ...Typography.caption,
    fontSize: 10,
    fontWeight: '800',
  },
  decisionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: 'rgba(195, 244, 0, 0.15)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: BorderRadii.xs,
  },
  decisionText: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.primary,
  },
  tagTitle: {
    ...Typography.bodyLg,
    fontSize: 13,
    fontWeight: '700',
    color: Colors.onBackground,
  },
  anglesText: {
    ...Typography.caption,
    fontSize: 10,
    color: Colors.mutedText,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: Colors.surfaceContainer,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: BorderRadii.xs,
  },
  actionText: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.onBackground,
  },
  deleteBtn: {
    padding: 4,
  },
});
