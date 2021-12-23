import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import studentsArr from "../../../assets/studentList.json";
import { formatDate } from "@angular/common" ;
import { Istudent } from "../table/table.component";


export interface ValidationErrors {
[key: string]: unknown;
}


@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./form.component.less"]
})
export class FormComponent  {

 allStudents: Istudent[] = studentsArr.students;
 edit = false;
 newFormModel = new FormGroup({
   fullName: new FormGroup({
     name: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.pattern("[а-яА-Я a-zA-Z]*")]),
     lastName: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.pattern("[а-яА-Я a-zA-Z]*")]),
     patr: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.pattern("[а-яА-Я a-zA-Z]*")])
   }, this.fullNameDifferenceValidator),
   birthDate:new FormControl(null, [Validators.required, Validators.minLength(1), this.ageRangeValidator]),
   score:new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern("[0-6]")]),
 });

 modal = {
  id: 0,
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
}

private setValues(id: number): void{
  const studentToEdit = this.allStudents.find((el) => el.id === +id);
  if (studentToEdit !== undefined){
  const correctDate = new Date(studentToEdit?.birthDate.split(".").reverse().join("-"));
  this.newFormModel.get("birthDate")?.setValue(formatDate(correctDate, "yyyy-MM-dd", "en"));
  this.newFormModel.get("fullName")?.setValue({ lastName: studentToEdit?.lastName, name: studentToEdit?.name, patr: studentToEdit?.patronymic });
  this.newFormModel.get("score")?.setValue(studentToEdit?.score);
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
   const studentToEdit = this.allStudents.findIndex((el) => (el.id === this.modal.id) && !el.deleted);
   if (studentToEdit === -1) {
    this.showError("Похоже,что кто-то удалил студента до завершения редактирования");
    return;
  }
  if (this.newFormModel.valid && this.newFormModel.dirty){
    const correctDate = this.newFormModel.value.birthDate.split("-").reverse().join(".");
    this.allStudents[studentToEdit].name = this.newFormModel.value.fullName.name;
    this.allStudents[studentToEdit].lastName = this.newFormModel.value.fullName.lastName;
    this.allStudents[studentToEdit].patronymic = this.newFormModel.value.fullName.patr;
    this.allStudents[studentToEdit].birthDate = correctDate;
    this.allStudents[studentToEdit].score = this.newFormModel.value.score;
  }
 }
 backToNewStudent(): void{
  this.edit = false;
  this.newFormModel.reset();
 }
}
