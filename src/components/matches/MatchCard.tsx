import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Match } from '../../types';
import { Colors, BorderRadii, Typography, Spacing } from '../../constants/theme';

interface MatchCardProps {
  match: Match;
  onPress: (match: Match) => void;
  onOpenHighlights: (match: Match) => void;
  onStartRecord: (match: Match) => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({
  match,
  onPress,
  onOpenHighlights,
  onStartRecord,
}) => {
  const isLive = match.status === 'live';

  return (
    <View style={[styles.card, isLive && styles.liveCard]}>
      {/* Top Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.sportBadge}>
          <Ionicons name="football" size={12} color={Colors.primary} />
          <Text style={styles.sportText}>{match.sport}</Text>
        </View>

        {isLive ? (
          <View style={styles.liveBadge}>
            <View style={styles.livePip} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        ) : (
          <Text style={styles.dateText}>{match.date}</Text>
        )}
      </View>

      {/* Main Teams Scoreboard */}
      <TouchableOpacity onPress={() => onPress(match)} activeOpacity={0.8} style={styles.teamsRow}>
        <View style={styles.teamCol}>
          <Text style={styles.teamName} numberOfLines={1}>
            {match.homeTeam}
          </Text>
          <Text style={styles.teamSub}>HOME</Text>
        </View>

        <View style={styles.scoreBox}>
          {match.homeScore !== undefined ? (
            <Text style={styles.scoreText}>
              {match.homeScore} - {match.awayScore}
            </Text>
          ) : (
            <Text style={styles.vsText}>VS</Text>
          )}
        </View>

        <View style={[styles.teamCol, { alignItems: 'flex-end' }]}>
          <Text style={styles.teamName} numberOfLines={1}>
            {match.awayTeam}
          </Text>
          <Text style={styles.teamSub}>AWAY</Text>
        </View>
      </TouchableOpacity>

      {/* Venue & Metadata */}
      <View style={styles.metaRow}>
        <Text style={styles.venueText}>📍 {match.venue}</Text>
        <Text style={styles.deviceText}>📱 {match.connectedDevicesCount} Cams Connected</Text>
      </View>

      {/* Bottom Action Footer */}
      <View style={styles.footerRow}>
        <TouchableOpacity
          style={styles.highlightsBtn}
          onPress={() => onOpenHighlights(match)}
          activeOpacity={0.8}
        >
          <Ionicons name="star" size={14} color={Colors.primary} />
          <Text style={styles.highlightsText}>
            {match.highlightCount} Highlight{match.highlightCount === 1 ? '' : 's'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.recordActionBtn}
          onPress={() => onStartRecord(match)}
          activeOpacity={0.8}
        >
          <Ionicons name="videocam" size={14} color={Colors.onPrimary} />
          <Text style={styles.recordActionText}>
            {isLive ? 'RESUME CAM' : 'RECORD'}
          </Text>
        </TouchableOpacity>
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
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  liveCard: {
    borderColor: Colors.primary,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  sportBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.surfaceContainer,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadii.xs,
  },
  sportText: {
    ...Typography.caption,
    fontSize: 10,
    fontWeight: '700',
    color: Colors.onBackground,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadii.xs,
    borderWidth: 1,
    borderColor: Colors.liveRed,
  },
  livePip: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.liveRed,
  },
  liveText: {
    ...Typography.caption,
    fontSize: 10,
    fontWeight: '900',
    color: Colors.liveRed,
  },
  dateText: {
    ...Typography.caption,
    color: Colors.mutedText,
  },
  teamsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: Spacing.xs,
  },
  teamCol: {
    flex: 1,
  },
  teamName: {
    ...Typography.bodyLg,
    fontWeight: '800',
    color: Colors.onBackground,
  },
  teamSub: {
    ...Typography.caption,
    fontSize: 9,
    color: Colors.mutedText,
  },
  scoreBox: {
    paddingHorizontal: Spacing.md,
  },
  scoreText: {
    ...Typography.monoData,
    fontSize: 18,
    color: Colors.primary,
  },
  vsText: {
    ...Typography.caption,
    fontWeight: '800',
    color: Colors.mutedText,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceHigh,
    paddingTop: Spacing.xs,
  },
  venueText: {
    ...Typography.caption,
    fontSize: 11,
    color: Colors.mutedText,
  },
  deviceText: {
    ...Typography.caption,
    fontSize: 11,
    color: Colors.mutedText,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  highlightsBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: Colors.surfaceContainer,
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
    paddingVertical: 8,
    borderRadius: BorderRadii.xs,
  },
  highlightsText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.onBackground,
  },
  recordActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    borderRadius: BorderRadii.xs,
  },
  recordActionText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.onPrimary,
  },
});
