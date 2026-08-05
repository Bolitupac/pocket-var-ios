import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/common/Header';
import { Colors, Spacing, BorderRadii, Typography } from '../constants/theme';
import { useApp } from '../store/AppContext';

export const HelpSupportScreen: React.FC = () => {
  const { setCurrentScreen } = useApp();

  const faqs = [
    {
      q: 'How does multi-device synchronization work?',
      a: 'Place smartphones at different pitch angles (Main Stand, Behind Goal, Touchline). Enter the 6-character match code on each phone to pair timestamps automatically.',
    },
    {
      q: 'What is Optimized Action Clip Mode?',
      a: 'Instead of recording 90 minutes to continuous phone storage, the camera keeps a rolling 60-second temporary buffer. Pressing event buttons permanently saves 20s before and 20s after the incident.',
    },
    {
      q: 'Can I use Pocket VAR outdoors under sunlight?',
      a: 'Yes! The Kinetic Precision design features high-contrast neon accents, large touch targets (48px+), and high visibility for outdoor match conditions.',
    },
  ];

  return (
    <View style={styles.container}>
      <Header title="Help & Pitch Setup" onBack={() => setCurrentScreen('Home')} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.banner}>
          <Ionicons name="football-outline" size={32} color={Colors.primary} />
          <Text style={styles.bannerTitle}>Grassroots Football VAR Guide</Text>
          <Text style={styles.bannerSub}>Affordable video officiating and highlight technology.</Text>
        </View>

        <Text style={styles.sectionTitle}>FREQUENTLY ASKED QUESTIONS</Text>

        {faqs.map((faq, idx) => (
          <View key={idx.toString()} style={styles.faqCard}>
            <Text style={styles.question}>❓ {faq.q}</Text>
            <Text style={styles.answer}>{faq.a}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: Spacing.md,
    gap: Spacing.md,
  },
  banner: {
    backgroundColor: Colors.surfaceLow,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: BorderRadii.md,
    padding: Spacing.lg,
    alignItems: 'center',
  },
  bannerTitle: {
    ...Typography.headlineMd,
    color: Colors.onBackground,
    marginTop: Spacing.xs,
  },
  bannerSub: {
    ...Typography.caption,
    color: Colors.mutedText,
    textAlign: 'center',
    marginTop: 2,
  },
  sectionTitle: {
    ...Typography.caption,
    fontSize: 10,
    fontWeight: '800',
    color: Colors.mutedText,
  },
  faqCard: {
    backgroundColor: Colors.surfaceLow,
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
    borderRadius: BorderRadii.md,
    padding: Spacing.md,
  },
  question: {
    ...Typography.bodyMd,
    fontWeight: '700',
    color: Colors.onBackground,
    marginBottom: Spacing.xs,
  },
  answer: {
    ...Typography.caption,
    color: Colors.mutedText,
    lineHeight: 18,
  },
});
