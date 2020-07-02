export enum ACTION_TYPE {
  UPDATE_USER_STATE
}

export type IAction = IUpdateUserState;

export interface IUpdateUserState {
  type: ACTION_TYPE.UPDATE_USER_STATE,
  data: boolean
}