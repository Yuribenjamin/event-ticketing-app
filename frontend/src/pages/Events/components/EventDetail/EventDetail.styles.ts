import { View, Text, Button, StyleSheet } from 'react-native';

export const EventDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  eventName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  eventDate: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  ticketInfo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  available: {
    color: 'green',
  },
  soldOut: {
    color: 'red',
  },
});