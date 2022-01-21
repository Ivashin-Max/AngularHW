import { AppState } from "../state";
import { createSelector } from "@ngrx/store";
import { studentAdapter, StudentsState } from "../students.state";



export const {
  selectAll
} = studentAdapter.getSelectors();

const selectStudentsState = (state: AppState): StudentsState => state.students;


export const selectStudents = createSelector(
  selectStudentsState,
 (state: StudentsState) => state.students);


