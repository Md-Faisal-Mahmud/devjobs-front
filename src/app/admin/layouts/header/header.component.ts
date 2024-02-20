import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Images } from '../../../../assets/data/images';
import { Router } from '@angular/router';
import { DefaultImages } from '../../utilities/default-images';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LogoutModalComponent } from '../../../shared/components/logout-modal/logout-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  public userOne: string = Images.users.userOne;
  isOpen: boolean = false;
  name: string = '';
  email: string = '';
  username: string = '';
  role: string = '';
  image: string = '';

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    public matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('name') ?? sessionStorage.getItem('name') ?? '';
    this.email = localStorage.getItem('email') ?? sessionStorage.getItem('email') ?? '';
    this.username = localStorage.getItem('username') ?? sessionStorage.getItem('username') ?? '';
    this.role = localStorage.getItem('role') ?? sessionStorage.getItem('role') ?? '';
    this.image = localStorage.getItem('image') ?? sessionStorage.getItem('image') ?? '';
  }

  onClickProfile = () => {
    const profileDropdownList = this.element.nativeElement.querySelector(
      '.profile-dropdown-list'
    );
    this.renderer.setAttribute(profileDropdownList, 'aria-expanded', 'true');
  };

  getImageSource(): string {

    if(this.image){
      return this.image
    } else{
      return DefaultImages.DefaultUserImage
    }
  }

  openModal() {
    const profileDropdownList = this.element.nativeElement.querySelector(
      '.profile-dropdown-list'
    );
    this.renderer.setAttribute(profileDropdownList, 'aria-expanded', 'false');

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    const modalDialog = this.matDialog.open(LogoutModalComponent, dialogConfig);
  }
}