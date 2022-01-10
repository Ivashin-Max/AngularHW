import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "./not-found/not-found.component";
import { ScoreGuard } from "./score.guard";
import { TableComponent } from "./TableFormModule/table/table.component";



const routes: Routes = [
  { path: "", redirectTo: "add", pathMatch: "full" },
  { path: "add", component: TableComponent },
  { path: "edit/:id", component: TableComponent, canActivate: [ScoreGuard] },
  { path: "404", component: NotFoundComponent },
  { path: "**", redirectTo: "/404" },
];

export const routing = RouterModule.forRoot(routes);
