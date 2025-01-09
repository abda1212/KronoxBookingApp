import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { db } from './FireBaseConfig';
import { doc, updateDoc, collection, onSnapshot } from 'firebase/firestore';
import { getAuth } from '@firebase/auth';
import CustomCard from './CustomCard';
import RoomList from './RoomList';
import NavBar from './NavBar';
import {
  REACT_APP_IMGSOURCE

} from '@env';
export default function HomeScreen() {
  const auth = getAuth();
  const [rooms, setRooms] = useState([]);
  const [bookedRooms, setBookedRooms] = useState([]);
  const [uid, setUid] = useState(null);
  const [roomImage, setRoomImage] = useState(null);

  const backgroundImage = "https://images.unsplash.com/photo-1462826303086-329426d1aef5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVldGluZyUyMHJvb218ZW58MHx8MHx8fDA%3D";

  useEffect(() => {
    const fetchRoomImage = async () => {
      try {
        const response = await fetch(
          REACT_APP_IMGSOURCE
        );
        const data = await response.json();
        setRoomImage(data.urls.regular);
      } catch (error) {
        console.error("Error fetching image from Unsplash:", error);
      }
    };
    fetchRoomImage();
  }, []);

  const GetAllRooms = () => {
    const collectionRef = collection(db, "rooms");
    return onSnapshot(collectionRef, (snapshot) => {
      const roomList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRooms(roomList);
    }, (error) => {
      console.error('Error fetching rooms:', error);
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
    <CustomCard
      roomName={item.roomName}
      bookedTime={item.Booking.time}
      imageUri={roomImage || "https://placeimg.com/640/480/arch"}
      onUnbook={() => unbookRoom(item.id)}
    />
  );

  return (
    <ImageBackground source={{ uri: backgroundImage }} style={styles.background}>
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.header}>Your Bookings:</Text>
        
        {bookedRooms.length > 0 ? (
          <FlatList
            data={bookedRooms}
            keyExtractor={item => item.id}
            renderItem={renderBookedRoomCard}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 10,
            }}
          />
        ) : (
          <Text style={styles.noBookingsText}>No rooms booked.</Text>
        )}

        <RoomList rooms={rooms} />
        <NavBar />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 139, 0.5)', // Dark blue with opacity for overlay effect
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    zIndex: 1, // Ensure content is above the overlay
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#fff', // To contrast with the overlay
  },
  noBookingsText: {
    fontSize: 16,
    color: '#ddd',
    marginTop: 20,
  },
});
