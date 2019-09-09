import characters from './charactersReducer';
import nav from './navReducer';
import outlineTree from './outlineTreeReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ characters, nav, outlineTree });

export default rootReducer;