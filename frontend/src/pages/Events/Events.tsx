import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import { useGetEventsQuery } from '../../graphql/generated';

import QueryHandler from '../../hocs/QueryHandler';

import { STRINGS } from '../../constant/strings';
import { NavigationProp, EventsRouteProp } from './Events.types'
import styles from './Events.styles';



const Events = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<EventsRouteProp>();
  const { data, loading, error } = useGetEventsQuery();
  const { userId } = route.params;

  return (
    <QueryHandler loading={loading} error={error} data={data?.getEvents}>
      <FlatList
        data={data?.getEvents}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => !item.isSoldOut && navigation.navigate('EventDetail', { eventId: item.id , userId})}
            disabled={item.isSoldOut}
            style={[styles.card, item.isSoldOut && styles.soldOutCard]}
          >
            <View>
              <Text style={[styles.eventName, item.isSoldOut && styles.soldOutText]}>
                {item.name}
              </Text>
              <Text style={[styles.eventDate, item.isSoldOut && styles.soldOutText]}>
                {new Date(item.date).toDateString()}
              </Text>
              <Text style={[styles.ticketsAvailable, item.isSoldOut && styles.soldOutStatus]}>
                {item.isSoldOut ? STRINGS.EVENTS.SOLD_OUT : STRINGS.EVENTS.TICKETS_AVAILABLE(item.availableTickets)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </QueryHandler>
  );
};

export default Events;