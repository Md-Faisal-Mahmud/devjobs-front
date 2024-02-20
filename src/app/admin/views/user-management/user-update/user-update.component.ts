import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { pageTransition } from '../../../../shared/utils/animations';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { AlertType } from '../../../../shared/components/alert/alert.type';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { ActivatedRoute } from '@angular/router';
import { IUserDetailsDTO } from '../../../model/user-details.model';
import { RouterLink } from '@angular/router';
import { AdminRoutes } from '../../../admin.routes';
import { CommonService } from '../../../../_core/services/common.service';
import { AppRoutes } from '../../../../app.routes';
import { UserManagementRoutes } from '../../../admin.routes';
import { DefaultImages } from '../../../utilities/default-images';

@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgIf, AlertComponent, SpinnerComponent, RouterLink],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css',
  animations:[pageTransition]
})

export class UserUpdateComponent implements OnInit{
  isDisableCreateButton:boolean = false;
  showSuccessAlert: boolean = false;
  showDangerAlert: boolean = false;
  errorMessage:string="";
  readonly alertType!: AlertType;

  userDetails!: IUserDetailsDTO ;
  checkValidation:boolean = false;
  paramId:string|null='';

  base64StringProfileImage: string|undefined="";
  imagePreview: string = DefaultImages.DefaultUserImage;

  readonly appRoutes= AppRoutes;
  readonly adminRoutes = AdminRoutes
  readonly userManagementRoutes = UserManagementRoutes

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private route: ActivatedRoute, public readonly commonServices: CommonService) {
    this.userForm = this.formBuilder.group({
      Id:['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      UserName: ['', Validators.required],
      ProfileImage: ['',this.validateImageType],
      PhoneNumber: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]], 
      UserEmail: ['', [Validators.required, Validators.email]],
      LockoutEnd: ['', [Validators.required]],
      AccessFailedCount: ['', [Validators.required]],
      PhoneNumberConfirmed: ['', [Validators.required]],
      EmailConfirmed: ['', [Validators.required]],
      TwoFactorEnabled: ['', [Validators.required]],
      LockoutEnabled: ['', [Validators.required]]
    });
  }
  userForm!:FormGroup;
  headers!: HttpHeaders;
  ngOnInit(): void {
      this.paramId=this.route.snapshot.paramMap.get('id');
      this.http.post<IUserDetailsDTO>('/v1/UserManagement/GetUserById', {id:this.paramId}).subscribe(
        {
          next:(data)=>{
            this.userDetails = data;
            this.LoadFormData();
          },
          error:(err)=>{
          }
        }
      )
  }
    
  LoadFormData(){ 
    this.userForm = this.formBuilder.group({
      Id: [this.userDetails.id, Validators.required],
      FirstName: [this.userDetails.firstName, Validators.required],
      LastName: [this.userDetails.lastName, Validators.required],
      UserName: [this.userDetails.userName, Validators.required],
      ProfileImage: ['', ''],
      PhoneNumber: [this.userDetails.phoneNumber, [Validators.required, Validators.pattern(/^\d{11}$/)]], 
      UserEmail: [this.userDetails.email, [Validators.required, Validators.email]],
      LockoutEnd: [this.userDetails.lockoutEnd, ],
      AccessFailedCount: [this.userDetails.accessFailedCount, [Validators.required]],
      PhoneNumberConfirmed: [this.userDetails?.phoneNumberConfirmed, [Validators.required]],
      EmailConfirmed: [this.userDetails?.emailConfirmed, [Validators.required]],
      TwoFactorEnabled: [this.userDetails?.twoFactorEnabled, [Validators.required]],
      LockoutEnabled: [this.userDetails?.lockoutEnabled, [Validators.required]]
    });

    if(this.userDetails.imageUrl){
      this.imagePreview = this.userDetails.imageUrl;    
    } 
  }

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
    this.userDetails= {
      id: this.userForm.get("Id")?.value,
      firstName: this.userForm.get("FirstName")?.value,
      lastName: this.userForm.get("LastName")?.value,
      userName: this.userForm.get("UserName")?.value,
      image: this.base64StringProfileImage as string,
      imageUrl: this.imagePreview,
      phoneNumber: this.userForm.get("PhoneNumber")?.value,
      email: this.userForm.get("UserEmail")?.value,
      lockoutEnd: this.userForm.get("LockOutEnd")?.value,
      lockoutEnabled: this.userForm.value.lockoutEnabled,
      phoneNumberConfirmed: this.userForm.value.phoneNumberConfirmed,
      emailConfirmed: this.userForm.value.emailConfirmed,
      twoFactorEnabled: this.userForm.value.twoFactorEnabled,
      accessFailedCount: this.userForm.get("AccessFailedCount")?.value    
    }

    if (this.userForm.valid) {    
      this.sentUserDataToBackend();     
    } 
    else 
    {
      this.isDisableCreateButton=false;
    }
  }

  sentUserDataToBackend(){
    this.http.post("/v1/UserManagement/UpdateUser", this.userDetails, ).subscribe({
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
