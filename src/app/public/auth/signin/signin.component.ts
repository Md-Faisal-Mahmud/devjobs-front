import { Component } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertType } from '../../../shared/components/alert/alert.type';
import { PublicRoutes } from '../../public.routes';
import { pageTransition } from '../../../shared/utils/animations';
import { Images } from '../../../../assets/data/images';
import { DatetimeHelper } from '../../../_core/helpers/datetime.helper';
import { CommonService } from '../../../_core/services/common.service';
import { AppRoutes } from '../../../app.routes';
import { AdminRoutes } from '../../../admin/admin.routes';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  animations: [pageTransition],
})
export class SigninComponent {
  isAuthValid: boolean = false;
  authMessage: string = '';
  isEmailValid: boolean = false;
  emailMessage: string = '';
  isPasswordValid: boolean = false;
  passwordMessage: string = '';
  isRecaptchaValid: boolean = false;
  recaptchaMessage: string = '';
  isCatchError: boolean = true;
  jwtToken: string = '';
  name: string = '';
  username: string = '';
  email: string = '';
  role: string = '';
  image: string = '';
  readonly signinBannerImage: string = Images.bannerLogo;
  readonly signInPageImage: string = Images.signInPageLogo;

  isLoading: boolean = false;
  readonly publicRoutes = PublicRoutes;
  readonly currentYear: number = DatetimeHelper.currentYear;

  serverErrors: string[] = [];

  signInForm = this.formBuilder.group({
    email: ['', Validators.required,],
    password: ['', Validators.required],
    rememberMe: [false],
  });

  constructor(
    public commonService: CommonService,
    private formBuilder: FormBuilder,
    private router: Router,
    private recaptchaV3Service: ReCaptchaV3Service,
    private http: HttpClient
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

    const email = this.signInForm.get('email')?.value as string;
    const emailRegex = /^[^\s]+@[^\s]+[.][^\s]+$/;

    if (emailRegex.test(email)) {
      this.isEmailValid = true;
      const password = this.signInForm.get('password')?.value as string;

      if (password.length >= 6) {
        this.isPasswordValid = true;
        this.emailMessage = '';
        this.passwordMessage = '';

        this.recaptchaV3Service.execute('importantAction')
          .pipe(
            switchMap((recaptchaToken: string) => this.sendRecaptchaTokenToBackend(recaptchaToken)),
            switchMap(() => this.sendAuthToBackend(email, password))
          )
          .subscribe({
            next: () => {
              const rememberMeChecked = this.signInForm.get('rememberMe')?.value;

              if (this.signInForm.valid && this.isEmailValid && this.isPasswordValid) {
                if (this.isAuthValid && this.isRecaptchaValid) {
                  const storageType = rememberMeChecked ? localStorage : sessionStorage;
                  storageType.setItem('token', this.jwtToken);
                  storageType.setItem('name', this.name);
                  storageType.setItem('username', this.username);
                  storageType.setItem('email', this.email);
                  storageType.setItem('role', this.role);
                  storageType.setItem('image', this.image);
                  this.router.navigate([AppRoutes.Admin, AdminRoutes.Dashboard]);
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
        this.isPasswordValid = false;
        this.passwordMessage = 'The password must be at least 6 characters long';
      }
    } else {
      this.isLoading = false;
      this.isEmailValid = false;
      this.emailMessage = 'Enter a valid email';
    }
  }

  public sendRecaptchaTokenToBackend(recaptchaToken: string): Observable<void> {
    return this.http.post('/v1/Account/RecaptchaVerify', { recaptchaToken }).pipe(
      map((response: any) => {
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

  public sendAuthToBackend(email: string, password: string): Observable<void> {
    const authApiUrl = '/v1/Account/Login';
    const credentials = {
      email: email,
      password: password
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(authApiUrl, credentials, { headers: headers }).pipe(
      map((response: any) => {
        if (response.success) {
          this.isAuthValid = true;
          this.jwtToken = response.token;
          this.name = response.name;
          this.username = response.username;
          this.email = response.email;
          this.role = response.role;
          this.image = response.image;
          this.authMessage = '';
        } else if (!response.success) {
          this.authMessage = 'Your email or password does not match';
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