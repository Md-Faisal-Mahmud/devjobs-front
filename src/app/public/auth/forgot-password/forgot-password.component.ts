import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { pageTransition } from '../../../shared/utils/animations';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { CommonService } from '../../../_core/services/common.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertType } from '../../../shared/components/alert/alert.type';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
  animations: [pageTransition]
})
export class ForgotPasswordComponent {
  isAuthValid: boolean = false;
  authMessage: string = '';
  isEmailValid: boolean = false;
  emailMessage: string = '';
  isRecaptchaValid: boolean = false;
  recaptchaMessage: string = '';
  isLoading: boolean = false;
  isEmailSendSuccess: boolean = false;
  isCheckEmail: boolean = false;
  isCatchError: boolean = true;

  serverErrors: string[] = [];

  forgotPasswordForm = this.formBuilder.group({
    email: ['', Validators.required],
  });

  constructor(
    public commonService: CommonService,
    private formBuilder: FormBuilder,
    private router: Router,
    private recaptchaV3Service: ReCaptchaV3Service,
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document
  ) { }

  protected readonly AlertType = AlertType;

  protected onAlertCloseHandler = (e: any) => {
    this.serverErrors = [];
  };

  public sendData(formDirective: FormGroupDirective): void {
    this.isLoading = true;
    const formGroup = formDirective.form;

    if (formGroup.invalid) {
      for (const control of Object.keys(formGroup.controls)) {
        formGroup.controls[control].markAsTouched();
      }
      this.isLoading = false;
      return;
    }

    const email = this.forgotPasswordForm.get('email')?.value as string;
    const emailRegex = /^[^\s]+@[^\s]+[.][^\s]+$/;

    if (emailRegex.test(email)) {
      this.isEmailValid = true;
      this.emailMessage = '';

      this.recaptchaV3Service.execute('importantAction')
        .pipe(
          switchMap((recaptchaToken: string) => this.sendRecaptchaTokenToBackend(recaptchaToken)),
          switchMap(() => this.sendEmailToBackend(email))
        )
        .subscribe({
          next: () => {
            if (this.forgotPasswordForm.valid && this.isEmailValid) {
              if (this.isAuthValid && this.isRecaptchaValid && this.isEmailSendSuccess) {
                this.isCheckEmail = true;
              }
            }
            this.isLoading = false;
          },
          error: (error) => {
            this.isLoading = false;
          }
        });
    } else {
      this.isLoading = false;
      this.isEmailValid = false;
      this.emailMessage = 'Enter a valid email';
    }
  }

  public sendRecaptchaTokenToBackend(recaptchaToken: string): Observable<void> {
    return this.http.post('/v1/Account/RecaptchaVerify', { recaptchaToken }).pipe(
      map((response: any) => {
        console.log(response)
        if (response.success) {
          this.isRecaptchaValid = true;
          this.recaptchaMessage = '';
        } else if (!response.success) {
          this.authMessage = 'reCAPTCHA verification failed';
          this.isCatchError = false;
        }
      }),
      catchError(error => {
        if (this.isCatchError)
          this.authMessage = 'Something went wrong';
        throw new Error('An unexpected error occurred', error);
      })
    );
  }

  public sendEmailToBackend(email: string): Observable<void> {
    const origin = this.document.location.origin;
    const model = { email, origin };
    const authApiUrl = '/v1/Account/ForgotPassword';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(authApiUrl, model, { headers: headers }).pipe(
      map((response: any) => {
        if (response.success) {
          this.isEmailSendSuccess = true;
          this.isAuthValid = true;
          this.authMessage = '';
        } else if (!response.success) {
          this.authMessage = 'Your email was not found';
          this.isCatchError = false;
        }
      }),
      catchError(error => {
        if (this.isCatchError)
          this.authMessage = 'Something went wrong';
        throw new Error('An unexpected error occurred', error);
      })
    );
  }
}