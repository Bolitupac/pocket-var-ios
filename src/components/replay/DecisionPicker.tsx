import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DECISION_OPTIONS } from '../../constants/events';
import { DecisionType } from '../../types';
import { Colors, BorderRadii, Typography, Spacing } from '../../constants/theme';

interface DecisionPickerProps {
  onConfirmDecision: (verdict: DecisionType, notes: string) => void;
  currentVerdict?: DecisionType;
}

export const DecisionPicker: React.FC<DecisionPickerProps> = ({
  onConfirmDecision,
  currentVerdict,
}) => {
  const [selectedVerdict, setSelectedVerdict] = useState<DecisionType | undefined>(currentVerdict);
  const [notes, setNotes] = useState<string>('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="shield-checkmark" size={18} color={Colors.primary} />
        <Text style={styles.title}>OFFICIAL VAR DECISION</Text>
      </View>

      <Text style={styles.subtitle}>Select referee verdict to tag clip:</Text>

      {/* Grid of Decision Options */}
      <View style={styles.grid}>
        {DECISION_OPTIONS.map((opt) => {
          const isSelected = selectedVerdict === opt.id;
          return (
            <TouchableOpacity
              key={opt.id}
              style={[
                styles.optionChip,
                isSelected && { borderColor: opt.color, backgroundColor: 'rgba(0,0,0,0.8)' },
              ]}
              onPress={() => setSelectedVerdict(opt.id)}
              activeOpacity={0.8}
            >
              <Ionicons
                name={opt.icon as any}
                size={14}
                color={isSelected ? opt.color : Colors.mutedText}
              />
              <Text
                style={[
                  styles.optionText,
                  isSelected && { color: opt.color, fontWeight: '800' },
                ]}
              >
                {opt.id}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Referee Notes Input */}
      {selectedVerdict && (
        <View style={styles.notesContainer}>
          <TextInput
            style={styles.notesInput}
            placeholder="Add official referee explanation (optional)..."
            placeholderTextColor={Colors.mutedText}
            value={notes}
            onChangeText={setNotes}
          />
          <TouchableOpacity
            style={styles.confirmBtn}
            onPress={() => onConfirmDecision(selectedVerdict, notes)}
            activeOpacity={0.8}
          >
            <Ionicons name="checkmark" size={18} color={Colors.onPrimary} />
            <Text style={styles.confirmBtnText}>LOG DECISION</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surfaceLow,
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
    borderRadius: BorderRadii.md,
    padding: Spacing.md,
    marginVertical: Spacing.xs,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: 2,
  },
  title: {
    ...Typography.headlineMd,
    fontSize: 14,
    color: Colors.onBackground,
  },
  subtitle: {
    ...Typography.caption,
    color: Colors.mutedText,
    marginBottom: Spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  optionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.surfaceContainer,
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    borderRadius: BorderRadii.xs,
  },
  optionText: {
    ...Typography.caption,
    fontSize: 11,
    color: Colors.onBackground,
  },
  notesContainer: {
    marginTop: Spacing.sm,
    gap: Spacing.xs,
  },
  notesInput: {
    backgroundColor: Colors.surfaceContainer,
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
    borderRadius: BorderRadii.xs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 8,
    color: Colors.onBackground,
    fontSize: 12,
  },
  confirmBtn: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: BorderRadii.xs,
    gap: 6,
  },
  confirmBtnText: {
    color: Colors.onPrimary,
    fontWeight: '800',
    fontSize: 12,
  },
});
