import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, Text, Dimensions } from 'react-native';
import RoomCard from './RoomCard';
import Booking from './Booking';
import { colors, fontSize, spacing, EmptyState } from './UIComponents';

export default function RoomList({ rooms }) {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [numColumns, setNumColumns] = useState(2);
  const { width, height } = Dimensions.get('window');
  
  // Dynamically adjust number of columns based on screen size and orientation
  useEffect(() => {
    const calculateColumns = () => {
      const isTablet = width >= 768;
      const isLandscape = width > height;
      
      if (isTablet) {
        setNumColumns(isLandscape ? 4 : 3);
      } else {
        setNumColumns(isLandscape ? 3 : 2);
      }
    };
    
    calculateColumns();
    
    // Add event listener for orientation changes
    const dimensionsSubscription = Dimensions.addEventListener('change', calculateColumns);
    
    return () => {
      // Clean up subscription
      dimensionsSubscription.remove();
    };
  }, [width, height]);

  function handleClick(room) {
    setSelectedRoom(room);
    setIsModalVisible(true);
  }

  function closeModal() {
    setIsModalVisible(false);
  }

  if (!rooms || rooms.length === 0) {
    return (
      <EmptyState 
        icon="cube-outline" 
        message="No rooms are available at the moment. Please check back later." 
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RoomCard room={item} onPress={() => handleClick(item)} />
        )}
        numColumns={numColumns}
        key={numColumns} // Force re-render when columns change
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
      />
      
      {selectedRoom && (
        <Booking 
          room={selectedRoom} 
          visible={isModalVisible} 
          onClose={closeModal} 
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 80, // Space for bottom navigation
  },
  listContent: {
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.xl,
  },
  columnWrapper: {
    justifyContent: 'flex-start',
  },
});
