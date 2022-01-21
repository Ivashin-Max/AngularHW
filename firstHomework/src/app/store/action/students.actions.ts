import { Istudent, IstudentEdit } from "src/app/TableFormModule/services/studentsOffline.service";
import { Action } from "@ngrx/store";



export const SET_ALL_STUDENTS = "[STUDENT]SET_ALL_STUDENTS";
export const ADD_STUDENT = "[STUDENT]ADD_STUDENT";
export const ADD_STUDENT_SUCCSESS = "[STUDENT]ADD_STUDENT";
export const EDIT_STUDENT = "[STUDENT]EDIT_STUDENT";
export const DELETE_STUDENT = "[STUDENT]DELETE_STUDENT";

export class SetAllStudentsAction implements Action {
  public readonly type = SET_ALL_STUDENTS;

  constructor(public students: Istudent[]) {
  }
}

export class AddStudentAction implements Action {
  public readonly type = ADD_STUDENT;

  constructor(public student: Istudent) {
  }
}

export class AddStudentSuccsessAction implements Action {
  public readonly type = ADD_STUDENT_SUCCSESS;

  constructor(public student: Istudent) {
  }
}

export class EditStudentAction implements Action {
  public readonly type = EDIT_STUDENT;

  constructor(public newValues: IstudentEdit, public id: number) {
  }
}

export class DeleteStudentAction implements Action {
  public readonly type = DELETE_STUDENT;

  constructor(public id: number) {
  }
}


export type StudentActions = AddStudentAction | AddStudentSuccsessAction | DeleteStudentAction | EditStudentAction | SetAllStudentsAction;
