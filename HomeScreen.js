import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  ImageBackground, 
  SafeAreaView, 
  StatusBar, 
  Dimensions,
  ScrollView,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import { db } from './FireBaseConfig';
import { doc, updateDoc, collection, onSnapshot } from 'firebase/firestore';
import { getAuth } from '@firebase/auth';
import BookingCard from './BookingCard';
import RoomList from './RoomList';
import NavBar from './NavBar';
import { REACT_APP_IMGSOURCE } from '@env';
import { Heading, Subheading, EmptyState, colors, spacing } from './UIComponents';

export default function HomeScreen() {
  const auth = getAuth();
  const [rooms, setRooms] = useState([]);
  const [bookedRooms, setBookedRooms] = useState([]);
  const [uid, setUid] = useState(null);
  const [roomImage, setRoomImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  const { width, height } = Dimensions.get('window');
  const isTablet = width >= 768;
  const isLandscape = width > height;

  const backgroundImage = "https://images.unsplash.com/photo-1462826303086-329426d1aef5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVldGluZyUyMHJvb218ZW58MHx8MHx8fDA%3D";

  useEffect(() => {
    const fetchRoomImage = async () => {
      try {
        const response = await fetch(REACT_APP_IMGSOURCE);
        const data = await response.json();
        setRoomImage(data.urls.regular);
      } catch (error) {
        console.error("Error fetching image from Unsplash:", error);
      }
    };
    fetchRoomImage();
  }, []);

  const GetAllRooms = () => {
    setLoading(true);
    const collectionRef = collection(db, "rooms");
    return onSnapshot(collectionRef, (snapshot) => {
      const roomList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRooms(roomList);
      setLoading(false);
      setRefreshing(false);
    }, (error) => {
      console.error('Error fetching rooms:', error);
      setLoading(false);
      setRefreshing(false);
    });
  };

  const GetUserBookedRooms = () => {
    const collectionRef = collection(db, "rooms");
    return onSnapshot(collectionRef, (snapshot) => {
      const userBookings = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(room => room.Booking && room.Booking.userId === uid);
      setBookedRooms(userBookings);
    }, (error) => {
      console.error("Error fetching user bookings:", error);
    });
  };

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(user => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
      }
    });

    return unsubscribeAuth;
  }, [auth]);

  useEffect(() => {
    if (uid) {
      const unsubscribeAllRooms = GetAllRooms();
      const unsubscribeUserRooms = GetUserBookedRooms();

      return () => {
        unsubscribeAllRooms();
        unsubscribeUserRooms();
      };
    }
  }, [uid]);

  const unbookRoom = async (roomId) => {
    try {
      const roomRef = doc(db, "rooms", roomId);
      await updateDoc(roomRef, {
        'Booking.roomName': '',
        'Booking.userId': '',
        'Booking.time': '',
        'Booking.date': '',
      });
      console.log("Room unbooked successfully");
    } catch (error) {
      console.error("Error unbooking room:", error);
    }
  };

  const renderBookedRoomCard = ({ item }) => (
    <BookingCard
      roomName={item.roomName}
      bookedTime={item.Booking.time}
      bookedDate={item.Booking.date}
      imageUri={roomImage || "https://placeimg.com/640/480/arch"}
      onUnbook={() => unbookRoom(item.id)}
    />
  );

  const onRefresh = () => {
    setRefreshing(true);
    GetAllRooms();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1E3A8A" />
      <ImageBackground source={{ uri: backgroundImage }} style={styles.background}>
        <View style={styles.overlay} />
        
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#FFFFFF"
              title="Pull to refresh"
              titleColor="#FFFFFF"
            />
          }
        >
          <View style={styles.container}>
            <View style={styles.headerSection}>
              <Heading style={styles.headerText}>KronoX Booking</Heading>
              <Subheading style={styles.subheaderText}>Find and book meeting rooms</Subheading>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Your Bookings</Text>
              
              {loading ? (
                <ActivityIndicator color="#FFFFFF" size="large" style={styles.loader} />
              ) : bookedRooms.length > 0 ? (
                <FlatList
                  data={bookedRooms}
                  keyExtractor={item => item.id}
                  renderItem={renderBookedRoomCard}
                  horizontal={isLandscape || isTablet}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.bookingsList}
                  scrollEnabled={isLandscape || isTablet || bookedRooms.length > 1}
                />
              ) : (
                <EmptyState 
                  icon="calendar-outline" 
                  message="You have no active bookings. Book a room from the available options below." 
                  style={styles.emptyBookings}
                />
              )}
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Available Rooms</Text>
              {loading ? (
                <ActivityIndicator color="#FFFFFF" size="large" style={styles.loader} />
              ) : (
                <RoomList rooms={rooms} />
              )}
            </View>
          </View>
        </ScrollView>
        
        <NavBar />
      </ImageBackground>
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get('window');
const isTablet = width >= 768;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(30, 58, 138, 0.9)',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: isTablet ? spacing.xl : spacing.lg,
  },
  headerSection: {
    marginVertical: spacing.lg,
    alignItems: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subheaderText: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: isTablet ? 22 : 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: spacing.md,
    paddingLeft: spacing.xs,
  },
  bookingsList: {
    paddingBottom: spacing.md,
  },
  emptyBookings: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    marginHorizontal: spacing.xs,
  },
  loader: {
    padding: spacing.xl,
  },
});
