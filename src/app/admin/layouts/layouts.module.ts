import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ServiceStatusButtonComponent } from './header/service-status-button-component/service-status-button-component.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    SidebarComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ServiceStatusButtonComponent,
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ]
})
export class LayoutsModule { }
