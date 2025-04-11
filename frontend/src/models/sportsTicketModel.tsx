interface SportsTicket {
  id: string;
  type: "Sport";
  ticketId: string;
  title: string; // e.g., "CSK vs MI"
  venue: string;
  city: string;
  date: string; // Format: YYYY-MM-DD
  time: string; // Format: HH:mm
  gate: string;
  row: string;
  seatNos: string; // Single or multiple seat numbers
  postedUsrId: string;
  phoneNo: string;
  price: string;
  ticketQuant: string;
  imgUrl?: string;
  description?: string;
  usrDescription?: string;
}

export default SportsTicket;
