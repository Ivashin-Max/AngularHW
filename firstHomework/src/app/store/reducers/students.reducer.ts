import { StudentsState, initialStudentsState } from "../students.state";
import { ADD_STUDENT, ADD_STUDENT_SUCCSESS, DELETE_STUDENT, DELETE_STUDENT_SUCCSESS, EDIT_STUDENT, EDIT_STUDENT_SUCCSESS, SET_ALL_STUDENTS,  StudentActions } from "../action/students.actions";




export const studentsReducer = (state = initialStudentsState, action: StudentActions): StudentsState => {
  switch (action.type) {
    case SET_ALL_STUDENTS: {
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
    case ADD_STUDENT_SUCCSESS: {
      return {
        ...state,
        students: [...state.students, action.student]
      };
    }
    case EDIT_STUDENT: {
      return {
        ...state,
        students: state.students.map((el) => {
          if (el.id !== action.id){
            return el;
          }
          return {
            ...el,
            ...action.newValues
          };
        })
      };
    }
    case EDIT_STUDENT_SUCCSESS: {
      return {
        ...state,
        students: state.students.map((el) => {
          if (el.id !== action.id){
            return el;
          }
          return {
            ...el,
            ...action
          };
        })
      };
    }
    case DELETE_STUDENT: {
      return {
        ...state,
        students: state.students.filter((el) => el.id !== action.id)
      };
    }
    case DELETE_STUDENT_SUCCSESS: {
      return {
        ...state,
        students: state.students.filter((el) => el.id !== action.id)
      };
    }
    default: {
      return state;
    }
  }
};
