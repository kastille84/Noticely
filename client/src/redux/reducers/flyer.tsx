import {Action} from "../actions/types";
import constants from '../constants';

export interface IFlyer {
    openFlyerPane: boolean,
    flyerMade: boolean,
    makingFlyer: boolean,
    fetchingFlyers: boolean,
    flyers: any[],
    selectedFlyer: any | null,
    deletedFlyer: boolean,
    errors: any
}
const initialState = {
    openFlyerPane:  false,
    flyerMade: false,
    makingFlyer: false,
    fetchingFlyers: false,
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
            fetchingFlyers: true
        };
    case constants.FLYER.SET_FLYERS_SUCCESS:
        return {
            ...state,
            flyers: action.payload,
            fetchingFlyers: false,
            errors: null
        };
    case constants.FLYER.SET_FLYERS_FAIL:
        return {
            ...state,
            fetchingFlyers: false,
            errors: action.payload
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
            selectedFlyer: action.payload,
            errors: null
        }
    case constants.FLYER.SET_MAKING_FLYER_FAIL:
        return {
            ...state,
            makingFlyer: false,
            flyerMade: false,
            errors: action.payload
        }
    case constants.FLYER.SET_SELECTED_FLYER:
        return {
            ...state,
            selectedFlyer: action.payload
        }
    default: 
      return state;
  }
}