import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadii, Typography } from '../constants/theme';
import { useApp } from '../store/AppContext';
import { MatchCard } from '../components/matches/MatchCard';
import { BottomSheet } from '../components/common/BottomSheet';
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

  const [bottomSheetVisible, setBottomSheetVisible] = useState<boolean>(false);

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

  const quickActions = [
    {
      id: 'create_match',
      title: 'Create Match',
      subtitle: 'Set up teams, venue, and recording mode',
      icon: 'add-circle-outline' as const,
      color: Colors.primary,
      onPress: () => setCurrentScreen('CreateMatch'),
    },
    {
      id: 'join_match',
      title: 'Join Match as 2nd Camera',
      subtitle: 'Connect smartphone angle using match code',
      icon: 'qr-code-outline' as const,
      onPress: () => setCurrentScreen('JoinMatch'),
    },
    {
      id: 'continue_match',
      title: 'Continue Active Match',
      subtitle: 'Resume live recording or review feed',
      icon: 'play-circle-outline' as const,
      onPress: () => {
        if (matches.length > 0) {
          handleStartRecord(matches[0]);
        } else {
          setCurrentScreen('CreateMatch');
        }
      },
    },
  ];

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

      {/* Floating Bottom Navigation Bar */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navTab} onPress={() => setCurrentScreen('Home')}>
            <Ionicons name="home-outline" size={22} color={Colors.primary} />
            <Text style={[styles.navText, { color: Colors.primary }]}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navTab} onPress={() => setCurrentScreen('Notifications')}>
            <Ionicons name="notifications-outline" size={22} color={Colors.mutedText} />
            <Text style={styles.navText}>Alerts</Text>
          </TouchableOpacity>

          {/* Large Floating Center Plus Button */}
          <TouchableOpacity
            style={styles.floatingPlusBtn}
            onPress={() => setBottomSheetVisible(true)}
            activeOpacity={0.85}
          >
            <Ionicons name="add" size={32} color={Colors.onPrimary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navTab} onPress={() => setCurrentScreen('Timeline')}>
            <Ionicons name="film-outline" size={22} color={Colors.mutedText} />
            <Text style={styles.navText}>Highlights</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navTab} onPress={() => setCurrentScreen('Settings')}>
            <Ionicons name="settings-outline" size={22} color={Colors.mutedText} />
            <Text style={styles.navText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Plus Button Bottom Sheet Action Menu */}
      <BottomSheet
        visible={bottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
        actions={quickActions}
        title="Pocket VAR Menu"
      />
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
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceHigh,
  },
  bottomNav: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'relative',
    paddingHorizontal: Spacing.xs,
  },
  navTab: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 54,
  },
  navText: {
    ...Typography.caption,
    fontSize: 9,
    color: Colors.mutedText,
    marginTop: 2,
  },
  floatingPlusBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    top: -18,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    borderWidth: 3,
    borderColor: Colors.background,
  },
});
