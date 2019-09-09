import characters from './charactersReducer';
import nav from './navReducer';
import outlineTree from './outlineTreeReducer';
import view from './viewReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ characters, nav, outlineTree, view });

export default rootReducer;
