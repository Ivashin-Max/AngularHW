import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable  } from "rxjs";
import { AddStudentAction, DeleteStudentAction, EditStudentAction, SetAllStudentsAction } from "src/app/store/action/students.actions";
import { selectStudents } from "src/app/store/selector/students.selectors";
// import { selectStudents } from "src/app/store/selector/students.selectors";
import { AppState } from "src/app/store/state";
import studentsArr from "../../../assets/studentList.json";


export interface Istudent{
  id: number;
  lastName: string;
  name: string;
  patronymic: string;
  birthDate: string;
  score: number;
  deleted: boolean;
  inRange: boolean;
}

export interface IstudentEdit{
  lastName: string;
  name: string;
  patronymic: string;
  birthDate: string;
  score: number;
}



@Injectable( { providedIn: "root" } )
export class StudentService  {
  public students: Istudent[] = [];
  public findedStudents: number[] = [];


  getAllStudents(): Observable<Istudent[]> {
    return new Observable<Istudent[]>();
  }

  deleteStudent(id: number): void{}

  newStudent(student: Istudent): void{}

  editStudent(id: number, newValues: IstudentEdit): number{
    return 0;
  }

}

@Injectable( { providedIn: "root" } )
export class StudentsOfflineService implements StudentService{
  public students: Istudent[] = [];
  public findedStudents: number[] = [];




  constructor(private store: Store<AppState>){
  }

  getAllStudents(): Observable<Istudent[]> {
    this.store.dispatch(new SetAllStudentsAction(studentsArr.students));
    return this.store.select(selectStudents);
  }

  newStudent(student: Istudent): void {
    this.store.dispatch(new AddStudentAction(student));
  }

  editStudent(id: number, newValues: IstudentEdit): number{
    this.store.dispatch(new EditStudentAction(newValues, id));
     return 1;
  }

  deleteStudent(id: number): void{
    this.store.dispatch(new DeleteStudentAction(id));
  }

}

