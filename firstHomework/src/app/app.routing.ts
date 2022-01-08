import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "./not-found/not-found.component";
import { ScoreGuard } from "./score.guard";
import { TableComponent } from "./TableFormModule/table/table.component";



const routes: Routes = [
  { path: "", redirectTo: "add/online", pathMatch: "full" },
  { path: "add/online", component: TableComponent },
  { path: "add/offline", component: TableComponent },
  { path: "edit/:id/online", component: TableComponent, canActivate: [ScoreGuard] },
  { path: "edit/:id/offline", component: TableComponent, canActivate: [ScoreGuard] },
  { path: "404", component: NotFoundComponent },
  { path: "**", redirectTo: "/404" },
];

export const routing = RouterModule.forRoot(routes);
