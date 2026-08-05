import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AnnotationTool } from '../../types';
import { Colors, BorderRadii, Typography, Spacing } from '../../constants/theme';

interface AnnotationCanvasProps {
  onTakeScreenshot?: () => void;
}

export const AnnotationCanvas: React.FC<AnnotationCanvasProps> = ({ onTakeScreenshot }) => {
  const [selectedTool, setSelectedTool] = useState<AnnotationTool | null>(null);
  const [activeColor, setActiveColor] = useState<string>(Colors.primary);
  const [historyCount, setHistoryCount] = useState<number>(0);

  const tools: { id: AnnotationTool; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { id: 'pencil', label: 'Draw', icon: 'pencil' },
    { id: 'line', label: 'Line', icon: 'remove-outline' },
    { id: 'rectangle', label: 'Box', icon: 'square-outline' },
    { id: 'circle', label: 'Circle', icon: 'ellipse-outline' },
    { id: 'arrow', label: 'Arrow', icon: 'arrow-forward-outline' },
  ];

  const colors = [Colors.primary, Colors.secondary, '#3B82F6', '#FFFFFF'];

  const handleToolSelect = (tool: AnnotationTool) => {
    if (selectedTool === tool) {
      setSelectedTool(null);
    } else {
      setSelectedTool(tool);
      setHistoryCount((prev) => prev + 1);
    }
  };

  const handleUndo = () => {
    if (historyCount > 0) setHistoryCount((prev) => prev - 1);
  };

  const handleScreenshot = () => {
    if (onTakeScreenshot) {
      onTakeScreenshot();
    } else {
      Alert.alert('Frame Captured', 'Reviewed VAR frame with annotations saved to match report!');
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Toolbar */}
      <View style={styles.toolbar}>
        <View style={styles.toolsGroup}>
          {tools.map((t) => {
            const isActive = selectedTool === t.id;
            return (
              <TouchableOpacity
                key={t.id}
                style={[styles.toolBtn, isActive && styles.toolBtnActive]}
                onPress={() => handleToolSelect(t.id)}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={t.icon}
                  size={16}
                  color={isActive ? Colors.onPrimary : Colors.onBackground}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Color Palette */}
        <View style={styles.colorsGroup}>
          {colors.map((c) => (
            <TouchableOpacity
              key={c}
              style={[styles.colorDot, { backgroundColor: c }, activeColor === c && styles.colorDotActive]}
              onPress={() => setActiveColor(c)}
            />
          ))}
        </View>

        {/* Actions: Undo & Frame Screenshot */}
        <View style={styles.actionsGroup}>
          <TouchableOpacity
            style={[styles.actionBtn, historyCount === 0 && styles.disabled]}
            onPress={handleUndo}
            disabled={historyCount === 0}
          >
            <Ionicons name="arrow-undo" size={16} color={Colors.onBackground} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.screenshotBtn} onPress={handleScreenshot} activeOpacity={0.8}>
            <Ionicons name="camera-outline" size={16} color={Colors.primary} />
            <Text style={styles.screenshotText}>SNAP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
    borderRadius: BorderRadii.md,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    marginVertical: Spacing.xs,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toolsGroup: {
    flexDirection: 'row',
    gap: 4,
  },
  toolBtn: {
    width: 32,
    height: 32,
    borderRadius: BorderRadii.xs,
    backgroundColor: Colors.surfaceLow,
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolBtnActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  colorsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  colorDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
  },
  colorDotActive: {
    borderWidth: 2,
    borderColor: Colors.primary,
    transform: [{ scale: 1.2 }],
  },
  actionsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionBtn: {
    width: 32,
    height: 32,
    borderRadius: BorderRadii.xs,
    backgroundColor: Colors.surfaceLow,
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.4,
  },
  screenshotBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(195, 244, 0, 0.15)',
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingHorizontal: Spacing.xs + 2,
    height: 32,
    borderRadius: BorderRadii.xs,
    gap: 4,
  },
  screenshotText: {
    ...Typography.caption,
    fontSize: 10,
    fontWeight: '800',
    color: Colors.primary,
  },
});
