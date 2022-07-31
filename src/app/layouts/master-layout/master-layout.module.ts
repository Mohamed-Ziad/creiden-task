import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MasterLayoutComponent } from './master-layout.component';
import { SharedModule } from '../../shared/shared.module';
import { TopbarComponent } from './topbar/topbar.component';



@NgModule({
  declarations: [
    NavbarComponent,
    MasterLayoutComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class MasterLayoutModule { }
