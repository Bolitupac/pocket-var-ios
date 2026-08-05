import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // Global Container
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  // Loading Screen
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#ffffff',
    fontSize: 14,
  },

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

  // Create Match Setup Styles
  createMatchScroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#000000',
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 36,
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 3,
    marginTop: 12,
  },
  brandSubtitle: {
    fontSize: 10,
    color: '#3b82f6',
    letterSpacing: 2,
    marginTop: 4,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  formContainer: {
    backgroundColor: '#111111',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: '#222222',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputLabel: {
    color: '#888888',
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  textInput: {
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  createButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },

  // Camera Header Bar Styles
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

  // Grid lines (Permanent)
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  gridRow: {
    flex: 1,
    flexDirection: 'row',
  },
  gridCell: {
    flex: 1,
  },
  borderLeftRight: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  borderTopBottom: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
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

  // Events Logger drawer
  eventsContainer: {
    alignItems: 'flex-end',
  },
  eventsToggleBtn: {},
  eventsToggleBtnActive: {
    borderColor: '#3b82f6',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  eventsMenu: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
    padding: 6,
    width: 110,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#222222',
  },
  eventEmoji: {
    fontSize: 14,
    marginRight: 8,
  },
  eventLabel: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600',
  },

  // Zoom Section
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

  // Smooth Dial Scroll Control
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

  // Review Screen Styles
  reviewContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#222222',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 14,
    marginLeft: 6,
  },
  reviewTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clipsList: {
    flex: 1,
  },
  clipsListContent: {
    padding: 16,
  },
  sectionHeader: {
    color: '#888888',
    fontSize: 13,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  clipCard: {
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#222222',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  clipInfo: {
    flex: 1,
    marginRight: 12,
  },
  clipType: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  clipMeta: {
    color: '#888888',
    fontSize: 12,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222222',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  playButtonText: {
    color: '#ffffff',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
});
