import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
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
export class StudentService {
  public students: Istudent[] = [];
  public findedStudents: number[] = [];

  constructor(){
    this.getAllStudents();
  }

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

  constructor(){
    this.getAllStudents();
  }

  getAllStudents(): Observable<Istudent[]> {
    this.students = studentsArr.students;
    return of(this.students);
  }

  newStudent(student: Istudent): void {
    this.students.push(student);
  }

  editStudent(id: number, newValues: IstudentEdit): number{
    const studentToEdit = this.students.findIndex((el) => (el.id === id) && !el.deleted);
    if (studentToEdit === -1) {
     return -1;
   }
     this.students[studentToEdit].name = newValues.name;
     this.students[studentToEdit].lastName = newValues.lastName;
     this.students[studentToEdit].patronymic = newValues.patronymic;
     this.students[studentToEdit].birthDate = newValues.birthDate;
     this.students[studentToEdit].score = +newValues.score;
     return 1;
  }

  deleteStudent(id: number): void{
    const studentToDelete = this.students.findIndex((stud) => stud.id === id);
    this.students[studentToDelete].deleted = true;
  }

}

