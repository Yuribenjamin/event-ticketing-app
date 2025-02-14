import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useGetEventQuery } from '../../../../graphql/generated';

import QueryHandler from '../../../../hocs/QueryHandler';

import { EventDetailNavigationProp, EventDetailRouteProp } from './EventDetail.types';
import { EventDetailStyles } from './EventDetail.styles';
import { STRINGS } from '../../../../constant/strings';

const EventDetail = () => {
  const navigation = useNavigation<EventDetailNavigationProp>();
  const route = useRoute<EventDetailRouteProp>();
  const { eventId, userId } = route.params;
  const { data, loading, error } = useGetEventQuery({ variables: { id: eventId } });
  
  return (
    <QueryHandler loading={loading} error={error} data={data?.getEvent}>
      <View style={EventDetailStyles.container}>
        <Text style={EventDetailStyles.eventName}>{data?.getEvent?.name}</Text>
        <Text style={EventDetailStyles.eventDate}>{new Date(data?.getEvent?.date).toDateString()}</Text>
        <Text style={[EventDetailStyles.ticketInfo, data?.getEvent?.isSoldOut ? EventDetailStyles.soldOut : EventDetailStyles.available]}>
          {data?.getEvent?.isSoldOut ? STRINGS.EVENTS.SOLD_OUT : STRINGS.EVENTS.TICKETS_AVAILABLE(data?.getEvent?.availableTickets ?? 0)}
        </Text>
        <Button
          title={STRINGS.PURCHASE.PURCHASE_BUTTON}
          onPress={() => navigation.navigate('TicketPurchase', { eventId, userId })}
          disabled={data?.getEvent?.isSoldOut}
          color={data?.getEvent?.isSoldOut ? '#aaa' : '#007bff'}
        />
      </View>
    </QueryHandler>
  );
};

export default EventDetail;