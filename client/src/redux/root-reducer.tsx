import {combineReducers} from 'redux';
import userReducer, {IUser} from './reducers/user';
import locationReducer, {ILocation} from './reducers/location';
import flyerReducer, {IFlyer} from './reducers/flyer';

export interface StoreState {
  user: IUser,
  location: ILocation,
  flyer: IFlyer
}

export default combineReducers<StoreState>({
  user: userReducer,
  location: locationReducer,
  flyer: flyerReducer
});