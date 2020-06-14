import {Action} from "../actions/types";
import constants from '../constants';

export interface IFlyer {
    openFlyerPane: boolean,
    flyerMade: boolean,
    makingFlyer: boolean,
    flyers: any[],
    selectedFlyer: any | null,
    deletedFlyer: boolean,
    errors: any
}
const initialState = {
    openFlyerPane:  false,
    flyerMade: false,
    makingFlyer: false,
    flyers: [],
    selectedFlyer: null,
    deletedFlyer: false,
    errors: null
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
    case constants.FLYER.SET_MAKING_FLYER:
        return {
            ...state,
            makingFlyer: true
        }
    case constants.FLYER.SET_MAKING_FLYER_SUCCESS:
        return {
            ...state,
            makingFlyer: false,
            flyerMade: true,
            selectedFlyer: action.payload
        }
    case constants.FLYER.SET_MAKING_FLYER_SUCCESS:
        return {
            ...state,
            makingFlyer: false,
            flyerMade: false,
            errors: action.payload
        }
    default: 
      return state;
  }
}