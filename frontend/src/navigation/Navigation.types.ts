export type RootStackParamList = {
  Users: undefined;
  Events: { userId: string };
  EventDetail: { eventId: string; userId: string }; // ✅ Added userId
  TicketPurchase: { eventId: string; userId: string }; // ✅ Ensured userId is included
  TicketConfirmation: { order: { orderNumber: string; event: { name: string }; ticketCount: number } };
};