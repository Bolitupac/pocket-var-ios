import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AppProvider } from './src/store/AppContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { Colors } from './src/constants/theme';

export default function App() {
  return (
    <AppProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" backgroundColor={Colors.background} />
        <AppNavigator />
      </SafeAreaView>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: RNStatusBar.currentHeight || 0,
  },
});
