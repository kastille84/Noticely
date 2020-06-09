import constants from '../constants';

export interface ISetFlyersAction {
    type: string,
    payload: any
}

export const setFlyerMade = (bool:boolean) => {
    return {
        type: constants.FLYER.SET_FLYER_MADE,
        payload: bool
    }
}

export const setOpenFlyerPane = (bool:boolean) => {
    return {
        type: constants.FLYER.OPEN_FLYER_PANE,
        payload: bool
    }
}

export const setFlyers = (flyers:any) => {
    return {
        type: constants.FLYER.SET_FLYERS,
        payload: flyers
    }
}

export const setSelectedFlyer = (flyer:any) => {
    return {
        type: constants.FLYER.SET_SELECTED_FLYER,
        flyer: flyer
    }
}

export const setNewFlyer = (newFlyer:any) => {
    return {
        type: constants.FLYER.SET_NEW_FLYER,
        newFlyer: newFlyer
    }
}

export const removeFlyer = (flyerId:any) => {
    return {
        type: constants.FLYER.REMOVE_FLYER,
        flyerId: flyerId
    }
}

export const setDeletedFlyer = (bool:boolean) => {
    return {
        type: constants.FLYER.SET_DELETED_FLYER,
        bool: bool
    }
}