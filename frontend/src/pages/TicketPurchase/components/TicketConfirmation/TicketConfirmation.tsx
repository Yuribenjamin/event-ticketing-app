import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import { TicketConfirmationNavigationProp, TicketConfirmationRouteProp } from './TicketConfirmation.types';
import { TicketConfirmationStyles } from './TicketConfirmation.styles';
import { STRINGS } from '../../../../constant/strings';

const TicketConfirmation = () => {
  const navigation = useNavigation<TicketConfirmationNavigationProp>();
  const route = useRoute<TicketConfirmationRouteProp>();
  const { order } = route.params;

  const handleBackToEvents = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Users' }],
    });
  };

  return (
    <View style={TicketConfirmationStyles.container}>
      <Text style={TicketConfirmationStyles.heading}>{STRINGS.ORDER.CONFIRMED}</Text>
      <View style={TicketConfirmationStyles.card}>
        <Text style={TicketConfirmationStyles.label}>{STRINGS.ORDER.NUMBER}</Text>
        <Text style={TicketConfirmationStyles.value}>{order.orderNumber}</Text>
        <Text style={TicketConfirmationStyles.label}>{STRINGS.ORDER.EVENT}</Text>
        <Text style={TicketConfirmationStyles.value}>{order.event.name}</Text>
        <Text style={TicketConfirmationStyles.label}>{STRINGS.ORDER.TICKETS}</Text>
        <Text style={TicketConfirmationStyles.value}>{order.ticketCount}</Text>
      </View>

      <Button title="Back to Users" onPress={handleBackToEvents} color="#007AFF" />
    </View>
  );
};

export default TicketConfirmation;