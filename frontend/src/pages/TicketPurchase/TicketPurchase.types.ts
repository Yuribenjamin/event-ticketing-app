import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/Navigation.types';

type TicketPurchaseNavigationProp = StackNavigationProp<RootStackParamList, 'TicketPurchase'>;
type TicketPurchaseRouteProp = RouteProp<RootStackParamList, 'TicketPurchase'>;

export {
  TicketPurchaseNavigationProp,
  TicketPurchaseRouteProp
}