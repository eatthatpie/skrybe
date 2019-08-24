import reducer from '@/reducers/index';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

export default function() {
    return createStore(reducer, composeWithDevTools());
};