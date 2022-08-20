import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router';

import '@/assets/styles/index.scss';
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <Router />
    </ChakraProvider>
  </React.StrictMode>
);
