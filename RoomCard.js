import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { colors, fontSize, spacing, Badge } from './UIComponents';

const RoomCard = ({ room, onPress }) => {
  const isBooked = room.Booking && room.Booking.userId;
  const { width } = Dimensions.get('window');
  const isTablet = width >= 768;
  const isLandscape = width > height;
  
  // Dynamically adjust card width based on screen size and orientation
  const getCardWidth = () => {
    if (isTablet) {
      return isLandscape ? width / 4 - 20 : width / 3 - 24;
    } else {
      return isLandscape ? width / 3 - 16 : width / 2 - 24;
    }
  };

  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[
        styles.card,
        { width: getCardWidth() },
        isBooked ? styles.bookedCard : styles.availableCard
      ]}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <Ionicons 
            name="business-outline" 
            size={24} 
            color={isBooked ? colors.light : colors.primary} 
          />
        </View>
        
        <Badge 
          title={isBooked ? 'Booked' : 'Available'} 
          type={isBooked ? 'danger' : 'success'} 
          style={styles.statusBadge}
        />
      </View>
      
      <Text style={styles.roomName} numberOfLines={1}>
        {room.roomName}
      </Text>
      
      <View style={styles.infoContainer}>
        <Ionicons 
          name="time-outline" 
          size={16} 
          color={isBooked ? colors.light : colors.medium} 
          style={styles.infoIcon}
        />
        <Text 
          style={[
            styles.timeText, 
            isBooked ? styles.bookedTimeText : styles.availableTimeText
          ]}
          numberOfLines={1}
        >
          {room.Booking.time || 'Available for booking'}
        </Text>
      </View>
      
      <View style={styles.footer}>
        <View style={styles.capacityContainer}>
          <Ionicons 
            name="people-outline" 
            size={16} 
            color={isBooked ? colors.light : colors.medium} 
          />
          <Text style={[
            styles.capacityText,
            isBooked ? styles.bookedCapacityText : styles.availableCapacityText
          ]}>
            4 persons
          </Text>
        </View>
        
        <View style={[
          styles.actionButton,
          isBooked ? styles.bookedActionButton : styles.availableActionButton
        ]}>
          <Ionicons 
            name={isBooked ? 'eye-outline' : 'calendar-outline'} 
            size={16} 
            color={isBooked ? colors.light : colors.white} 
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: spacing.md,
    margin: spacing.sm,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  availableCard: {
    backgroundColor: colors.white,
  },
  bookedCard: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  iconContainer: {
    backgroundColor: '#EBF5FF',
    padding: 10,
    borderRadius: 12,
  },
  statusBadge: {
    marginLeft: spacing.xs,
  },
  roomName: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.dark,
    marginBottom: spacing.sm,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  infoIcon: {
    marginRight: spacing.xs,
  },
  timeText: {
    fontSize: fontSize.sm,
    flex: 1,
  },
  availableTimeText: {
    color: colors.medium,
  },
  bookedTimeText: {
    color: colors.light,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  capacityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  capacityText: {
    fontSize: fontSize.xs,
    marginLeft: spacing.xs,
  },
  availableCapacityText: {
    color: colors.medium,
  },
  bookedCapacityText: {
    color: colors.light,
  },
  actionButton: {
    padding: spacing.xs,
    borderRadius: 8,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  availableActionButton: {
    backgroundColor: colors.primary,
  },
  bookedActionButton: {
    backgroundColor: '#F3F4F6',
  },
});

export default RoomCard; 