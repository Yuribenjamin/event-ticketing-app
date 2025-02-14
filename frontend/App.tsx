import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './src/apollo/client';
import Navigation from './src/navigation/Navigation';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Navigation />
    </ApolloProvider>
  );
}