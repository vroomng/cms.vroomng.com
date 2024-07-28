import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [CommonModule]

})
export class ModalComponent {
  @Input() title: string = ''; // The title of the modal
  @Input() isVisible: boolean = false; // Controls the visibility of the modal
  @Output() closeModal = new EventEmitter<void>(); // Event to close the modal

  onClose() {
    this.closeModal.emit();
  }
}
