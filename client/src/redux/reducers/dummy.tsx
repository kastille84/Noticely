import {Action} from '../actions';
import constants from '../constants';

export interface IDummy {
  isDummy: boolean
}

const defaultState = {
  isDummy: false
}


export default (state:IDummy=defaultState, action:Action): IDummy => {
  switch(action.type) {
    case constants.DUMMY.ADD_DUMMY: 
      return {...state, isDummy: true};
    default:
      return state;
  }
}
