export interface CatalogDetails {
  Actors: string;
  Awards: string;
  Country: string;
  Director: string;
  Genre: string;
  Language: string;
  Plot: string;
  Poster: string;
  Rated: string;
  Ratings: Rating[];
  Released: string;
  Runtime: string;
  Title: string;
  Type: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
}

interface Rating {
  Source: string;
  Value: string;
}

export type SearchDetailResponse = CatalogDetails[];
