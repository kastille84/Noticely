import {combineReducers} from 'redux';
import dummyReducer, {IDummy} from './reducers/dummy'; //dummyReducer -reducer, IDummy - Interface of state

export interface StoreState {
  dummy: IDummy
}

export default combineReducers<StoreState>({
  dummy: dummyReducer
});