import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { MotiView } from 'moti';
import { colors, fontSize, spacing, Badge, Divider, DangerButton } from './UIComponents';

const BookingCard = ({ roomName, bookedTime, bookedDate, imageUri, onUnbook }) => {
  const { width } = Dimensions.get('window');
  const isTablet = width >= 768;
  const isLandscape = width > height;
  
  // Determine card width based on screen size
  const cardWidth = isTablet 
    ? (isLandscape ? width / 3 - 32 : width / 2 - 32) 
    : (isLandscape ? width / 2 - 24 : width - 32);

  // Format date if provided
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <MotiView
      from={{
        opacity: 0,
        scale: 0.95,
        translateY: 10,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        translateY: 0,
      }}
      transition={{
        type: 'spring',
        duration: 700,
      }}
      style={[styles.cardContainer, { width: cardWidth }]}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: imageUri }} 
          style={styles.image} 
          resizeMode="cover"
        />
        <View style={styles.overlay} />
        <View style={styles.imageContent}>
          <Badge title="Booked" type="primary" style={styles.badge} />
          <Text style={styles.imageTitle}>{roomName}</Text>
        </View>
      </View>
      
      <View style={styles.cardContent}>
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={20} color={colors.medium} style={styles.infoIcon} />
            <Text style={styles.infoText}>{formatDate(bookedDate)}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={20} color={colors.medium} style={styles.infoIcon} />
            <Text style={styles.infoText}>{bookedTime}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="information-circle-outline" size={20} color={colors.medium} style={styles.infoIcon} />
            <Text style={styles.infoText}>Booked and confirmed</Text>
          </View>
        </View>
        
        <Divider />
        
        <View style={styles.actionSection}>
          <DangerButton
            title="Cancel Booking"
            icon="close-circle-outline"
            onPress={onUnbook}
          />
        </View>
      </View>
    </MotiView>
  );
};

const { width, height } = Dimensions.get('window');
const isTablet = width >= 768;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    margin: spacing.md,
  },
  imageContainer: {
    position: 'relative',
    height: 160,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  imageContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
  },
  badge: {
    marginBottom: spacing.xs,
  },
  imageTitle: {
    color: colors.white,
    fontSize: fontSize.xl,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  cardContent: {
    padding: spacing.md,
  },
  infoSection: {
    marginBottom: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  infoIcon: {
    marginRight: spacing.sm,
    width: 24,
  },
  infoText: {
    fontSize: fontSize.md,
    color: colors.medium,
    flex: 1,
  },
  actionSection: {
    marginTop: spacing.sm,
  },
});

export default BookingCard; 