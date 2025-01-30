import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../utils/styles";

export default function CameraScreen({ points, setPoints }) {
  const [photo, setPhoto] = useState(null);

  // ✅ Load the last uploaded photo (optional)
  useEffect(() => {
    (async () => {
      const savedPhoto = await AsyncStorage.getItem("photo");
      if (savedPhoto) setPhoto(savedPhoto);
    })();
  }, []);

  // ✅ Function to handle photo selection
  const uploadPhoto = async () => {
    let result;

    if (Platform.OS === "web") {
      // ✅ Web: Use file picker
      result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });
    } else {
      // ✅ Mobile: Use Camera
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
      });
    }

    if (!result.canceled) {
      const photoUri = result.assets[0].uri;
      setPhoto(photoUri);
      await AsyncStorage.setItem("photo", photoUri); // Save the photo

      // ✅ Increase points when a photo is uploaded
      const newScore = points + 10;
      setPoints(newScore);
      await AsyncStorage.setItem("points", newScore.toString()); // Save new points
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pointsText}>Acorns: {points} 🌰</Text>
      <Button title="📸 Upload a Photo to Earn Acorns!" onPress={uploadPhoto} />
      {photo && <Image source={{ uri: photo }} style={styles.photoPreview} />}
    </View>
  );
}
