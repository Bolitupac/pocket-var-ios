import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/common/Header';
import { Button } from '../components/common/Button';
import { Colors, Spacing, BorderRadii, Typography } from '../constants/theme';
import { useApp } from '../store/AppContext';

export const JoinMatchScreen: React.FC = () => {
  const { setCurrentScreen, joinMatchByCode, startRecording } = useApp();
  const [matchCode, setMatchCode] = useState<string>('PV-8921');

  const handleJoin = () => {
    if (!matchCode.trim()) {
      Alert.alert('Invalid Code', 'Please enter a valid match code (e.g. PV-8921)');
      return;
    }

    const match = joinMatchByCode(matchCode);
    if (match) {
      startRecording(match);
      setCurrentScreen('CameraView');
    } else {
      Alert.alert('Match Not Found', `No active session found for code "${matchCode}". Please check code.`);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Join Match Session"
        subtitle="Connect as secondary camera operator"
        onBack={() => setCurrentScreen('Home')}
      />

      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="qr-code-outline" size={48} color={Colors.primary} />
        </View>

        <Text style={styles.title}>Enter Match Sync Code</Text>
        <Text style={styles.subtitle}>
          Ask the primary referee or main camera operator for their 6-character match pairing code.
        </Text>

        <View style={styles.inputBox}>
          <TextInput
            style={styles.codeInput}
            value={matchCode}
            onChangeText={setMatchCode}
            placeholder="PV-XXXX"
            placeholderTextColor={Colors.mutedText}
            autoCapitalize="characters"
            maxLength={7}
          />
        </View>

        <View style={styles.infoCard}>
          <Ionicons name="wifi-outline" size={20} color={Colors.primary} />
          <View style={styles.infoTextGroup}>
            <Text style={styles.infoTitle}>Local Wi-Fi / Bluetooth Sync</Text>
            <Text style={styles.infoSub}>Ensure your device is connected to the same pitch network.</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Button title="CONNECT CAMERA" onPress={handleJoin} variant="primary" />
          <Button
            title="SCAN QR CODE"
            onPress={() => Alert.alert('QR Scanner', 'Camera QR code scanner active')}
            variant="secondary"
            style={{ marginTop: Spacing.sm }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.surfaceLow,
    borderWidth: 2,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    ...Typography.headlineLg,
    color: Colors.onBackground,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    ...Typography.bodyMd,
    color: Colors.mutedText,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  inputBox: {
    width: '100%',
    backgroundColor: Colors.surfaceLow,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: BorderRadii.md,
    paddingHorizontal: Spacing.md,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  codeInput: {
    ...Typography.monoData,
    fontSize: 24,
    color: Colors.primary,
    letterSpacing: 4,
    textAlign: 'center',
    width: '100%',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceLow,
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
    borderRadius: BorderRadii.md,
    padding: Spacing.md,
    gap: Spacing.md,
    width: '100%',
    marginBottom: Spacing.xl,
  },
  infoTextGroup: {
    flex: 1,
  },
  infoTitle: {
    ...Typography.bodyMd,
    fontWeight: '700',
    color: Colors.onBackground,
  },
  infoSub: {
    ...Typography.caption,
    color: Colors.mutedText,
  },
  footer: {
    width: '100%',
  },
});
