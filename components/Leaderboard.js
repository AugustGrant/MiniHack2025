import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../utils/styles';

export default function Leaderboard({ points }) {
  const users = [
    { name: 'You', points: points },
    { name: 'Jane', points: 80 },
    { name: 'Alex', points: 50 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.pointsText}>🏆 Leaderboard</Text>
      {users
        .sort((a, b) => b.points - a.points)
        .map((user, index) => (
          <View key={index} style={styles.leaderboardRow}>
            <Text>{user.name}</Text>
            <Text>{user.points} pts</Text>
          </View>
        ))}
    </View>
  );
}
