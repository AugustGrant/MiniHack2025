import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { styles } from '../utils/styles';

export default function CameraScreen({ points, setPoints, photo, setPhoto }) {
  // Take a photo with the camera
  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
      setPoints(points + 10); // Award points
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pointsText}>Points: {points}</Text>
      <Button title="📸 Snap to Earn Points!" onPress={takePhoto} />
      {photo && <Image source={{ uri: photo }} style={styles.photoPreview} />}
    </View>
  );
}