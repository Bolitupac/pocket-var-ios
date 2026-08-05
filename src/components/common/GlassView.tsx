import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, BorderRadii } from '../../constants/theme';

interface GlassViewProps {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
  activeBorder?: boolean;
}

export const GlassView: React.FC<GlassViewProps> = ({ children, style, activeBorder }) => {
  return (
    <View
      style={[
        styles.glassContainer,
        activeBorder && styles.activeBorder,
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  glassContainer: {
    backgroundColor: Colors.glassBackground,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    borderRadius: BorderRadii.lg,
    overflow: 'hidden',
  },
  activeBorder: {
    borderColor: Colors.primary,
  },
});
