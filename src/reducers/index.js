import characters from './charactersReducer';
import mode from './modeReducer';
import nav from './navReducer';
import outlineTree from './outlineTreeReducer';
import view from './viewReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ characters, mode, nav, outlineTree, view });

export default rootReducer;
