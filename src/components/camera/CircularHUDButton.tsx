import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} activeOpacity={0.8}>
      <Ionicons name={iconName} size={20} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
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
