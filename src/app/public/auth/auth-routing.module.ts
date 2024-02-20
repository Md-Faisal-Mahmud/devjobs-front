import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicRoutes } from "../public.routes";
import { SigninComponent } from "./signin/signin.component";
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {
    title: "Signin",
    path: PublicRoutes.Signin,
    component: SigninComponent
  },
  {
    title: "ForgotPassword",
    path: PublicRoutes.ForgotPassword,
    component: ForgotPasswordComponent
  },
  {
    title: "ResetPassword",
    path: PublicRoutes.ResetPassword,
    component: ResetPasswordComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
