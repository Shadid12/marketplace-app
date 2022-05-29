import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_FAUNA_DOMAIN,
});

const authLink = setContext((_, { headers }) => { 
  const faunaKey = process.env.NEXT_PUBLIC_FAUNA_KEY;
  return {
    headers: { 
      ...headers,
      authorization: `Bearer ${faunaKey}`,
    }
  }
});

export const setAuthToken = (token: string) => setContext((_,
  { headers }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    }
  }))

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});