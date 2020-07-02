import { useReducer, Reducer } from "react";
import { initialState, IState } from "../state";
import { IAction, ACTION_TYPE } from "../actions";

export function useUserReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
}

export const reducer: Reducer<IState, IAction> = (
  state,
  action
) => {
  switch (action.type) {
    case ACTION_TYPE.UPDATE_USER_STATE:
      return {
        ...state,
        admin: action.data
      }
    default:
      throw new Error();
  }
};
