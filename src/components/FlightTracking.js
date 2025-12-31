import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const FlightTracking = ({ onFlightSelect }) => {
  const [trackedFlights, setTrackedFlights] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = new Animated.Value(0);

  // Mock tracked flights data
  const mockTrackedFlights = [
    {
      id: '1',
      flightNumber: 'AA123',
      airline: 'American Airlines',
      departure: { airport: 'JFK', city: 'New York', time: '14:30' },
      arrival: { airport: 'LAX', city: 'Los Angeles', time: '17:45' },
      status: 'In Flight',
      progress: 0.75,
      altitude: '35,000 ft',
      speed: '545 mph',
      eta: '17:45',
      delay: 0,
    },
    {
      id: '2',
      flightNumber: 'UA456',
      airline: 'United Airlines',
      departure: { airport: 'ORD', city: 'Chicago', time: '09:15' },
      arrival: { airport: 'SFO', city: 'San Francisco', time: '11:45' },
      status: 'Landed',
      progress: 1.0,
      altitude: '0 ft',
      speed: '0 mph',
      eta: '11:30',
      delay: 15,
    },
  ];

  useEffect(() => {
    loadTrackedFlights();
    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const loadTrackedFlights = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setTrackedFlights(mockTrackedFlights);
      setRefreshing(false);
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'in flight':
        return '#10B981';
      case 'landed':
        return '#6B7280';
      case 'boarding':
        return '#3B82F6';
      case 'delayed':
        return '#F59E0B';
      case 'cancelled':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const formatDelay = (delay) => {
    if (delay === 0) return 'On Time';
    return delay > 0 ? `+${delay} min` : `${delay} min`;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1a1a', '#000']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.title}>Live Tracking</Text>
          <Text style={styles.subtitle}>Your tracked flights</Text>
        </View>
        
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={loadTrackedFlights}
          disabled={refreshing}
        >
          <Ionicons 
            name="refresh" 
            size={24} 
            color="#3B82F6" 
            style={[refreshing && styles.refreshing]}
          />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <Animated.View style={{ opacity: fadeAnim }}>
          {trackedFlights.map((flight) => (
            <TouchableOpacity
              key={flight.id}
              style={styles.flightCard}
              onPress={() => onFlightSelect(flight)}
            >
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.flightNumber}>{flight.flightNumber}</Text>
                  <Text style={styles.airline}>{flight.airline}</Text>
                </View>
                
                <View style={styles.statusContainer}>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(flight.status) }]}>
                    <Text style={styles.statusText}>{flight.status}</Text>
                  </View>
                  <Text style={styles.delayText}>{formatDelay(flight.delay)}</Text>
                </View>
              </View>

              <View style={styles.routeContainer}>
                <View style={styles.routePoint}>
                  <Text style={styles.airportCode}>{flight.departure.airport}</Text>
                  <Text style={styles.cityName}>{flight.departure.city}</Text>
                  <Text style={styles.timeText}>{flight.departure.time}</Text>
                </View>

                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${flight.progress * 100}%` }]} />
                  </View>
                  <View style={[styles.planeIcon, { left: `${Math.max(0, Math.min(90, flight.progress * 100 - 5))}%` }]}>
                    <Ionicons name="airplane" size={16} color="#3B82F6" />
                  </View>
                </View>

                <View style={styles.routePoint}>
                  <Text style={styles.airportCode}>{flight.arrival.airport}</Text>
                  <Text style={styles.cityName}>{flight.arrival.city}</Text>
                  <Text style={styles.timeText}>{flight.eta}</Text>
                </View>
              </View>

              {flight.status === 'In Flight' && (
                <View style={styles.liveDataContainer}>
                  <View style={styles.liveDataItem}>
                    <Ionicons name="speedometer" size={16} color="#999" />
                    <Text style={styles.liveDataText}>{flight.speed}</Text>
                  </View>
                  
                  <View style={styles.liveDataItem}>
                    <Ionicons name="trending-up" size={16} color="#999" />
                    <Text style={styles.liveDataText}>{flight.altitude}</Text>
                  </View>
                  
                  <View style={styles.liveIndicator}>
                    <View style={styles.liveDot} />
                    <Text style={styles.liveText}>LIVE</Text>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </Animated.View>

        {trackedFlights.length === 0 && !refreshing && (
          <View style={styles.emptyState}>
            <Ionicons name="airplane-outline" size={64} color="#333" />
            <Text style={styles.emptyStateTitle}>No Tracked Flights</Text>
            <Text style={styles.emptyStateText}>
              Search for flights to start tracking them here
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContent: {
    flex: 1,
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
  refreshButton: {
    padding: 8,
  },
  refreshing: {
    transform: [{ rotate: '180deg' }],
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  flightCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
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
    color: '#999',
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  routePoint: {
    flex: 1,
  },
  airportCode: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  cityName: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  timeText: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
    fontWeight: '500',
  },
  progressContainer: {
    flex: 2,
    marginHorizontal: 16,
    position: 'relative',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    marginTop: 16,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 2,
  },
  planeIcon: {
    position: 'absolute',
    top: 8,
  },
  liveDataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  liveDataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  liveDataText: {
    color: '#999',
    fontSize: 12,
    marginLeft: 6,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  liveText: {
    color: '#10B981',
    fontSize: 10,
    fontWeight: 'bold',
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

export default FlightTracking;