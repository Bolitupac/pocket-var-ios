import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadii, Typography } from '../../constants/theme';

interface ActionItem {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  color?: string;
  onPress: () => void;
}

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  actions: ActionItem[];
  title?: string;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({ visible, onClose, actions, title = 'Quick Actions' }) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.sheetContainer}>
              <View style={styles.dragIndicator} />
              <View style={styles.headerRow}>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                  <Ionicons name="close" size={20} color={Colors.onSurfaceVariant} />
                </TouchableOpacity>
              </View>

              <View style={styles.actionsList}>
                {actions.map((action) => (
                  <TouchableOpacity
                    key={action.id}
                    style={styles.actionCard}
                    onPress={() => {
                      onClose();
                      action.onPress();
                    }}
                    activeOpacity={0.8}
                  >
                    <View style={[styles.iconWrapper, { backgroundColor: action.color || Colors.surfaceHigh }]}>
                      <Ionicons name={action.icon} size={22} color={action.color ? Colors.onPrimary : Colors.primary} />
                    </View>
                    <View style={styles.textWrapper}>
                      <Text style={styles.actionTitle}>{action.title}</Text>
                      <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={Colors.mutedText} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.overlayDark,
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: BorderRadii.xl,
    borderTopRightRadius: BorderRadii.xl,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    padding: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  dragIndicator: {
    width: 36,
    height: 4,
    backgroundColor: Colors.surfaceHighest,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: Spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  title: {
    ...Typography.headlineMd,
    color: Colors.onBackground,
  },
  closeBtn: {
    padding: Spacing.xs,
  },
  actionsList: {
    gap: Spacing.sm,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceLow,
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
    borderRadius: BorderRadii.md,
    padding: Spacing.md,
  },
  iconWrapper: {
    width: 42,
    height: 42,
    borderRadius: BorderRadii.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  textWrapper: {
    flex: 1,
  },
  actionTitle: {
    ...Typography.bodyLg,
    fontWeight: '700',
    color: Colors.onBackground,
  },
  actionSubtitle: {
    ...Typography.caption,
    color: Colors.mutedText,
    marginTop: 2,
  },
});
