import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Nav from '../components/Nav'
import { ApolloProvider } from '@apollo/client'
import { client } from '../gqlClient'
import { UserProvider } from '@auth0/nextjs-auth0'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ApolloProvider client={client}>
        <Nav />
        <Component {...pageProps} />
      </ApolloProvider>
    </UserProvider>
  )
}

export default MyApp
