import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../../_core/services/common.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { pageTransition } from '../../../shared/utils/animations';
import { Observable } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  animations: [pageTransition]
})
export class ResetPasswordComponent implements OnInit {
  isAuthValid: boolean = false;
  authMessage: string = '';
  isPasswordValid1: boolean = false;
  passwordMessage1: string = '';
  isPasswordValid2: boolean = false;
  passwordMessage2: string = '';
  isRecaptchaValid: boolean = false;
  recaptchaMessage: string = '';
  isLoading: boolean = false;
  isPasswordChangedSuccess: boolean = false;
  isShowSuccess: boolean = false;
  isCatchError: boolean = true;

  userId: string = "";
  code: string = "";
  password: string = "";
  confirmPassword: string = "";

  resetPasswordForm = this.formBuilder.group({
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  constructor(
    private route: ActivatedRoute,
    public commonService: CommonService,
    private formBuilder: FormBuilder,
    private router: Router,
    private recaptchaV3Service: ReCaptchaV3Service,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      this.code = params['code'];
    });
  }

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

    const password1 = this.resetPasswordForm.get('password')?.value as string;
    const password2 = this.resetPasswordForm.get('confirmPassword')?.value as string;

    if (password1.length >= 6) {
      this.isPasswordValid1 = true;
      this.passwordMessage1 = '';

      if (password2.length >= 6) {
        this.isPasswordValid2 = true;
        this.passwordMessage2 = '';

        if (password1 === password2) {
          this.isPasswordValid1 = true;
          this.passwordMessage1 = '';
          this.isPasswordValid2 = true;
          this.passwordMessage2 = '';

          this.recaptchaV3Service.execute('importantAction')
            .pipe(
              switchMap((recaptchaToken: string) => this.sendRecaptchaTokenToBackend(recaptchaToken)),
              switchMap(() => this.sendPasswordToBackend(password1, password2))
            )
            .subscribe({
              next: () => {
                if (this.resetPasswordForm.valid && this.isPasswordValid1 && this.isPasswordValid2) {
                  if (this.isAuthValid && this.isRecaptchaValid && this.isPasswordChangedSuccess) {
                    this.isShowSuccess = true;
                    setTimeout(() => {
                      this.router.navigate(['/signin']);
                    }, 1500);
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
          this.isPasswordValid1 = false;
          this.passwordMessage1 = 'Password must be the same as confirm password';
          this.isPasswordValid2 = false;
          this.passwordMessage2 = 'Both passwords must be the same';
        }
      } else {
        this.isLoading = false;
        this.isPasswordValid2 = false;
        this.passwordMessage2 = 'The password must be at least 6 characters long';
      }
    } else {
      this.isLoading = false;
      this.isPasswordValid1 = false;
      this.passwordMessage1 = 'The confirm password must be at least 6 characters long';
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

  public sendPasswordToBackend(password1: string, password2: string): Observable<void> {
    const resetApiUrl = '/v1/Account/ResetPassword';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const resetModel = {
      userId: this.userId,
      code: this.code,
      password: password1,
      confirmPassword: password2,
    };

    return this.http.post(resetApiUrl, resetModel, { headers: headers }).pipe(
      map((response: any) => {
        if (response.success) {
          this.isAuthValid = true;
          this.isPasswordChangedSuccess = true;
          this.authMessage = '';
        } else if (!response.success) {
          this.authMessage = 'Password reset unsuccessful';
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
