import { Component } from "@angular/core";

import studentsArr from "../../assets/studentList.json";


export interface Istudent{
    [k: string]: boolean | number | string;
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
  styleUrls: ["./table.component.less"]
})
export class TableComponent  {

  students = studentsArr.students;
  input = "";
  checkboxSelected = true;
  placeholder = "Введите имя или фамилию";
  selected = "Поиск";
  modal = {
    name:"",
    lastName:"",
    id:0,
    isShown: false
  };
  findedStudents: number[] = [];
  notInRange: number[] = [];

  onChange(event: string): void{
    this.selected = event;
    if (event === "Фильтр по дате"){
      this.placeholder = "Введите диапозон дат в формате ДД.ММ.ГГГГ-ДД.ММ.ГГГГ";
    }
    if (event === "Поиск"){
      this.placeholder = "Введите имя или фамилию";
    }
    if (event === "Фильтр по баллам"){
      this.placeholder = "Введите диапозон средних баллов в формате 1-10";
    }
    }

  showModal(id: number, name: string, lastName: string): void{
    this.modal.id = id ;
    this.modal.name = name ;
    this.modal.lastName = lastName;
    this.modal.isShown = true;
  }

  hideModal(): void{
    this.modal.isShown = false;
  }

  deleteStudent(id: number): void{

    const studentToDelete = this.students.findIndex((stud) => stud.id === id);
    this.students[studentToDelete].deleted = true;
    this.modal.isShown = false;
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

    return function (a: Istudent, b: Istudent): number {
        const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result;
    };
  }

  find(value: string): void{
     for (const student of this.students) {
       if (student.lastName === value || student.name === value){
         this.input = "";
         this.findedStudents.push(student.id);
       }
     }
    this.input = "";

  }

  getRange(range: string): { min: number, max: number }{
    const correctRange = { min:0, max:0 };
    const splittedRange = range.trim().split("-");
    if (range.length < 5){
     correctRange.min = +splittedRange[0];
     correctRange.max = +splittedRange[1];
     return correctRange;
    }
    const correctDateA = this.getCorrectDateFormat(splittedRange[0]);
    const correctDateB = this.getCorrectDateFormat(splittedRange[1]);

    correctRange.min = correctDateA;
    correctRange.max = correctDateB;
    return correctRange;
   }

   getCorrectDateFormat(stringDate: string): number{
    const correctDate = new Date(stringDate.split(".").reverse().join("-"));
    return +correctDate;
   }

  filterScore(range: string): void{
    this.clearFilter();
    const rAnge = this.getRange(range);

    for (const student of this.students) {
      if (student.score <= rAnge.max && student.score >= rAnge.min){
        this.input = "";
      } else {

        this.notInRange.push(student.id);
      }
    }
    this.input = "";


  }

  filterDate(range: string): void{
    this.clearFilter();
    const rAnge = this.getRange(range);

    for (const student of this.students) {
     const birthDate = this.getCorrectDateFormat(student.birthDate);

      if (birthDate <= rAnge.max && birthDate >= rAnge.min){
        this.input = "";
      } else {

        this.notInRange.push(student.id);
      }
    }
    this.input = "";
  }

  clearFilter(): void{
    this.findedStudents.length = 0;
    this.notInRange.length = 0;
  }
}

