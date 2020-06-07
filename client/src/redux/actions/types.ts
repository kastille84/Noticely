import {IAddDummyAction} from './dummy';

//User Actions
import {
  IRegisterUserAction,
  IRegisterUserActionSuccess,
  IRegisterUserActionFail,
  ILoginUserAction,
  ILoginUserActionSuccess,
  ILoginUserActionFail,
} from './user';

import {
  ISetIpLocationAction,
  ISetValidPlaceAction,
  ISetSelectedPlace
} from './location';

export type Action = 
IAddDummyAction |
IRegisterUserAction |
IRegisterUserActionSuccess |
IRegisterUserActionFail |
ILoginUserAction |
ILoginUserActionSuccess |
ILoginUserActionFail |
ISetIpLocationAction |
ISetValidPlaceAction |
ISetSelectedPlace
; 
