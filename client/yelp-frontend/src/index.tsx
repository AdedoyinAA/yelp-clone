import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the new 'react-dom/client' package
import App from './App';
import { ApolloProvider } from '@apollo/client';
import client from './ApolloClient';

// Create a root and render the App component
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);