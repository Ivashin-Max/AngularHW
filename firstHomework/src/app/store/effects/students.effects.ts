import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../state";
import { Actions, Effect, ofType } from "@ngrx/effects";
// import { SEND_MESSAGE, SendMessageAction } from "../action/students.actions";
import { map, pluck } from "rxjs/operators";
import { Istudent, StudentService } from "../../TableFormModule/services/studentsOffline.service";



@Injectable({ providedIn: "root" })
export class StudentsEffects {

  // @Effect({ dispatch: false })
  // sendMessage$ = this.actions$.pipe(
  //   ofType(SEND_MESSAGE),
  //   pluck("message"),
  //   map((message: Istudent) => {
  //     this.studentsService.sendMessage(message.message);
  //   }),
  // );

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private studentsService: StudentService,
  ) {
  }

}
