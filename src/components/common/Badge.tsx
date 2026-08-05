import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, BorderRadii, Typography, Spacing } from '../../constants/theme';

interface BadgeProps {
  label: string;
  color?: string;
  variant?: 'solid' | 'outline' | 'glass';
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  color = Colors.primary,
  variant = 'solid',
  style,
}) => {
  return (
    <View
      style={[
        styles.badge,
        variant === 'solid' && { backgroundColor: color },
        variant === 'outline' && { borderWidth: 1, borderColor: color, backgroundColor: 'transparent' },
        variant === 'glass' && { backgroundColor: Colors.glassCardBackground, borderWidth: 1, borderColor: color },
        style,
      ]}
    >
      <Text
        style={[
          styles.badgeText,
          variant === 'solid' ? { color: color === Colors.primary ? Colors.onPrimary : '#FFFFFF' } : { color },
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadii.xs,
    alignSelf: 'flex-start',
  },
  badgeText: {
    ...Typography.caption,
    fontWeight: '700',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
