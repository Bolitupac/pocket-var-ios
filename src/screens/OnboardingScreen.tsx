import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadii, Typography } from '../constants/theme';
import { useApp } from '../store/AppContext';
import { Button } from '../components/common/Button';

const SLIDES = [
  {
    id: 1,
    title: 'Multi-Device VAR Technology',
    description: 'Sync multiple smartphones around the pitch to capture match incidents from every camera angle.',
    icon: 'aperture-outline',
  },
  {
    id: 2,
    title: 'Smart 60s Rolling Buffer',
    description: 'Save storage space. The camera records continuously and saves clips automatically when events occur.',
    icon: 'infinite-outline',
  },
  {
    id: 3,
    title: 'ProVAR Review & Highlights',
    description: 'Frame-by-frame scrubber, VAR drawing annotations, and instant highlight sharing for grassroots football.',
    icon: 'sparkles-outline',
  },
];

export const OnboardingScreen: React.FC = () => {
  const { setCurrentScreen } = useApp();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const slide = SLIDES[currentIndex];

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentScreen('Auth');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipBtn} onPress={() => setCurrentScreen('Auth')}>
        <Text style={styles.skipText}>SKIP</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name={slide.icon as any} size={56} color={Colors.primary} />
        </View>

        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.description}>{slide.description}</Text>
      </View>

      {/* Pagination Dots */}
      <View style={styles.dotsRow}>
        {SLIDES.map((_, idx) => (
          <View
            key={idx.toString()}
            style={[styles.dot, currentIndex === idx && styles.dotActive]}
          />
        ))}
      </View>

      <View style={styles.footer}>
        <Button
          title={currentIndex === SLIDES.length - 1 ? 'GET STARTED' : 'NEXT'}
          onPress={handleNext}
          variant="primary"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
    justifyContent: 'space-between',
  },
  skipBtn: {
    alignSelf: 'flex-end',
    paddingTop: Spacing.md,
  },
  skipText: {
    ...Typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: Colors.mutedText,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.surfaceLow,
    borderWidth: 2,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    ...Typography.headlineLg,
    color: Colors.onBackground,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  description: {
    ...Typography.bodyLg,
    color: Colors.mutedText,
    textAlign: 'center',
    lineHeight: 24,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.surfaceHigh,
  },
  dotActive: {
    width: 24,
    backgroundColor: Colors.primary,
  },
  footer: {
    paddingBottom: Spacing.md,
  },
});
