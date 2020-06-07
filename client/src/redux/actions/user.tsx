import axios from 'axios';
import {Dispatch} from 'redux';

import agent from '../../agent';
import constants from '../constants';

//Interfaces
export interface IRegisterUserAction {
  type: typeof constants.USER.REGISTER_USER,
  payload?: any
}
export interface IRegisterUserActionSuccess {
  type: typeof constants.USER.REGISTER_USER_SUCCESS,
  payload: any // #TODO - should be fleshed out with real response payload
}
export interface IRegisterUserActionFail {
  type: typeof constants.USER.REGISTER_USER_FAIL,
  payload?:any
}
export interface ILoginUserAction {
  type: string,
  payload?:any
}
export interface ILoginUserActionSuccess {
  type: string,
  payload?:any
}
export interface ILoginUserActionFail {
  type: string,
  payload?:any
}

export const registerUser = (fullName: string, email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    dispatch<IRegisterUserAction>({type: constants.USER.REGISTER_USER});
    try {
      const response = await axios.post("/graphql", 
        JSON.stringify({
          query: `
            mutation {
              registerUser(userInput: {name: "${fullName}", email: "${email}", password: "${password}"}) {
                _id
                name,
                email,
                token
              }
            }
          `
        }));
      const {data:{data:{registerUser}}} = response;
      dispatch<IRegisterUserActionSuccess>({
        type: constants.USER.REGISTER_USER_SUCCESS,
        payload: registerUser
      });
      //set session
      agent.setSession(registerUser.token);

    } catch (error) {
      dispatch<IRegisterUserActionFail>({
        type: constants.USER.REGISTER_USER_FAIL,
        payload: error.response.data.errors
      })
    }
  }
}

export const getUserInfo = () => {
  return async (dispatch:Dispatch) => {
    dispatch<IRegisterUserAction>({type: constants.USER.LOGIN_USER});
    try {
      const response = await axios.post("/graphql", 
      JSON.stringify({
        query: `
          query {
            getUserInfo {
              _id
              name,
              email,
              token
            }
          }
        `
      }));
      const {data:{data:{getUserInfo}}} = response;
      dispatch<ILoginUserActionSuccess>({
        type: constants.USER.LOGIN_USER_SUCCESS,
        payload: getUserInfo
      });
      //set session
      agent.setSession(getUserInfo.token);

    } catch(error) {
      dispatch<ILoginUserActionFail>({
        type: constants.USER.LOGIN_USER_FAIL,
        payload: error.response.data.errors
      })
    }
  }
}

export const loginUser = (email: string, password: string) => {
  return async (dispatch:Dispatch) => {
    dispatch<ILoginUserAction>({type: constants.USER.LOGIN_USER});
    try {
      const response = await axios.post("/graphql", 
      JSON.stringify({
        query: `
          query {
            loginUser(loginInput: {email: "${email}", password: "${password}"}) {
              _id
              name,
              email,
              token
            }
          }
        `
      }));
      const {data:{data:{loginUser}}} = response;
      dispatch<ILoginUserActionSuccess>({
        type: constants.USER.LOGIN_USER_SUCCESS,
        payload: loginUser
      });
      //set session
      agent.setSession(loginUser.token);

    } catch(error) {
      console.log("error",error.response)
      dispatch<ILoginUserActionFail>({
        type: constants.USER.LOGIN_USER_FAIL,
        payload: error.response.data.errors
      })
    }
  }
}

export const logoutUser = () => {
  agent.clearSession();
  return {
    type: constants.USER.LOGOUT_USER
  }
}