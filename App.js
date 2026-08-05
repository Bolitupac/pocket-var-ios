import React, { useState, useRef, useEffect } from 'react';
import { 
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
import styles from './App.styles';

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
