import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../utils/styles";

export default function Leaderboard() {
  const [points, setPoints] = useState(0);

  // ✅ Load saved points from AsyncStorage
  useEffect(() => {
    (async () => {
      const savedPoints = await AsyncStorage.getItem("points");
      if (savedPoints) setPoints(parseInt(savedPoints) || 0);
    })();
  }, []);

  // ✅ Dynamic leaderboard
  const users = [
    { name: "You", points: points },
    { name: "Jane", points: 80 },
    { name: "Alex", points: 50 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.pointsText}>🏆 Leaderboard</Text>
      {users
        .sort((a, b) => b.points - a.points)
        .map((user, index) => (
          <View key={index} style={styles.leaderboardRow}>
            <Text>{user.name}</Text>
            <Text>{user.points} 🌰</Text>
          </View>
        ))}
    </View>
  );
}
