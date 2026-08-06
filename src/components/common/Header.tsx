import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '../../constants/theme';
import { CircularBackButton } from './CircularBackButton';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightElement?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, onBack, rightElement }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {onBack && (
          <View style={styles.backButtonWrapper}>
            <CircularBackButton onPress={onBack} />
          </View>
        )}
        <View>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      </View>
      {rightElement ? <View style={styles.rightContainer}>{rightElement}</View> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceHigh,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonWrapper: {
    marginRight: Spacing.sm,
  },
  title: {
    ...Typography.headlineMd,
    color: Colors.onBackground,
  },
  subtitle: {
    ...Typography.caption,
    color: Colors.mutedText,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
