import { RoleType } from './signup.types';

export type User = {
  id: number;
  username: string;
  role: RoleType
};
