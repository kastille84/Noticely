import {Action} from "../actions/types";
import constants from '../constants';

export interface IUser {
  registering: boolean,
  currentUser: any
}
const initialState = {
  registering: false,
  currentUser: {}
}

export default (state:IUser=initialState, action:Action) => {
  switch(action.type) {
    case constants.USER.REGISTER_USER:
      return {
        ...state,
        registering: true
      }
    case constants.USER.REGISTER_USER_SUCCESS:
      return {
        ...state,
        registering: false,
        currentUser: action.payload
      }
    default: 
      return state;
  }
}