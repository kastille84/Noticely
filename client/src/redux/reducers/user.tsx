import {Action} from "../actions/types";
import constants from '../constants';

export interface IUser {
  registering: boolean,
  loggingIn: boolean,
  currentUser: any,
  errors: any
}
const initialState = {
  registering: false,
  loggingIn: false,
  currentUser: {},
  errors: null
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
    case constants.USER.REGISTER_USER_FAIL:
      return {
        ...state,
        registering: false,
        errors: action.payload
      }
    case constants.USER.LOGIN_USER:
      return {
        ...state,
        loggingIn: true,
      }
    case constants.USER.LOGIN_USER_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        currentUser: action.payload
      }
    case constants.USER.LOGIN_USER_FAIL:
      return {
        ...state,
        loggingIn: false,
        errors: action.payload
      }
    default: 
      return state;
  }
}