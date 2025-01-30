import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera } from 'expo-camera';
import CameraScreen from './components/CameraScreen';
import Leaderboard from './components/Leaderboard';

const Tab = createBottomTabNavigator();

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [points, setPoints] = useState(0);

  // Load saved points
  useEffect(() => {
    (async () => {
      const savedPoints = await AsyncStorage.getItem('points');
      if (savedPoints) setPoints(parseInt(savedPoints));
    })();
  }, []);

  // Save points
  useEffect(() => {
    AsyncStorage.setItem('points', points.toString());
  }, [points]);

  // Request camera permissions
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) return <View />;

  return (
    <NavigationContainer>
      <Tab.Navigator>
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