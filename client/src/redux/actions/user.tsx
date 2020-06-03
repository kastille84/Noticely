import axios from 'axios';
import {Dispatch} from 'redux';
import constants from '../constants';

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
      
    } catch (error) {
      console.log(error)
    }
  }
}