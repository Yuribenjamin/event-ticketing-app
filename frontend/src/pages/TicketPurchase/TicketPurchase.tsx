import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { usePurchaseTicketsMutation } from '../../graphql/generated';

import { TicketPurchaseRouteProp, TicketPurchaseNavigationProp } from './TicketPurchase.types';
import { TicketPurchaseStyles } from './TicketPurchase.styles';
import { STRINGS } from '../../constant/strings';

const TicketPurchase = () => {
  const route = useRoute<TicketPurchaseRouteProp>();
  const navigation = useNavigation<TicketPurchaseNavigationProp>();
  const { eventId, userId } = route.params;

  const [ticketCount, setTicketCount] = useState<string>('1');

  const [purchaseTickets, { loading, error }] = usePurchaseTicketsMutation({
    refetchQueries: ['GetEvents', 'GetUsers'], 
  });

  const handlePurchase = async () => {
    const numericTicketCount = parseInt(ticketCount, 10);
    if (!eventId || !userId || isNaN(numericTicketCount) || numericTicketCount < 1) return;

    try {
      const { data } = await purchaseTickets({
        variables: { purchaseTicketsData: { eventId, userId, ticketCount: numericTicketCount } },
      });

      if (data?.purchaseTickets) {
        navigation.navigate('TicketConfirmation', { order: data.purchaseTickets });
      } else {
        console.error(STRINGS.PURCHASE.PURCHASE_FAILED);
      }
    } catch (e) {
      console.error(STRINGS.PURCHASE.PURCHASE_FAILED, e);
    }
  };

  const handleTicketInputChange = (text: string) => {
    if (text === '') return setTicketCount('');
    if (/^\d+$/.test(text)) setTicketCount(text);
  };

  return (
    <View style={TicketPurchaseStyles.container}>
      <Text style={TicketPurchaseStyles.label}>{STRINGS.PURCHASE.ENTER_TICKETS}</Text>
      <TextInput
        value={ticketCount}
        onChangeText={handleTicketInputChange}
        keyboardType="numeric"
        style={TicketPurchaseStyles.input}
        placeholder="Enter number of tickets"
      />
      <Button title="Purchase" onPress={handlePurchase} disabled={loading || ticketCount === ''} />
      {loading && <Text style={TicketPurchaseStyles.loadingText}>{STRINGS.PURCHASE.PROCESSING}</Text>}
      {error && <Text style={TicketPurchaseStyles.errorText}>{STRINGS.COMMON.ERROR} {error.message}</Text>}
    </View>
  );
};

export default TicketPurchase;