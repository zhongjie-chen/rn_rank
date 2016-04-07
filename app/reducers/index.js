import {combineReducers} from 'redux';
import read from './read';
import beautyReducers from  './beautyReducers';

const rootReducer = combineReducers({
	read,
	beautyReducers
})

export default rootReducer;
