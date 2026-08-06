import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/common/Header';
import { HighlightCard } from '../components/highlights/HighlightCard';
import { Colors, Spacing, BorderRadii, Typography } from '../constants/theme';
import { useApp } from '../store/AppContext';
import { HighlightEvent, EventType } from '../types';

export const TimelineScreen: React.FC = () => {
  const { highlights, matches, setActiveHighlight, setCurrentScreen, deleteHighlightClip } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Goal', 'Foul', 'Offside', 'Red Card', 'Yellow Card', 'Penalty'];

  const filteredHighlights = selectedCategory === 'ALL'
    ? highlights
    : highlights.filter((h) => h.type === selectedCategory);

  const handlePlayClip = (event: HighlightEvent) => {
    setActiveHighlight(event);
    setCurrentScreen('ReplayViewer');
  };

  const handleOpenMultiAngle = (event: HighlightEvent) => {
    setActiveHighlight(event);
    setCurrentScreen('ReplayViewer');
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Highlight',
      'Are you sure you want to delete this clip from local storage?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteHighlightClip(id),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Match Highlights & History"
        subtitle={`${highlights.length} Recorded Clips`}
        onBack={() => setCurrentScreen('Home')}
      />

      {/* Category Filter Chips */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.filterChip, isSelected && styles.filterChipActive]}
                onPress={() => setSelectedCategory(cat)}
                activeOpacity={0.8}
              >
                <Text style={[styles.filterText, isSelected && styles.filterTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Highlights List */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {matches.map((match) => {
          const matchClips = filteredHighlights.filter((h) => h.matchId === match.id);
          if (matchClips.length === 0) return null;

          return (
            <View key={match.id} style={styles.matchGroup}>
              {/* Expandable Match Group Header */}
              <View style={styles.groupHeader}>
                <View style={styles.groupTitleRow}>
                  <Ionicons name="trophy" size={16} color={Colors.primary} />
                  <Text style={styles.groupTitle}>{match.title}</Text>
                </View>
                <View style={styles.groupBadge}>
                  <Text style={styles.groupBadgeText}>{matchClips.length} Clips</Text>
                </View>
              </View>

              {/* Clips inside match */}
              {matchClips.map((event) => (
                <HighlightCard
                  key={event.id}
                  event={event}
                  onPlay={handlePlayClip}
                  onOpenMultiAngle={handleOpenMultiAngle}
                  onDelete={handleDelete}
                />
              ))}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  filterContainer: {
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceHigh,
    paddingVertical: Spacing.xs + 2,
  },
  filterRow: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.xs,
  },
  filterChip: {
    backgroundColor: Colors.surfaceLow,
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadii.pill,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterText: {
    ...Typography.caption,
    fontSize: 11,
    fontWeight: '700',
    color: Colors.onBackground,
  },
  filterTextActive: {
    color: Colors.onPrimary,
  },
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: 110,
  },
  matchGroup: {
    marginBottom: Spacing.lg,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surfaceLow,
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
    borderRadius: BorderRadii.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    marginBottom: Spacing.xs,
  },
  groupTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  groupTitle: {
    ...Typography.bodyMd,
    fontWeight: '800',
    color: Colors.onBackground,
  },
  groupBadge: {
    backgroundColor: Colors.surfaceContainer,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadii.xs,
  },
  groupBadgeText: {
    ...Typography.caption,
    fontSize: 10,
    color: Colors.primary,
    fontWeight: '700',
  },
});
