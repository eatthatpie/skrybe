import App from '@/containers/app/App';
import createStore from '@/store/createStore';
import React from 'react';
import { Database, DatabaseContext, FirebaseProvider } from '@/services/database';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

const store = createStore();
const firebaseDatabaseProvider = new FirebaseProvider();

render(
    <Provider store={store}>
        <DatabaseContext.Provider value={
            new Database({ provider: firebaseDatabaseProvider })
        }>
            <App />
        </DatabaseContext.Provider>
    </Provider>,
    document.getElementById('root')
);