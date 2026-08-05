import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Colors, BorderRadii, Typography, Spacing } from '../../constants/theme';

interface ZoomSliderProps {
  currentZoom: number;
  onZoomChange: (zoom: number) => void;
  presetZooms?: number[];
}

export const ZoomSlider: React.FC<ZoomSliderProps> = ({
  currentZoom,
  onZoomChange,
  presetZooms = [0.5, 1.0, 2.0, 3.0],
}) => {
  const tickItems = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0];

  return (
    <View style={styles.container}>
      {/* Preset Bubbles */}
      <View style={styles.presetRow}>
        {presetZooms.map((val) => {
          const isActive = Math.abs(currentZoom - val) < 0.1;
          return (
            <TouchableOpacity
              key={val.toString()}
              style={[styles.presetBubble, isActive && styles.presetActive]}
              onPress={() => onZoomChange(val)}
              activeOpacity={0.8}
            >
              <Text style={[styles.presetText, isActive && styles.presetTextActive]}>
                {val}x
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* iPhone Dial Scrubber */}
      <View style={styles.dialWrapper}>
        <View style={styles.centerIndicator} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {tickItems.map((val) => {
            const isMajor = presetZooms.includes(val);
            return (
              <TouchableOpacity
                key={val.toString()}
                style={styles.tickWrapper}
                onPress={() => onZoomChange(val)}
              >
                <View style={[styles.tickLine, isMajor && styles.tickLineMajor]} />
                {isMajor && <Text style={styles.tickLabel}>{val}x</Text>}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: Spacing.xs,
  },
  presetRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  presetBubble: {
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    width: 38,
    height: 38,
    borderRadius: BorderRadii.pill,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  presetActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.surface,
  },
  presetText: {
    color: Colors.onBackground,
    fontSize: 11,
    fontWeight: '700',
  },
  presetTextActive: {
    color: Colors.primary,
  },
  dialWrapper: {
    width: 220,
    height: 38,
    backgroundColor: 'rgba(14, 14, 14, 0.85)',
    borderRadius: BorderRadii.pill,
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  centerIndicator: {
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: Colors.primary,
    marginLeft: -1,
    zIndex: 5,
  },
  scrollContent: {
    paddingHorizontal: 95,
    alignItems: 'center',
  },
  tickWrapper: {
    width: 14,
    alignItems: 'center',
  },
  tickLine: {
    width: 1,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  tickLineMajor: {
    height: 14,
    backgroundColor: Colors.onBackground,
  },
  tickLabel: {
    position: 'absolute',
    top: 16,
    color: Colors.mutedText,
    fontSize: 8,
    fontWeight: '700',
  },
});
