import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client/core";
import { onError } from "@apollo/client/link/error";
import { AUTH_TOKEN } from '../constants/auth';


const httpLink = new HttpLink({
  uri: process.env.MOVIES_GRAPHQL_URL,
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
    graphQLErrors.forEach(({ message, locations, path }) => {
      if (/jwt expired/.test(message)) {
        localStorage.removeItem(AUTH_TOKEN);
        localStorage.removeItem("me");
        window.location.reload();
      }
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([errorLink, authMiddleware, httpLink]),
});

export { client };
