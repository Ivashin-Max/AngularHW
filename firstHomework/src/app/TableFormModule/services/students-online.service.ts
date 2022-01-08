import { Injectable } from "@angular/core";
import { Istudent, IstudentEdit, StudentService } from "./studentsOffline.service";
import studentsArr from "../../../assets/test.json";

@Injectable({
  providedIn: "root"
})
export class StudentsOnlineService implements  StudentService{

  public students: Istudent[] = [];
  public findedStudents: number[] = [];

  constructor(){
    this.getAllStudents();

  }


  getAllStudents(): Istudent[] {
    this.students = studentsArr.students;

    return this.students;
  }


  deleteStudent(id: number): void {
    throw new Error("Method not implemented.");
  }
  newStudent(): void {
    throw new Error("Method not implemented.");
  }
  editStudent(id: number, newValues: IstudentEdit): number{
    throw new Error("Method not implemented.");
  }

}

