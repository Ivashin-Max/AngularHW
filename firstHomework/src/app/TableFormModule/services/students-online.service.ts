
import { Istudent, IstudentEdit, StudentService } from "./studentsOffline.service";
// import studentsArr from "../../../assets/test.json";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";



@Injectable({ providedIn: "root" })
export class StudentsOnlineService implements StudentService{
  private studentsUrl = environment.studentsUrl;
  public students: Istudent[] = [];
  public findedStudents: number[] = [];
  public numberVar = new Subject<number>();
  public numberVar$ = this.numberVar.asObservable();
  public updateNumSubject(newNumberVar: number): void {
    this.numberVar.next(newNumberVar);
  }

  constructor(public http: HttpClient){
    this.getAllStudents().subscribe(() => this.updateNumSubject(1));
  }



  getAllStudents(): Observable<Istudent[]> {
   this.http.get<Istudent[]>(this.studentsUrl).subscribe((students) => this.students = students);
   return this.http.get<Istudent[]>(this.studentsUrl);
  }


  deleteStudent(id: number): void {
    this.http.get<Istudent[]>(`${this.studentsUrl}/${id.toString()}/del`).subscribe((students) => {
      this.students = students;
      this.updateNumSubject(1);
    });


  }

  newStudent(student: Istudent): void {
    this.http.post<Istudent[]>(this.studentsUrl, student).subscribe((res) => {
      this.students = res;
      this.updateNumSubject(1);
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
      this.updateNumSubject(1);
      });
     return 1;
  }

}

