import { User } from './user.types';

export interface Login {
  username?: string;
  password?: string;
}

export interface LoginResponse {
  login: {
    access_token: string,
    user: User
  }
}
