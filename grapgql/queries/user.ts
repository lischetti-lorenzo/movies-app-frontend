import { gql } from '@apollo/client';

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
