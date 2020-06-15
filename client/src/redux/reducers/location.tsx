import {Action} from "../actions/types";
import constants from '../constants';

export interface ILocation {
    ipLocation: {lat:number, lng:number}|null,
    validPlace: any|null,
    selectedPlace: any|null,
    allPlaces: any[],
    errors: any,
    gettingPlaces: boolean
}
const initialState = {
    ipLocation: {
        lat:41.500710,
        lng: -74.021347
    },
    validPlace: null,
    selectedPlace: null,
    allPlaces: [],
    errors: null,
    gettingPlaces: false
}

export default (state:ILocation=initialState, action:Action) => {
  switch(action.type) {
    case constants.LOCATION.SET_IP_LOCATION:
        return {
            ...state,
            ipLocation: action.payload
        };
    case constants.LOCATION.SET_VALID_PLACE:
        return {
            ...state,
            validPlace: action.payload
        }
    case constants.LOCATION.SET_SELECTED_PLACE:
        return {
            ...state,
            selectedPlace: action.payload
        }
    case constants.LOCATION.GET_PLACES:
        return {
            ...state,
            gettingPlaces: true
        }
    case constants.LOCATION.GET_PLACES_SUCCESS:
        return {
            ...state,
            gettingPlaces: false,
            allPlaces: action.payload
        }
    case constants.LOCATION.GET_PLACES_ERROR:
        return {
            ...state,
            gettingPlaces: false,
            errors: action.payload
        }
    default: 
      return state;
  }
}