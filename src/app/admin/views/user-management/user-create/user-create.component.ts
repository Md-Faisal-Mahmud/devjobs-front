import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { pageTransition } from '../../../../shared/utils/animations';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { AlertType } from '../../../../shared/components/alert/alert.type';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { RouterLink } from '@angular/router';
import { AdminRoutes } from '../../../admin.routes';
import { CommonService } from '../../../../_core/services/common.service';
import { AppRoutes } from '../../../../app.routes';
import { UserManagementRoutes } from '../../../admin.routes';
import { DefaultImages } from '../../../utilities/default-images';

 export interface IUser{
  FirstName: string,
  LastName: string,
  UserName: string,
  Image: string | undefined,
  PhoneNumber: string, 
  Email: string,
  Password: string,
}

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgIf, AlertComponent, SpinnerComponent, RouterLink],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css',
  animations: [pageTransition]
})

export class UserCreateComponent {
  isDisableCreateButton:boolean = false;
  showSuccessAlert: boolean = false;
  showDangerAlert: boolean = false;
  errorMessage: string="";
  base64StringProfileImage: string|undefined="";
  imagePreview: string = DefaultImages.DefaultUserImage;
  
  user: IUser = {
    FirstName: '',
    LastName: '',
    UserName: '',
    Image: '',
    PhoneNumber: '',
    Email: '',
    Password: '',
  };

  checkValidation:boolean = false;
  readonly alertType!: AlertType;

  readonly appRoutes = AppRoutes;
  readonly adminRoutes = AdminRoutes;
  readonly userManagementRoutes = UserManagementRoutes;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public readonly commonServices: CommonService) { }
   
  userForm:FormGroup = this.formBuilder.group({
    FirstName: ['', Validators.required],
    LastName: ['', Validators.required],
    UserName: ['', Validators.required],
    ProfileImage: ['', this.validateImageType],
    PhoneNumber: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]], 
    UserEmail: ['', [Validators.required, Validators.email]],
    UserPassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSelectProfileImage($event:any){
    var file = $event.target.files[0];
    var reader = new FileReader();
    reader.onloadend = (e)=>{
      this.base64StringProfileImage = reader.result?.toString().split(',')[1];
      this.imagePreview = reader.result as string
    }
    reader.readAsDataURL(file);
  }

  validateImageType(control: any){
    const fileUrl = control.value;
    if(!fileUrl){
      return null;
    }

    var extension = fileUrl.split('.').pop()?.toLowerCase();
    var validExtensions = ['png', 'jpeg', 'jpg']
    if(!validExtensions.includes(extension)){
      return {invalidFormat: true}
    }
    return null;
  };
  
  submitForm() {
    this.isDisableCreateButton=true;
    this.checkValidation = true;
    this.user= {
      FirstName: this.userForm.get("FirstName")?.value,
      LastName: this.userForm.get("LastName")?.value,
      UserName: this.userForm.get("UserName")?.value,
      Image: this.base64StringProfileImage,
      PhoneNumber: this.userForm.get("PhoneNumber")?.value,
      Email: this.userForm.get("UserEmail")?.value,
      Password: this.userForm.get("UserPassword")?.value
    }

    if (this.userForm.valid) {
      var token = sessionStorage.getItem('token_sessionStorage');
      if(token==null){
        token = localStorage.getItem("token_localStorage");
      }
      
      var header = new HttpHeaders({
        "Content-Type":"Application/Json",
        "Authorization": "Bearer "+token
      })

      this.sentUserDataToBackend(header);     
    } 
    else 
    {
      this.isDisableCreateButton=false;
    }
  }

  sentUserDataToBackend(header: HttpHeaders){
    this.http.post("/v1/UserManagement/CreateUser", this.user, {headers: header}).subscribe({
      next: (response: any) => {
        if (response && response.succeeded === true) {
          this.showSuccessAlert = true;
          this.showDangerAlert=false;
        } else {
          this.showDangerAlert = true;
          this.showSuccessAlert = false;
          if (response && response.errors && response.errors.length > 0) {
            this.errorMessage = response.errors.map((error:any) => error.description).join(', ');
          } else {
            this.errorMessage = "An unknown error occurred.";
            this.showSuccessAlert = false;
          }
        }
        this.isDisableCreateButton=false;
      },
      error: (err) => {
        // Handle HTTP error (e.g., network issues, server error)
        this.showDangerAlert = true;
        this.errorMessage = "An error occurred while processing your request.";
        this.showSuccessAlert = false;
        this.isDisableCreateButton=false;
      },
    });
    
  }
}