import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EVENT_CATEGORIES } from '../../constants/events';
import { EventType } from '../../types';
import { Colors, Spacing, BorderRadii, Typography } from '../../constants/theme';

interface EventFlagSelectorProps {
  visible: boolean;
  onClose: () => void;
  onSelectEvent: (type: EventType) => void;
}

export const EventFlagSelector: React.FC<EventFlagSelectorProps> = ({
  visible,
  onClose,
  onSelectEvent,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              <View style={styles.header}>
                <View style={styles.headerTitleRow}>
                  <Ionicons name="flag" size={20} color={Colors.primary} />
                  <Text style={styles.headerTitle}>TAG MATCH EVENT</Text>
                </View>
                <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                  <Ionicons name="close" size={20} color={Colors.onSurfaceVariant} />
                </TouchableOpacity>
              </View>

              <Text style={styles.subtitle}>
                Select event type to save rolling clip (20s before / 20s after):
              </Text>

              <ScrollView contentContainerStyle={styles.grid}>
                {EVENT_CATEGORIES.map((cat) => (
                  <TouchableOpacity
                    key={cat.id}
                    style={styles.eventItem}
                    onPress={() => {
                      onSelectEvent(cat.id);
                      onClose();
                    }}
                    activeOpacity={0.8}
                  >
                    <View style={[styles.iconBox, { borderColor: cat.color }]}>
                      <Text style={styles.emoji}>{cat.emoji}</Text>
                    </View>
                    <Text style={styles.eventLabel}>{cat.label}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
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
  container: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: BorderRadii.xl,
    borderTopRightRadius: BorderRadii.xl,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    padding: Spacing.md,
    maxHeight: '65%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  headerTitle: {
    ...Typography.headlineMd,
    color: Colors.onBackground,
  },
  subtitle: {
    ...Typography.caption,
    color: Colors.mutedText,
    marginBottom: Spacing.md,
  },
  closeBtn: {
    padding: Spacing.xs,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    justifyContent: 'space-between',
    paddingBottom: Spacing.xl,
  },
  eventItem: {
    width: '30%',
    backgroundColor: Colors.surfaceLow,
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
    borderRadius: BorderRadii.md,
    padding: Spacing.sm,
    alignItems: 'center',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: BorderRadii.sm,
    backgroundColor: Colors.surfaceContainer,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  emoji: {
    fontSize: 20,
  },
  eventLabel: {
    color: Colors.onBackground,
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },
});
