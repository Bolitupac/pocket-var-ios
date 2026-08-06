import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import { Colors } from '../../constants/theme';

interface CircularHUDButtonProps {
  onPress: () => void;
  iconName: any;
  color?: string;
  style?: any;
}

export const CircularHUDButton: React.FC<CircularHUDButtonProps> = ({
  onPress,
  iconName,
  color = Colors.onBackground,
  style,
}) => {
  if (isLiquidGlassAvailable()) {
    return (
      <GlassView style={[styles.glassContainer, style]}>
        <TouchableOpacity style={styles.touchable} onPress={onPress} activeOpacity={0.8}>
          <Ionicons name={iconName} size={20} color={color} />
        </TouchableOpacity>
      </GlassView>
    );
  }

  return (
    <TouchableOpacity style={[styles.fallbackButton, style]} onPress={onPress} activeOpacity={0.8}>
      <Ionicons name={iconName} size={20} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  glassContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  touchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },
});
