import { Media } from './media.types';

export interface TvShow extends Media {
  name: string;
  firstAirDate: string;
}
