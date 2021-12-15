import { Component } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import studentsArr from "../../assets/studentList.json";
import { formatDate } from "@angular/common" ;
import { Istudent } from "../table/table.component";


export interface ValidationErrors {
[key: string]: unknown;
}


@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.less"]
})
export class FormComponent  {

 allStudents: Istudent[] = studentsArr.students;
 input = "";

 newFormModel = new FormGroup({
   fullName: new FormGroup({
     name: new FormControl(null, [Validators.required, Validators.pattern("[а-яА-Я a-zA-Z]*")]),
     lastName: new FormControl(null, [Validators.required, Validators.pattern("[а-яА-Я a-zA-Z]*")]),
     patr: new FormControl(null, [Validators.required, Validators.pattern("[а-яА-Я a-zA-Z]*")])
   }, this.fullNameDifferenceValidator),
   birthDate:new FormControl(null, [Validators.required, this.ageRangeValidator]),
   score:new FormControl(null, [Validators.required, Validators.maxLength(1), Validators.pattern("[0-6]")]),
   butt: new FormControl()
 });

 editFormModel = new FormGroup({
  fullName: new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.pattern("[а-яА-Я a-zA-Z]*")]),
    lastName: new FormControl(null, [Validators.required, Validators.pattern("[а-яА-Я a-zA-Z]*")]),
    patr: new FormControl(null, [Validators.required, Validators.pattern("[а-яА-Я a-zA-Z]*")])
  }, this.fullNameDifferenceValidator),
  birthDate:new FormControl(null, [Validators.required, this.ageRangeValidator]),
  score:new FormControl(null, [Validators.required, Validators.maxLength(1), Validators.pattern("[0-6]")])
});

 modal = {
   isShown: false,
   new: true,
   edit: false,
  id: "",
  error: false,
  errorMsg:""
 };

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

showModal(): void{
  this.modal.isShown = true;
}

  hideModal(): void{
    this.modal.isShown = false;
    this.input = "";
}

closeEdit(): void{
  this.modal.edit = false;
  this.modal.new = true;
}

showError(msg: string): void{
  this.modal.error = true;
  this.modal.errorMsg = msg;
}

hideError(): void{
  this.modal.error = false;
}

pickStudent(id: string): void{
  if (+id > this.allStudents.length || isNaN(+id) || +id <= 0){
    return;
  }
  this.modal.isShown = false;
  this.modal.new = false;
  this.modal.edit = true;
  this.modal.id = id;
  this.setValues(id);
  this.input = "";
}

private setValues(id: string): void{
  const studentToEdit = this.allStudents.find((el) => el.id === +id);
  if (studentToEdit !== undefined){
  const correctDate = new Date(studentToEdit?.birthDate.split(".").reverse().join("-"));
  this.editFormModel.get("birthDate")?.setValue(formatDate(correctDate, "yyyy-MM-dd", "en"));
  this.editFormModel.get("fullName")?.setValue({ lastName: studentToEdit?.lastName, name: studentToEdit?.name, patr: studentToEdit?.patronymic });
  this.editFormModel.get("score")?.setValue(studentToEdit?.score);
  }
}



 newStudent(): void{
    if (this.newFormModel.valid){
      const correctDate = this.newFormModel.value.birthDate.split("-").reverse().join(".");
      const newStudent = {
       "id": this.allStudents.length + 1,
       "lastName":this.newFormModel.value.fullName.lastName,
       "name": this.newFormModel.value.fullName.name,
       "patronymic": this.newFormModel.value.fullName.patr,
       "birthDate": correctDate,
       "score":this.newFormModel.value.score,
       "deleted": false,
       "inRange": true
       };
      this.allStudents.push(newStudent);
    }
 }

 editStudent(): void{
   const studentToEdit = this.allStudents.findIndex((el) => (el.id === +this.modal.id) && !el.deleted);
   if (studentToEdit === -1) {
    this.showError("Похоже,что кто-то удалил студента до завершения редактирования");
    return;
  }
  if (this.editFormModel.valid && this.editFormModel.dirty){
    const correctDate = this.editFormModel.value.birthDate.split("-").reverse().join(".");
    this.allStudents[studentToEdit].name = this.editFormModel.value.fullName.name;
    this.allStudents[studentToEdit].lastName = this.editFormModel.value.fullName.lastName;
    this.allStudents[studentToEdit].patronymic = this.editFormModel.value.fullName.patr;
    this.allStudents[studentToEdit].birthDate = correctDate;
    this.allStudents[studentToEdit].score = this.editFormModel.value.score;
  }
 }
}
