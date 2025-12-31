import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import FlightSearch from './src/components/FlightSearch';
import FlightTracking from './src/components/FlightTracking';
import FlightDetails from './src/components/FlightDetails';
import DepartureBoard from './src/components/DepartureBoard';
import BottomNavigation from './src/components/BottomNavigation';

export default function App() {
  const [activeScreen, setActiveScreen] = useState('search');
  const [selectedFlight, setSelectedFlight] = useState(null);

  const handleFlightSelect = (flight) => {
    setSelectedFlight(flight);
    setActiveScreen('details');
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'search':
        return <FlightSearch onFlightSelect={handleFlightSelect} />;
      case 'tracking':
        return <FlightTracking onFlightSelect={handleFlightSelect} />;
      case 'departures':
        return <DepartureBoard onFlightSelect={handleFlightSelect} />;
      case 'details':
        return (
          <FlightDetails 
            flight={selectedFlight} 
            onBack={() => setActiveScreen('search')}
          />
        );
      default:
        return <FlightSearch onFlightSelect={handleFlightSelect} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#1a1a1a" />
      <View style={styles.content}>
        {renderScreen()}
      </View>
      {activeScreen !== 'details' && (
        <BottomNavigation 
          activeScreen={activeScreen}
          onScreenChange={setActiveScreen}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
  },
});