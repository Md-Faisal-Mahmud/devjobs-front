import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  imports: [CommonModule]
})
export class ModalComponent {
  @Input() show: boolean = false;
  @Input() confirm: boolean = false;
  @Input() title: string = "Modal";
  @Input() size: string = "xl:max-w-7xl";
  @Input() footer: boolean = true;
  
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() confirmation = new EventEmitter<boolean>();

  onModalClose() {
    this.show = false;
    this.closeModal.emit(this.show);
  }
  onConfirm(){
    this.confirm=true;
    this.confirmation.emit(this.confirm);
    this.onModalClose();
  }
}
