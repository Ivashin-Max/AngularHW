import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, skip, take } from "rxjs";
import { AppState } from "./store/state";
import { StudentsOnlineService } from "./TableFormModule/services/students-online.service";
import { StudentsOfflineService } from "./TableFormModule/services/studentsOffline.service";
// import { StudentsOfflineService } from "./TableFormModule/services/studentsOffline.service";

@Injectable({
  providedIn: "root",
})
export class ScoreGuard implements CanActivate {
  constructor(
    private offlineStudentsService: StudentsOfflineService,
    private onlineStudentsService: StudentsOnlineService,
    public router: Router,
    public store: Store<AppState>,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<UrlTree | boolean> | Promise<UrlTree | boolean> | UrlTree | boolean {


      const status = route.queryParams["offline"];
      if (status){
        console.log("offline guard");
        const students = this.offlineStudentsService.students;
        const studentToEdit = students.find((el) => (el.id === +route.url[1].path) && !el.deleted);

        if (studentToEdit?.score === 5){
          alert("Сработал Guard на средний балл. Доступ закрыт");
          return false;
        }

      } else {

        console.log("online guard");
        const studentsArray = this.onlineStudentsService.getAllStudents().pipe(
          skip(1),
          take(1));
        studentsArray.subscribe((students) => {
          const studentToEdit = students.find((el) => (el.id === +route.url[1].path) && !el.deleted);
          if (studentToEdit === undefined || studentToEdit?.score === 5){
            alert("Сработал Guard на средний балл. Доступ закрыт");
            this.router.navigateByUrl("");
            return false;
          }
          return true;
        });
      }
    return true;
  }
}
