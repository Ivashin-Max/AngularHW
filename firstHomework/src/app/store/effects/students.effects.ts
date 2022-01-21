import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../state";
import { Actions, Effect, ofType } from "@ngrx/effects";

import { map, pluck } from "rxjs/operators";
import { Istudent, StudentService } from "../../TableFormModule/services/studentsOffline.service";
import { ADD_STUDENT } from "../action/students.actions";




@Injectable({ providedIn: "root" })
export class StudentsEffects {

  @Effect({ dispatch: false })
  newStudent$ = this.actions$.pipe(
    ofType(ADD_STUDENT),
    pluck("student"),
    map((student: Istudent) => {
      this.studentsService.newStudent(student);
    }),
  );


  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private studentsService: StudentService,
  ) {
  }

}
