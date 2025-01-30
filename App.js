import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker'; 
import CameraScreen from './components/CameraScreen';
import Leaderboard from './components/Leaderboard';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [points, setPoints] = useState(0);
  const [photo, setPhoto] = useState(null);

  // Load saved points
  useEffect(() => {
    (async () => {
      const savedPoints = await AsyncStorage.getItem('points');
      if (savedPoints) setPoints(parseInt(savedPoints));
    })();
  }, []);

  // Save points
  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem('points', points.toString());
    })();
  }, [points]);

  // Request camera permissions
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) return <View />;

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Camera">
          {() => <CameraScreen points={points} setPoints={setPoints} photo={photo} setPhoto={setPhoto} />}
        </Tab.Screen>
        <Tab.Screen name="Leaderboard">
          {() => <Leaderboard points={points} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
