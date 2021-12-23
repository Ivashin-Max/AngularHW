import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { TableFormModule } from "./TableFormModule/tableForm.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    TableFormModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
