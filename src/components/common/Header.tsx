import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Typography } from '../../constants/theme';
import { CircularBackButton } from './CircularBackButton';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightElement?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, onBack, rightElement }) => {
  const insets = useSafeAreaInsets();

  return (
    <BlurView
      tint="systemChromeMaterialDark"
      intensity={100}
      style={[styles.container, { paddingTop: insets.top + Spacing.xs }]}
    >
      <View style={styles.leftContainer}>
        {onBack && (
          <View style={styles.backButtonWrapper}>
            <CircularBackButton onPress={onBack} />
          </View>
        )}
        <View style={styles.titleGroup}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text> : null}
        </View>
      </View>
      {rightElement ? <View style={styles.rightContainer}>{rightElement}</View> : null}
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: Spacing.sm,
  },
  backButtonWrapper: {
    marginRight: Spacing.sm,
  },
  titleGroup: {
    flex: 1,
  },
  title: {
    ...Typography.headlineMd,
    fontSize: 17,
    color: Colors.onBackground,
  },
  subtitle: {
    ...Typography.caption,
    fontSize: 11,
    color: Colors.mutedText,
    marginTop: 1,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
