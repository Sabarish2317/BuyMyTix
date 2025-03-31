interface MovieTicket {
  id: string;
  type: "Movie";
  ticketId: string;
  movieTitle: string;
  releaseYear: number;
  language: string;
  screenNo: string;
  format: string; // 2D or 3D
  theatre: string;
  city: string;
  date: string; // Format: YYYY-MM-DD
  time: string; // Format: HH:mm
  seatNos: string;
  postedUsrId: string;
  price: number;
  ticketQuant: number;
  imgUrl?: string;
  description?: string;
  usrDescription?: string;
}

export default MovieTicket;
