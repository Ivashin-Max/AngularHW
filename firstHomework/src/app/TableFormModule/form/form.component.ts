import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { formatDate, Location } from "@angular/common" ;
import {  IstudentEdit, StudentService } from "../services/studentsOffline.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/state";
import { AddStudentAction } from "src/app/store/action/students.actions";
import { selectStudents } from "src/app/store/selector/students.selectors";





export interface ValidationErrors {
[key: string]: unknown;
}


@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./form.component.less"],
  providers: []
})
export class FormComponent  {
  idCounter = 0;
  isOffline = this.activeRoute.snapshot.queryParams["offline"];
  edit = false;
  modal = {
    id: 0,
    error: false,
    errorMsg:""
   };

  constructor(
    private ref: ChangeDetectorRef,
     public router: Router,
      public activeRoute: ActivatedRoute,
       public studentService: StudentService,
        public store: Store<AppState>,
        public location: Location) {

    store.select(selectStudents).subscribe((data) => this.idCounter = data.length + 1);
    activeRoute.url.subscribe((e) => {
        if (e.length === 2) {
          this.pickStudent(+e[1].path);
        }
    });
    location.onUrlChange((e) => {
      const urlSegments = e.split("/");
      if (urlSegments.length === 3){
        this.pickStudent(+urlSegments[2]);
      }
    });
  }



 newFormModel = new FormGroup({
   fullName: new FormGroup({
     name: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.pattern("[а-яА-Я a-zA-Z]*")]),
     lastName: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.pattern("[а-яА-Я a-zA-Z]*")]),
     patr: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.pattern("[а-яА-Я a-zA-Z]*")])
   }, this.fullNameDifferenceValidator),
   birthDate:new FormControl(null, [Validators.required, Validators.minLength(1), this.ageRangeValidator]),
   score:new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern("[0-6]")]),
 });



 ageRangeValidator(control: AbstractControl): ValidationErrors | null {
  const date = new Date();
  const pastDate = new Date(date.setFullYear(date.getFullYear() - 10));
  const inputDate = new Date(control.value);

  if (inputDate > pastDate) {
      return { "recuiredDate<": pastDate.toLocaleDateString(),
                "inputedDate": inputDate.toLocaleDateString() };
  }
  return null;
}

fullNameDifferenceValidator(control: AbstractControl): ValidationErrors | null {
  if (control.value.name === control.value.lastName){
      return { "error": "control.value.name === control.value.lastName" };
    }
    if (control.value.name === control.value.patr){
      return { "name=patr": true };
    }
  return null;
}


showError(msg: string): void{
  this.modal.error = true;
  this.modal.errorMsg = msg;
}

hideError(): void{
  this.modal.error = false;
}

pickStudent(id: number): void{
  this.edit = true;
  this.modal.id = id;
  this.setValues(id);
  this.ref.markForCheck();
}

private setValues(id: number): void{
  this.store.select(selectStudents).subscribe((data) => {
    const studentToEdit = data.find((el) => el.id === +id);
      if (studentToEdit !== undefined){
      const correctDate = new Date(studentToEdit?.birthDate.split(".").reverse().join("-"));
      this.newFormModel.get("birthDate")?.setValue(formatDate(correctDate, "yyyy-MM-dd", "en"));
      this.newFormModel.get("fullName")?.setValue({ lastName: studentToEdit?.lastName, name: studentToEdit?.name, patr: studentToEdit?.patronymic });
      this.newFormModel.get("score")?.setValue(studentToEdit?.score);
      }
  });

}



 newStudent(): void{
    if (this.newFormModel.valid){
      const correctDate = this.newFormModel.value.birthDate.split("-").reverse().join(".");
      const newStudent = {
       "id": this.idCounter,
       "lastName":this.newFormModel.value.fullName.lastName,
       "name": this.newFormModel.value.fullName.name,
       "patronymic": this.newFormModel.value.fullName.patr,
       "birthDate": correctDate,
       "score":this.newFormModel.value.score,
       "deleted": false,
       "inRange": true
       };
       this.store.dispatch( new AddStudentAction(newStudent));
    }
 }

 editStudent(): void{

  if (this.newFormModel.valid && this.newFormModel.dirty){

    const correctDate = this.newFormModel.value.birthDate.split("-").reverse().join(".");
    const newValues: IstudentEdit = {
      name : this.newFormModel.value.fullName.name,
      lastName : this.newFormModel.value.fullName.lastName,
      patronymic : this.newFormModel.value.fullName.patr,
      birthDate : correctDate,
      score : this.newFormModel.value.score,
    };

    const editStatus = this.studentService.editStudent(this.modal.id, newValues);
    if (editStatus === -1) {
      this.showError("Похоже,что такого студента не существует");
      return;
    }
  }
 }

 backToNewStudent(): void{
  this.edit = false;
  this.newFormModel.reset();
  this.location.replaceState(`add`, this.isOffline ? "offline=true" : "");
 }
}
