import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { View, ActivityIndicator, StyleSheet, StatusBar } from 'react-native';
import HomeScreen from './HomeScreen';
import Profile from './Profile';
import AuthScreen from './AuthScreen';

export default function App() {
  const auth = getAuth();
  const [uid, setUid] = useState(null);
  const [loading, setLoading] = useState(true); 
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUid(user ? user.uid : null);
      setLoading(false);
    });
    return unsubscribe;
  }, [auth]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  // Common screen options for all screens
  const screenOptions = {
    headerStyle: {
      backgroundColor: '#FFFFFF',
      elevation: 0, // Remove shadow on Android
      shadowOpacity: 0, // Remove shadow on iOS
      borderBottomWidth: 1,
      borderBottomColor: '#F3F4F6',
    },
    headerTintColor: '#1F2937',
    headerTitleStyle: {
      fontWeight: '600',
      fontSize: 18,
    },
    contentStyle: {
      backgroundColor: '#F3F4F6',
    },
    animation: 'slide_from_right',
  };

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Stack.Navigator 
        initialRouteName={uid ? 'Home' : 'Auth'}
        screenOptions={screenOptions}
      >
        <Stack.Screen 
          name="Auth" 
          component={AuthScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'KronoX Booking', headerShown: false }}
        />
        <Stack.Screen 
          name="Profile" 
          component={Profile} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
});
