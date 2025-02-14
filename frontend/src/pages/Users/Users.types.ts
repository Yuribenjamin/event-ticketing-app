import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/Navigation.types';

type UsersState = {
  name: string;
  email: string;
  showForm: boolean;
};

type UsersAction =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'TOGGLE_FORM' };

type NavigationProp = StackNavigationProp<RootStackParamList, 'Users'>;

export {
  UsersState,
  UsersAction,
  NavigationProp
}