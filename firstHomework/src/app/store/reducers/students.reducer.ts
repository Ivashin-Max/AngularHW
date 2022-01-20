import { StudentsState, initialStudentsState } from "../students.state";
import { ADD_STUDENT, GET_ALL_STUDENTS,  StudentActions } from "../action/students.actions";



export const studentsReducer = (state = initialStudentsState, action: StudentActions): StudentsState => {
  switch (action.type) {
    case GET_ALL_STUDENTS: {
      return {
        ...state,
        students: [...action.students]
      };
    }
    case ADD_STUDENT: {
      return {
        ...state,
        students: [...state.students, action.student]
      };
    }
//      return studentAdapter.addOne(action.students, state);
    default: {
      return state;
    }
  }
};
