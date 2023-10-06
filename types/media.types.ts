interface Cast {
  name: string
  character: string
  order: number
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
  voteAverage: number;
  credit: Credit;
}
