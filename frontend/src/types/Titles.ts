interface SearchTitleResponse {
  title: string;
  poster: string;
  type: string;
  source: string;
  externalId: string;
  year: string;
}

interface SearchTitleRequest {
  q: string;
  y: string;
}

export type { SearchTitleResponse, SearchTitleRequest };
