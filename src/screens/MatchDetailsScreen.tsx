import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/common/Header';
import { Button } from '../components/common/Button';
import { Colors, Spacing, BorderRadii, Typography } from '../constants/theme';
import { useApp } from '../store/AppContext';

export const MatchDetailsScreen: React.FC = () => {
  const { activeMatch, setCurrentScreen, startRecording, highlights } = useApp();

  if (!activeMatch) {
    return (
      <View style={styles.container}>
        <Header title="Match Dashboard" onBack={() => setCurrentScreen('Home')} />
        <View style={styles.emptyContent}>
          <Text style={styles.emptyText}>No match selected</Text>
          <Button title="GO TO HOME" onPress={() => setCurrentScreen('Home')} variant="primary" />
        </View>
      </View>
    );
  }

  const matchHighlights = highlights.filter((h) => h.matchId === activeMatch.id);

  return (
    <View style={styles.container}>
      <Header
        title={activeMatch.title}
        subtitle={`${activeMatch.sport} • ${activeMatch.venue}`}
        onBack={() => setCurrentScreen('Home')}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Match Header Scoreboard Card */}
        <View style={styles.scoreCard}>
          <View style={styles.scoreHeader}>
            <Text style={styles.matchDate}>{activeMatch.date}</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{activeMatch.status.toUpperCase()}</Text>
            </View>
          </View>

          <View style={styles.teamsRow}>
            <View style={styles.teamCol}>
              <Text style={styles.teamTitle}>{activeMatch.homeTeam}</Text>
              <Text style={styles.teamSub}>HOME TEAM</Text>
            </View>
            <View style={styles.scoreBox}>
              <Text style={styles.scoreText}>
                {activeMatch.homeScore ?? 0} - {activeMatch.awayScore ?? 0}
              </Text>
            </View>
            <View style={[styles.teamCol, { alignItems: 'flex-end' }]}>
              <Text style={styles.teamTitle}>{activeMatch.awayTeam}</Text>
              <Text style={styles.teamSub}>AWAY TEAM</Text>
            </View>
          </View>
        </View>

        {/* Connected Camera Devices */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SYNCHRONIZED CAMERA DEVICES ({activeMatch.connectedDevicesCount})</Text>
          <View style={styles.devicesList}>
            <View style={styles.deviceItem}>
              <Ionicons name="phone-portrait-outline" size={20} color={Colors.primary} />
              <View style={styles.deviceInfo}>
                <Text style={styles.deviceName}>iPhone 15 Pro (Primary Stand)</Text>
                <Text style={styles.deviceSub}>Main High Tactical Cam • 1080p 60fps</Text>
              </View>
              <View style={styles.activePill}>
                <Text style={styles.activePillText}>CONNECTED</Text>
              </View>
            </View>

            <View style={styles.deviceItem}>
              <Ionicons name="phone-portrait-outline" size={20} color={Colors.primary} />
              <View style={styles.deviceInfo}>
                <Text style={styles.deviceName}>iPhone 14 (Behind North Goal)</Text>
                <Text style={styles.deviceSub}>Goal Line Cam • 1080p 60fps</Text>
              </View>
              <View style={styles.activePill}>
                <Text style={styles.activePillText}>CONNECTED</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.addDeviceBtn} onPress={() => setCurrentScreen('JoinMatch')}>
              <Ionicons name="add-circle-outline" size={20} color={Colors.primary} />
              <Text style={styles.addDeviceText}>PAIR ADDITIONAL SMARTPHONE ANGLE</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Highlights Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>MATCH HIGHLIGHTS ({matchHighlights.length})</Text>
          <Button
            title={`VIEW ${matchHighlights.length} RECORDED HIGHLIGHTS`}
            onPress={() => setCurrentScreen('Timeline')}
            variant="glass"
          />
        </View>

        {/* Primary Action Button */}
        <View style={styles.footerActions}>
          <Button
            title="LAUNCH CAMERA & RECORDING"
            onPress={() => {
              startRecording(activeMatch);
              setCurrentScreen('CameraView');
            }}
            variant="primary"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  emptyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  emptyText: {
    ...Typography.bodyLg,
    color: Colors.mutedText,
    marginBottom: Spacing.md,
  },
  scoreCard: {
    backgroundColor: Colors.surfaceLow,
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
    borderRadius: BorderRadii.md,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  matchDate: {
    ...Typography.caption,
    color: Colors.mutedText,
  },
  statusBadge: {
    backgroundColor: 'rgba(195, 244, 0, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadii.xs,
  },
  statusText: {
    ...Typography.caption,
    fontSize: 9,
    fontWeight: '800',
    color: Colors.primary,
  },
  teamsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teamCol: {
    flex: 1,
  },
  teamTitle: {
    ...Typography.headlineMd,
    fontSize: 16,
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
    fontSize: 24,
    color: Colors.primary,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.caption,
    fontSize: 10,
    fontWeight: '800',
    color: Colors.mutedText,
    marginBottom: Spacing.xs,
  },
  devicesList: {
    gap: Spacing.xs,
  },
  deviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceLow,
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
    borderRadius: BorderRadii.md,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    ...Typography.bodyMd,
    fontWeight: '700',
    color: Colors.onBackground,
  },
  deviceSub: {
    ...Typography.caption,
    color: Colors.mutedText,
  },
  activePill: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadii.xs,
  },
  activePillText: {
    fontSize: 8,
    fontWeight: '800',
    color: Colors.successGreen,
  },
  addDeviceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.surfaceContainer,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    borderRadius: BorderRadii.md,
    paddingVertical: 12,
  },
  addDeviceText: {
    ...Typography.caption,
    fontSize: 10,
    fontWeight: '800',
    color: Colors.primary,
  },
  footerActions: {
    marginTop: Spacing.md,
  },
});
