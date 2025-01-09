import { Text, StyleSheet, View, Pressable } from 'react-native';

function RoomItem(props) {
  const { room, onPress } = props;

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View>
        <Text style={styles.roomName}>{room.roomName}</Text>
        <Text style={styles.roomDetails}>
          Time: {room.Booking.time} 
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    width: 160,  // Slightly wider than before
    marginVertical: 10,  // Increase vertical spacing between rows
    marginHorizontal: 8,  // Increase horizontal spacing between items
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#007bff',  // Color directly in the card for consistency
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff', 
  },
  roomDetails: {
    fontSize: 16,
    color: '#f0f0f0',
  },
});

export default RoomItem;
