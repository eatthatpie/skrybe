import App from '@/containers/app/App';
import createStore from '@/store/createStore';
import React from 'react';
import { Database, DatabaseContext, FirebaseProvider } from '@/services/database';
import { Auth, AuthContext } from '@/services/auth';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

const store = createStore();
const firebaseProvider = new FirebaseProvider();

render(
    <Provider store={store}>
        <AuthContext.Provider value={
            new Auth({ provider: firebaseProvider })
        }>
            <DatabaseContext.Provider value={
                new Database({ provider: firebaseProvider })
            }>
                <App />
            </DatabaseContext.Provider>
        </AuthContext.Provider>
    </Provider>,
    document.getElementById('root')
);