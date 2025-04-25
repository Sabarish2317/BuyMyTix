interface DbSearchTitleResponse {
  eventId: string;
  title: string;
  poster: string;
  type: string;
  source: string;
  description: string;
  rating: string;
  year: string;
}
interface OMDBSearchTitleResponse {
  title: string;
  poster: string;
  type: string;
  source: string;
  description: string;
  rating: string;
  year: string;
}

interface SearchTitleRequest {
  q: string;
  y: string;
  source: string;
  type: string;
}

interface AddTitlesRequest {
  eventId: string;
  title: string;
  poster: string;
  type: string;
  source: string;
  description: string;
  rating: string;
  year: string;
}

interface AddTitlesResponse {
  message: string;
  event: AddTitlesRequest;
}
export type {
  DbSearchTitleResponse,
  OMDBSearchTitleResponse,
  SearchTitleRequest,
  AddTitlesRequest,
  AddTitlesResponse,
};
