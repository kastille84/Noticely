import constants from "../constants";
import { Dispatch } from "redux";
import axios from "axios";

export interface IFlyerData {
  placeId: string;
  formattedAddress: string;
  name: string;
  latlng: {
    lat: number,
    lng: number
  };
  images: string[];
  heading: string;
  description: string;
  phone: string;
  email: string;
}
export interface IFlyerAction {
  type: string;
  payload: any;
}

export const makeFlyer = (flyer: IFlyerData) => {
  return async (dispatch: Dispatch) => {
    dispatch<IFlyerAction>({
      type: constants.FLYER.SET_MAKING_FLYER,
      payload: true
    });
    try {
        const response = await axios.post(
                "/graphql",
                JSON.stringify({
                    query: `
                        mutation {
                            makeFlyer(flyerInput: {
                                placeId: "${flyer.placeId}", formattedAddress: "${flyer.formattedAddress}" , 
                                latlng: {lat:"${flyer.latlng.lat}", lng: "${flyer.latlng.lng}"},
                                name: "${flyer.name}", heading: "${flyer.heading}", 
                                description: """${flyer.description}""", images: "${flyer.images}",
                                contact: {phone:"${flyer.phone}", email: "${flyer.email}"}
                            }) {
                                _id
                                placeId
                                images
                                heading
                                description
                                contact {
                                  phone
                                  email
                                }
                                createdAt
                                updatedAt
                            }
                        } 
                    `
                })
            );
            const {data:{data:{makeFlyer}}} = response;
            dispatch<IFlyerAction>({
              type: constants.FLYER.SET_MAKING_FLYER_SUCCESS,
              payload: makeFlyer
            });
    } catch(error) {
        dispatch<IFlyerAction>({
            type: constants.FLYER.SET_MAKING_FLYER_FAIL,
            payload: error
        })
    }
  };
};

export const setOpenFlyerPane = (bool: boolean) => {
  return {
    type: constants.FLYER.OPEN_FLYER_PANE,
    payload: bool
  };
};

export const setFlyersInit = (flyers: any) => {
  return {
    type: constants.FLYER.SET_FLYERS_SUCCESS,
    payload: flyers
  };
};

export const getFlyersByPlace = (place_id: String) => {
  return async (dispatch: Dispatch) => {
    dispatch({type: constants.FLYER.SET_FLYERS});
    try {
      const response = await axios.post("graphql", JSON.stringify({
        query: `
          query {
            getFlyersByPlace(flyersByPlaceInput: {place_id: "${place_id}"}) {
              _id
              placeId 
              heading
              description
              images
              contact {
                phone
                email
              }
              createdAt
              updatedAt
            }
          }
        `
      }))
      const {data:{data:{getFlyersByPlace}}} = response;
      dispatch({type: constants.FLYER.SET_FLYERS_SUCCESS, payload: getFlyersByPlace});
    } catch(error) {
      dispatch({type: constants.FLYER.SET_FLYERS_FAIL, payload: error});
    }
  }
};

export const setSelectedFlyer = (flyer: any) => {
  return {
    type: constants.FLYER.SET_SELECTED_FLYER,
    flyer: flyer
  };
};

export const setNewFlyer = (newFlyer: any) => {
  return {
    type: constants.FLYER.SET_NEW_FLYER,
    newFlyer: newFlyer
  };
};

export const removeFlyer = (flyerId: any) => {
  return {
    type: constants.FLYER.REMOVE_FLYER,
    flyerId: flyerId
  };
};

export const setDeletedFlyer = (bool: boolean) => {
  return {
    type: constants.FLYER.SET_DELETED_FLYER,
    bool: bool
  };
};
