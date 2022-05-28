import React from 'react';
import { Provider } from 'react-redux';

import { store } from './_helpers';
import { App } from './App';

import { createRoot } from 'react-dom/client';

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
    <Provider store={store}>
        <App />
    </Provider>//,
    //document.getElementById('app')
);
