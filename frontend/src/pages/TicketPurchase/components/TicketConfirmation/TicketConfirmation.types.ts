
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../navigation/Navigation.types';

type TicketConfirmationNavigationProp = StackNavigationProp<RootStackParamList, 'TicketConfirmation'>;
type TicketConfirmationRouteProp = RouteProp<RootStackParamList, 'TicketConfirmation'>;

export {
  TicketConfirmationNavigationProp,
  TicketConfirmationRouteProp
}