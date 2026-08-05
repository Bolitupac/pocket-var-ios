import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './CreateMatchScreen.styles';

export default function CreateMatchScreen({
  team1,
  setTeam1,
  team2,
  setTeam2,
  stadium,
  setStadium,
  onCreateMatch
}) {
  return (
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

        <TouchableOpacity style={styles.createButton} onPress={onCreateMatch}>
          <Text style={styles.createButtonText}>Create & Open Camera</Text>
          <Ionicons name="arrow-forward" size={16} color="#ffffff" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}


