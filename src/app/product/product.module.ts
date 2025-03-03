import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- ADICIONE ESTA LINHA
import { ProductDeleteComponent } from './product-delete/product-delete.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductFormComponent,
    ProductDeleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [DecimalPipe],
})
export class ProductModule { }
