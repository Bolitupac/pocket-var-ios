import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  SafeAreaView, 
  ActivityIndicator,
  ScrollView,
  useWindowDimensions
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

const mockClips = [
  { id: '1', type: 'Goal Event', timestamp: '14:20', angles: 3 },
  { id: '2', type: 'Foul Event', timestamp: '32:45', angles: 4 },
  { id: '3', type: 'Offside Event', timestamp: '45:10', angles: 2 },
  { id: '4', type: 'Action Highlight', timestamp: '78:15', angles: 3 },
];

export default function App() {
  const [facing, setFacing] = useState('back');
  const [torch, setTorch] = useState(false);
  const [zoom, setZoom] = useState(0); // 0 to 1
  const [permission, requestPermission] = useCameraPermissions();
  const [currentScreen, setCurrentScreen] = useState('camera');

  // Listen to dimension changes to dynamically respond to orientation
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  // Handle loading state while permission check completes
  if (!permission) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar style="light" />
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Initializing camera...</Text>
      </View>
    );
  }

  // Handle state where camera permission is not granted yet
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <StatusBar style="light" />
        <View style={styles.permissionCard}>
          <Ionicons name="camera" size={48} color="#ffffff" />
          <Text style={styles.permissionTitle}>Camera Access Required</Text>
          <Text style={styles.permissionText}>
            Please grant camera permission to use the match viewfinder.
          </Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Allow Camera</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  function toggleTorch() {
    setTorch(current => !current);
  }

  function zoomIn() {
    setZoom(prev => Math.min(prev + 0.1, 1));
  }

  function zoomOut() {
    setZoom(prev => Math.max(prev - 0.1, 0));
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {currentScreen === 'camera' ? (
        <View style={isLandscape ? styles.landscapeLayout : styles.portraitLayout}>
          
          {/* Camera Viewport Area */}
          <View style={styles.viewportContainer}>
            <CameraView 
              style={styles.camera} 
              facing={facing}
              enableTorch={torch}
              zoom={zoom}
            >
              {/* Permanent Grid Overlay (Rule of Thirds) */}
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

              {/* HUD / Status Indicators */}
              <View style={styles.hudOverlay}>
                <View style={styles.hudBadge}>
                  <View style={styles.redDot} />
                  <Text style={styles.hudText}>POCKET VAR • LIVE PREVIEW</Text>
                </View>
                <View style={styles.hudBadge}>
                  <Text style={styles.hudText}>ZOOM: {Math.round(zoom * 100)}%</Text>
                </View>
              </View>

              {/* Simple Torch toggle on viewfinder */}
              <TouchableOpacity style={styles.torchButton} onPress={toggleTorch}>
                <Ionicons 
                  name={torch ? "flash" : "flash-off"} 
                  size={20} 
                  color={torch ? "#eab308" : "#ffffff"} 
                />
              </TouchableOpacity>

              {/* Zoom Controls Panel */}
              <View style={styles.zoomControls}>
                <TouchableOpacity style={styles.zoomBtn} onPress={zoomOut}>
                  <Text style={styles.zoomBtnText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.zoomPreset} onPress={() => setZoom(0)}>
                  <Text style={[styles.zoomPresetText, zoom === 0 && styles.activeZoomPreset]}>1x</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.zoomPreset} onPress={() => setZoom(0.2)}>
                  <Text style={[styles.zoomPresetText, zoom === 0.2 && styles.activeZoomPreset]}>2x</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.zoomPreset} onPress={() => setZoom(0.5)}>
                  <Text style={[styles.zoomPresetText, zoom === 0.5 && styles.activeZoomPreset]}>5x</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.zoomBtn} onPress={zoomIn}>
                  <Text style={styles.zoomBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </CameraView>
          </View>

          {/* Simple Control Bar */}
          <View style={isLandscape ? styles.controlsLandscape : styles.controlsPortrait}>
            <View style={isLandscape ? styles.controlColLandscape : styles.controlRowPortrait}>
              
              {/* Bottom Left / Top: Review button */}
              <TouchableOpacity style={styles.basicButton} onPress={() => setCurrentScreen('review')}>
                <Ionicons name="albums" size={24} color="#ffffff" />
                <Text style={styles.basicButtonText}>Review</Text>
              </TouchableOpacity>

              {/* Center: Shutter Button (Mock record event) */}
              <View style={styles.shutterButton}>
                <View style={styles.shutterInner} />
              </View>

              {/* Bottom Right / Bottom: Flip Lens button */}
              <TouchableOpacity style={styles.basicButton} onPress={toggleCameraFacing}>
                <Ionicons name="camera-reverse" size={24} color="#ffffff" />
                <Text style={styles.basicButtonText}>Flip</Text>
              </TouchableOpacity>

            </View>
          </View>

        </View>
      ) : (
        /* Review Screen */
        <View style={styles.reviewContainer}>
          <View style={styles.reviewHeader}>
            <TouchableOpacity onPress={() => setCurrentScreen('camera')} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#ffffff" />
              <Text style={styles.backButtonText}>Viewfinder</Text>
            </TouchableOpacity>
            <Text style={styles.reviewTitle}>Match Clip Review</Text>
            <View style={{ width: 80 }} />
          </View>

          <ScrollView contentContainerStyle={styles.clipsListContent} style={styles.clipsList}>
            <Text style={styles.sectionHeader}>Pocket VAR Matches & Clips</Text>
            {mockClips.map((clip) => (
              <View key={clip.id} style={styles.clipCard}>
                <View style={styles.clipInfo}>
                  <Text style={styles.clipType}>{clip.type}</Text>
                  <Text style={styles.clipMeta}>Timestamp: {clip.timestamp} | {clip.angles} Angles Synced</Text>
                </View>
                <TouchableOpacity style={styles.playButton}>
                  <Ionicons name="play" size={16} color="#ffffff" />
                  <Text style={styles.playButtonText}>Replay</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Global Container
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  // Loading Screen
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#ffffff',
    fontSize: 14,
  },

  // Permissions Screen
  permissionContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionCard: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: '#111111',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  permissionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  permissionText: {
    fontSize: 13,
    color: '#aaaaaa',
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
  },
  permissionButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },

  // Screen Layouts
  portraitLayout: {
    flex: 1,
    flexDirection: 'column',
  },
  landscapeLayout: {
    flex: 1,
    flexDirection: 'row',
  },

  // Viewport
  viewportContainer: {
    flex: 1,
    backgroundColor: '#000000',
    position: 'relative',
  },
  camera: {
    flex: 1,
  },

  // Grid lines (Permanent)
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
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  borderTopBottom: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },

  // Viewfinder HUD
  hudOverlay: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hudBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  redDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ff3b30',
    marginRight: 6,
  },
  hudText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },

  // Torch Button
  torchButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Zoom Controls Panel
  zoomControls: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 8,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#333333',
  },
  zoomBtn: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  zoomBtnText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  zoomPreset: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  zoomPresetText: {
    color: '#888888',
    fontSize: 13,
  },
  activeZoomPreset: {
    color: '#3b82f6',
    fontWeight: 'bold',
  },

  // Basic Controls Layout
  controlsPortrait: {
    height: 100,
    backgroundColor: '#000000',
    justifyContent: 'center',
  },
  controlsLandscape: {
    width: 100,
    backgroundColor: '#000000',
    justifyContent: 'center',
  },
  controlRowPortrait: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  controlColLandscape: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 30,
    height: '100%',
  },

  // Buttons style
  basicButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 50,
  },
  basicButtonText: {
    color: '#ffffff',
    fontSize: 10,
    marginTop: 4,
  },
  shutterButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shutterInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ff3b30',
  },

  // Review Screen Styles
  reviewContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#222222',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 14,
    marginLeft: 6,
  },
  reviewTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clipsList: {
    flex: 1,
  },
  clipsListContent: {
    padding: 16,
  },
  sectionHeader: {
    color: '#888888',
    fontSize: 13,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  clipCard: {
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#222222',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  clipInfo: {
    flex: 1,
    marginRight: 12,
  },
  clipType: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  clipMeta: {
    color: '#888888',
    fontSize: 12,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222222',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  playButtonText: {
    color: '#ffffff',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
});
