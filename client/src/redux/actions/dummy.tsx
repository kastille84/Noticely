import constants from '../constants';

export interface IAddDummyAction {
  type: typeof constants.DUMMY.ADD_DUMMY,
  payload?:any
}

export const add_dummy = ()=> {
    return {
      type: constants.DUMMY.ADD_DUMMY
    }
}

