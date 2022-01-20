import { StudentsState, initialStudentsState } from "./students.state";
// import { Action, ActionReducer, ActionReducerMap } from "@ngrx/store";
import { studentsReducer } from "./reducers/students.reducer";

export interface AppState {
  students: StudentsState;
}


export const appReducers: any = {
  students: studentsReducer
};

export const initialAppState: AppState = {
  students: initialStudentsState
};

export function getInitialState(): AppState {
  return initialAppState;
}
