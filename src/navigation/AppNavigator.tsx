import React, { useState } from 'react';
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
import { BottomSheet } from '../components/common/BottomSheet';
import { BottomNavBar } from '../components/common/BottomNavBar';
import { Colors } from '../constants/theme';

export const AppNavigator: React.FC = () => {
  const { currentScreen, setCurrentScreen, matches, startRecording } = useApp();
  const [bottomSheetVisible, setBottomSheetVisible] = useState<boolean>(false);

  const showTabBar = ['Home', 'Notifications', 'Timeline', 'Settings'].includes(currentScreen);

  const handleStartRecord = (match: any) => {
    startRecording(match);
    setCurrentScreen('CameraView');
  };

  const quickActions = [
    {
      id: 'create_match',
      title: 'Create Match',
      subtitle: 'Set up teams, venue, and recording mode',
      icon: 'add-circle-outline' as const,
      color: Colors.primary,
      onPress: () => {
        setBottomSheetVisible(false);
        setCurrentScreen('CreateMatch');
      },
    },
    {
      id: 'join_match',
      title: 'Join Match as 2nd Camera',
      subtitle: 'Connect smartphone angle using match code',
      icon: 'qr-code-outline' as const,
      onPress: () => {
        setBottomSheetVisible(false);
        setCurrentScreen('JoinMatch');
      },
    },
    {
      id: 'continue_match',
      title: 'Continue Active Match',
      subtitle: 'Resume live recording or review feed',
      icon: 'play-circle-outline' as const,
      onPress: () => {
        setBottomSheetVisible(false);
        if (matches.length > 0) {
          handleStartRecord(matches[0]);
        } else {
          setCurrentScreen('CreateMatch');
        }
      },
    },
  ];

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

  return (
    <View style={styles.container}>
      {renderScreen()}

      {showTabBar && (
        <BottomNavBar
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          onPlusPress={() => setBottomSheetVisible(true)}
        />
      )}

      {showTabBar && (
        <BottomSheet
          visible={bottomSheetVisible}
          onClose={() => setBottomSheetVisible(false)}
          actions={quickActions}
          title="Pocket VAR Menu"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
