import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { Datatable, DatatableColumn, DisplayType, DatatableAction } from '../../../../shared/components/data-table/types/data-table.type';
import { FilterColumn, OperatorType} from '../../../../shared/components/data-table/types/paging.type';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { AlertType } from '../../../../shared/components/alert/alert.type';
import { FormsModule } from '@angular/forms';
import { DefaultImages } from '../../../utilities/default-images';
import { Router, RouterModule } from '@angular/router';
import { CommonService } from '../../../../_core/services/common.service';
import { AppRoutes } from '../../../../app.routes';
import { AdminRoutes, UserManagementRoutes } from '../../../admin.routes';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [DataTableComponent, ModalComponent, AlertComponent, FormsModule, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  constructor(private http:HttpClient, private router: Router, private commonService: CommonService){}

  showDeleteModal: boolean= false;
  confirmDelete: boolean= false;
  deleteId: string = "";
  useListApi:string= "/v1/UserManagement/GetUsers"
  showSuccessAlert: boolean = false
  showDangerAlert: boolean = false
  alertType: AlertType = AlertType.Danger

  dtSetting: Datatable = new Datatable([
    new DatatableColumn('Profile Image', 'imageUrl', { width: '15%', align: 'justify-start', display: DisplayType.xs }, false, false, x=>this.displayProfileImageInTable(x.imageUrl)),
    new DatatableColumn('FirstName', 'firstName', { width: '15%', align: 'justify-start', display: DisplayType.xs }, false, true),
    new DatatableColumn('LastName', 'lastName', { width: '15%', align: 'justify-start', display: DisplayType.xs }, false, true),
    new DatatableColumn('Username', 'userName', { width: '20%', align: 'justify-start', display: DisplayType.xs }, false, true),
    new DatatableColumn('Email', 'userEmail', { width: '20%', align: 'justify-start', display: DisplayType.xs }, false, true),
    new DatatableColumn('Phone Number', 'phoneNumber', { width: '15%', align: 'justify-start', display: DisplayType.xs }, false, true),
    new DatatableColumn('Action', 'status', { width: '15%', align: 'justify-center', display: DisplayType.xs }, true, false, undefined, undefined,
        [
          new DatatableAction({ icon: 'bi bi-pencil-square' }, 'primary', (x) => this.redirectToUpdatePage(x.userId)),
          new DatatableAction({ icon: 'bi bi-trash' }, 'danger', (x) => this.openDeleteModal(x.userId)),
        ]
      )
    ], "User List");
 
  filterColumns: FilterColumn[]=[
  ]

  @ViewChild(DataTableComponent) datatable?:DataTableComponent;
  
  onAdvancedSearch(filters: FilterColumn[]){
    this.datatable?.onAdvanceSearch(filters);
    this.datatable?.loadTable();
  }
  
  //Search filters
  firstNameFilter:string = ""
  lastNameFilter: string = ""
  usernameFilter: string = ""
  emailFilter: string = ""
  phoneNumberFilter: string = ""

  performSearch() {
    const filters: FilterColumn[] = [];
    if (this.firstNameFilter.trim() != "") {
      filters.push({ filterBy: 'FirstName', operator: OperatorType.Contains, value: this.firstNameFilter, isGenericValue:false });
    }
    if (this.lastNameFilter.trim() != "") {
      filters.push({ filterBy: 'LastName', operator: OperatorType.Contains, value: this.lastNameFilter, isGenericValue:false });
    }
    if (this.usernameFilter.trim() != "") {
      filters.push({ filterBy: 'UserName', operator: OperatorType.Contains, value: this.usernameFilter, isGenericValue:false });
    }
    if (this.emailFilter.trim() != "") {
      filters.push({ filterBy: 'UserEmail', operator: OperatorType.Contains, value: this.emailFilter, isGenericValue:false });
    }
    if (this.phoneNumberFilter.trim() != "") {
      filters.push({ filterBy: 'PhoneNumber', operator: OperatorType.Contains, value: this.phoneNumberFilter, isGenericValue:false });
    }

    this.onAdvancedSearch(filters);
  }
  

  openDeleteModal(id:any): any{
    this.showDeleteModal = !this.showDeleteModal;
    this.deleteId=id;
  }

  onCloseModal(event:boolean){
    this.showDeleteModal=event;
  }

  onConfirmDelete(event:boolean){
    this.confirmDelete=event;
    this.deleteUser(this.deleteId);
  }

  deleteUser(id:any){
   if(this.confirmDelete){
    var token = sessionStorage.getItem("token_sessionStorage")??localStorage.getItem("token_localStorage");
    var header = new HttpHeaders({
        "Authorization": "Bearer "+token
    });

    this.http.post<any>('/v1/UserManagement/DeleteUserById', {id:id}).subscribe(
      {
      next: (response:any)=>{
        if(response.succeeded==true){
          this.showSuccessAlert=true;
          this.showDangerAlert=false;
        }
        
        this.datatable?.reloadTable();
      },
      error: (err:any)=>{
        this.showDangerAlert = true;
        this.showSuccessAlert = false;
      }
     }
    )
   }
  }
  
  redirectToUpdatePage(id:any){
    this.router.navigate([this.commonService.prepareRoute(AppRoutes.Admin, AdminRoutes.UserManagement, UserManagementRoutes.Update), id]);
  }
  
  displayProfileImageInTable(url:any){
    if(url == "" || url == null){
      return `<div class="flex items-center justify-center rounded-full h-12 w-12 overflow-hidden border-2 border-emerald-600">
      <img class="w-full object-cover" src=${DefaultImages.DefaultUserImage} alt="User Image">
     </div>`;
    }

    return `<div class="flex items-center justify-center rounded-full h-12 w-12 overflow-hidden border-2 border-emerald-600">
     <img class="w-full object-cover" src=${url} alt="User Image">
    </div>`;
  }
}
