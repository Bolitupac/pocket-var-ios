import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useApp } from '../store/AppContext';
import { SplashScreen } from '../screens/SplashScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { AuthScreen } from '../screens/AuthScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { CreateMatchScreen } from '../screens/CreateMatchScreen';
import { JoinMatchScreen } from '../screens/JoinMatchScreen';
import { CameraViewScreen } from '../screens/CameraViewScreen';
import { ReplayViewerScreen } from '../screens/ReplayViewerScreen';
import { TimelineScreen } from '../screens/TimelineScreen';
import { MatchDetailsScreen } from '../screens/MatchDetailsScreen';
import { UserProfileScreen } from '../screens/UserProfileScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { HelpSupportScreen } from '../screens/HelpSupportScreen';
import { Colors } from '../constants/theme';

export const AppNavigator: React.FC = () => {
  const { currentScreen } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Splash':
        return <SplashScreen />;
      case 'Onboarding':
        return <OnboardingScreen />;
      case 'Auth':
        return <AuthScreen />;
      case 'Home':
        return <HomeScreen />;
      case 'MatchDashboard':
      case 'MatchDetails':
        return <MatchDetailsScreen />;
      case 'CreateMatch':
        return <CreateMatchScreen />;
      case 'JoinMatch':
        return <JoinMatchScreen />;
      case 'CameraView':
      case 'Recording':
        return <CameraViewScreen />;
      case 'ReplayViewer':
        return <ReplayViewerScreen />;
      case 'Timeline':
        return <TimelineScreen />;
      case 'UserProfile':
        return <UserProfileScreen />;
      case 'Settings':
        return <SettingsScreen />;
      case 'Notifications':
        return <NotificationsScreen />;
      case 'HelpSupport':
        return <HelpSupportScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return <View style={styles.container}>{renderScreen()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
