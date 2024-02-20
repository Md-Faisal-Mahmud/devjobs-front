import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-user-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-user-modal.component.html',
  styleUrl: './delete-user-modal.component.css'
})
export class DeleteUserModalComponent {
  @Output() onCancel = new EventEmitter();
  @Output() onConfirm = new EventEmitter();

  cancel() {
    this.onCancel.emit();
  }

  confirm() {
    this.onConfirm.emit();
  }
}
