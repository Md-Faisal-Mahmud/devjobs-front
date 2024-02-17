import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from "./signin/signin.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SpinnerComponent } from "../../shared/components/spinner/spinner.component";
import { ValidationErrorComponent } from "../../shared/components/validation-error/validation-error.component";
import { AlertComponent } from "../../shared/components/alert/alert.component";
import { environment } from '../../../environments/environment.development';
import { FormsModule } from '@angular/forms';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { HttpClientModule } from '@angular/common/http';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    SigninComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SpinnerComponent,
    ValidationErrorComponent,
    AlertComponent,
    AuthRoutingModule,
    FormsModule,
    RecaptchaV3Module,
    HttpClientModule,
  ],
  exports: [
    SigninComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptcha.siteKey,
    },
  ],
})
export class AuthModule { }
