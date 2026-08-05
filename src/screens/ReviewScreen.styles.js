import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
