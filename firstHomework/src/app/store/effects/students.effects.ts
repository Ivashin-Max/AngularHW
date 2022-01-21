import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../state";
import { Actions, Effect, ofType } from "@ngrx/effects";

import { map, pluck } from "rxjs/operators";
import { Istudent, StudentService } from "../../TableFormModule/services/studentsOffline.service";
import { AddStudentSuccsessAction, ADD_STUDENT, SetAllStudentsAction } from "../action/students.actions";
import { iif, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";




@Injectable({ providedIn: "root" })
export class StudentsEffects {

  private studentsUrl = environment.studentsUrl;

  @Effect( )
  newStudent$ = this.actions$.pipe(
    ofType(ADD_STUDENT),
    pluck("student"),
    map((student: Istudent) => {
      return iif(() => !!window.location.search,
      of(new AddStudentSuccsessAction(student)),
      this.http.post<Istudent[]>(this.studentsUrl, student).pipe(
        map((res) => {
          return new SetAllStudentsAction(res);
        }),
      ),
      );

    }),
  );


  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private studentsService: StudentService,
    private http: HttpClient,
  ) {
  }

}
