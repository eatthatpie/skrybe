import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    charactersReducer,
    modeReducer,
    navReducer,
    outlineTreeReducer,
    viewReducer
} from '@/reducers';

export default function() {
    const rootReducer = combineReducers({
        characters: charactersReducer,
        mode: modeReducer,
        nav: navReducer,
        outlineTree: outlineTreeReducer,
        view: viewReducer
    });

    return createStore(rootReducer, composeWithDevTools());
};
