
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

import {
  IFlyerAction,
} from './flyer';

export type Action = 
IRegisterUserAction |
IRegisterUserActionSuccess |
IRegisterUserActionFail |
ILoginUserAction |
ILoginUserActionSuccess |
ILoginUserActionFail |
ISetIpLocationAction |
ISetValidPlaceAction |
ISetSelectedPlace |
IFlyerAction
; 
