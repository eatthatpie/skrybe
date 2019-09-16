import Database from './Database';
import FirebaseProvider from './provider/FirebaseProvider';
import React from 'react';

const DatabaseContext = new React.createContext({});

export {
    Database,
    DatabaseContext,
    FirebaseProvider
};
