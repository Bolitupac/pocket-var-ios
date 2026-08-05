import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadii } from '../../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'glass' | 'danger';
  iconName?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  iconName,
  disabled,
  style,
  textStyle,
}) => {
  const getContainerStyle = () => {
    switch (variant) {
      case 'primary':
        return styles.primaryContainer;
      case 'secondary':
        return styles.secondaryContainer;
      case 'glass':
        return styles.glassContainer;
      case 'danger':
        return styles.dangerContainer;
      default:
        return styles.primaryContainer;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'primary':
        return styles.primaryText;
      case 'secondary':
        return styles.secondaryText;
      case 'glass':
        return styles.glassText;
      case 'danger':
        return styles.dangerText;
      default:
        return styles.primaryText;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.baseButton, getContainerStyle(), disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {iconName && (
        <Ionicons
          name={iconName}
          size={18}
          color={getTextStyle().color}
          style={styles.icon}
        />
      )}
      <Text style={[getTextStyle(), textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    minHeight: Spacing.touchTargetMin,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadii.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryContainer: {
    backgroundColor: Colors.primary,
  },
  primaryText: {
    color: Colors.onPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
  },
  secondaryText: {
    color: Colors.onBackground,
    fontSize: 15,
    fontWeight: '600',
  },
  glassContainer: {
    backgroundColor: Colors.glassCardBackground,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  glassText: {
    color: Colors.onBackground,
    fontSize: 15,
    fontWeight: '600',
  },
  dangerContainer: {
    backgroundColor: Colors.secondary,
  },
  dangerText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  disabled: {
    opacity: 0.5,
  },
  icon: {
    marginRight: Spacing.xs + 2,
  },
});
