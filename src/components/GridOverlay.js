import React from 'react';
import { View } from 'react-native';
import styles from './GridOverlay.styles';

export default function GridOverlay() {
  return (
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
  );
}
