import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadii, Typography } from '../../constants/theme';

interface CameraControlsProps {
  isRecording: boolean;
  onToggleRecording: () => void;
  onOpenVARReview: () => void;
  onOpenSettings: () => void;
}

export const CameraControls: React.FC<CameraControlsProps> = ({
  isRecording,
  onToggleRecording,
  onOpenVARReview,
  onOpenSettings,
}) => {
  return (
    <View style={styles.container}>
      {/* VAR Review Button */}
      <TouchableOpacity style={styles.varButton} onPress={onOpenVARReview} activeOpacity={0.8}>
        <View style={styles.varIconBox}>
          <Text style={styles.varText}>VAR</Text>
        </View>
        <Text style={styles.btnLabel}>REVIEW</Text>
      </TouchableOpacity>

      {/* Main Shutter / Record Button */}
      <TouchableOpacity style={styles.shutterOuter} onPress={onToggleRecording} activeOpacity={0.8}>
        <View style={[styles.shutterInner, isRecording && styles.shutterInnerRecording]} />
      </TouchableOpacity>

      {/* Settings Button */}
      <TouchableOpacity style={styles.sideButton} onPress={onOpenSettings} activeOpacity={0.8}>
        <Ionicons name="settings-outline" size={24} color={Colors.onBackground} />
        <Text style={styles.btnLabel}>SETTINGS</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceHigh,
  },
  varButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },
  varIconBox: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadii.xs,
    marginBottom: 4,
  },
  varText: {
    color: Colors.onPrimary,
    fontWeight: '900',
    fontSize: 12,
  },
  sideButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },
  btnLabel: {
    ...Typography.caption,
    fontSize: 9,
    fontWeight: '700',
    color: Colors.mutedText,
    marginTop: 2,
    letterSpacing: 0.5,
  },
  shutterOuter: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  shutterInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.liveRed,
  },
  shutterInnerRecording: {
    width: 28,
    height: 28,
    borderRadius: BorderRadii.xs,
    backgroundColor: Colors.liveRed,
  },
});
