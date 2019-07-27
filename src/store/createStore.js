import reducer from '@/reducers/index';
import { createStore } from 'redux';

export default function() {
    return createStore(reducer);
};