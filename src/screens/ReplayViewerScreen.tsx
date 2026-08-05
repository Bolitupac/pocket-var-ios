import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/common/Header';
import { MultiAngleViewer } from '../components/replay/MultiAngleViewer';
import { TimelineScrubber } from '../components/replay/TimelineScrubber';
import { AnnotationCanvas } from '../components/replay/AnnotationCanvas';
import { DecisionPicker } from '../components/replay/DecisionPicker';
import { Colors, Spacing, BorderRadii, Typography } from '../constants/theme';
import { useApp } from '../store/AppContext';
import { DecisionType } from '../types';

export const ReplayViewerScreen: React.FC = () => {
  const { activeHighlight, saveDecision, setCurrentScreen } = useApp();

  const handleDecision = (verdict: DecisionType, notes: string) => {
    if (activeHighlight) {
      saveDecision(activeHighlight.id, verdict, notes);
      Alert.alert(
        'Decision Saved',
        `Official VAR verdict: "${verdict}" logged for match report.`,
        [
          { text: 'View Highlights', onPress: () => setCurrentScreen('Timeline') },
          { text: 'Back to Camera', onPress: () => setCurrentScreen('CameraView') },
        ]
      );
    }
  };

  const handleExport = () => {
    Alert.alert('Export Multi-Angle Package', 'Creating 4-angle VAR clip export with official overlay graphics...');
  };

  const handleShare = () => {
    Alert.alert('Share VAR Link', 'Generated secure link for team analysts & league referees.');
  };

  const eventTitle = activeHighlight ? activeHighlight.tag : 'Incident Review';
  const eventTime = activeHighlight ? activeHighlight.timestamp : '42:15';

  return (
    <View style={styles.container}>
      <Header
        title={`VAR Review: ${eventTitle}`}
        subtitle={`Match Timestamp: ${eventTime}`}
        onBack={() => setCurrentScreen('CameraView')}
        rightElement={
          <TouchableOpacity style={styles.exportTopBtn} onPress={handleExport}>
            <Ionicons name="download-outline" size={18} color={Colors.primary} />
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Multi-Angle Video Area (1 Main + 3 Stacked Camera Thumbnails) */}
        <MultiAngleViewer
          activeEventTag={eventTitle}
          timestamp={eventTime}
        />

        {/* Video Scrubber & Playback Engine */}
        <TimelineScrubber durationSeconds={60} />

        {/* VAR Annotation Toolbar */}
        <AnnotationCanvas />

        {/* Official Referee Decision System */}
        <DecisionPicker
          currentVerdict={activeHighlight?.decision?.verdict}
          onConfirmDecision={handleDecision}
        />

        {/* Export & Share Row */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionCard} onPress={handleExport} activeOpacity={0.8}>
            <Ionicons name="film-outline" size={20} color={Colors.primary} />
            <Text style={styles.actionCardText}>Export Reel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={handleShare} activeOpacity={0.8}>
            <Ionicons name="share-social-outline" size={20} color={Colors.onBackground} />
            <Text style={styles.actionCardText}>Share Report</Text>
          </TouchableOpacity>
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
    padding: Spacing.xs,
    paddingBottom: Spacing.xl,
  },
  exportTopBtn: {
    padding: Spacing.xs,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  actionCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.surfaceLow,
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
    paddingVertical: 12,
    borderRadius: BorderRadii.md,
  },
  actionCardText: {
    ...Typography.bodyMd,
    fontWeight: '700',
    color: Colors.onBackground,
  },
});
