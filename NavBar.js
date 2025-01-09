import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from 'react-native-vector-icons';
import { signOut } from '@firebase/auth';
import { auth } from './FireBaseConfig';

const NavBar = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out successfully!');
      navigation.navigate('Auth');
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <View style={styles.navContainer}>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
        <Ionicons name="home-outline" size={28} color="#007bff" />
        <Text style={styles.label}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Profile')}>
        <Ionicons name="person-outline" size={28} color="#007bff" />
        <Text style={styles.label}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={28} color="#e74c3c" />
        <Text style={[styles.label, { color: '#e74c3c' }]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20, 
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderTopColor: '#dcdcdc',
    height: 70, 
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, 
  },
  label: {
    fontSize: 13,
    color: '#007bff',
    marginTop: 4, 
  },
});

export default NavBar;
