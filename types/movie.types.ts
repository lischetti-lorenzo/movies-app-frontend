import { Media } from './media.types';

export interface Movie extends Media {
  adult: boolean;
  originalTitle: string;
  releaseDate: string;
  title: string;
}
