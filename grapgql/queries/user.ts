import { gql } from '@apollo/client';
import { RoleType } from '../../types/signup.types';
import { User } from '../../types/user.types';

export interface CreateUserInput {
  createUserInput: {
    confirmPassword: string
    password: string
    username: string
    role: RoleType
  }
}

export interface CreateUserResponse {
  signUp: User
}

export const LOGIN = gql`
  mutation Mutation($loginUserInput: LoginUserInput!) {
    login(loginUserInput: $loginUserInput) {
      access_token
      user {
        id
        username
      }
    }
  }
`;

export const SIGNUP = gql `
  mutation SignUp($createUserInput: CreateUserInput!) {
    signUp(createUserInput: $createUserInput) {
      id
      username
      role
    }
  }
`;
