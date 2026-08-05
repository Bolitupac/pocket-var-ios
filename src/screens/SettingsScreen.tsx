import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/common/Header';
import { Colors, Spacing, BorderRadii, Typography } from '../constants/theme';
import { useApp } from '../store/AppContext';
import { BUFFER_PRESETS, QUALITY_OPTIONS } from '../constants/sports';

export const SettingsScreen: React.FC = () => {
  const { settings, updateSettings, setCurrentScreen } = useApp();

  return (
    <View style={styles.container}>
      <Header title="App Settings" onBack={() => setCurrentScreen('Home')} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Default Recording Engine Mode */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RECORDING ENGINE DEFAULT</Text>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Default Mode</Text>
            <View style={styles.tabsRow}>
              <TouchableOpacity
                style={[styles.tab, settings.mode === 'OPTIMIZED_BUFFER' && styles.tabActive]}
                onPress={() => updateSettings({ mode: 'OPTIMIZED_BUFFER' })}
              >
                <Text style={[styles.tabText, settings.mode === 'OPTIMIZED_BUFFER' && styles.tabTextActive]}>
                  60S ROLLING BUFFER
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.tab, settings.mode === 'FULL_MATCH' && styles.tabActive]}
                onPress={() => updateSettings({ mode: 'FULL_MATCH' })}
              >
                <Text style={[styles.tabText, settings.mode === 'FULL_MATCH' && styles.tabTextActive]}>
                  FULL CONTINUOUS
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Buffer Window Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ROLLING BUFFER WINDOW</Text>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Clip Seconds Before Event</Text>
            <View style={styles.presetsRow}>
              {BUFFER_PRESETS.map((sec) => (
                <TouchableOpacity
                  key={`before_${sec}`}
                  style={[styles.chip, settings.bufferBeforeSeconds === sec && styles.chipActive]}
                  onPress={() => updateSettings({ bufferBeforeSeconds: sec })}
                >
                  <Text style={[styles.chipText, settings.bufferBeforeSeconds === sec && styles.chipTextActive]}>
                    {sec}s
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.cardLabel, { marginTop: Spacing.md }]}>Clip Seconds After Event</Text>
            <View style={styles.presetsRow}>
              {BUFFER_PRESETS.map((sec) => (
                <TouchableOpacity
                  key={`after_${sec}`}
                  style={[styles.chip, settings.bufferAfterSeconds === sec && styles.chipActive]}
                  onPress={() => updateSettings({ bufferAfterSeconds: sec })}
                >
                  <Text style={[styles.chipText, settings.bufferAfterSeconds === sec && styles.chipTextActive]}>
                    {sec}s
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Camera Resolution & Overlays */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CAMERA & MEDIA</Text>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Recording Resolution</Text>
            <View style={styles.presetsRow}>
              {QUALITY_OPTIONS.map((q) => (
                <TouchableOpacity
                  key={q}
                  style={[styles.chip, settings.quality === q && styles.chipActive]}
                  onPress={() => updateSettings({ quality: q })}
                >
                  <Text style={[styles.chipText, settings.quality === q && styles.chipTextActive]}>
                    {q}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.switchRow}>
              <Text style={styles.switchText}>Pitch Grid Overlay</Text>
              <Switch
                value={settings.gridOverlayEnabled}
                onValueChange={(val) => updateSettings({ gridOverlayEnabled: val })}
                trackColor={{ false: Colors.surfaceHigh, true: Colors.primary }}
                thumbColor={Colors.onPrimary}
              />
            </View>

            <View style={styles.switchRow}>
              <Text style={styles.switchText}>High Quality Audio Recording</Text>
              <Switch
                value={settings.audioEnabled}
                onValueChange={(val) => updateSettings({ audioEnabled: val })}
                trackColor={{ false: Colors.surfaceHigh, true: Colors.primary }}
                thumbColor={Colors.onPrimary}
              />
            </View>
          </View>
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
  sectionTitle: {
    ...Typography.caption,
    fontSize: 10,
    fontWeight: '800',
    color: Colors.mutedText,
    marginBottom: Spacing.xs,
  },
  card: {
    backgroundColor: Colors.surfaceLow,
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
    borderRadius: BorderRadii.md,
    padding: Spacing.md,
  },
  cardLabel: {
    ...Typography.caption,
    color: Colors.onBackground,
    fontSize: 11,
    marginBottom: Spacing.xs,
  },
  tabsRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  tab: {
    flex: 1,
    backgroundColor: Colors.surfaceContainer,
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
    paddingVertical: 10,
    borderRadius: BorderRadii.xs,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  tabText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.onBackground,
  },
  tabTextActive: {
    color: Colors.onPrimary,
  },
  presetsRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  chip: {
    flex: 1,
    backgroundColor: Colors.surfaceContainer,
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
    paddingVertical: 8,
    borderRadius: BorderRadii.xs,
    alignItems: 'center',
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.onBackground,
  },
  chipTextActive: {
    color: Colors.onPrimary,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.md,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceHigh,
  },
  switchText: {
    ...Typography.bodyMd,
    color: Colors.onBackground,
  },
});
