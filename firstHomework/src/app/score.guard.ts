import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { StudentsOnlineService } from "./TableFormModule/services/students-online.service";
import { Istudent, StudentsOfflineService } from "./TableFormModule/services/studentsOffline.service";

@Injectable({
  providedIn: "root",
})
export class ScoreGuard implements CanActivate {
  constructor(private offlineStudentsService: StudentsOfflineService, private onlineStudentsService: StudentsOnlineService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<UrlTree | boolean> | Promise<UrlTree | boolean> | UrlTree | boolean {


      let students: Istudent[] = [];
      const status = route.url[route.url.length - 1].path;
      if (status === "online"){
        students = this.onlineStudentsService.students;
      }
      if (status === "offline"){
        students = this.offlineStudentsService.students;
      }
      const studentToEdit = students.find((el) => (el.id === +route.url[1].path) && !el.deleted);
      if (studentToEdit?.score === 5){
        alert("Сработал Guard на средний балл. Доступ закрыт");
        return false;
      }
    return true;
  }

}
