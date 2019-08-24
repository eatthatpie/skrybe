import nav from './navReducer';
import outlineTree from './outlineTreeReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ nav, outlineTree });

export default rootReducer;