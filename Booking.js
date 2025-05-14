import * as React from 'react';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from './FireBaseConfig';
import { getAuth } from '@firebase/auth';
import { 
  StyleSheet, 
  Modal, 
  View, 
  Text, 
  TouchableOpacity, 
  Dimensions, 
  SafeAreaView, 
  ScrollView,
  Animated,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import TimeSlot from './TimeSlot';
import { useState, useEffect, useRef } from 'react';
import { Ionicons } from 'react-native-vector-icons';
import { colors, spacing, fontSize, PrimaryButton, Divider, Badge } from './UIComponents';

const Booking = ({ room, visible, onClose }) => {
  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const { width, height } = Dimensions.get('window');
  const isTablet = width >= 768;
  const isLandscape = width > height;

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

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
    if (visible) {
      fetchBookedSlots();
      setSelectedAppointment(null); // Reset selected appointment when modal opens
    }
  }, [room, visible]);

  const userBookings = async () => {
    if (!room || !room.id || !selectedAppointment) {
      console.error("Invalid room data for booking");
      return;
    }

    setLoading(true);
    try {
      const userBookingsRef = doc(db, "rooms", room.id);
      await updateDoc(userBookingsRef, {
        'Booking.roomName': room.roomName,
        'Booking.userId': uid,
        'Booking.time': selectedAppointment.appointmentTime,
        'Booking.date': selectedAppointment.appointmentDate,
      });
      console.log("Room booked successfully");
      setLoading(false);
      onClose(); 
    } catch (error) {
      console.error("Error booking room:", error);
      setLoading(false);
    }
  };

  // Format date for display
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

  const modalHeight = isLandscape ? height * 0.9 : height * 0.8;
  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [modalHeight, 0],
  });

  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={onClose}
      animationType="none" // Using custom animation
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoid}
        >
          <View style={styles.overlay}>
            <TouchableOpacity 
              style={styles.dismissArea} 
              activeOpacity={1} 
              onPress={onClose}
            />
            
            <Animated.View 
              style={[
                styles.modalContainer,
                { 
                  transform: [{ translateY }],
                  maxHeight: modalHeight,
                  width: isTablet ? (isLandscape ? '60%' : '80%') : '100%',
                  marginHorizontal: 'auto'
                }
              ]}
            >
              <View style={styles.handleBar} />
              
              <ScrollView 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.header}>
                  <View>
                    <Text style={styles.modalTitle}>Book a Room</Text>
                    <Text style={styles.modalSubtitle}>Select a date and time</Text>
                  </View>
                  
                  <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <Ionicons name="close" size={24} color={colors.medium} />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.roomCard}>
                  <View style={styles.roomIconContainer}>
                    <Ionicons name="business" size={28} color={colors.white} />
                  </View>
                  
                  <View style={styles.roomInfo}>
                    <Text style={styles.roomName} numberOfLines={1}>
                      {room?.roomName}
                    </Text>
                    
                    <View style={styles.roomMeta}>
                      <Badge 
                        title="Meeting Room" 
                        type="secondary" 
                        style={styles.roomBadge} 
                      />
                      
                      <View style={styles.capacityContainer}>
                        <Ionicons 
                          name="people-outline" 
                          size={16} 
                          color={colors.medium} 
                        />
                        <Text style={styles.capacityText}>4 persons</Text>
                      </View>
                    </View>
                  </View>
                </View>
                
                <Divider />
                
                <Text style={styles.sectionTitle}>Available Slots</Text>
                <TimeSlot 
                  onAppointmentSelected={setSelectedAppointment} 
                  bookedSlots={bookedSlots} 
                />
                
                {selectedAppointment && (
                  <View style={styles.selectionPreview}>
                    <View style={styles.selectionHeader}>
                      <Ionicons 
                        name="checkmark-circle" 
                        size={20} 
                        color={colors.success} 
                      />
                      <Text style={styles.selectionTitle}>Selected Time</Text>
                    </View>
                    
                    <View style={styles.selectionDetails}>
                      <View style={styles.selectionItem}>
                        <Ionicons 
                          name="calendar-outline" 
                          size={18} 
                          color={colors.dark} 
                          style={styles.selectionIcon} 
                        />
                        <Text style={styles.selectionText}>
                          {formatDate(selectedAppointment.appointmentDate)}
                        </Text>
                      </View>
                      
                      <View style={styles.selectionItem}>
                        <Ionicons 
                          name="time-outline" 
                          size={18} 
                          color={colors.dark} 
                          style={styles.selectionIcon} 
                        />
                        <Text style={styles.selectionText}>
                          {selectedAppointment.appointmentTime}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              </ScrollView>
              
              <View style={styles.footer}>
                <Divider />
                <PrimaryButton 
                  title={loading ? "Booking..." : "Confirm Booking"}
                  icon={loading ? "sync" : "checkmark-circle"}
                  onPress={userBookings}
                  disabled={!selectedAppointment || loading}
                  style={styles.confirmButton}
                />
              </View>
            </Animated.View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

const { width, height } = Dimensions.get('window');
const isTablet = width >= 768;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  dismissArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: colors.lightest,
    borderRadius: 2,
    marginTop: 12,
    marginBottom: 8,
    alignSelf: 'center',
  },
  scrollContent: {
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  modalTitle: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.dark,
  },
  modalSubtitle: {
    fontSize: fontSize.sm,
    color: colors.medium,
    marginTop: spacing.xs,
  },
  closeButton: {
    padding: spacing.xs,
    borderRadius: 20,
    backgroundColor: colors.background,
  },
  roomCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: spacing.md,
    marginVertical: spacing.md,
  },
  roomIconContainer: {
    backgroundColor: colors.primary,
    padding: spacing.sm,
    borderRadius: 12,
    marginRight: spacing.md,
  },
  roomInfo: {
    flex: 1,
  },
  roomName: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.dark,
    marginBottom: spacing.xs,
  },
  roomMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  roomBadge: {
    marginRight: spacing.sm,
  },
  capacityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  capacityText: {
    fontSize: fontSize.xs,
    color: colors.medium,
    marginLeft: spacing.xs,
  },
  sectionTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.dark,
    marginVertical: spacing.md,
  },
  selectionPreview: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 12,
    padding: spacing.md,
    marginTop: spacing.lg,
  },
  selectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  selectionTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.success,
    marginLeft: spacing.xs,
  },
  selectionDetails: {
    marginLeft: spacing.lg,
  },
  selectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  selectionIcon: {
    marginRight: spacing.sm,
  },
  selectionText: {
    fontSize: fontSize.md,
    color: colors.dark,
  },
  footer: {
    padding: spacing.md,
    paddingBottom: Platform.OS === 'ios' ? spacing.xl : spacing.md,
  },
  confirmButton: {
    marginTop: spacing.md,
  },
});

export default Booking;
