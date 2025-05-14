import * as React from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { TimeSlotPicker } from '@dgreasi/react-native-time-slot-picker';
import { useEffect, useState } from 'react';
import { getAuth } from '@firebase/auth';
import { colors, spacing, fontSize } from './UIComponents';

const auth = getAuth();

// Get current date and format it properly
const getCurrentDate = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
};

// Generate dates relative to today
const getDatePlus = (days) => {
  const date = getCurrentDate();
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

// Generate available dates for next 7 days
const generateAvailableDates = () => {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    dates.push({
      date: getDatePlus(i),
      slotTimes: ['08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00', 
                 '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00']
    });
  }
  return dates;
};

const availableDates = generateAvailableDates();

export default function TimeSlot({ onAppointmentSelected, bookedSlots }) {
  const [dateOfAppointment, setDateOfAppointment] = useState(null);
  const [filteredValues, setFilteredValues] = useState([]);
  const { width, height } = Dimensions.get('window');
  const isTablet = width >= 768;
  const isLandscape = width > height;

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
    }
  }, [dateOfAppointment, onAppointmentSelected]);

  // Dynamic theme adjustments based on device size
  const getDateContainerWidth = () => {
    if (isTablet) {
      return isLandscape ? 120 : 110;
    }
    return isLandscape ? 100 : 85;
  };

  const getSlotButtonWidth = () => {
    if (isTablet) {
      return isLandscape ? 130 : 120;
    }
    return isLandscape ? 110 : 100;
  };

  const customTheme = {
    containerStyle: {
      backgroundColor: 'transparent',
    },
    arrowContainerStyle: {
      backgroundColor: colors.background,
      borderRadius: 8,
      width: 32,
      height: 32,
    },
    arrowColor: colors.primary,
    calendarHeaderTextStyle: {
      color: colors.dark,
      fontSize: fontSize.lg,
      fontWeight: '600',
    },
    selectedDateContainerStyle: {
      backgroundColor: colors.primary,
      borderRadius: 12,
    },
    selectedDateTextStyle: {
      color: colors.white,
      fontWeight: '600',
    },
    dateContainerStyle: {
      backgroundColor: colors.background,
      borderRadius: 12,
      marginHorizontal: 4,
      height: 40,
      width: getDateContainerWidth(),
    },
    dateTextStyle: {
      color: colors.medium,
      fontSize: fontSize.sm,
    },
    slotButtonStyle: {
      backgroundColor: colors.background,
      borderRadius: 12,
      padding: 10,
      marginVertical: 6,
      marginHorizontal: 4,
      minWidth: getSlotButtonWidth(),
    },
    slotButtonSelectedStyle: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    slotButtonTextStyle: {
      color: colors.medium,
      fontSize: fontSize.sm,
    },
    slotButtonTextSelectedStyle: {
      color: colors.white,
      fontWeight: '600',
    },
    disabledSlotButtonStyle: {
      backgroundColor: '#F1F1F1',
      borderColor: '#E5E7EB',
    },
    disabledSlotButtonTextStyle: {
      color: colors.lightest,
    },
    timeContainerStyle: {
      marginTop: spacing.md,
    },
    timeTitleStyle: {
      fontSize: fontSize.md,
      fontWeight: '600',
      color: colors.dark,
      marginVertical: spacing.sm,
    },
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal={false} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        nestedScrollEnabled={true}
      >
        <TimeSlotPicker
          availableDates={filteredValues}
          setDateOfAppointment={setDateOfAppointment}
          theme={customTheme}
          selectedColor={colors.primary}
          disabledColor="#E5E7EB"
          timeHeaderTitle="Available Times"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 12,
  },
  scrollContent: {
    paddingVertical: spacing.sm,
  },
});