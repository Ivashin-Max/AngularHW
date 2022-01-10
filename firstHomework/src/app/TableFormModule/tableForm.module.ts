import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, RouterModule } from "@angular/router";


import { FormComponent } from "./form/form.component";
import { StudentsOnlineService } from "./services/students-online.service";
import { StudentService, StudentsOfflineService } from "./services/studentsOffline.service";
import { BirthdayCakeDirective, ShineDirective, TooltipDirective } from "./table/directives";
import { CapitalizeWordPipe, MrMrsPipe } from "./table/pipes";
import { TableComponent } from "./table/table.component";

@NgModule({
  declarations: [
    BirthdayCakeDirective,
    CapitalizeWordPipe,
    FormComponent,
    MrMrsPipe,
    ShineDirective,
    TableComponent,
    TooltipDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [
    {
      provide: StudentService,
      useFactory: (snapshot: ActivatedRoute, http: HttpClient): StudentService => {
        return snapshot.snapshot.queryParams["offline"] === "true" ?
        new  StudentsOfflineService() :
        new StudentsOnlineService(http);
      },
      deps: [ActivatedRoute, HttpClient]
    },
  ],
  exports: [
    FormComponent,
    TableComponent,
  ]

})
export class TableFormModule { }
