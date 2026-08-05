import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  eventsContainer: {
    alignItems: 'flex-end',
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
});
