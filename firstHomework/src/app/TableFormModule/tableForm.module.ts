import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";


import { FormComponent } from "./form/form.component";
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
  providers: [],
  exports: [
    FormComponent,
    TableComponent,
  ]

})
export class TableFormModule { }
