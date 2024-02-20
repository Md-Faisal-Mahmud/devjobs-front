import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LogoutService } from '../../services/logout.service';

@Component({
  selector: 'app-logout-modal',
  standalone: true,
  imports: [],
  templateUrl: './logout-modal.component.html',
  styleUrl: './logout-modal.component.css'
})
export class LogoutModalComponent {
  matDialog: any;

  constructor(public dialogRef: MatDialogRef<LogoutModalComponent>,
    private logoutService: LogoutService) { }

  ngOnInit() {
  }

  actionFunction() {
    this.logoutService.logout();
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }
}
