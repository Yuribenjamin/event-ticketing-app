export const STRINGS = {
  COMMON: {
    LOADING: 'Loading...',
    ERROR: 'Error:',
    NO_DATA: 'No data available',
  },
  USERS: {
    TITLE: 'Select or Create a User',
    NAME: 'Name',
    EMAIL: 'Email',
    CREATE_BUTTON: 'Create User',
    CREATE_ERROR: 'Failed to create user',
    CREATING: 'Creating User...',
  },
  ORDER: {
    CONFIRMED: '🎉 Order Confirmed! 🎟',
    NUMBER: 'Order Number:',
    EVENT: 'Event:',
    TICKETS: 'Tickets:',
    BACK_TO_EVENTS: 'Back to Events',
  },
  EVENTS: {
    SOLD_OUT: 'Sold Out',
    TICKETS_AVAILABLE: (count: number) => `${count} tickets available`,
  },
  PURCHASE: {
    ENTER_TICKETS: 'Enter Number of Tickets:',
    PURCHASE_BUTTON: 'Purchase',
    PROCESSING: 'Processing...',
    PURCHASE_FAILED: 'Purchase mutation returned no order data.',
    MUTATION_ERROR: 'Mutation Error:',
  },
};