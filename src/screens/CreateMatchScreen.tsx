import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/common/Header';
import { Button } from '../components/common/Button';
import { SPORTS_OPTIONS, BUFFER_PRESETS, QUALITY_OPTIONS } from '../constants/sports';
import { SportType, RecordingMode, VideoQuality } from '../types';
import { Colors, Spacing, BorderRadii, Typography } from '../constants/theme';
import { useApp } from '../store/AppContext';

export const CreateMatchScreen: React.FC = () => {
  const { setCurrentScreen, createNewMatch, startRecording } = useApp();

  const [selectedSport, setSelectedSport] = useState<SportType>('Football');
  const [homeTeam, setHomeTeam] = useState<string>('Manchester Academy');
  const [awayTeam, setAwayTeam] = useState<string>('Lions FC');
  const [venue, setVenue] = useState<string>('St. George Park Field 1');

  // Recording Settings Demo
  const [recordingMode, setRecordingMode] = useState<RecordingMode>('OPTIMIZED_BUFFER');
  const [bufferBefore, setBufferBefore] = useState<number>(20);
  const [bufferAfter, setBufferAfter] = useState<number>(20);
  const [quality, setQuality] = useState<VideoQuality>('1080p');
  const [autoUpload, setAutoUpload] = useState<boolean>(true);
  const [showSettingsDemo, setShowSettingsDemo] = useState<boolean>(true);

  const handleBegin = () => {
    const match = createNewMatch({
      title: `${homeTeam} vs ${awayTeam}`,
      sport: selectedSport,
      homeTeam,
      awayTeam,
      venue,
      date: 'Today, Live',
      durationMinutes: 90,
      recordingSettings: {
        mode: recordingMode,
        bufferBeforeSeconds: bufferBefore,
        bufferAfterSeconds: bufferAfter,
        quality,
        autoUpload,
        gridOverlayEnabled: true,
        audioEnabled: true,
      },
    });

    startRecording(match);
    setCurrentScreen('CameraView');
  };

  return (
    <View style={styles.container}>
      <Header
        title="New Match Setup"
        subtitle="Configure recording parameters"
        onBack={() => setCurrentScreen('Home')}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Sport Selection Dropdown */}
        <View style={styles.section}>
          <Text style={styles.fieldLabel}>SELECT SPORT:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sportsRow}>
            {SPORTS_OPTIONS.map((sport) => {
              const isSelected = selectedSport === sport.id;
              return (
                <TouchableOpacity
                  key={sport.id}
                  style={[styles.sportChip, isSelected && styles.sportChipActive]}
                  onPress={() => setSelectedSport(sport.id)}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name={sport.icon as any}
                    size={16}
                    color={isSelected ? Colors.onPrimary : Colors.onBackground}
                  />
                  <Text style={[styles.sportChipText, isSelected && styles.sportChipTextActive]}>
                    {sport.id}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Teams Form */}
        <View style={styles.section}>
          <Text style={styles.fieldLabel}>MATCH DETAILS:</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.subLabel}>Home Team</Text>
            <TextInput
              style={styles.input}
              value={homeTeam}
              onChangeText={setHomeTeam}
              placeholder="e.g. Manchester Academy"
              placeholderTextColor={Colors.mutedText}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.subLabel}>Away Team</Text>
            <TextInput
              style={styles.input}
              value={awayTeam}
              onChangeText={setAwayTeam}
              placeholder="e.g. Lions FC"
              placeholderTextColor={Colors.mutedText}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.subLabel}>Stadium / Venue Location</Text>
            <TextInput
              style={styles.input}
              value={venue}
              onChangeText={setVenue}
              placeholder="e.g. St. George Park Stadium"
              placeholderTextColor={Colors.mutedText}
            />
          </View>
        </View>

        {/* Settings Demo Section */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.settingsHeaderRow}
            onPress={() => setShowSettingsDemo(!showSettingsDemo)}
          >
            <View style={styles.settingsTitleGroup}>
              <Ionicons name="options-outline" size={18} color={Colors.primary} />
              <Text style={styles.fieldLabel}>RECORDING CONFIGURATION</Text>
            </View>
            <Ionicons
              name={showSettingsDemo ? 'chevron-up' : 'chevron-down'}
              size={18}
              color={Colors.mutedText}
            />
          </TouchableOpacity>

          {showSettingsDemo && (
            <View style={styles.settingsCard}>
              {/* Recording Mode */}
              <Text style={styles.subLabel}>Recording Mode</Text>
              <View style={styles.modeTabs}>
                <TouchableOpacity
                  style={[styles.modeTab, recordingMode === 'OPTIMIZED_BUFFER' && styles.modeTabActive]}
                  onPress={() => setRecordingMode('OPTIMIZED_BUFFER')}
                >
                  <Text style={[styles.modeTabText, recordingMode === 'OPTIMIZED_BUFFER' && styles.modeTabTextActive]}>
                    OPTIMIZED ACTION CLIP (60s BUFFER)
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modeTab, recordingMode === 'FULL_MATCH' && styles.modeTabActive]}
                  onPress={() => setRecordingMode('FULL_MATCH')}
                >
                  <Text style={[styles.modeTabText, recordingMode === 'FULL_MATCH' && styles.modeTabTextActive]}>
                    FULL MATCH CONTINUOUS
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Clip Buffers */}
              {recordingMode === 'OPTIMIZED_BUFFER' && (
                <>
                  <Text style={[styles.subLabel, { marginTop: Spacing.sm }]}>Clip Before Event (Seconds)</Text>
                  <View style={styles.presetRow}>
                    {BUFFER_PRESETS.map((sec) => (
                      <TouchableOpacity
                        key={`b_${sec}`}
                        style={[styles.presetChip, bufferBefore === sec && styles.presetChipActive]}
                        onPress={() => setBufferBefore(sec)}
                      >
                        <Text style={[styles.presetText, bufferBefore === sec && styles.presetTextActive]}>
                          {sec}s
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <Text style={[styles.subLabel, { marginTop: Spacing.sm }]}>Clip After Event (Seconds)</Text>
                  <View style={styles.presetRow}>
                    {BUFFER_PRESETS.map((sec) => (
                      <TouchableOpacity
                        key={`a_${sec}`}
                        style={[styles.presetChip, bufferAfter === sec && styles.presetChipActive]}
                        onPress={() => setBufferAfter(sec)}
                      >
                        <Text style={[styles.presetText, bufferAfter === sec && styles.presetTextActive]}>
                          {sec}s
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              )}

              {/* Camera Quality */}
              <Text style={[styles.subLabel, { marginTop: Spacing.sm }]}>Camera Resolution</Text>
              <View style={styles.presetRow}>
                {QUALITY_OPTIONS.map((q) => (
                  <TouchableOpacity
                    key={q}
                    style={[styles.presetChip, quality === q && styles.presetChipActive]}
                    onPress={() => setQuality(q)}
                  >
                    <Text style={[styles.presetText, quality === q && styles.presetTextActive]}>
                      {q}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Auto Upload Toggle */}
              <View style={styles.toggleRow}>
                <View style={styles.toggleTextGroup}>
                  <Text style={styles.toggleTitle}>Auto Upload Cloud Highlights</Text>
                  <Text style={styles.toggleSubtitle}>Sync clips when Wi-Fi/5G is active</Text>
                </View>
                <Switch
                  value={autoUpload}
                  onValueChange={setAutoUpload}
                  trackColor={{ false: Colors.surfaceHigh, true: Colors.primary }}
                  thumbColor={Colors.onPrimary}
                />
              </View>
            </View>
          )}
        </View>

        {/* Bottom Actions */}
        <View style={styles.actionsFooter}>
          <Button title="BEGIN RECORDING SESSION" onPress={handleBegin} variant="primary" />
          <Button
            title="SYSTEM SETTINGS"
            onPress={() => setCurrentScreen('Settings')}
            variant="secondary"
            style={{ marginTop: Spacing.sm }}
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
  section: {
    marginBottom: Spacing.lg,
  },
  fieldLabel: {
    ...Typography.caption,
    fontSize: 10,
    fontWeight: '800',
    color: Colors.mutedText,
    marginBottom: Spacing.xs,
    letterSpacing: 0.5,
  },
  sportsRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  sportChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.surfaceLow,
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    borderRadius: BorderRadii.md,
  },
  sportChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  sportChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onBackground,
  },
  sportChipTextActive: {
    color: Colors.onPrimary,
  },
  inputGroup: {
    marginBottom: Spacing.sm,
  },
  subLabel: {
    ...Typography.caption,
    fontSize: 11,
    color: Colors.onBackground,
    marginBottom: 4,
  },
  input: {
    backgroundColor: Colors.surfaceLow,
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
    borderRadius: BorderRadii.md,
    paddingHorizontal: Spacing.md,
    height: 48,
    color: Colors.onBackground,
    fontSize: 14,
  },
  settingsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  settingsTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  settingsCard: {
    backgroundColor: Colors.surfaceLow,
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
    borderRadius: BorderRadii.md,
    padding: Spacing.md,
  },
  modeTabs: {
    gap: Spacing.xs,
    marginTop: 4,
  },
  modeTab: {
    backgroundColor: Colors.surfaceContainer,
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
    paddingVertical: 10,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadii.xs,
    alignItems: 'center',
  },
  modeTabActive: {
    backgroundColor: 'rgba(195, 244, 0, 0.15)',
    borderColor: Colors.primary,
  },
  modeTabText: {
    ...Typography.caption,
    fontSize: 10,
    fontWeight: '800',
    color: Colors.onBackground,
  },
  modeTabTextActive: {
    color: Colors.primary,
  },
  presetRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginTop: 4,
  },
  presetChip: {
    flex: 1,
    backgroundColor: Colors.surfaceContainer,
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
    paddingVertical: 8,
    borderRadius: BorderRadii.xs,
    alignItems: 'center',
  },
  presetChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  presetText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.onBackground,
  },
  presetTextActive: {
    color: Colors.onPrimary,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.md,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceHigh,
  },
  toggleTextGroup: {
    flex: 1,
  },
  toggleTitle: {
    ...Typography.bodyMd,
    fontWeight: '700',
    color: Colors.onBackground,
  },
  toggleSubtitle: {
    ...Typography.caption,
    color: Colors.mutedText,
  },
  actionsFooter: {
    marginTop: Spacing.md,
  },
});
