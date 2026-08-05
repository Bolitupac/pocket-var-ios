import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './ReviewScreen.styles';

export default function ReviewScreen({ activeMatch, mockClips, onNavigateBack }) {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewHeader}>
        <TouchableOpacity onPress={onNavigateBack} style={styles.backButton}>
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
  );
}


