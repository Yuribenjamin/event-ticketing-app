import { UsersState, UsersAction } from "../Users.types";

export const userReducer = (state: UsersState, action: UsersAction): UsersState => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'TOGGLE_FORM':
      return { ...state, showForm: !state.showForm };
    default:
      return state;
  }
};
