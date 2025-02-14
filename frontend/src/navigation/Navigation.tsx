import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Users from '../pages/Users/Users';
import Events from '../pages/Events/Events';
import EventDetail from '../pages/Events/components/EventDetail/EventDetail';
import TicketPurchase from '../pages/TicketPurchase/TicketPurchase';
import TicketConfirmation from '../pages/TicketPurchase/components/TicketConfirmation/TicketConfirmation';
import { RootStackParamList } from './Navigation.types';

const Stack = createStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Users">
        <Stack.Screen name="Users" component={Users} />
        <Stack.Screen name="Events" component={Events} />
        <Stack.Screen name="EventDetail" component={EventDetail} />
        <Stack.Screen name="TicketPurchase" component={TicketPurchase} />
        <Stack.Screen name="TicketConfirmation" component={TicketConfirmation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}