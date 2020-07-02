import React from "react";
import { IState, initialState } from './state';
import { IAction } from './actions';

export interface IContext {
  state: IState;
  dispatch: React.Dispatch<IAction>;
}

export const Context = React.createContext<IContext>({
  state: initialState,
  dispatch: () => {}
});
