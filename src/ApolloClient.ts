import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache();

const link = new HttpLink({
  uri: 'http://localhost:3000/graphql',
  fetch: (...args) => fetch(...args),
});

// Isolate Apollo client so it could be reused
// in both application runtime and tests.
export const client = new ApolloClient({
  cache,
  link,
});
