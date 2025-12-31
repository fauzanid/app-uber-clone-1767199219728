import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const FlightSearch = ({ onFlightSelect }) => {
  const [flightNumber, setFlightNumber] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock flight data
  const mockFlights = [
    {
      id: '1',
      flightNumber: 'AA123',
      airline: 'American Airlines',
      departure: { airport: 'JFK', city: 'New York', time: '14:30' },
      arrival: { airport: 'LAX', city: 'Los Angeles', time: '17:45' },
      status: 'On Time',
      gate: 'A12',
      aircraft: 'Boeing 737-800',
      progress: 0.6,
    },
    {
      id: '2',
      flightNumber: 'UA456',
      airline: 'United Airlines',
      departure: { airport: 'ORD', city: 'Chicago', time: '09:15' },
      arrival: { airport: 'SFO', city: 'San Francisco', time: '11:30' },
      status: 'Delayed',
      gate: 'B7',
      aircraft: 'Airbus A320',
      progress: 0.3,
    },
    {
      id: '3',
      flightNumber: 'DL789',
      airline: 'Delta Air Lines',
      departure: { airport: 'ATL', city: 'Atlanta', time: '16:00' },
      arrival: { airport: 'MIA', city: 'Miami', time: '18:15' },
      status: 'Boarding',
      gate: 'C15',
      aircraft: 'Boeing 757-200',
      progress: 0.1,
    },
  ];

  const handleSearch = async () => {
    if (!flightNumber.trim()) {
      Alert.alert('Error', 'Please enter a flight number');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const results = mockFlights.filter(flight => 
        flight.flightNumber.toLowerCase().includes(flightNumber.toLowerCase())
      );
      setSearchResults(results);
      setIsLoading(false);
      
      if (results.length === 0) {
        Alert.alert('No Results', 'No flights found for this flight number');
      }
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'on time':
        return '#10B981';
      case 'delayed':
        return '#F59E0B';
      case 'boarding':
        return '#3B82F6';
      case 'cancelled':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1a1a', '#000']}
        style={styles.header}
      >
        <Text style={styles.title}>Flight Search</Text>
        <Text style={styles.subtitle}>Track flights in real-time</Text>
      </LinearGradient>

      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Ionicons name="airplane" size={24} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Enter flight number (e.g., AA123)"
            placeholderTextColor="#666"
            value={flightNumber}
            onChangeText={setFlightNumber}
            autoCapitalize="characters"
            onSubmitEditing={handleSearch}
          />
        </View>
        
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}
          disabled={isLoading}
        >
          <LinearGradient
            colors={['#3B82F6', '#1D4ED8']}
            style={styles.searchButtonGradient}
          >
            <Text style={styles.searchButtonText}>
              {isLoading ? 'Searching...' : 'Search'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.resultsContainer}>
        {searchResults.length > 0 && (
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsTitle}>Search Results</Text>
            <Text style={styles.resultsCount}>{searchResults.length} flight(s) found</Text>
          </View>
        )}
        
        {searchResults.map((flight) => (
          <TouchableOpacity
            key={flight.id}
            style={styles.flightCard}
            onPress={() => onFlightSelect(flight)}
          >
            <View style={styles.flightHeader}>
              <View>
                <Text style={styles.flightNumber}>{flight.flightNumber}</Text>
                <Text style={styles.airline}>{flight.airline}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(flight.status) }]}>
                <Text style={styles.statusText}>{flight.status}</Text>
              </View>
            </View>
            
            <View style={styles.flightRoute}>
              <View style={styles.routePoint}>
                <Text style={styles.airportCode}>{flight.departure.airport}</Text>
                <Text style={styles.cityName}>{flight.departure.city}</Text>
                <Text style={styles.flightTime}>{flight.departure.time}</Text>
              </View>
              
              <View style={styles.routeIcon}>
                <Ionicons name="airplane" size={20} color="#3B82F6" />
              </View>
              
              <View style={styles.routePoint}>
                <Text style={styles.airportCode}>{flight.arrival.airport}</Text>
                <Text style={styles.cityName}>{flight.arrival.city}</Text>
                <Text style={styles.flightTime}>{flight.arrival.time}</Text>
              </View>
            </View>
            
            <View style={styles.flightDetails}>
              <Text style={styles.detailText}>Gate: {flight.gate}</Text>
              <Text style={styles.detailText}>{flight.aircraft}</Text>
            </View>
          </TouchableOpacity>
        ))}
        
        {searchResults.length === 0 && !isLoading && (
          <View style={styles.emptyState}>
            <Ionicons name="search" size={64} color="#333" />
            <Text style={styles.emptyStateTitle}>Search for Flights</Text>
            <Text style={styles.emptyStateText}>
              Enter a flight number to track your flight in real-time
            </Text>
          </View>
        )}
      </ScrollView>
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
  searchSection: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 16,
  },
  searchButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  searchButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  resultsHeader: {
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  resultsCount: {
    fontSize: 14,
    color: '#999',
  },
  flightCard: {
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
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  flightRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  routePoint: {
    flex: 1,
  },
  airportCode: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  cityName: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  flightTime: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
    fontWeight: '500',
  },
  routeIcon: {
    marginHorizontal: 16,
  },
  flightDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailText: {
    fontSize: 12,
    color: '#999',
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

export default FlightSearch;