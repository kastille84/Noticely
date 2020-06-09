import {combineReducers} from 'redux';
import dummyReducer, {IDummy} from './reducers/dummy'; //dummyReducer -reducer, IDummy - Interface of state
import userReducer, {IUser} from './reducers/user';
import locationReducer, {ILocation} from './reducers/location';
import flyerReducer, {IFlyer} from './reducers/flyer';

export interface StoreState {
  dummy: IDummy,
  user: IUser,
  location: ILocation,
  flyer: IFlyer
}

export default combineReducers<StoreState>({
  dummy: dummyReducer,
  user: userReducer,
  location: locationReducer,
  flyer: flyerReducer
});