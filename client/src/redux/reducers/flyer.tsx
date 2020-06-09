import {Action} from "../actions/types";
import constants from '../constants';

export interface IFlyer {
    openFlyerPane: boolean,
    flyerMade: boolean,
    flyers: any[],
    selectedFlyer: any | null,
    deletedFlyer: boolean
}
const initialState = {
    openFlyerPane:  false,
    flyerMade: false,
    flyers: [],
    selectedFlyer: null,
    deletedFlyer: false
}

export default (state:IFlyer=initialState, action:Action) => {
  switch(action.type) {
    case constants.FLYER.SET_FLYERS:
        return {
            ...state,
            flyers: action.payload
        };
    case constants.FLYER.OPEN_FLYER_PANE:
        return {
            ...state,
            openFlyerPane: action.payload
        };
    default: 
      return state;
  }
}