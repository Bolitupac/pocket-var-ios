import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, BorderRadii } from '../constants/theme';
import { useApp } from '../store/AppContext';

export const SplashScreen: React.FC = () => {
  const { setCurrentScreen, isAuthenticated } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        setCurrentScreen('Home');
      } else {
        setCurrentScreen('Onboarding');
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  return (
    <View style={styles.container}>
      <View style={styles.logoBadge}>
        <Ionicons name="videocam" size={48} color={Colors.onPrimary} />
      </View>
      <Text style={styles.title}>POCKET VAR</Text>
      <Text style={styles.tagline}>Bringing tech to grassroots football.</Text>
      <View style={styles.versionBadge}>
        <Text style={styles.versionText}>v1.0.0 iOS PRO</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logoBadge: {
    width: 96,
    height: 96,
    borderRadius: BorderRadii.xl,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
  },
  title: {
    ...Typography.displayLg,
    color: Colors.onBackground,
    marginBottom: 6,
    letterSpacing: 2,
  },
  tagline: {
    ...Typography.bodyLg,
    color: Colors.mutedText,
    textAlign: 'center',
  },
  versionBadge: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: Colors.surfaceContainer,
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: BorderRadii.pill,
  },
  versionText: {
    ...Typography.caption,
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primary,
  },
});
