import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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

  // Camera layout container
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
});
