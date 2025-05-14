import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from '@firebase/auth';
import { auth } from './FireBaseConfig'; 
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const AuthScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); 
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleAuthentication = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        navigation.navigate('Home');
        console.log('User signed in successfully!');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        navigation.navigate('Home');
        console.log('User created successfully!');
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.authContainer}>
            <Text style={styles.title}>{isLogin ? 'Sign In' : 'Create Account'}</Text>
            
            <View style={styles.inputContainer}>
              <FontAwesome name="envelope" size={20} color="#6B7280" style={styles.icon} />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                autoCapitalize="none"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputContainer}>
              <FontAwesome name="lock" size={20} color="#6B7280" style={styles.icon} />
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <TouchableOpacity style={styles.authButton} onPress={handleAuthentication}>
              <Text style={styles.authButtonText}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
            </TouchableOpacity>

            <View style={styles.bottomContainer}>
              <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F3F4F6',
  },
  authContainer: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    marginVertical: height * 0.05,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
    color: '#3B82F6',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 20,
    backgroundColor: '#F9FAFB',
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#1F2937',
  },
  authButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#3B82F6',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  authButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  bottomContainer: {
    marginTop: 24,
  },
  toggleText: {
    color: '#3B82F6',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default AuthScreen;
