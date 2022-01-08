import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { StudentsOnlineService } from "../services/students-online.service";

import { Istudent, StudentService } from "../services/studentsOffline.service";




@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./table.component.less"],
  providers: [StudentService]
})
export class TableComponent  implements OnInit{

  online = true;
  constructor(private ref: ChangeDetectorRef, public studentService: StudentsOnlineService, public router: Router, public activeRoute: ActivatedRoute){
    activeRoute.url.subscribe((e) => {
      if (e[e.length - 1].path === "online"){
        this.online = true;
      } else {
        this.online = false;
      }
    });
  }

  ngOnInit(): void{
    console.log(this.studentService.students);
    this.studentService.getAllStudents();

  }

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
  // findedStudents: number[] = [];
  notInRange: number[] = [];

  onlineServicePick(): void{
      this.router.navigateByUrl(`${this.activeRoute.snapshot.url.slice(0, this.activeRoute.snapshot.url.length - 1).map((el) => "/" + el.path ).join("")}/online`);

  }
  studentServicePick(): void{
    this.router.navigateByUrl(`${this.activeRoute.snapshot.url.slice(0, this.activeRoute.snapshot.url.length - 1).map((el) => "/" + el.path ).join("")}/offline`);
  }

test(): void{
  // console.log(this.activeRoute.snapshot.url.slice(0, this.activeRoute.snapshot.url.length - 1).map((el) => "/" + el.path ).join(""));
  // console.log(this.isOnline());
  // console.log(this.router.events);
  // console.log(this.activeRoute.snapshot.url[this.activeRoute.snapshot.url.length - 1].path);
  this.studentService.getAllStudents();
}

  onChange(event: string): void{
    this.selected = event;
    if (event === "Поиск"){
      this.placeholder = "Введите имя или фамилию";
    }
    if (event === "Фильтр по баллам"){
      this.placeholder = "Введите диапозон баллов в формате 1-6";
    }
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
    this.studentService.deleteStudent(id);
    this.modal.isShown = false;
  }

  hasKey<O>(obj: O, key: PropertyKey): key is keyof O {
    return key in obj;
  }

  sort(property: string): void{
   this.studentService.students.sort(this.dynamicSort(property));
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
     for (const student of this.studentService.students) {
       if (student.lastName.toLocaleLowerCase() === value.toLocaleLowerCase() || student.name.toLocaleLowerCase() === value.toLocaleLowerCase()){
         this.studentService.findedStudents.push(student.id);
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
      for (const student of this.studentService.students) {
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

    for (const student of this.studentService.students) {
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
    this.studentService.findedStudents.length = 0;
    this.notInRange.length = 0;
  }

}

