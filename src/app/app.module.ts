import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { MasterLayoutModule } from './layouts/master-layout/master-layout.module';
import { PlanATripComponent } from './views/plan-a-trip/plan-a-trip.component';
import { TopbarComponent } from './layouts/master-layout/topbar/topbar.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddCarComponent } from './views/plan-a-trip/add-car/add-car.component';
import { DetailsViewComponent } from './views/plan-a-trip/details-view/details-view.component';
@NgModule({
  declarations: [
    AppComponent,
    PlanATripComponent,
    TopbarComponent,
    AddCarComponent,
    DetailsViewComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    MasterLayoutModule,
    NgxSliderModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
