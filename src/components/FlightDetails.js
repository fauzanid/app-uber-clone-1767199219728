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

const FlightDetails = ({ flight, onBack }) => {
  const [liveData, setLiveData] = useState({
    currentLocation: 'Over Kansas',
    nextWaypoint: 'Denver, CO',
    timeToDestination: '2h 15m',
    fuelRemaining: '68%',
    weatherAtDestination: 'Clear, 72°F',
  });
  
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'on time':
        return '#10B981';
      case 'delayed':
        return '#F59E0B';
      case 'boarding':
        return '#3B82F6';
      case 'in flight':
        return '#10B981';
      case 'landed':
        return '#6B7280';
      case 'cancelled':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  if (!flight) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Flight not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1a1a', '#000']}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Text style={styles.flightNumber}>{flight.flightNumber}</Text>
          <Text style={styles.airline}>{flight.airline}</Text>
        </View>
        
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(flight.status) }]}>
          <Text style={styles.statusText}>{flight.status}</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <Animated.View 
          style={[
            styles.animatedContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Route Information */}
          <View style={styles.routeCard}>
            <View style={styles.routeHeader}>
              <Text style={styles.cardTitle}>Route</Text>
              <Text style={styles.aircraft}>{flight.aircraft}</Text>
            </View>
            
            <View style={styles.routeContainer}>
              <View style={styles.routePoint}>
                <Text style={styles.airportCode}>{flight.departure.airport}</Text>
                <Text style={styles.cityName}>{flight.departure.city}</Text>
                <Text style={styles.timeText}>Departure: {flight.departure.time}</Text>
                {flight.gate && (
                  <Text style={styles.gateText}>Gate: {flight.gate}</Text>
                )}
              </View>

              <View style={styles.routeVisual}>
                <View style={styles.routeLine} />
                <View style={[styles.routeProgress, { width: `${(flight.progress || 0) * 100}%` }]} />
                <View style={[styles.planeIndicator, { left: `${Math.max(0, Math.min(90, (flight.progress || 0) * 100 - 5))}%` }]}>
                  <Ionicons name="airplane" size={20} color="#3B82F6" />
                </View>
              </View>

              <View style={styles.routePoint}>
                <Text style={styles.airportCode}>{flight.arrival.airport}</Text>
                <Text style={styles.cityName}>{flight.arrival.city}</Text>
                <Text style={styles.timeText}>Arrival: {flight.arrival.time}</Text>
              </View>
            </View>
          </View>

          {/* Live Data */}
          {flight.status === 'In Flight' && (
            <View style={styles.liveDataCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Live Data</Text>
                <View style={styles.liveIndicator}>
                  <View style={styles.liveDot} />
                  <Text style={styles.liveText}>LIVE</Text>
                </View>
              </View>
              
              <View style={styles.dataGrid}>
                <View style={styles.dataItem}>
                  <Ionicons name="location" size={20} color="#3B82F6" />
                  <Text style={styles.dataLabel}>Current Location</Text>
                  <Text style={styles.dataValue}>{liveData.currentLocation}</Text>
                </View>
                
                <View style={styles.dataItem}>
                  <Ionicons name="speedometer" size={20} color="#10B981" />
                  <Text style={styles.dataLabel}>Speed</Text>
                  <Text style={styles.dataValue}>{flight.speed || '545 mph'}</Text>
                </View>
                
                <View style={styles.dataItem}>
                  <Ionicons name="trending-up" size={20} color="#F59E0B" />
                  <Text style={styles.dataLabel}>Altitude</Text>
                  <Text style={styles.dataValue}>{flight.altitude || '35,000 ft'}</Text>
                </View>
                
                <View style={styles.dataItem}>
                  <Ionicons name="time" size={20} color="#8B5CF6" />
                  <Text style={styles.dataLabel}>ETA</Text>
                  <Text style={styles.dataValue}>{liveData.timeToDestination}</Text>
                </View>
              </View>
            </View>
          )}

          {/* Flight Information */}
          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Flight Information</Text>
            
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Aircraft</Text>
                <Text style={styles.infoValue}>{flight.aircraft}</Text>
              </View>
              
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Gate</Text>
                <Text style={styles.infoValue}>{flight.gate || 'TBA'}</Text>
              </View>
              
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Next Waypoint</Text>
                <Text style={styles.infoValue}>{liveData.nextWaypoint}</Text>
              </View>
              
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Weather</Text>
                <Text style={styles.infoValue}>{liveData.weatherAtDestination}</Text>
              </View>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actionsCard}>
            <TouchableOpacity style={styles.actionButton}>
              <LinearGradient
                colors={['#3B82F6', '#1D4ED8']}
                style={styles.actionButtonGradient}
              >
                <Ionicons name="notifications" size={20} color="#fff" />
                <Text style={styles.actionButtonText}>Enable Notifications</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryActionButton}>
              <Ionicons name="share" size={20} color="#3B82F6" />
              <Text style={styles.secondaryActionButtonText}>Share Flight</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingTop: 48,
  },
  backButton: {
    marginRight: 16,
    padding: 8,
  },
  headerContent: {
    flex: 1,
  },
  flightNumber: {
    fontSize: 24,
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
  content: {
    flex: 1,
  },
  animatedContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  routeCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  aircraft: {
    fontSize: 14,
    color: '#999',
  },
  routeContainer: {
    alignItems: 'center',
  },
  routePoint: {
    alignItems: 'center',
    marginVertical: 16,
  },
  airportCode: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  cityName: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  timeText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 8,
    fontWeight: '500',
  },
  gateText: {
    fontSize: 14,
    color: '#3B82F6',
    marginTop: 4,
  },
  routeVisual: {
    width: '100%',
    position: 'relative',
    marginVertical: 20,
  },
  routeLine: {
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
  },
  routeProgress: {
    position: 'absolute',
    height: 4,
    backgroundColor: '#3B82F6',
    borderRadius: 2,
    top: 0,
  },
  planeIndicator: {
    position: 'absolute',
    top: -8,
  },
  liveDataCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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
  dataGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dataItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 20,
  },
  dataLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
  dataValue: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  infoGrid: {
    marginTop: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  infoLabel: {
    fontSize: 14,
    color: '#999',
  },
  infoValue: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  actionsCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  actionButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  actionButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  secondaryActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#3B82F6',
    borderRadius: 12,
  },
  secondaryActionButtonText: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default FlightDetails;