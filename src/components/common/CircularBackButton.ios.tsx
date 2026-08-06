import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import { Colors } from '../../constants/theme';

interface CircularBackButtonProps {
  onPress: () => void;
}

export const CircularBackButton: React.FC<CircularBackButtonProps> = ({ onPress }) => {
  if (isLiquidGlassAvailable()) {
    return (
      <GlassView style={styles.glassContainer} glassEffectStyle="clear">
        <TouchableOpacity style={styles.touchable} onPress={onPress} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={20} color={Colors.onBackground} style={styles.icon} />
        </TouchableOpacity>
      </GlassView>
    );
  }

  // Fallback for older iOS versions that don't support Liquid Glass
  return (
    <TouchableOpacity style={styles.fallbackButton} onPress={onPress} activeOpacity={0.7}>
      <Ionicons name="chevron-back" size={20} color={Colors.onBackground} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  glassContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.10)',
  },
  touchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  icon: {
    marginLeft: -2, // Optically center the chevron
  },
});
