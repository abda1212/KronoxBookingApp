import * as React from 'react';
import { SafeAreaView, StatusBar, Dimensions,StyleSheet, View } from 'react-native';
import { TimeSlotPicker } from '@dgreasi/react-native-time-slot-picker';
import { useEffect, useState } from 'react';
import { doc, updateDoc } from "firebase/firestore";
//import { getAuth } from '@firebase/auth';
import { db } from './FireBaseConfig';
//const auth = getAuth();
//const uid = auth.currentUser?.uid;
import { getAuth } from '@firebase/auth';
const auth = getAuth();


const availableDates = [
    {
      date: '2023-08-27T21:00:00.000Z',
      slotTimes: ['08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00'],
    },
    {
      date: '2023-08-28T21:00:00.000Z',
      slotTimes: ['08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00'],
    },
    {
      date: '2023-08-29T21:00:00.000Z',
      slotTimes: ['08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00'],
    },
    {
      date: '2023-08-30T21:00:00.000Z',
      slotTimes: ['08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00'],
    },
    {
      date: '2023-08-31T21:00:00.000Z',
      slotTimes: ['08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00'],
    },
    {
      date: '2023-09-01T21:00:00.000Z',
      slotTimes: ['08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00'],
    },
    {
      date: '2023-09-02T21:00:00.000Z',
      slotTimes: ['08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00'],
    },
  ];
  

  export default function TimeSlot({ onAppointmentSelected, bookedSlots }) {
    const [dateOfAppointment, setDateOfAppointment] = useState(null);
    const [filteredValues, setFilteredValues] = useState([]);
  
    const filterDates = () => {
      return availableDates.map((date) => ({
        ...date,
        slotTimes: date.slotTimes.filter((time) => {
          const slot = bookedSlots.find(
            (b) => b.date === date.date && b.time === time
          );
          return !slot || slot.userId === auth.currentUser?.uid;
        }),
      }));
    };
  
    useEffect(() => {
      setFilteredValues(filterDates());
    }, [bookedSlots]);
  
    useEffect(() => {
      if (dateOfAppointment) {
        onAppointmentSelected(dateOfAppointment);
        console.log('Date of appointment updated: ', dateOfAppointment);
      }
    }, [dateOfAppointment, onAppointmentSelected]);
  
    return (
      <SafeAreaView>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        <View style={styles.pickerContainer}>
          <TimeSlotPicker
            availableDates={filteredValues}
            setDateOfAppointment={setDateOfAppointment}
          />
        </View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    pickerContainer: {
      width: '90%', 
      maxWidth: 350, 
      padding: 10, 
    },
  });