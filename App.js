import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
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
      setLoading(false); // this stop loading after checking auth state
    });
    return unsubscribe;
  }, [auth]);

  if (loading) {
    return null; // i will add a loading screen here
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={uid ? 'Home' : 'Auth'}>
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={Profile} />

      </Stack.Navigator>
    </NavigationContainer>

  );
}
