import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/common/Header';
import { Colors, Spacing, BorderRadii, Typography } from '../constants/theme';
import { useApp } from '../store/AppContext';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'review_request' | 'system' | 'sync';
  read: boolean;
}

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    title: 'VAR Review Request',
    message: 'Assistant Referee 2 flagged a Possible Handball at 68:40.',
    time: '10m ago',
    type: 'review_request',
    read: false,
  },
  {
    id: 'n2',
    title: 'Camera Device Connected',
    message: 'iPhone 14 (Behind Goal) paired successfully via local Wi-Fi.',
    time: '25m ago',
    type: 'sync',
    read: true,
  },
  {
    id: 'n3',
    title: 'Cloud Highlights Sync Complete',
    message: '8 video clips uploaded to grassroots VAR cloud storage.',
    time: '1h ago',
    type: 'system',
    read: true,
  },
];

export const NotificationsScreen: React.FC = () => {
  const { setCurrentScreen } = useApp();

  return (
    <View style={styles.container}>
      <Header title="Notifications & Alerts" onBack={() => setCurrentScreen('Home')} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {MOCK_NOTIFICATIONS.map((item) => (
          <TouchableOpacity key={item.id} style={[styles.card, !item.read && styles.unreadCard]} activeOpacity={0.8}>
            <View style={styles.iconBox}>
              <Ionicons
                name={item.type === 'review_request' ? 'alert-circle' : 'notifications'}
                size={20}
                color={item.type === 'review_request' ? Colors.secondary : Colors.primary}
              />
            </View>

            <View style={styles.textWrapper}>
              <View style={styles.titleRow}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
              <Text style={styles.message}>{item.message}</Text>
            </View>
          </TouchableOpacity>
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
    paddingBottom: 110,
    gap: Spacing.sm,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceLow,
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
    borderRadius: BorderRadii.md,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  unreadCard: {
    borderColor: Colors.primary,
    backgroundColor: Colors.surfaceContainer,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: BorderRadii.sm,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrapper: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  title: {
    ...Typography.bodyMd,
    fontWeight: '800',
    color: Colors.onBackground,
  },
  time: {
    ...Typography.caption,
    fontSize: 10,
    color: Colors.mutedText,
  },
  message: {
    ...Typography.caption,
    color: Colors.mutedText,
  },
});
