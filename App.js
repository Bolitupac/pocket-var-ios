import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  SafeAreaView, 
  ActivityIndicator,
  ScrollView,
  useWindowDimensions,
  Animated,
  TextInput
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
  const [currentScreen, setCurrentScreen] = useState('createMatch'); // Default first page
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [stadium, setStadium] = useState('');
  const [activeMatch, setActiveMatch] = useState(null);

  // Camera settings state
  const [facing, setFacing] = useState('back');
  const [torch, setTorch] = useState(false);
  const [zoom, setZoom] = useState(0); // 0 to 1
  const [lens, setLens] = useState('builtInWideAngleCamera');
  const [permission, requestPermission] = useCameraPermissions();
  
  // Events state
  const [eventsExpanded, setEventsExpanded] = useState(false);
  const [loggedEvent, setLoggedEvent] = useState(null);

  // ScrollView ref for the zoom wheel dial
  const scrollDialRef = useRef(null);
  const isUpdatingFromPreset = useRef(false);

  // Listen to dimension changes for orientation responsiveness
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  // Rotation animation style for buttons to rotate in place based on orientation
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isLandscape ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isLandscape]);

  const buttonRotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-90deg'],
  });

  const animatedButtonStyle = {
    transform: [{ rotate: buttonRotation }],
  };

  // Create match action
  function handleCreateMatch() {
    if (!team1.trim() || !team2.trim() || !stadium.trim()) {
      alert('Please fill in both teams and the stadium name.');
      return;
    }
    setActiveMatch({
      team1: team1.trim(),
      team2: team2.trim(),
      stadium: stadium.trim()
    });
    setCurrentScreen('camera');
  }

  // Trigger simulated event logging toast
  function logEvent(eventType) {
    setLoggedEvent(eventType);
    setEventsExpanded(false);
    setTimeout(() => {
      setLoggedEvent(null);
    }, 2500);
  }

  // Handle loading state
  if (!permission) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar style="light" />
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Initializing camera...</Text>
      </View>
    );
  }

  // Handle state where camera permission is not granted (only checks if trying to access Camera)
  if (currentScreen === 'camera' && !permission.granted) {
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
          <TouchableOpacity style={styles.permissionBackLink} onPress={() => setCurrentScreen('createMatch')}>
            <Text style={styles.permissionBackLinkText}>Back to Setup</Text>
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

  // Handle scroll events on the zoom wheel
  const DIAL_STEP = 15;
  const MAX_SCROLL = 10 * DIAL_STEP;

  function handleDialScroll(event) {
    if (isUpdatingFromPreset.current) return;
    const offsetX = event.nativeEvent.contentOffset.x;
    const ratio = Math.min(Math.max(offsetX / MAX_SCROLL, 0), 1);
    setZoom(ratio);
    if (lens !== 'builtInWideAngleCamera') {
      setLens('builtInWideAngleCamera');
    }
  }

  // Sync scroll wheel when selecting predefined zoom options
  function selectZoomPreset(zoomVal, lensVal = 'builtInWideAngleCamera') {
    isUpdatingFromPreset.current = true;
    setLens(lensVal);
    setZoom(zoomVal);
    
    if (scrollDialRef.current) {
      const targetX = zoomVal * MAX_SCROLL;
      scrollDialRef.current.scrollTo({ x: targetX, animated: true });
    }
    
    setTimeout(() => {
      isUpdatingFromPreset.current = false;
    }, 350);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {currentScreen === 'createMatch' ? (
        /* 1. Create Match Page (Default screen) */
        <ScrollView contentContainerStyle={styles.createMatchScroll} keyboardShouldPersistTaps="handled">
          <View style={styles.brandContainer}>
            <Ionicons name="football" size={48} color="#3b82f6" />
            <Text style={styles.brandTitle}>POCKET VAR</Text>
            <Text style={styles.brandSubtitle}>Grassroots Football Technology</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Create Match Session</Text>
            
            <Text style={styles.inputLabel}>Home Team</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. United FC"
              placeholderTextColor="#555555"
              value={team1}
              onChangeText={setTeam1}
              autoCapitalize="words"
            />

            <Text style={styles.inputLabel}>Away Team</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. Rovers FC"
              placeholderTextColor="#555555"
              value={team2}
              onChangeText={setTeam2}
              autoCapitalize="words"
            />

            <Text style={styles.inputLabel}>Stadium / Pitch Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. Central Pitch A"
              placeholderTextColor="#555555"
              value={stadium}
              onChangeText={setStadium}
              autoCapitalize="words"
            />

            <TouchableOpacity style={styles.createButton} onPress={handleCreateMatch}>
              <Text style={styles.createButtonText}>Create & Open Camera</Text>
              <Ionicons name="arrow-forward" size={16} color="#ffffff" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : currentScreen === 'camera' ? (
        /* 2. Camera Viewfinder Screen */
        <View style={styles.cameraLayoutContainer}>
          
          {/* Header Bar with Back Button & Active Match Details */}
          <View style={styles.cameraHeader}>
            <Animated.View style={animatedButtonStyle}>
              <TouchableOpacity 
                style={styles.headerBackBtn} 
                onPress={() => setCurrentScreen('createMatch')}
              >
                <Ionicons name="chevron-back" size={24} color="#ffffff" />
                <Text style={styles.headerBackText}>Exit</Text>
              </TouchableOpacity>
            </Animated.View>
            
            <View style={styles.matchHeaderInfo}>
              <Text style={styles.matchHeaderTeams} numberOfLines={1}>
                {activeMatch ? `${activeMatch.team1} vs ${activeMatch.team2}` : 'Match Preview'}
              </Text>
              <Text style={styles.matchHeaderStadium} numberOfLines={1}>
                {activeMatch ? `@ ${activeMatch.stadium}` : ''}
              </Text>
            </View>

            <View style={{ width: 60 }} />
          </View>

          <View style={isLandscape ? styles.landscapeLayout : styles.portraitLayout}>
            
            {/* Camera Viewport Area */}
            <View style={styles.viewportContainer}>
              <CameraView 
                style={styles.camera} 
                facing={facing}
                enableTorch={torch}
                zoom={zoom}
                selectedLens={lens}
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
                    <Text style={styles.hudText}>POCKET VAR • LIVE</Text>
                  </View>
                  <View style={styles.hudBadge}>
                    <Text style={styles.hudText}>
                      {lens === 'builtInUltraWideCamera' ? '0.5x (ULTRA-WIDE)' : `${(1 + zoom * 4).toFixed(1)}x (WIDE)`}
                    </Text>
                  </View>
                </View>

                {/* Event Logged Toast Banner */}
                {loggedEvent && (
                  <View style={styles.loggedToast}>
                    <Ionicons name="bookmark" size={16} color="#eab308" />
                    <Text style={styles.loggedToastText}>Event Marked: {loggedEvent}</Text>
                  </View>
                )}

                {/* Controls overlaid directly on the Viewfinder */}
                <View style={styles.rightOverlayControls}>
                  {/* Flash Button */}
                  <Animated.View style={animatedButtonStyle}>
                    <TouchableOpacity style={styles.viewfinderIconBtn} onPress={toggleTorch}>
                      <Ionicons 
                        name={torch ? "flash" : "flash-off"} 
                        size={20} 
                        color={torch ? "#eab308" : "#ffffff"} 
                      />
                    </TouchableOpacity>
                  </Animated.View>

                  {/* Expandable Event Logger Button */}
                  <View style={styles.eventsContainer}>
                    <Animated.View style={animatedButtonStyle}>
                      <TouchableOpacity 
                        style={[styles.viewfinderIconBtn, styles.eventsToggleBtn, eventsExpanded && styles.eventsToggleBtnActive]} 
                        onPress={() => setEventsExpanded(!eventsExpanded)}
                      >
                        <Ionicons name="flag" size={18} color={eventsExpanded ? "#3b82f6" : "#ffffff"} />
                      </TouchableOpacity>
                    </Animated.View>

                    {/* Expanded Event Selection Menu */}
                    {eventsExpanded && (
                      <View style={styles.eventsMenu}>
                        <TouchableOpacity style={styles.eventItem} onPress={() => logEvent('Goal')}>
                          <Text style={styles.eventEmoji}>⚽</Text>
                          <Text style={styles.eventLabel}>Goal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.eventItem} onPress={() => logEvent('Foul')}>
                          <Text style={styles.eventEmoji}>⚠️</Text>
                          <Text style={styles.eventLabel}>Foul</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.eventItem} onPress={() => logEvent('Yellow Card')}>
                          <Text style={styles.eventEmoji}>🟨</Text>
                          <Text style={styles.eventLabel}>Yellow</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.eventItem} onPress={() => logEvent('Red Card')}>
                          <Text style={styles.eventEmoji}>🟥</Text>
                          <Text style={styles.eventLabel}>Red</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.eventItem} onPress={() => logEvent('Offside')}>
                          <Text style={styles.eventEmoji}>🚩</Text>
                          <Text style={styles.eventLabel}>Offside</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>

                {/* Zoom Controls Area: Includes Presets & Scroll Dial Wheel */}
                <View style={styles.zoomSection}>
                  {/* Preset Zoom Selectors */}
                  <View style={styles.zoomPresetRow}>
                    <TouchableOpacity 
                      style={[styles.zoomPresetBubble, lens === 'builtInUltraWideCamera' && styles.zoomPresetBubbleActive]} 
                      onPress={() => selectZoomPreset(0, 'builtInUltraWideCamera')}
                    >
                      <Text style={styles.zoomPresetBubbleText}>0.5x</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[styles.zoomPresetBubble, lens === 'builtInWideAngleCamera' && zoom === 0 && styles.zoomPresetBubbleActive]} 
                      onPress={() => selectZoomPreset(0)}
                    >
                      <Text style={styles.zoomPresetBubbleText}>1x</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={[styles.zoomPresetBubble, lens === 'builtInWideAngleCamera' && zoom === 0.25 && styles.zoomPresetBubbleActive]} 
                      onPress={() => selectZoomPreset(0.25)}
                    >
                      <Text style={styles.zoomPresetBubbleText}>2x</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={[styles.zoomPresetBubble, lens === 'builtInWideAngleCamera' && zoom === 1.0 && styles.zoomPresetBubbleActive]} 
                      onPress={() => selectZoomPreset(1.0)}
                    >
                      <Text style={styles.zoomPresetBubbleText}>5x</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Scroll Dial Wheel */}
                  <View style={styles.dialContainer}>
                    <View style={styles.dialCenterIndicator} />
                    
                    <ScrollView
                      ref={scrollDialRef}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      scrollEventThrottle={16}
                      onScroll={handleDialScroll}
                      contentContainerStyle={styles.dialScrollContent}
                    >
                      {[...Array(11)].map((_, i) => (
                        <View key={i} style={styles.tickWrapper}>
                          <View style={[styles.tickLine, i % 5 === 0 && styles.tickLineMajor]} />
                          {i % 5 === 0 && (
                            <Text style={styles.tickLabel}>{(1 + (i / 10) * 4).toFixed(0)}x</Text>
                          )}
                        </View>
                      ))}
                    </ScrollView>
                  </View>
                </View>

              </CameraView>
            </View>

            {/* Simple Control Bar */}
            <View style={isLandscape ? styles.controlsLandscape : styles.controlsPortrait}>
              <View style={isLandscape ? styles.controlColLandscape : styles.controlRowPortrait}>
                
                {/* Bottom Left / Top: Review button */}
                <Animated.View style={animatedButtonStyle}>
                  <TouchableOpacity style={styles.basicButton} onPress={() => setCurrentScreen('review')}>
                    <Ionicons name="albums" size={24} color="#ffffff" />
                    <Text style={styles.basicButtonText}>Review</Text>
                  </TouchableOpacity>
                </Animated.View>

                {/* Center: Shutter Button (Mock record event) */}
                <View style={styles.shutterButton}>
                  <View style={styles.shutterInner} />
                </View>

                {/* Bottom Right / Bottom: Flip Lens button */}
                <Animated.View style={animatedButtonStyle}>
                  <TouchableOpacity style={styles.basicButton} onPress={toggleCameraFacing}>
                    <Ionicons name="camera-reverse" size={24} color="#ffffff" />
                    <Text style={styles.basicButtonText}>Flip</Text>
                  </TouchableOpacity>
                </Animated.View>

              </View>
            </View>

          </View>
        </View>
      ) : (
        /* 3. Review Screen */
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
            <Text style={styles.sectionHeader}>
              {activeMatch ? `${activeMatch.team1} vs ${activeMatch.team2}` : 'Pocket VAR Match Session'}
            </Text>
            {mockClips.map((clip) => (
              <View key={clip.id} style={styles.clipCard}>
                <View style={clip.clipInfo}>
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
  permissionBackLink: {
    marginTop: 16,
    paddingVertical: 6,
  },
  permissionBackLinkText: {
    color: '#3b82f6',
    fontSize: 13,
    fontWeight: 'bold',
  },

  // Create Match Setup Styles
  createMatchScroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#000000',
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 36,
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 3,
    marginTop: 12,
  },
  brandSubtitle: {
    fontSize: 10,
    color: '#3b82f6',
    letterSpacing: 2,
    marginTop: 4,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  formContainer: {
    backgroundColor: '#111111',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: '#222222',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputLabel: {
    color: '#888888',
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  textInput: {
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  createButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },

  // Camera Header Bar Styles
  cameraLayoutContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  cameraHeader: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#111111',
    backgroundColor: '#000000',
  },
  headerBackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingRight: 12,
  },
  headerBackText: {
    color: '#ffffff',
    fontSize: 14,
    marginLeft: 2,
    fontWeight: '500',
  },
  matchHeaderInfo: {
    alignItems: 'center',
    flex: 1,
  },
  matchHeaderTeams: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  matchHeaderStadium: {
    color: '#888888',
    fontSize: 10,
    marginTop: 2,
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
    zIndex: 10,
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

  // Logged Event Toast
  loggedToast: {
    position: 'absolute',
    top: 60,
    left: '10%',
    right: '10%',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderWidth: 1,
    borderColor: '#eab308',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  loggedToastText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 8,
  },

  // Right-side viewfinder overlays
  rightOverlayControls: {
    position: 'absolute',
    top: 16,
    right: 16,
    alignItems: 'flex-end',
    zIndex: 15,
  },
  viewfinderIconBtn: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },

  // Events Logger drawer
  eventsContainer: {
    alignItems: 'flex-end',
  },
  eventsToggleBtn: {},
  eventsToggleBtnActive: {
    borderColor: '#3b82f6',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  eventsMenu: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
    padding: 6,
    width: 110,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#222222',
  },
  eventEmoji: {
    fontSize: 14,
    marginRight: 8,
  },
  eventLabel: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600',
  },

  // Zoom Section
  zoomSection: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  zoomPresetRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  zoomPresetBubble: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  zoomPresetBubbleActive: {
    borderColor: '#3b82f6',
    backgroundColor: '#000000',
  },
  zoomPresetBubbleText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },

  // Smooth Dial Scroll Control
  dialContainer: {
    width: 200,
    height: 44,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#222222',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  dialCenterIndicator: {
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#3b82f6',
    marginLeft: -1,
    zIndex: 5,
  },
  dialScrollContent: {
    paddingHorizontal: 100,
    alignItems: 'center',
  },
  tickWrapper: {
    width: 15,
    alignItems: 'center',
    position: 'relative',
  },
  tickLine: {
    width: 1,
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  tickLineMajor: {
    height: 16,
    backgroundColor: '#ffffff',
  },
  tickLabel: {
    position: 'absolute',
    top: 20,
    color: '#888888',
    fontSize: 8,
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
