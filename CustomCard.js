import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { MotiView } from 'moti';

const CustomCard = ({ roomName, bookedTime, imageUri, onUnbook }) => {
  return (
    <MotiView
      from={{
        opacity: 0,
        scale: 0.8,
        translateY: 50,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        translateY: 0,
      }}
      transition={{
        type: 'spring',
        duration: 1000, // 1 second animation
      }}
      style={styles.cardContainer}
    >
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.roomName}>{roomName}</Text>
        <Text style={styles.bookedTime}>Booked Time: {bookedTime}</Text>
        <Text style={styles.availabilityText}>
          This room is available for your selected booking time.
        </Text>
        <Button title="Unbook" onPress={onUnbook} color="#ff4d4d" />
      </View>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 280, // Fixed width for consistency
    height: 400, // Fixed height for consistency
    borderRadius: 12,
    overflow: 'hidden',
    borderColor: 'coolGray',
    borderWidth: 1,
    marginHorizontal: 10,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  image: {
    width: '100%',
    height: '55%', // Cover top portion of the card
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  roomName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bookedTime: {
    fontSize: 14,
    color: 'violet',
    marginVertical: 5,
  },
  availabilityText: {
    fontSize: 12,
    color: '#555',
  },
});

export default CustomCard;
