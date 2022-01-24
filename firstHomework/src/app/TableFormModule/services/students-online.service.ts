
import { Istudent, IstudentEdit, StudentService } from "./studentsOffline.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/state";
import { SetAllStudentsAction } from "src/app/store/action/students.actions";
import { selectStudents } from "src/app/store/selector/students.selectors";



@Injectable({ providedIn: "root" })
export class StudentsOnlineService implements StudentService{
  private studentsUrl = environment.studentsUrl;
  public students: Istudent[] = [];
  public findedStudents: number[] = [];



  constructor(public http: HttpClient, private store: Store<AppState>){
  }



  getAllStudents(): Observable<Istudent[]> {
   this.http.get<Istudent[]>(this.studentsUrl).subscribe((students) => {
     this.students = students;
     return this.store.dispatch(new SetAllStudentsAction(students));
});
   return this.store.select(selectStudents);
  }


  deleteStudent(id: number): void {
    this.http.get<Istudent[]>(`${this.studentsUrl}/${id}/del`).subscribe((res) => {
      this.store.dispatch(new SetAllStudentsAction(res));
      });
  }

  newStudent(student: Istudent): void {
    this.http.post<Istudent[]>(this.studentsUrl, student).subscribe((res) => {
      this.store.dispatch(new SetAllStudentsAction(res));
    });
  }

  editStudent(id: number, newValues: IstudentEdit): number{
   const editedStudent: IstudentEdit = {
    "name" : newValues.name,
    "lastName" : newValues.lastName,
    "patronymic" : newValues.patronymic,
    "birthDate" : newValues.birthDate,
    "score" : +newValues.score,
   };

    this.http.patch<Istudent[]>(`${this.studentsUrl}/${id.toString()}`, editedStudent).subscribe((res) => {
      this.store.dispatch(new SetAllStudentsAction(res));
      });
     return 1;
  }

}

