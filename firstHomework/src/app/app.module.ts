import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { TableFormModule } from "./TableFormModule/tableForm.module";
import { NotFoundComponent } from "./not-found/not-found.component";
import { routing } from "./app.routing";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    TableFormModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
