import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadii, Typography } from '../constants/theme';
import { useApp } from '../store/AppContext';
import { MatchCard } from '../components/matches/MatchCard';
import { BottomSheet } from '../components/common/BottomSheet';
import { Match } from '../types';

type TabId = 'Home' | 'Notifications' | 'Camera' | 'Timeline' | 'Settings';

const liquidGlassAvailable = isLiquidGlassAvailable();

export const HomeScreen: React.FC = () => {
  const {
    matches,
    setCurrentScreen,
    setActiveMatch,
    startRecording,
    highlights,
  } = useApp();

  const insets = useSafeAreaInsets();
  const [bottomSheetVisible, setBottomSheetVisible] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabId>('Home');

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

  const navigateTo = useCallback((screen: any, tab: TabId) => {
    setActiveTab(tab);
    setCurrentScreen(screen);
  }, [setCurrentScreen]);

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

  const tabs: { id: TabId; icon: keyof typeof Ionicons.glyphMap; label: string; screen: any }[] = [
    { id: 'Home', icon: 'home-outline', label: 'Home', screen: 'Home' },
    { id: 'Notifications', icon: 'notifications-outline', label: 'Alerts', screen: 'Notifications' },
    { id: 'Camera', icon: 'add-circle-outline', label: '', screen: null },
    { id: 'Timeline', icon: 'film-outline', label: 'Highlights', screen: 'Timeline' },
    { id: 'Settings', icon: 'settings-outline', label: 'Settings', screen: 'Settings' },
  ];

  const TAB_BAR_CONTENT_HEIGHT = 44;

  return (
    <View style={styles.container}>
      {/* Liquid Glass Header */}
      <BlurView tint="systemChromeMaterialDark" intensity={100} style={[styles.header, { paddingTop: insets.top + Spacing.xs }]}>
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
      </BlurView>

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: TAB_BAR_CONTENT_HEIGHT + insets.bottom + Spacing.xl },
        ]}
      >
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

      {/* WhatsApp-Style Liquid Glass Tab Bar */}
      <View style={[styles.tabBarWrapper, { height: TAB_BAR_CONTENT_HEIGHT + insets.bottom }]}>
        <BlurView tint="systemThickMaterialDark" intensity={100} style={StyleSheet.absoluteFill}>
          <View style={[styles.tabBar, { paddingBottom: insets.bottom }]}>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const tabContent = (
                <View style={styles.tabInner}>
                  <Ionicons
                    name={tab.icon}
                    size={22}
                    color={isActive ? Colors.primary : Colors.mutedText}
                  />
                  {tab.label !== '' && (
                    <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                      {tab.label}
                    </Text>
                  )}
                </View>
              );

              return (
                <TouchableOpacity
                  key={tab.id}
                  style={styles.tabItem}
                  onPress={() => {
                    if (tab.id === 'Camera') {
                      setBottomSheetVisible(true);
                    } else {
                      navigateTo(tab.screen, tab.id);
                    }
                  }}
                  activeOpacity={0.7}
                >
                  {isActive ? (
                    liquidGlassAvailable ? (
                      <GlassView
                        glassEffectStyle="regular"
                        colorScheme="dark"
                        style={styles.activePill}
                      >
                        {tabContent}
                      </GlassView>
                    ) : (
                      <BlurView tint="systemMaterialDark" intensity={80} style={styles.activePill}>
                        {tabContent}
                      </BlurView>
                    )
                  ) : (
                    tabContent
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </BlurView>
      </View>

      {/* Quick Actions Bottom Sheet */}
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
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
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
  // Scroll Content
  scrollContent: {
    padding: Spacing.md,
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
  // Tab Bar
  tabBarWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
  tabBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 2,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  tabInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activePill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: BorderRadii.pill,
    overflow: 'hidden',
  },
  tabLabel: {
    ...Typography.caption,
    fontSize: 9,
    color: Colors.mutedText,
    marginTop: 1,
  },
  tabLabelActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
});
