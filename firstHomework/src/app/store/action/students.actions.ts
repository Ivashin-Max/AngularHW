import { Istudent } from "src/app/TableFormModule/services/studentsOffline.service";
import { Action } from "@ngrx/store";



export const GET_ALL_STUDENTS = "[STUDENT]GET_ALL_STUDENTS";
export const ADD_STUDENT = "[STUDENT]ADD_STUDENT";


export class GetAllStudentsAction implements Action {
  public readonly type = GET_ALL_STUDENTS;

  constructor(public students: Istudent[]) {
  }
}

export class AddStudentAction implements Action {
  public readonly type = ADD_STUDENT;

  constructor(public student: Istudent) {
  }
}



export type StudentActions = AddStudentAction | GetAllStudentsAction;
