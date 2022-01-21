import { Action, ActionReducer } from "@ngrx/store";
import { AppState } from "../state";

export const LOGGER_ACTION = "LOGGER_ACTION";

export function logger(action: Action): unknown {
  return {
    type: LOGGER_ACTION,
    payload: action
  };
}


export function handleLog(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log(action);
    console.groupEnd();

    return result;
  };
}
