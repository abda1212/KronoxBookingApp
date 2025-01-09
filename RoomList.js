import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RoomItem from './RoomItem';
import Booking from './Booking';

export default function RoomList({ rooms }) {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  function handleClick(room) {
    console.log(`Room clicked: ${room.roomName}`);
    setSelectedRoom(room);
    setIsModalVisible(true);
  }

  function closeModal() {
    setIsModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RoomItem room={item} onPress={() => handleClick(item)} />
        )}
        horizontal={false}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
      
      {selectedRoom && (
        <Booking room={selectedRoom} visible={isModalVisible} onClose={closeModal} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,  // Add horizontal padding for balance
    paddingBottom: 20,  // Add bottom padding for space below items
  },
  listContent: {
    justifyContent: 'center',  // Center items in the grid
  },
});
