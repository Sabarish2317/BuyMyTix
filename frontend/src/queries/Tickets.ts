import axios from "../utils/axios";
import {
  GetTicketsByEventResponse,
  Ticket,
  userTicketHistory,
} from "../types/Ticket";
import {
  addTicketAPi,
  deleteTicketApi,
  editTicketApi,
  getUserHistoryApi,
} from "../routes/apiRoutes";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

export const addTicket = async (
  addTicketRequest: Ticket
): Promise<{ message: string; ticket: Ticket }> => {
  // same api route as fetch titles
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Please login first");
  }
  const res = await axios.post(addTicketAPi, addTicketRequest, {
    headers: { authorization: `bearer ${token}` },
  });
  return res.data;
};

// Axios function to fetch tickets by eventRefId
export const getTickets = async (
  eventRefId: string
): Promise<GetTicketsByEventResponse> => {
  try {
    const response = await axios.get(`/api/tickets`, {
      params: { eventRefId },
      timeout: 10000,
    });
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error("Error fetching tickets");
  }
};

export const getUserHistory = async (): Promise<userTicketHistory[]> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Please login first");
    toast.error("Please login first");
  }

  try {
    const response = await axios.get(getUserHistoryApi, {
      headers: { authorization: `bearer ${token}` },
      timeout: 5000,
    });

    return response.data;
  } catch (error: any) {
    console.error("Error fetching user history:", error);
    throw new Error("Failed to fetch user ticket history");
  }
};

export const deleteTicket = async (ticketId: string) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Please login first");
    toast.error("Please login first");
  }

  try {
    const response = await axios.delete(deleteTicketApi + ticketId, {
      headers: { authorization: `bearer ${token}` },
      timeout: 5000,
    });

    return response.data;
  } catch (err) {
    throw new Error("An error occured while deleting the ticket");
    toast.error("An error occured while deleting ticket");
  }
};

export const updateTicketById = async (
  ticketId: string,
  updatedFields: Partial<Ticket>
) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Please login first");
    toast.error("Please login first");
  }
  try {
    const res = await axios.put(`${editTicketApi}${ticketId}`, updatedFields, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      toast.success(res.data.message);
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
    if (err.res.status !== 200) throw new Error("Failed to update ticket");
  }
};
