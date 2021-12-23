import { ChangeDetectionStrategy, Component } from "@angular/core";
import studentsArr from "../assets/studentList.json";



@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./app.component.less"]
})
export class AppComponent {
  title = "firstHomework";
  students = studentsArr.students;
}
