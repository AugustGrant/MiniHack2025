import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  pointsText: {
    fontSize: 24,
    marginBottom: 20,
  },
  photoPreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 20,
  },
  leaderboardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    padding: 10,
  },
});