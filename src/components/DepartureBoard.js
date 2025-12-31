import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const DepartureBoard = ({ onFlightSelect }) => {
  const [departures, setDepartures] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedAirport, setSelectedAirport] = useState('JFK');

  const airports = [
    { code: 'JFK', name: 'John F. Kennedy' },
    { code: 'LAX', name: 'Los Angeles' },
    { code: 'ORD', name: 'Chicago O\\'Hare' },
    { code: 'MIA', name: 'Miami' },
  ];

  // Mock departure data
  const mockDepartures = {
    JFK: [
      {
        id: '1',
        flightNumber: 'AA123',
        airline: 'American Airlines',
        departure: { airport: 'JFK', city: 'New York', time: '14:30' },
        arrival: { airport: 'LAX', city: 'Los Angeles', time: '17:45' },
        status: 'Boarding',
        gate: 'A12',
        terminal: 'Terminal 8',
      },
      {
        id: '2',
        flightNumber: 'DL456',
        airline: 'Delta Air Lines',
        departure: { airport: 'JFK', city: 'New York', time: '15:15' },
        arrival: { airport: 'MIA', city: 'Miami', time: '18:30' },
        status: 'On Time',
        gate: 'B7',
        terminal: 'Terminal 4',
      },
      {
        id: '3',
        flightNumber: 'UA789',
        airline: 'United Airlines',
        departure: { airport: 'JFK', city: 'New York', time: '16:00' },
        arrival: { airport: 'ORD', city: 'Chicago', time: '18:15' },
        status: 'Delayed',
        gate: 'C15',
        terminal: 'Terminal 7',
        delay: 25,
      },
    ],
    LAX: [
      {
        id: '4',
        flightNumber: 'AA321',
        airline: 'American Airlines',
        departure: { airport: 'LAX', city: 'Los Angeles', time: '09:30' },
        arrival: { airport: 'JFK', city: 'New York', time: '17:45' },
        status: 'On Time',
        gate: 'A5',
        terminal: 'Terminal 4',
      },
    ],
    ORD: [
      {
        id: '5',
        flightNumber: 'UA654',
        airline: 'United Airlines',
        departure: { airport: 'ORD', city: 'Chicago', time: '11:30' },
        arrival: { airport: 'SFO', city: 'San Francisco', time: '13:45' },
        status: 'On Time',
        gate: 'B12',
        terminal: 'Terminal 1',
      },
    ],
    MIA: [
      {
        id: '6',
        flightNumber: 'AA987',
        airline: 'American Airlines',
        departure: { airport: 'MIA', city: 'Miami', time: '20:15' },
        arrival: { airport: 'JFK', city: 'New York', time: '23:30' },
        status: 'Boarding',
        gate: 'D8',
        terminal: 'Terminal S',
      },
    ],
  };

  useEffect(() => {
    loadDepartures();
  }, [selectedAirport]);

  const loadDepartures = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setDepartures(mockDepartures[selectedAirport] || []);
      setRefreshing(false);
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'on time':
        return '#10B981';
      case 'delayed':
        return '#F59E0B';
      case 'boarding':
        return '#3B82F6';
      case 'cancelled':
        return '#EF4444';
      case 'departed':
        return '#6B7280';
      default:
        return '#6B7280';
    }
  };

  const renderFlightItem = ({ item }) => (
    <TouchableOpacity
      style={styles.flightItem}
      onPress={() => onFlightSelect(item)}
    >
      <View style={styles.flightHeader}>
        <View style={styles.flightInfo}>
          <Text style={styles.flightNumber}>{item.flightNumber}</Text>
          <Text style={styles.airline}>{item.airline}</Text>
        </View>
        
        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
          {item.delay && (
            <Text style={styles.delayText}>+{item.delay}m</Text>
          )}
        </View>
      </View>

      <View style={styles.routeInfo}>
        <View style={styles.routePoint}>
          <Text style={styles.departureTime}>{item.departure.time}</Text>
          <Text style={styles.airportCode}>{item.departure.airport}</Text>
        </View>
        
        <View style={styles.routeIcon}>
          <Ionicons name="arrow-forward" size={20} color="#666" />
        </View>
        
        <View style={styles.routePoint}>
          <Text style={styles.arrivalTime}>{item.arrival.time}</Text>
          <Text style={styles.airportCode}>{item.arrival.airport}</Text>
        </View>
      </View>

      <View style={styles.flightDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="location" size={14} color="#666" />
          <Text style={styles.detailText}>Gate {item.gate}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Ionicons name="business" size={14} color="#666" />
          <Text style={styles.detailText}>{item.terminal}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Ionicons name="location-outline" size={14} color="#666" />
          <Text style={styles.detailText}>{item.arrival.city}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1a1a', '#000']}
        style={styles.header}
      >
        <Text style={styles.title}>Departures</Text>
        <Text style={styles.subtitle}>Live departure board</Text>
      </LinearGradient>

      {/* Airport Selector */}
      <View style={styles.airportSelector}>
        <FlatList
          horizontal
          data={airports}
          keyExtractor={(item) => item.code}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.airportList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.airportButton,
                selectedAirport === item.code && styles.airportButtonActive,
              ]}
              onPress={() => setSelectedAirport(item.code)}
            >
              <Text
                style={[
                  styles.airportButtonText,
                  selectedAirport === item.code && styles.airportButtonTextActive,
                ]}
              >
                {item.code}
              </Text>
              <Text
                style={[
                  styles.airportName,
                  selectedAirport === item.code && styles.airportNameActive,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Departures List */}
      <FlatList
        data={departures}
        keyExtractor={(item) => item.id}
        renderItem={renderFlightItem}
        style={styles.departuresList}
        contentContainerStyle={styles.departuresContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={loadDepartures}
            tintColor="#3B82F6"
          />
        }
        ListEmptyComponent={
          !refreshing && (
            <View style={styles.emptyState}>
              <Ionicons name="airplane-outline" size={64} color="#333" />
              <Text style={styles.emptyStateTitle}>No Departures</Text>
              <Text style={styles.emptyStateText}>
                No flights departing from {selectedAirport} at this time
              </Text>
            </View>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    paddingTop: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
  },
  airportSelector: {
    paddingVertical: 16,
  },
  airportList: {
    paddingHorizontal: 24,
  },
  airportButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    borderRadius: 12,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333',
    minWidth: 120,
  },
  airportButtonActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  airportButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  airportButtonTextActive: {
    color: '#fff',
  },
  airportName: {
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
    marginTop: 2,
  },
  airportNameActive: {
    color: '#fff',
  },
  departuresList: {
    flex: 1,
  },
  departuresContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  flightItem: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  flightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  flightInfo: {
    flex: 1,
  },
  flightNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  airline: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 4,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  delayText: {
    fontSize: 12,
    color: '#F59E0B',
    fontWeight: '600',
  },
  routeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  routePoint: {
    flex: 1,
  },
  departureTime: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  arrivalTime: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'right',
  },
  airportCode: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  routeIcon: {
    marginHorizontal: 16,
  },
  flightDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default DepartureBoard;