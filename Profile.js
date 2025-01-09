import { useState } from 'react';
import { Button, Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';

export default function Profile() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1], // Ensures a square crop
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Image with Camera Icon Overlay */}
      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: image || 'https://via.placeholder.com/150' }} // Default placeholder if no image is selected
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.cameraIcon} onPress={pickImage}>
          <FontAwesome name="camera" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Profile Details */}
      <Text style={styles.name}>Sakamoto</Text>
      <Text style={styles.age}>Age: 25</Text>
      <Text style={styles.bio}>Bio: Passionate about technology and gaming.</Text>
      
      {/* Optional Buttons for additional profile actions */}
      <View style={styles.buttonContainer}>
        <Button title="Edit Profile" onPress={() => console.log('Edit Profile')} color="#4A90E2" />
        <Button title="Log Out" onPress={() => console.log('Log Out')} color="#e74c3c" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f4f7',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75, // Makes the image circular
    borderWidth: 2,
    borderColor: '#ddd',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#4A90E2',
    padding: 8,
    borderRadius: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  age: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  bio: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});
