interface EventTicket {
  id: string;
  type: "Event";
  ticketId: string;
  title: string; // e.g., "Coldplay Concert"
  venue: string;
  city: string;
  date: string; // Format: YYYY-MM-DD
  time: string; // Format: HH:mm
  gate?: string;
  row?: string;
  seatNos: string;
  postedUsrId: string;
  price: number;
  ticketQuant: number;
  imgUrl?: string;
  description?: string;
  usrDescription?: string;
}

export default EventTicket;
