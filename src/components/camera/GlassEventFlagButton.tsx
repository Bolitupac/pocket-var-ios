import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadii, Typography } from '../../constants/theme';

interface GlassEventFlagButtonProps {
  onPress: () => void;
}

export const GlassEventFlagButton: React.FC<GlassEventFlagButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
      <Ionicons name="flag" size={16} color={Colors.primary} />
      <Text style={styles.text}>FLAG EVENT</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
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
