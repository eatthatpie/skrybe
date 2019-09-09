import App from '@/containers/app/App';
import createStore from '@/store/createStore';
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

const store = createStore();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);