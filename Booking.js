import * as React from 'react';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from './FireBaseConfig';
import { getAuth } from '@firebase/auth';
import { StyleSheet, Modal, View, Text, Button } from 'react-native';
import TimeSlot from './TimeSlot';
import { useState, useEffect } from 'react';

const Booking = ({ room, visible, onClose }) => {
  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);

  const fetchBookedSlots = async () => {
    if (!room || !room.id) return;

    try {
      const roomDoc = await getDoc(doc(db, "rooms", room.id));
      if (roomDoc.exists()) {
        const data = roomDoc.data();
        if (data.Booking) {
          const booking = data.Booking;
          setBookedSlots([{ date: booking.date, time: booking.time, userId: booking.userId }]);
        }
      }
    } catch (error) {
      console.error("Error fetching booked slots: ", error);
    }
  };

  useEffect(() => {
    fetchBookedSlots();
  }, [room]);

  const userBookings = async () => {
    if (!room || !room.id || !selectedAppointment) {
      console.error("Invalid room data for booking");
      return;
    }

    try {
      const userBookingsRef = doc(db, "rooms", room.id);
      await updateDoc(userBookingsRef, {
        'Booking.roomName': room.roomName,
        'Booking.userId': uid,
        'Booking.time': selectedAppointment.appointmentTime,
        'Booking.date': selectedAppointment.appointmentDate,
      });
      console.log("Room booked successfully");
      onClose(); 
    } catch (error) {
      console.error("Error booking room: ", error);
    }
  };

  

  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={onClose}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TimeSlot onAppointmentSelected={setSelectedAppointment} bookedSlots={bookedSlots} />
          <Text>Your selected room is {room?.roomName}</Text>
            <Button onPress={userBookings} title='Book' />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default Booking;
