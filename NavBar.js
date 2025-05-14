import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from 'react-native-vector-icons';
import { signOut } from '@firebase/auth';
import { auth } from './FireBaseConfig';
import { colors, fontSize, spacing } from './UIComponents';

const NavBar = () => {
  const navigation = useNavigation();
  const [activeScreen, setActiveScreen] = useState('Home');
  const { width, height } = Dimensions.get('window');
  const isTablet = width >= 768;
  const isLandscape = width > height;
  
  // Listen for route changes
  useEffect(() => {
    const unsubscribe = navigation.addListener('state', (e) => {
      const currentRoute = e.data.state.routes[e.data.state.index];
      setActiveScreen(currentRoute.name);
    });
    
    return unsubscribe;
  }, [navigation]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out successfully!');
      navigation.navigate('Auth');
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  const NavItem = ({ name, label, onPress, active }) => (
    <TouchableOpacity 
      style={[
        styles.navItem,
        isTablet && styles.navItemTablet,
        active && styles.activeNavItem
      ]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons 
        name={active ? name : `${name}-outline`} 
        size={24} 
        color={active ? colors.primary : colors.medium} 
      />
      <Text style={[
        styles.navLabel, 
        active && styles.activeNavLabel
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[
      styles.navContainer,
      isTablet && styles.navContainerTablet,
      isLandscape && styles.navContainerLandscape
    ]}>
      <NavItem 
        name="home" 
        label="Home" 
        onPress={() => navigation.navigate('Home')} 
        active={activeScreen === 'Home'}
      />
      
      <NavItem 
        name="person" 
        label="Profile" 
        onPress={() => navigation.navigate('Profile')} 
        active={activeScreen === 'Profile'}
      />
      
      <NavItem 
        name="log-out" 
        label="Logout" 
        onPress={handleLogout} 
        active={false}
      />
    </View>
  );
};

const { width, height } = Dimensions.get('window');
const isTablet = width >= 768;

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: Platform.OS === 'ios' ? 20 : 12,
    paddingBottom: Platform.OS === 'ios' ? 36 : 12,
    paddingHorizontal: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 100,
  },
  navContainerTablet: {
    paddingVertical: 16,
    paddingHorizontal: 40,
  },
  navContainerLandscape: {
    paddingBottom: Platform.OS === 'ios' ? 20 : 12,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: spacing.xs,
  },
  navItemTablet: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  activeNavItem: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 12,
    paddingVertical: spacing.sm,
    marginVertical: -spacing.xs,
  },
  navLabel: {
    fontSize: fontSize.sm,
    color: colors.medium,
    marginTop: 4,
  },
  activeNavLabel: {
    color: colors.primary,
    fontWeight: '600',
  },
});

export default NavBar;
