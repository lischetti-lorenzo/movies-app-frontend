import { User } from './user.types';


export type AuthContextTypes = {
  user: User;
  setUser: (user: any) => void;
};
