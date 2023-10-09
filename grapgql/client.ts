import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client/core";
import { onError } from "@apollo/client/link/error";
import { AUTH_TOKEN } from '../constants/auth';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_MOVIES_GRAPHQL_URL
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN) || null}`,
    },
  }));

  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      if (extensions.originalError && extensions.originalError['statusCode'] && extensions.originalError['statusCode'] === 401) {
        window.location.href = '/unauthorized';
      }
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authMiddleware, httpLink]),
  
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          favoriteMovies: {
            keyArgs: false,
            merge(existing, incoming, { args: { skip = 0 }}) {
              const merged = existing ? existing.slice(0) : [];
              for (let i = 0; i < incoming.length; ++i) {
                merged[skip + i] = incoming[i];
              }
              return merged;
            }
          },
          favoriteTvShows: {
            keyArgs: false,
            merge(existing, incoming, { args: { skip = 0 }}) {
              const merged = existing ? existing.slice(0) : [];
              for (let i = 0; i < incoming.length; ++i) {
                merged[skip + i] = incoming[i];
              }
              return merged;
            }
          }
        }
      }
    }
  })
});

export { client };
