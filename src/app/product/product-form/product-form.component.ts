import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: false,
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product: Product = { id: '', name: '', unit: '', price: 0, active: true };
  isEditing: boolean = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.productService.getProductById(id).subscribe({
        next: (product) => {
          this.product = product;
        },
        error: (err) => {
          console.error('Error fetching product:', err);
        }
      });
    }
  }

  saveProduct() {
    if (this.isEditing) {
      const updatedProduct: Partial<Product> = {
        name: this.product.name,
        unit: this.product.unit,
        price: this.product.price,
        active: this.product.active
      };
  
      this.productService.updateProduct(this.product.id, updatedProduct).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error updating product:', err);
        }
      });
    } else {
      const newProduct: Partial<Product> = {
        name: this.product.name,
        unit: this.product.unit,
        price: this.product.price,
        active: this.product.active
      };
  
      console.log('Adding product with data:', newProduct);
  
      this.productService.addProduct(newProduct).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error adding product:', err);
          if (err.error && err.error.message) {
            console.error('API Error Message:', err.error.message);
          }
        }
      });
    }
  }
}