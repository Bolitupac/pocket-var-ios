import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { CameraView } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import styles from './CameraScreen.styles';
import GridOverlay from '../components/GridOverlay';
import ZoomDial from '../components/ZoomDial';
import EventsMenu from '../components/EventsMenu';

export default function CameraScreen({
  activeMatch,
  facing,
  toggleCameraFacing,
  torch,
  toggleTorch,
  zoom,
  setZoom,
  lens,
  setLens,
  selectZoomPreset,
  eventsExpanded,
  setEventsExpanded,
  loggedEvent,
  logEvent,
  isLandscape,
  animatedButtonStyle,
  onNavigateToCreateMatch,
  onNavigateToReview,
  requestPermission,
  permission
}) {
  if (permission && !permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <View style={styles.permissionCard}>
          <Ionicons name="camera" size={48} color="#ffffff" />
          <Text style={styles.permissionTitle}>Camera Access Required</Text>
          <Text style={styles.permissionText}>
            Please grant camera permission to use the match viewfinder.
          </Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Allow Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.permissionBackLink} onPress={onNavigateToCreateMatch}>
            <Text style={styles.permissionBackLinkText}>Back to Setup</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.cameraLayoutContainer}>
      {/* Header Bar with Back Button & Active Match Details */}
      <View style={styles.cameraHeader}>
        <Animated.View style={animatedButtonStyle}>
          <TouchableOpacity 
            style={styles.headerBackBtn} 
            onPress={onNavigateToCreateMatch}
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
            <GridOverlay />

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
              <EventsMenu 
                expanded={eventsExpanded}
                onToggle={() => setEventsExpanded(!eventsExpanded)}
                onLogEvent={logEvent}
                animatedButtonStyle={animatedButtonStyle}
              />
            </View>

            {/* Zoom Controls Area: Includes Presets & Scroll Dial Wheel */}
            <ZoomDial 
              zoom={zoom}
              lens={lens}
              onPresetSelect={selectZoomPreset}
              onZoomChange={setZoom}
            />

          </CameraView>
        </View>

        {/* Simple Control Bar */}
        <View style={isLandscape ? styles.controlsLandscape : styles.controlsPortrait}>
          <View style={isLandscape ? styles.controlColLandscape : styles.controlRowPortrait}>
            
            {/* Bottom Left / Top: Review button */}
            <Animated.View style={animatedButtonStyle}>
              <TouchableOpacity style={styles.basicButton} onPress={onNavigateToReview}>
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
  );
}


