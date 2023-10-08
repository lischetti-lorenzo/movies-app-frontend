export interface Cast {
  id: number
  name: string
  character: string
  order: number
  profilePath: string
}

interface Crew {
  name: string
  job: string
}

interface Credit {
  cast: Cast[]
  crew: Crew[]
}

export interface Media {
  tmdbId: number
  overview: string;
  popularity: number;
  posterPath: string | null;
  backdropPath: string | null;
  voteAverage: number;
  credit: Credit;
  favorite: boolean;
}
