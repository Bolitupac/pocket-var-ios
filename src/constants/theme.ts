// Pocket VAR Design Tokens - Kinetic Precision & Liquid Glass iOS Theme

export const Colors = {
  // Kinetic Precision Palette
  background: '#0E0E0E',
  surface: '#131313',
  surfaceLow: '#1C1B1B',
  surfaceContainer: '#201F1F',
  surfaceHigh: '#2A2A2A',
  surfaceHighest: '#353534',
  
  // High contrast text
  onBackground: '#E5E2E1',
  onSurface: '#E5E2E1',
  onSurfaceVariant: '#C4C9AC',
  mutedText: '#8E9379',
  
  // Primary (Electric Lime for active states, primary actions)
  primary: '#C3F400',
  primaryActive: '#ABD600',
  onPrimary: '#161E00',
  
  // Secondary (Ignite Orange for warnings, live indicators)
  secondary: '#FF5708',
  onSecondary: '#390C00',
  
  // Functional / Sports colors
  liveRed: '#FF3B30',
  warningGold: '#EAB308',
  infoBlue: '#3B82F6',
  successGreen: '#22C55E',
  
  // Glassmorphism & Liquid Glass
  glassBackground: 'rgba(20, 20, 22, 0.78)',
  glassCardBackground: 'rgba(28, 27, 27, 0.85)',
  glassBorder: 'rgba(255, 255, 255, 0.12)',
  glassActiveBorder: '#C3F400',
  overlayDark: 'rgba(0, 0, 0, 0.85)',
  overlayLight: 'rgba(255, 255, 255, 0.08)',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  touchTargetMin: 48,
};

export const BorderRadii = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  pill: 9999,
};

export const Typography = {
  displayLg: {
    fontSize: 32,
    fontWeight: '800' as const,
    letterSpacing: -0.5,
  },
  headlineLg: {
    fontSize: 24,
    fontWeight: '700' as const,
    letterSpacing: -0.3,
  },
  headlineMd: {
    fontSize: 18,
    fontWeight: '700' as const,
  },
  bodyLg: {
    fontSize: 16,
    fontWeight: '400' as const,
  },
  bodyMd: {
    fontSize: 14,
    fontWeight: '400' as const,
  },
  caption: {
    fontSize: 12,
    fontWeight: '500' as const,
  },
  monoData: {
    fontSize: 14,
    fontWeight: '700' as const,
  },
};
