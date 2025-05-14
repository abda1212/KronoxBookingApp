import { useState } from 'react';
import { Button, Image, View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import NavBar from './NavBar';

export default function Profile() {
  const [image, setImage] = useState(null);
  const { width } = Dimensions.get('window');
  const isTablet = width >= 768;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.headerSection}>
            <Text style={styles.headerTitle}>Profile</Text>
          </View>
          
          <View style={styles.profileCard}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: image || 'https://via.placeholder.com/150' }}
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
                <FontAwesome name="camera" size={20} color="white" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.profileInfo}>
              <Text style={styles.name}>Sakamoto</Text>
              
              <View style={styles.infoItem}>
                <Ionicons name="calendar-outline" size={20} color="#6B7280" style={styles.infoIcon} />
                <Text style={styles.infoText}>Age: 25</Text>
              </View>
              
              <View style={styles.infoItem}>
                <Ionicons name="newspaper-outline" size={20} color="#6B7280" style={styles.infoIcon} />
                <Text style={styles.infoText}>Passionate about technology and gaming.</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.actionSection}>
            <TouchableOpacity style={styles.editButton} onPress={() => console.log('Edit Profile')}>
              <Ionicons name="create-outline" size={20} color="#FFFFFF" style={styles.buttonIcon} />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.logoutButton} onPress={() => console.log('Log Out')}>
              <Ionicons name="log-out-outline" size={20} color="#FFFFFF" style={styles.buttonIcon} />
              <Text style={styles.logoutButtonText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <NavBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80, // Space for NavBar
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  headerSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
  },
  profileCard: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 24,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: '#EBF5FF',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#3B82F6',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  profileInfo: {
    width: '100%',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    width: '100%',
  },
  infoIcon: {
    marginRight: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#6B7280',
    flex: 1,
    flexWrap: 'wrap',
  },
  actionSection: {
    width: '100%',
    maxWidth: 500,
    flexDirection: 'column',
    gap: 12,
  },
  editButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonIcon: {
    marginRight: 8,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
