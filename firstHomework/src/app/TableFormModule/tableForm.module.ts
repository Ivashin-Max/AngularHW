import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { Store, StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StudentsEffects } from "../store/effects/students.effects";

import { FormComponent } from "./form/form.component";
import { BirthdayCakeDirective, ShineDirective, TooltipDirective } from "./table/directives";
import { CapitalizeWordPipe, MrMrsPipe } from "./table/pipes";
import { TableComponent } from "./table/table.component";
import { appReducers, AppState } from "../store/state";
import { handleLog } from "../store/metareducer/logger";
import { StudentsOnlineService } from "./services/students-online.service";
import { StudentService, StudentsOfflineService } from "./services/studentsOffline.service";

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
    StoreModule.forRoot(appReducers, {
      metaReducers: [handleLog]
    }),
    EffectsModule.forRoot([StudentsEffects]),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [
    {
      provide: StudentService,
      useFactory: ( http: HttpClient, store: Store<AppState>): StudentService => {
        return window.location.search ?
        new  StudentsOfflineService(store) :
        new StudentsOnlineService(http, store);
      },
      deps: [HttpClient, Store]
    },
  ],
  exports: [
    FormComponent,
    TableComponent,
  ]

})
export class TableFormModule { }
