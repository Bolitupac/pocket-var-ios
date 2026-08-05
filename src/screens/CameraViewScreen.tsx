import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Colors, Spacing, BorderRadii, Typography } from '../constants/theme';
import { useApp } from '../store/AppContext';
import { CameraHUD } from '../components/camera/CameraHUD';
import { ZoomSlider } from '../components/camera/ZoomSlider';
import { CameraControls } from '../components/camera/CameraControls';
import { EventFlagSelector } from '../components/camera/EventFlagSelector';
import { EventType } from '../types';

export const CameraViewScreen: React.FC = () => {
  const {
    activeMatch,
    isRecording,
    recordingMode,
    elapsedSeconds,
    startRecording,
    stopRecording,
    triggerEventFlag,
    setCurrentScreen,
    setActiveHighlight,
  } = useApp();

  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<'back' | 'front'>('back');
  const [flashOn, setFlashOn] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [eventSelectorVisible, setEventSelectorVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else if (activeMatch) {
      startRecording(activeMatch);
    }
  };

  const handleSelectEvent = (type: EventType) => {
    const newHighlight = triggerEventFlag(type);
    Alert.alert(
      `Event Flagged (${type})`,
      `Clip captured at ${newHighlight.timestamp}. Rolling buffer window saved to VAR library.`,
      [
        { text: 'Continue Recording', style: 'cancel' },
        {
          text: 'Open VAR Review',
          onPress: () => {
            setActiveHighlight(newHighlight);
            setCurrentScreen('ReplayViewer');
          },
        },
      ]
    );
  };

  const handleOpenVARReview = () => {
    Alert.alert(
      'VAR Review Incident',
      'Select type of incident to review:',
      [
        { text: 'Possible Goal', onPress: () => triggerReview('Possible Goal') },
        { text: 'Offside Check', onPress: () => triggerReview('Offside') },
        { text: 'Red Card Foul', onPress: () => triggerReview('Red Card') },
        { text: 'Penalty Incident', onPress: () => triggerReview('Penalty') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const triggerReview = (type: EventType) => {
    const event = triggerEventFlag(type);
    setActiveHighlight(event);
    setCurrentScreen('ReplayViewer');
  };

  const matchTitle = activeMatch ? activeMatch.title : 'Live Recording';

  if (!permission?.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Camera access required for Pocket VAR recording</Text>
        <TouchableOpacity style={styles.permissionBtn} onPress={requestPermission}>
          <Text style={styles.permissionBtnText}>GRANT CAMERA PERMISSION</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Full Screen Camera Preview */}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing={facing}
        enableTorch={flashOn}
        zoom={Math.min(1.0, (zoomLevel - 0.5) / 3.5)}
      >
        {/* Pitch Grid Overlay */}
        <View style={styles.gridOverlay}>
          <View style={styles.gridRow}>
            <View style={[styles.gridCell, styles.borderRight, styles.borderBottom]} />
            <View style={[styles.gridCell, styles.borderRight, styles.borderBottom]} />
            <View style={[styles.gridCell, styles.borderBottom]} />
          </View>
          <View style={styles.gridRow}>
            <View style={[styles.gridCell, styles.borderRight, styles.borderBottom]} />
            <View style={[styles.gridCell, styles.borderRight, styles.borderBottom]} />
            <View style={[styles.gridCell, styles.borderBottom]} />
          </View>
          <View style={styles.gridRow}>
            <View style={[styles.gridCell, styles.borderRight]} />
            <View style={[styles.gridCell, styles.borderRight]} />
            <View style={styles.gridCell} />
          </View>
        </View>

        {/* Top HUD Controls Overlay */}
        <CameraHUD
          matchTitle={matchTitle}
          isRecording={isRecording}
          elapsedSeconds={elapsedSeconds}
          mode={recordingMode}
          flashOn={flashOn}
          onToggleFlash={() => setFlashOn(!flashOn)}
          onToggleCamera={() => setFacing((prev) => (prev === 'back' ? 'front' : 'back'))}
          onOpenEventSelector={() => setEventSelectorVisible(true)}
          onExit={() => setCurrentScreen('Home')}
        />

        {/* Zoom Control Dial above bottom controls */}
        <View style={styles.zoomContainer}>
          <ZoomSlider
            currentZoom={zoomLevel}
            onZoomChange={setZoomLevel}
          />
        </View>
      </CameraView>

      {/* Bottom Camera Controls Bar */}
      <View style={styles.bottomBarWrapper}>
        <CameraControls
          isRecording={isRecording}
          onToggleRecording={handleToggleRecording}
          onOpenVARReview={handleOpenVARReview}
          onOpenSettings={() => setCurrentScreen('Settings')}
        />
      </View>

      {/* Event Flag Modal Drawer */}
      <EventFlagSelector
        visible={eventSelectorVisible}
        onClose={() => setEventSelectorVisible(false)}
        onSelectEvent={handleSelectEvent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  permissionText: {
    ...Typography.bodyLg,
    color: Colors.onBackground,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  permissionBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadii.md,
  },
  permissionBtnText: {
    color: Colors.onPrimary,
    fontWeight: '800',
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.25,
  },
  gridRow: {
    flex: 1,
    flexDirection: 'row',
  },
  gridCell: {
    flex: 1,
  },
  borderRight: {
    borderRightWidth: 1,
    borderRightColor: '#FFFFFF',
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
  },
  zoomContainer: {
    position: 'absolute',
    bottom: 104,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  bottomBarWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 15,
  },
});
