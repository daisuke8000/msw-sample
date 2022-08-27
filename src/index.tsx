import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './ApolloClient';
import { LoginForm } from './LoginForm';
import { createRoot } from 'react-dom/client';
import { worker } from './mocks/browser';

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

// Start the mocking conditionally.
if (process.env.NODE_ENV === 'development') {
  worker.start().catch((err) => console.log(err));
}

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <LoginForm />
    </ApolloProvider>
  </React.StrictMode>
);
