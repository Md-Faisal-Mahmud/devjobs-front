import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRoutes, ElementRoutes, SettingRoutes, UserManagementRoutes } from './admin.routes';
import { AdminPageNotFoundComponent } from './views/admin-page-not-found/admin-page-not-found.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AdminAlertComponent } from './views/elements/alert/admin-alert.component';
import { ButtonsComponent } from './views/elements/buttons/buttons.component';
import { AdminModalComponent } from './views/elements/modal/admin-modal.component';
import { AdminTabComponent } from './views/elements/tab/admin-tab.component';
import { EventsComponent } from './views/events/events.component';
import { TestComponent } from './views/events/test/test.component';
import { ProfileComponent } from './views/settings/profile/profile.component';
import { UsersComponent } from './views/settings/users/users.component';
import { UserCreateComponent } from './views/user-management/user-create/user-create.component';
import { AdminJobPostDataTableComponent } from './views/jobpost-datatable/jobpost-datatable.component';
import { JobDetailsComponent } from './views/job-details/job-details.component';
import { OrganizationDataTableComponent } from './organization-list/organization-list.component';
import { UserListComponent } from './views/user-management/user-list/user-list.component';
import { UserUpdateComponent } from './views/user-management/user-update/user-update.component';
import { LogListComponent } from './views/log-management/log-list/log-list.component';
import { LogDetailsComponent } from './views/log-management/log-details/log-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: AdminRoutes.Dashboard,
    pathMatch: 'full',
  },
  {
    title: 'Dashboard',
    path: AdminRoutes.Dashboard,
    component: DashboardComponent,
  },
  {
    title: 'JobDetails',
    path: `${AdminRoutes.JobDetails}/:id`,
    component: JobDetailsComponent
  },
  {
    title: 'jobposts',
    path: AdminRoutes.JobPosts,
    component: AdminJobPostDataTableComponent,
  },
  {
    title: 'Organizations',
    path: AdminRoutes.Organizations,
    component: OrganizationDataTableComponent,
  },
  {
    title: 'JobDetails',
    path: `${AdminRoutes.LogDetails}/:id`,
    component: LogDetailsComponent
  },
  {
    title: 'Logs',
    path: AdminRoutes.Logs,
    component: LogListComponent,
  },
  {
    title: 'Events',
    path: AdminRoutes.Events,
    component: EventsComponent,
    children: [
      {
        path: 'testing',
        component: TestComponent,
        outlet: 'test',
      },
    ],
  },
  {
    title: 'Elements',
    path: AdminRoutes.Elements,
    children: [
      {
        title: 'Alert',
        path: ElementRoutes.Alert,
        component: AdminAlertComponent,
      },
      {
        path: 'tabs',
        component: AdminTabComponent,
      },

      {
        title: 'Modal',
        path: ElementRoutes.Modal,
        component: AdminModalComponent,
      },
      {
        title: 'Buttons',
        path: ElementRoutes.Buttons,
        component: ButtonsComponent,
      },
    ],
  },
  {
    path: AdminRoutes.Settings,
    children: [
      {
        title: 'Settings',
        path: SettingRoutes.Profile,
        component: ProfileComponent,
      },
      {
        title: 'Users',
        path: SettingRoutes.Users,
        component: UsersComponent,
      },
    ],
  },
  {
    path: AdminRoutes.UserManagement,
    children:[
      {
        title: "User Create",
        path: UserManagementRoutes.Create,
        component: UserCreateComponent
      },
      {
        title:"User List",
        path: UserManagementRoutes.List,
        component: UserListComponent
      },
      {
        title:"User Update",
        path: UserManagementRoutes.Update+"/:id",
        component: UserUpdateComponent
      }
    ]
  },
  { path: '**', component: AdminPageNotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
