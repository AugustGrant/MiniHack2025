import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera'; // New import
import { styles } from '../utils/styles';

export default function CameraScreen({ points, setPoints, photo, setPhoto }) {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(null);

  // Request camera permissions
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status === 'granted');
    })();
  }, []);

  // Take photo on web
  const takePhotoWeb = async () => {
    if (cameraPermission) {
      setIsCameraActive(true);
    }
  };

  // Take photo on mobile
  const takePhotoMobile = async () => {
    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
      setPoints(points + 10);
    }
  };

  // Capture photo from web camera
  const capturePhoto = async (camera) => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    setPoints(points + 10);
    setIsCameraActive(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pointsText}>Points: {points}</Text>

      {Platform.OS === 'web' ? (
        // Web-specific camera UI
        <>
          {isCameraActive ? (
            <Camera style={styles.cameraPreview}>
              {({ camera }) => (
                <Button
                  title="📸 Capture Photo"
                  onPress={() => capturePhoto(camera)}
                />
              )}
            </Camera>
          ) : (
            <Button
              title="📸 Open Laptop Camera"
              onPress={takePhotoWeb}
              disabled={!cameraPermission}
            />
          )}
        </>
      ) : (
        // Mobile UI (original code)
        <Button title="📸 Snap to Earn Points!" onPress={takePhotoMobile} />
      )}

      {photo && <Image source={{ uri: photo }} style={styles.photoPreview} />}
    </View>
  );
}