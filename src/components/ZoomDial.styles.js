import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
});
