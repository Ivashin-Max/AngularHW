
import { Istudent, IstudentEdit, StudentService } from "./studentsOffline.service";
// import studentsArr from "../../../assets/test.json";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";




@Injectable({ providedIn: "root" })
export class StudentsOnlineService implements StudentService{
  private studentsUrl = "http://localhost:4000/students";
  public students: Istudent[] = [];
  public findedStudents: number[] = [];

  constructor(public http: HttpClient){
  }



  getAllStudents(): Observable<Istudent[]> {
   this.http.get<Istudent[]>(this.studentsUrl).subscribe((students) => this.students = students);
   return this.http.get<Istudent[]>(this.studentsUrl);
  }


  deleteStudent(id: number): void {
    this.http.get<Istudent[]>(`${this.studentsUrl}/${id.toString()}/del`).subscribe((students) => this.students = students);


  }
  newStudent(student: Istudent): void {

    this.http.post<Istudent[]>(this.studentsUrl, student).subscribe((res) => {
      this.students = res;
      console.log(this.students);
      });
  }

  editStudent(id: number, newValues: IstudentEdit): number{
    const studentToEdit = this.students.findIndex((el) => (el.id === id) && !el.deleted);
    if (studentToEdit === -1) {
     return -1;
   }
   const editedStudent: IstudentEdit = {
    "name" : newValues.name,
    "lastName" : newValues.lastName,
    "patronymic" : newValues.patronymic,
    "birthDate" : newValues.birthDate,
    "score" : +newValues.score,
   };

    this.http.patch<Istudent[]>(`${this.studentsUrl}/${id.toString()}`, editedStudent).subscribe((res) => {
      this.students = res;
      console.log(this.students);
      });
     return 1;
  }

}

