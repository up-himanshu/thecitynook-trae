export interface ReservationEnquiry {
  property?: string;
  name: string;
  phone: string;
  email?: string;
  dateFrom: string;
  dateTo: string;
  guestCount?: number;
}
