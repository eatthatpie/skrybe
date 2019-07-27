import App from '@/container/app/App';
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);