import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadii, Typography } from '../constants/theme';
import { useApp } from '../store/AppContext';
import { MatchCard } from '../components/matches/MatchCard';
import { Match } from '../types';

export const HomeScreen: React.FC = () => {
  const {
    matches,
    setCurrentScreen,
    setActiveMatch,
    startRecording,
    highlights,
    user,
  } = useApp();

  const handleSelectMatch = (match: Match) => {
    setActiveMatch(match);
    setCurrentScreen('MatchDetails');
  };

  const handleOpenHighlights = (match: Match) => {
    setActiveMatch(match);
    setCurrentScreen('Timeline');
  };

  const handleStartRecord = (match: Match) => {
    startRecording(match);
    setCurrentScreen('CameraView');
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.brandGroup}>
          <View style={styles.logoPip}>
            <Ionicons name="videocam" size={18} color={Colors.onPrimary} />
          </View>
          <View>
            <Text style={styles.appTitle}>POCKET VAR</Text>
            <Text style={styles.appSubtitle}>Grassroots Football Technology</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.profileBtn} onPress={() => setCurrentScreen('UserProfile')}>
          <Ionicons name="person-circle-outline" size={28} color={Colors.onBackground} />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Quick Stats Bar */}
        <View style={styles.statsBar}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{matches.length}</Text>
            <Text style={styles.statLabel}>MATCHES</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{highlights.length}</Text>
            <Text style={styles.statLabel}>HIGHLIGHTS</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>CAMS SYNCED</Text>
          </View>
        </View>

        {/* Section Header */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>RECENT MATCHES</Text>
          <TouchableOpacity onPress={() => setCurrentScreen('CreateMatch')}>
            <Text style={styles.newMatchLink}>+ NEW MATCH</Text>
          </TouchableOpacity>
        </View>

        {/* Matches List */}
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            onPress={handleSelectMatch}
            onOpenHighlights={handleOpenHighlights}
            onStartRecord={handleStartRecord}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    height: 64,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceHigh,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
  },
  brandGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  logoPip: {
    width: 34,
    height: 34,
    borderRadius: BorderRadii.xs,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appTitle: {
    ...Typography.headlineMd,
    fontSize: 16,
    color: Colors.onBackground,
    letterSpacing: 0.5,
  },
  appSubtitle: {
    ...Typography.caption,
    fontSize: 9,
    color: Colors.mutedText,
  },
  profileBtn: {
    padding: Spacing.xs,
  },
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: 110,
  },
  statsBar: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceLow,
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
    borderRadius: BorderRadii.md,
    padding: Spacing.md,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    ...Typography.monoData,
    fontSize: 20,
    color: Colors.primary,
  },
  statLabel: {
    ...Typography.caption,
    fontSize: 9,
    color: Colors.mutedText,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: Colors.surfaceHigh,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    ...Typography.caption,
    fontSize: 11,
    fontWeight: '800',
    color: Colors.mutedText,
    letterSpacing: 0.8,
  },
  newMatchLink: {
    ...Typography.caption,
    fontSize: 11,
    fontWeight: '800',
    color: Colors.primary,
  },
});
