import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  SafeAreaView, 
  ActivityIndicator 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [facing, setFacing] = useState('back');
  const [torch, setTorch] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [gridVisible, setGridVisible] = useState(false);

  // 1. Handle loading state while permission check completes
  if (!permission) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar style="light" />
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Initializing camera...</Text>
      </View>
    );
  }

  // 2. Handle state where camera permission is not granted yet
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <StatusBar style="light" />
        <View style={styles.permissionCard}>
          <View style={styles.iconCircle}>
            <Ionicons name="camera" size={48} color="#3b82f6" />
          </View>
          <Text style={styles.permissionTitle}>Camera Access Needed</Text>
          <Text style={styles.permissionText}>
            We need your permission to access the camera so you can preview the feed live in the app.
          </Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission} activeOpacity={0.8}>
            <Text style={styles.permissionButtonText}>Allow Camera Access</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // 3. Helper functions for controls
  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  function toggleTorch() {
    setTorch(current => !current);
  }

  function toggleGrid() {
    setGridVisible(current => !current);
  }

  // 4. Render main premium Camera UI
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header Area */}
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>POCKET-VAR</Text>
          <Text style={styles.headerSubtitle}>VIEWFINDER</Text>
        </View>
        <TouchableOpacity style={styles.iconButton} onPress={toggleTorch} activeOpacity={0.7}>
          <Ionicons 
            name={torch ? "flash" : "flash-off"} 
            size={22} 
            color={torch ? "#eab308" : "#ffffff"} 
          />
        </TouchableOpacity>
      </View>

      {/* Main Camera Viewport Panel */}
      <View style={styles.viewportContainer}>
        <CameraView 
          style={styles.camera} 
          facing={facing}
          enableTorch={torch}
        >
          {/* Rule of Thirds Grid Overlay */}
          {gridVisible && (
            <View style={styles.gridOverlay}>
              <View style={styles.gridRow}>
                <View style={styles.gridCell} />
                <View style={[styles.gridCell, styles.borderLeftRight]} />
                <View style={styles.gridCell} />
              </View>
              <View style={[styles.gridRow, styles.borderTopBottom]}>
                <View style={styles.gridCell} />
                <View style={[styles.gridCell, styles.borderLeftRight]} />
                <View style={styles.gridCell} />
              </View>
              <View style={styles.gridRow}>
                <View style={styles.gridCell} />
                <View style={[styles.gridCell, styles.borderLeftRight]} />
                <View style={styles.gridCell} />
              </View>
            </View>
          )}

          {/* Dynamic HUD badges overlaying the camera preview */}
          <View style={styles.hudOverlay}>
            <View style={styles.hudBadge}>
              <View style={styles.redDot} />
              <Text style={styles.hudText}>REC PREVIEW</Text>
            </View>
            <View style={styles.hudBadge}>
              <Text style={styles.hudText}>{facing.toUpperCase()} CAM</Text>
            </View>
          </View>
        </CameraView>
      </View>

      {/* Bottom control deck */}
      <View style={styles.controlsContainer}>
        <View style={styles.controlRow}>
          {/* Grid View toggle */}
          <TouchableOpacity 
            style={[styles.sideButton, gridVisible && styles.sideButtonActive]} 
            onPress={toggleGrid}
            activeOpacity={0.7}
          >
            <Ionicons name="grid-outline" size={24} color={gridVisible ? "#3b82f6" : "#ffffff"} />
          </TouchableOpacity>

          {/* Custom iOS Shutter button structure */}
          <View style={styles.shutterOuter}>
            <TouchableOpacity style={styles.shutterInner} activeOpacity={0.85}>
              <View style={styles.shutterCenter} />
            </TouchableOpacity>
          </View>

          {/* Camera Lens Flip Button */}
          <TouchableOpacity style={styles.sideButton} onPress={toggleCameraFacing} activeOpacity={0.7}>
            <Ionicons name="camera-reverse-outline" size={26} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Global Container
  container: {
    flex: 1,
    backgroundColor: '#09090b', // Deep zinc/black premium background
  },
  
  // Loading State
  loadingContainer: {
    flex: 1,
    backgroundColor: '#09090b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#a1a1aa',
    fontSize: 14,
    fontWeight: '500',
  },

  // Permissions Screen
  permissionContainer: {
    flex: 1,
    backgroundColor: '#09090b',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  permissionCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#18181b', // Zinc-900 card
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#27272a',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  permissionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  permissionText: {
    fontSize: 14,
    color: '#a1a1aa',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  permissionButton: {
    width: '100%',
    height: 50,
    borderRadius: 14,
    backgroundColor: '#3b82f6', // Premium iOS blue
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  permissionButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },

  // Main UI Header
  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 8,
  },
  headerTitleContainer: {
    flexDirection: 'column',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 2,
  },
  headerSubtitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#3b82f6',
    letterSpacing: 4,
    marginTop: 1,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#18181b',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#27272a',
  },

  // Viewport Area
  viewportContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: '#27272a',
  },
  camera: {
    flex: 1,
  },

  // Grid Overlay Styles
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  gridRow: {
    flex: 1,
    flexDirection: 'row',
  },
  gridCell: {
    flex: 1,
  },
  borderLeftRight: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  borderTopBottom: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },

  // HUD Badges
  hudOverlay: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hudBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(9, 9, 11, 0.75)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  redDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ef4444',
    marginRight: 6,
  },
  hudText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 1,
  },

  // Control Deck
  controlsContainer: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 16,
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 40,
  },
  sideButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#18181b',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#27272a',
  },
  sideButtonActive: {
    borderColor: 'rgba(59, 130, 246, 0.4)',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  
  // Circular Shutter Button structure
  shutterOuter: {
    width: 78,
    height: 78,
    borderRadius: 39,
    borderWidth: 4,
    borderColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  shutterInner: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shutterCenter: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#ffffff',
  },
});
