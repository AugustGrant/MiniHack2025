import React, { useState, useEffect } from "react";
import { View, Text, Platform, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Camera } from "expo-camera";
import CameraScreen from "./components/CameraScreen";
import Leaderboard from "./components/Leaderboard";

// ✅ Import custom icons
import CameraIcon from "./assets/camera.png";
import TrophyIcon from "./assets/trophy.png";

const Tab = createBottomTabNavigator();

export default function App() {
  const [points, setPoints] = useState(0);

  // ✅ Load saved points on startup
  useEffect(() => {
    (async () => {
      const savedPoints = await AsyncStorage.getItem("points");
      if (savedPoints) setPoints(parseInt(savedPoints) || 0);
    })();
  }, []);

  // ✅ Save points whenever they change
  useEffect(() => {
    AsyncStorage.setItem("points", points.toString());
  }, [points]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ size }) => {
            let iconSource = route.name === "Camera" ? CameraIcon : TrophyIcon;
            return <Image source={iconSource} style={{ width: size, height: size }} />;
          },
        })}
      >
        <Tab.Screen name="Camera">
          {() => <CameraScreen points={points} setPoints={setPoints} />}
        </Tab.Screen>
        <Tab.Screen name="Leaderboard">
          {() => <Leaderboard points={points} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
