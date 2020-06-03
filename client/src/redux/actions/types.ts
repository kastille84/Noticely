import {IAddDummyAction} from './dummy';

//User Actions
import {
  IRegisterUserAction,
  IRegisterUserActionSuccess,
  IRegisterUserActionFail
} from './user';

export type Action = 
IAddDummyAction |
IRegisterUserAction |
IRegisterUserActionSuccess |
IRegisterUserActionFail; 
