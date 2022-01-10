import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { StudentsOnlineService } from "./TableFormModule/services/students-online.service";
import { StudentsOfflineService } from "./TableFormModule/services/studentsOffline.service";

@Injectable({
  providedIn: "root",
})
export class ScoreGuard implements CanActivate {
  constructor(private offlineStudentsService: StudentsOfflineService, private onlineStudentsService: StudentsOnlineService, public router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<UrlTree | boolean> | Promise<UrlTree | boolean> | UrlTree | boolean {


      const status = route.queryParams["offline"];
      if (status){
        const students = this.offlineStudentsService.students;
        const studentToEdit = students.find((el) => (el.id === +route.url[1].path) && !el.deleted);

        if (studentToEdit?.score === 5){
          alert("Сработал Guard на средний балл. Доступ закрыт");
          return false;
        }

      } else {


        this.onlineStudentsService.getAllStudents().subscribe((students) => {

          const studentToEdit = students.find((el) => (el.id === +route.url[1].path) && !el.deleted);
          if (studentToEdit?.score === 5){
            alert("Сработал Guard на средний балл. Доступ закрыт");
            this.router.navigateByUrl("");
            return false;
          }
          return false;
        });


      }

    return true;
  }

}
