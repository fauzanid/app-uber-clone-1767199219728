import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BottomNavigation = ({ activeScreen, onScreenChange }) => {
  const tabs = [
    { id: 'search', title: 'Search', icon: 'search' },
    { id: 'tracking', title: 'Track', icon: 'airplane' },
    { id: 'departures', title: 'Board', icon: 'list' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={styles.tab}
          onPress={() => onScreenChange(tab.id)}
        >
          <Ionicons
            name={tab.icon}
            size={24}
            color={activeScreen === tab.id ? '#007AFF' : '#666'}
          />
          <Text
            style={[
              styles.tabText,
              activeScreen === tab.id && styles.activeTabText,
            ]}
          >
            {tab.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingBottom: 34,
    paddingTop: 12,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default BottomNavigation;