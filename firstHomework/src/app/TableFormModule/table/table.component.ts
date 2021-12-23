import { ChangeDetectionStrategy, Component, Input, ViewChild } from "@angular/core";
import { FormComponent } from "../form/form.component";


export interface Istudent{
      id: number;
      lastName: string;
      name: string;
      patronymic: string;
      birthDate: string;
      score: number;
      deleted: boolean;
      inRange: boolean;
}



@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./table.component.less"]
})
export class TableComponent  {
  @Input() students: Istudent[] = [];
  @ViewChild(FormComponent) private _form: FormComponent | undefined;
  input = "";
  minDate = "";
  maxDate = "";
  checkboxSelected = false;
  placeholder = "Введите имя или фамилию";
  selected = "Поиск";
  modal = {
    name:"",
    lastName:"",
    id:0,
    isShown: false,
    message:"",
    error: false
  };
  findedStudents: number[] = [];
  notInRange: number[] = [];

  onChange(event: string): void{
    this.selected = event;
    if (event === "Поиск"){
      this.placeholder = "Введите имя или фамилию";
    }
    if (event === "Фильтр по баллам"){
      this.placeholder = "Введите диапозон баллов в формате 1-6";
    }
    }

    pickStudent(id: number): void{
      this._form?.pickStudent(id);
    }

  showModal(id: number, name: string, lastName: string): void{
    this.modal.id = id ;
    this.modal.name = name ;
    this.modal.lastName = lastName;
    this.modal.isShown = true;
    this.modal.error = false;
    this.modal.message = `Вы действительно хотите удалить ${lastName} ${name}?`;
  }
  errorModal(message: string): void{
    this.modal.isShown = true;
    this.modal.error = true;
    this.modal.message = message;
  }

  hideModal(): void{
    this.modal.isShown = false;
  }

  deleteStudent(id: number): void{

    const studentToDelete = this.students.findIndex((stud) => stud.id === id);
    this.students[studentToDelete].deleted = true;
    this.modal.isShown = false;
  }

  hasKey<O>(obj: O, key: PropertyKey): key is keyof O {
    return key in obj;
  }

  sort(property: string): void{
   this.students.sort(this.dynamicSort(property));
  }

  dynamicSort(property: string): (a: Istudent, b: Istudent) => number {

    if (property === "birthDate"){
      return (a: Istudent, b: Istudent): number => {

        const correctDateA = this.getCorrectDateFormat(a[property]);
        const correctDateB = this.getCorrectDateFormat(b[property]);

        const result = (correctDateA < correctDateB) ? -1 : (correctDateA > correctDateB) ? 1 : 0;

        return result;
      };
    }

    return  (a: Istudent, b: Istudent): number =>  {
      if (this.hasKey(a, property) && this.hasKey(b, property)){
        const result = ((a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0);
        return result;
      }
      return 0;
    };

  }

  find(value: string): void{
    if (value === ""){
      this.errorModal("Введите данные");
    } else {
    let counter = 0;
     for (const student of this.students) {
       if (student.lastName.toLocaleLowerCase() === value.toLocaleLowerCase() || student.name.toLocaleLowerCase() === value.toLocaleLowerCase()){
         this.findedStudents.push(student.id);
         counter++;
       }
     }
     if (counter === 0 ){
      this.errorModal("Такого студента нет");
     }
    }
    this.input = "";

  }

  getRange(range: string): { min: number, max: number }{
    const correctRange = { min:0, max:0 };
    const splittedRange = range.trim().split("-");

     correctRange.min = +splittedRange[0];
     correctRange.max = +splittedRange[1];
     return correctRange;
  }

   getCorrectDateFormat(stringDate: string): number{
    const correctDate = new Date(stringDate.split(".").reverse().join("-"));
    return +correctDate;
   }

  filterScore(range: string): void{
    this.clearFilter();
    const rAnge = this.getRange(range);


    if (isNaN(rAnge.min) || isNaN(rAnge.max) || (rAnge.min <= 0 || rAnge.max <= 0) || (rAnge.min > 10 || rAnge.max > 10)){
      this.errorModal("Некоректный ввод, попробуйте ещё раз");
    } else {
      for (const student of this.students) {
        if (student.score <= rAnge.max && student.score >= rAnge.min){
          this.input = "";
        } else {
          this.notInRange.push(student.id);
        }
      }
    }
    this.input = "";
  }

  filterDate(minDate: string, maxDate: string): void{


    this.clearFilter();
    const correctMinDate = +(new Date(minDate));
    const correctMaxDate = +(new Date(maxDate));

    if (correctMinDate > correctMaxDate || (minDate === "" || maxDate === "")){
      this.errorModal("Некоректный ввод, попробуйте ещё раз");
    } else {

    for (const student of this.students) {
     const birthDate = this.getCorrectDateFormat(student.birthDate);


      if (birthDate <= correctMaxDate && birthDate >= correctMinDate){
        // this.input = "";
      } else {
        this.notInRange.push(student.id);
      }
    }
}

  }

  clearFilter(): void{
    this.findedStudents.length = 0;
    this.notInRange.length = 0;
  }

  clearInput(): void{
    this.input = "";
    this.maxDate = "";
    this.minDate = "";
  }
}

