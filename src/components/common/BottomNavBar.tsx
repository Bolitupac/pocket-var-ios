import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../../constants/theme';
import { ScreenName } from '../../types';

interface BottomNavBarProps {
  currentScreen: ScreenName;
  setCurrentScreen: (screen: ScreenName) => void;
  onPlusPress: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentScreen,
  setCurrentScreen,
  onPlusPress,
}) => {
  const tabs = [
    { name: 'Home', icon: 'home', screen: 'Home' as const },
    { name: 'Alerts', icon: 'notifications', screen: 'Notifications' as const },
    { name: 'PlusPlaceholder', icon: 'add', screen: null },
    { name: 'Highlights', icon: 'film', screen: 'Timeline' as const },
    { name: 'Settings', icon: 'settings', screen: 'Settings' as const },
  ];

  const renderTab = (tab: typeof tabs[0], index: number) => {
    if (tab.screen === null) {
      return (
        <TouchableOpacity
          key={`tab-${index}`}
          style={styles.floatingPlusBtn}
          onPress={onPlusPress}
          activeOpacity={0.85}
        >
          <Ionicons name="add" size={32} color={Colors.onBackground} />
        </TouchableOpacity>
      );
    }

    const isActive = currentScreen === tab.screen;

    return (
      <TouchableOpacity
        key={`tab-${index}`}
        style={styles.navTab}
        onPress={() => setCurrentScreen(tab.screen!)}
        activeOpacity={0.7}
      >
        <Ionicons
          name={isActive ? (tab.icon as any) : (`${tab.icon}-outline` as any)}
          size={22}
          color={isActive ? Colors.primary : Colors.mutedText}
        />
        <Text style={[styles.navText, isActive && { color: Colors.primary }]}>
          {tab.name}
        </Text>
        {isActive && <View style={styles.activeDot} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        {tabs.map((tab, idx) => renderTab(tab, idx))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 28,
    left: 16,
    right: 16,
    height: 72,
    zIndex: 1000,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: 'rgba(20, 20, 22, 0.85)',
    overflow: 'hidden',
  },
  nav: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: Spacing.xs,
  },
  navTab: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 54,
    height: '100%',
    position: 'relative',
    paddingBottom: 4,
  },
  navText: {
    ...Typography.caption,
    fontSize: 9,
    color: Colors.mutedText,
    marginTop: 2,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
    position: 'absolute',
    bottom: 6,
    alignSelf: 'center',
  },
  floatingPlusBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    top: -16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
});
