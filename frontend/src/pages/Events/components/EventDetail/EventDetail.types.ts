import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../navigation/Navigation.types';

type EventDetailNavigationProp = StackNavigationProp<RootStackParamList, 'EventDetail'>;
type EventDetailRouteProp = RouteProp<RootStackParamList, 'EventDetail'>;

export {
  EventDetailNavigationProp,
  EventDetailRouteProp
}