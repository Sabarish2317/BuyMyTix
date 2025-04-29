import { ProfileResponse } from "./Profile";
import { AddTitlesRequest } from "./Titles";

export interface Ticket {
  ticketId: string;
  email: string; //user id wll be parsed later in the the backend so just send email check if email is valid (security nigga)
  eventRef: string; //refere id of the titles object after added to the db or form the db
  venue: string;
  ticketQuantity: number;
  ticketPrice: number;
  showTime: Date;
  language: string; // movie specific field
  screenNo: string; //movie specific field
  seatDetails: {
    seatNumbers: string;
    entryGate: string; //Event and sport specific field
    row: string; //Event and sport specific
  };
  userDescription: string;
  expiryTime: Date;
}

interface TicketListing {
  ticketDetails: Ticket;
  sellerDetails: ProfileResponse;
}

export interface GetTicketsByEventResponse {
  data: {
    title: AddTitlesRequest; // The event data
    listings: Record<string, TicketListing>; // A map of ticket listings, where the key is the ticket ID
  };
}

export interface userTicketHistory {
  ticketDetails: {
    _id: string;
    sellerId: string;
    venue: string;
    ticketQuantity: number;
    ticketPrice: number;
    screenNo: string;
    language: string;
    showTime: string; // ISO Date string
    userDescription: string;
    expiryTime: string; // ISO Date string
    createdAt: string;
    updatedAt: string;
    __v: number;
    seatDetails: {
      entryGate: string | null;
      row: string | null;
      seatNumbers: string;
    };
  };
  eventRef: AddTitlesRequest & {
    _id: string;
    imdbID: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}
