import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import { Colors, Spacing, BorderRadii, Typography } from '../../constants/theme';

interface GlassEventFlagButtonProps {
  onPress: () => void;
}

export const GlassEventFlagButton: React.FC<GlassEventFlagButtonProps> = ({ onPress }) => {
  if (isLiquidGlassAvailable()) {
    return (
      <GlassView style={styles.glassContainer} glassEffectStyle="clear">
        <TouchableOpacity style={styles.touchable} onPress={onPress} activeOpacity={0.8}>
          <Ionicons name="flag" size={16} color={Colors.primary} />
          <Text style={styles.text}>FLAG EVENT</Text>
        </TouchableOpacity>
      </GlassView>
    );
  }

  return (
    <TouchableOpacity style={styles.fallbackButton} onPress={onPress} activeOpacity={0.8}>
      <Ionicons name="flag" size={16} color={Colors.primary} />
      <Text style={styles.text}>FLAG EVENT</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  glassContainer: {
    borderRadius: BorderRadii.pill,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
  },
  fallbackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.10)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: BorderRadii.pill,
  },
  text: {
    ...Typography.caption,
    fontWeight: '800',
    color: Colors.primary,
    marginLeft: 6,
    letterSpacing: 0.5,
  },
});
