import {  RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/Navigation.types';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Events'>;
type EventsRouteProp = RouteProp<RootStackParamList, 'Events'>;

export {
  NavigationProp,
  EventsRouteProp
}