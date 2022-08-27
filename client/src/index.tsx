import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import Router from './router';
import { Provider } from 'react-redux';

import '@/assets/styles/index.scss';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <Router />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
