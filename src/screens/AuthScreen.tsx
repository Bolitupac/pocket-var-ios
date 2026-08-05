import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadii, Typography } from '../constants/theme';
import { useApp } from '../store/AppContext';
import { Button } from '../components/common/Button';

export const AuthScreen: React.FC = () => {
  const { login } = useApp();
  const [email, setEmail] = useState<string>('referee@pocketvar.app');
  const [role, setRole] = useState<'referee' | 'camera_operator' | 'coach'>('referee');

  const handleLogin = () => {
    login(email);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoBadge}>
          <Ionicons name="shield-checkmark" size={36} color={Colors.onPrimary} />
        </View>
        <Text style={styles.title}>Welcome to Pocket VAR</Text>
        <Text style={styles.subtitle}>Sign in to access your referee dashboard and camera network.</Text>
      </View>

      {/* Role Selection Tabs */}
      <View style={styles.roleContainer}>
        <Text style={styles.fieldLabel}>SELECT YOUR ROLE:</Text>
        <View style={styles.roleTabs}>
          <TouchableOpacity
            style={[styles.roleTab, role === 'referee' && styles.roleTabActive]}
            onPress={() => setRole('referee')}
          >
            <Text style={[styles.roleText, role === 'referee' && styles.roleTextActive]}>REFEREE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.roleTab, role === 'camera_operator' && styles.roleTabActive]}
            onPress={() => setRole('camera_operator')}
          >
            <Text style={[styles.roleText, role === 'camera_operator' && styles.roleTextActive]}>CAM OPERATOR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.roleTab, role === 'coach' && styles.roleTabActive]}
            onPress={() => setRole('coach')}
          >
            <Text style={[styles.roleText, role === 'coach' && styles.roleTextActive]}>COACH / ANALYST</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Input Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.fieldLabel}>EMAIL ADDRESS:</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="mail-outline" size={20} color={Colors.mutedText} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="enter your email..."
            placeholderTextColor={Colors.mutedText}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      {/* Actions */}
      <View style={styles.footer}>
        <Button title="CONTINUE WITH EMAIL" onPress={handleLogin} variant="primary" />
        <Button
          title="CONTINUE AS GUEST OPERATOR"
          onPress={handleLogin}
          variant="secondary"
          style={{ marginTop: Spacing.sm }}
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
  header: {
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
  logoBadge: {
    width: 64,
    height: 64,
    borderRadius: BorderRadii.lg,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    ...Typography.headlineLg,
    color: Colors.onBackground,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.bodyMd,
    color: Colors.mutedText,
    textAlign: 'center',
  },
  roleContainer: {
    marginVertical: Spacing.md,
  },
  fieldLabel: {
    ...Typography.caption,
    fontSize: 10,
    fontWeight: '800',
    color: Colors.mutedText,
    marginBottom: Spacing.xs,
    letterSpacing: 0.5,
  },
  roleTabs: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceLow,
    borderRadius: BorderRadii.md,
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
    padding: 4,
    gap: 4,
  },
  roleTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: BorderRadii.xs,
  },
  roleTabActive: {
    backgroundColor: Colors.primary,
  },
  roleText: {
    ...Typography.caption,
    fontSize: 10,
    fontWeight: '700',
    color: Colors.onBackground,
  },
  roleTextActive: {
    color: Colors.onPrimary,
  },
  inputContainer: {
    marginVertical: Spacing.sm,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceLow,
    borderWidth: 1,
    borderColor: Colors.surfaceHigh,
    borderRadius: BorderRadii.md,
    paddingHorizontal: Spacing.md,
    height: 52,
  },
  inputIcon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    color: Colors.onBackground,
    fontSize: 15,
  },
  footer: {
    marginBottom: Spacing.md,
  },
});
