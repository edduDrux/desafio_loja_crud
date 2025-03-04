import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-delete',
  standalone: false,
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.scss']
})
export class ProductDeleteComponent {
  @Input() productName!: string;
  @Output() confirmDelete = new EventEmitter<boolean>();

  confirm() {
    this.confirmDelete.emit(true);
  }

  cancel() {
    this.confirmDelete.emit(false);
  }
}