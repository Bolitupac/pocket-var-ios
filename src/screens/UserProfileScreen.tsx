import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/common/Header';
import { Button } from '../components/common/Button';
import { Colors, Spacing, BorderRadii, Typography } from '../constants/theme';
import { useApp } from '../store/AppContext';

export const UserProfileScreen: React.FC = () => {
  const { user, logout, setCurrentScreen } = useApp();

  return (
    <View style={styles.container}>
      <Header title="User Profile" onBack={() => setCurrentScreen('Home')} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Card */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={40} color={Colors.onPrimary} />
          </View>
          <Text style={styles.nameText}>{user.name}</Text>
          <Text style={styles.emailText}>{user.email}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>OFFICIAL {user.role.toUpperCase()}</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statVal}>24</Text>
            <Text style={styles.statSub}>MATCHES REFEREED</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statVal}>142</Text>
            <Text style={styles.statSub}>VAR INCIDENTS</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statVal}>98.2%</Text>
            <Text style={styles.statSub}>ACCURACY RATING</Text>
          </View>
        </View>

        {/* Quick Links */}
        <View style={styles.section}>
          <Button
            title="SYSTEM PREFERENCES & SETTINGS"
            onPress={() => setCurrentScreen('Settings')}
            variant="glass"
            style={{ marginBottom: Spacing.sm }}
          />

          <Button
            title="PITCH SETUP & HELP MANUAL"
            onPress={() => setCurrentScreen('HelpSupport')}
            variant="glass"
            style={{ marginBottom: Spacing.sm }}
          />

          <Button title="SIGN OUT OF POCKET VAR" onPress={logout} variant="danger" />
        </View>
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
    paddingBottom: Spacing.xl,
  },
  profileHeader: {
    alignItems: 'center',
    backgroundColor: Colors.surfaceLow,
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
    borderRadius: BorderRadii.md,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  nameText: {
    ...Typography.headlineLg,
    color: Colors.onBackground,
    marginBottom: 2,
  },
  emailText: {
    ...Typography.bodyMd,
    color: Colors.mutedText,
    marginBottom: Spacing.sm,
  },
  roleBadge: {
    backgroundColor: 'rgba(195, 244, 0, 0.15)',
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: BorderRadii.pill,
  },
  roleText: {
    ...Typography.caption,
    fontSize: 10,
    fontWeight: '800',
    color: Colors.primary,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  statBox: {
    flex: 1,
    backgroundColor: Colors.surfaceLow,
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
    borderRadius: BorderRadii.md,
    padding: Spacing.md,
    alignItems: 'center',
  },
  statVal: {
    ...Typography.monoData,
    fontSize: 18,
    color: Colors.primary,
  },
  statSub: {
    ...Typography.caption,
    fontSize: 8,
    color: Colors.mutedText,
    textAlign: 'center',
    marginTop: 4,
  },
  section: {
    marginTop: Spacing.md,
  },
});
