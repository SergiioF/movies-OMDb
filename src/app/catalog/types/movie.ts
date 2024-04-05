export type SearchParams = {
  title?: string;
  year?: string;
  type?: string;
  id?: string;
};


export interface Movie {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

export type SearchResponse = Movie[];
