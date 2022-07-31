import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterLayoutComponent } from './layouts/master-layout/master-layout.component';
import { PlanATripComponent } from './views/plan-a-trip/plan-a-trip.component';

const routes: Routes = [
  {
    path: "",
    component: MasterLayoutComponent,
    children: [
      {
        path: "plan-a-trip",
        component: PlanATripComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
