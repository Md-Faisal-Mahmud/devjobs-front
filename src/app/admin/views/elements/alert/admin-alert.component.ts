import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { pageTransition } from '../../../../shared/utils/animations';
import { AlertType } from '../../../../shared/components/alert/alert.type';


@Component({
  selector: 'admin-alert',
  standalone: true,
  imports: [
    CommonModule,
    AlertComponent
  ],
  templateUrl: './admin-alert.component.html',
  styleUrls: ['./admin-alert.component.css'],
  animations: [pageTransition],
})
export class AdminAlertComponent {
  readonly alertType = AlertType;
}
