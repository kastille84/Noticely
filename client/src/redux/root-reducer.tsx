import {combineReducers} from 'redux';
import dummyReducer, {IDummy} from './reducers/dummy'; //dummyReducer -reducer, IDummy - Interface of state
import userReducer, {IUser} from './reducers/user';

export interface StoreState {
  dummy: IDummy,
  user: IUser
}

export default combineReducers<StoreState>({
  dummy: dummyReducer,
  user: userReducer
});