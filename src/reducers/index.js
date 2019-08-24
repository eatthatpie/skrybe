import nav from './navReducer';
import outlineTree from './outlineTreeReducer';
import outlineTreeNav from './outlineTreeNavReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ nav, outlineTree, outlineTreeNav });

export default rootReducer;