import constants from '../constants';

//Interfaces
export interface ISetIpLocationAction {
    type: string,
    payload?: any
}
export interface ISetValidPlaceAction {
    type: string,
    payload?: any
}
export interface ISetSelectedPlace {
    type: string,
    payload?: any
}

export const setIpLocation = (ipLocation:{lat:number, lng:number}) => {
    return {
        type: constants.LOCATION.SET_IP_LOCATION,
        payload: ipLocation
    }
}

export const setValidPlace = (bool:boolean) => {
    return {
        type: constants.LOCATION.SET_VALID_PLACE,
        payload: bool
    }
}

export const setSelectedPlace = (place:any) => {
    return {
        type: constants.LOCATION.SET_SELECTED_PLACE,
        payload: place
    }
}