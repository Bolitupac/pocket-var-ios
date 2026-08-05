import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './EventsMenu.styles';

export default function EventsMenu({ expanded, onToggle, onLogEvent, animatedButtonStyle }) {
  return (
    <View style={styles.eventsContainer}>
      <Animated.View style={animatedButtonStyle}>
        <TouchableOpacity 
          style={[styles.viewfinderIconBtn, styles.eventsToggleBtn, expanded && styles.eventsToggleBtnActive]} 
          onPress={onToggle}
        >
          <Ionicons name="flag" size={18} color={expanded ? "#3b82f6" : "#ffffff"} />
        </TouchableOpacity>
      </Animated.View>

      {expanded && (
        <View style={styles.eventsMenu}>
          <TouchableOpacity style={styles.eventItem} onPress={() => onLogEvent('Goal')}>
            <Text style={styles.eventEmoji}>⚽</Text>
            <Text style={styles.eventLabel}>Goal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.eventItem} onPress={() => onLogEvent('Foul')}>
            <Text style={styles.eventEmoji}>⚠️</Text>
            <Text style={styles.eventLabel}>Foul</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.eventItem} onPress={() => onLogEvent('Yellow Card')}>
            <Text style={styles.eventEmoji}>🟨</Text>
            <Text style={styles.eventLabel}>Yellow</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.eventItem} onPress={() => onLogEvent('Red Card')}>
            <Text style={styles.eventEmoji}>🟥</Text>
            <Text style={styles.eventLabel}>Red</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.eventItem} onPress={() => onLogEvent('Offside')}>
            <Text style={styles.eventEmoji}>🚩</Text>
            <Text style={styles.eventLabel}>Offside</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
