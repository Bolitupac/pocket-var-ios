import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from './ZoomDial.styles';

export default function ZoomDial({ zoom, lens, onPresetSelect, onZoomChange }) {
  const scrollDialRef = useRef(null);
  const isUpdatingFromPreset = useRef(false);

  const DIAL_STEP = 15;
  const MAX_SCROLL = 10 * DIAL_STEP;

  function handleDialScroll(event) {
    if (isUpdatingFromPreset.current) return;
    const offsetX = event.nativeEvent.contentOffset.x;
    const ratio = Math.min(Math.max(offsetX / MAX_SCROLL, 0), 1);
    onZoomChange(ratio);
  }

  function selectPreset(zoomVal, lensVal) {
    isUpdatingFromPreset.current = true;
    onPresetSelect(zoomVal, lensVal);
    
    if (scrollDialRef.current) {
      const targetX = zoomVal * MAX_SCROLL;
      scrollDialRef.current.scrollTo({ x: targetX, animated: true });
    }
    
    setTimeout(() => {
      isUpdatingFromPreset.current = false;
    }, 350);
  }

  // Synchronize scroll view if the zoom value changes from elsewhere (e.g. initial render)
  useEffect(() => {
    if (!isUpdatingFromPreset.current && scrollDialRef.current) {
      const targetX = zoom * MAX_SCROLL;
      scrollDialRef.current.scrollTo({ x: targetX, animated: false });
    }
  }, [zoom]);

  return (
    <View style={styles.zoomSection}>
      {/* Preset Zoom Selectors */}
      <View style={styles.zoomPresetRow}>
        <TouchableOpacity 
          style={[styles.zoomPresetBubble, lens === 'builtInUltraWideCamera' && styles.zoomPresetBubbleActive]} 
          onPress={() => selectPreset(0, 'builtInUltraWideCamera')}
        >
          <Text style={styles.zoomPresetBubbleText}>0.5x</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.zoomPresetBubble, lens === 'builtInWideAngleCamera' && zoom === 0 && styles.zoomPresetBubbleActive]} 
          onPress={() => selectPreset(0, 'builtInWideAngleCamera')}
        >
          <Text style={styles.zoomPresetBubbleText}>1x</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.zoomPresetBubble, lens === 'builtInWideAngleCamera' && zoom === 0.25 && styles.zoomPresetBubbleActive]} 
          onPress={() => selectPreset(0.25, 'builtInWideAngleCamera')}
        >
          <Text style={styles.zoomPresetBubbleText}>2x</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.zoomPresetBubble, lens === 'builtInWideAngleCamera' && zoom === 1.0 && styles.zoomPresetBubbleActive]} 
          onPress={() => selectPreset(1.0, 'builtInWideAngleCamera')}
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
  );
}
