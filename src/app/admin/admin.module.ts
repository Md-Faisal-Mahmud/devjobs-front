import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutsModule } from './layouts/layouts.module';

import { AdminComponent } from './admin.component';
import { AdminPageNotFoundComponent } from './views/admin-page-not-found/admin-page-not-found.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { EventsComponent } from './views/events/events.component';
import { SettingsModule } from './views/settings/settings.module';
import { ElementsModule } from './views/elements/elements.module';
import { JobPostCountChartComponent } from './analytics/job-post-count-chart/job-post-count-chart.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminJobPostDataTableComponent } from './views/jobpost-datatable/jobpost-datatable.component';
import { OrganizationDataTableComponent } from "./organization-list/organization-list.component";
import { DeleteUserModalComponent } from './views/user-management/components/delete-user-modal/delete-user-modal.component';

@NgModule({
    declarations: [
        AdminComponent,
        DashboardComponent,
        AdminPageNotFoundComponent,
        EventsComponent,
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        LayoutsModule,
        SettingsModule,
        ElementsModule,
        JobPostCountChartComponent,
        HttpClientModule,
        OrganizationDataTableComponent,
        DeleteUserModalComponent,
        AdminJobPostDataTableComponent,
        OrganizationDataTableComponent
    ]
})
export class AdminModule { }
