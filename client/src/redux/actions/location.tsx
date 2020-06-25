import constants from '../constants';
import axios from 'axios';
import { async } from 'q';
import { Dispatch } from 'redux';

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

export const getPlaces = () => {
    return async(dispatch: Dispatch) => {
        dispatch({type: constants.LOCATION.GET_PLACES})
        try {
            const response = await axios.post(
                "/graphql",
                JSON.stringify({
                    query: `
                        query {
                            getPlaces {
                                _id
                                place_id
                                name
                                formattedAddress
                                latlng {
                                    lat
                                    lng
                                }
                            }
                        } 
                    `
                })
            );
            const {data:{data:{getPlaces}}} = response;
            dispatch({type: constants.LOCATION.GET_PLACES_SUCCESS, payload:getPlaces})

        } catch(error) {
            dispatch({type: constants.LOCATION.GET_PLACES_ERROR, payload:error.response.data.errors})
        }
    }
}