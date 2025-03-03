import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { Product } from '../../models/product';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  searchText: string = '';
  isManager: boolean = false;

  constructor(
    private decimalPipe: DecimalPipe,
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isManager = this.authService.hasRole('GERENTE');
    this.reloadProducts();

    
    this.productService.productAdded$.subscribe(() => {
      this.reloadProducts();
    });
  }
  
  formatPrice(price: number): string {
    return this.decimalPipe.transform(price, '1.2-2') || '0.00';
  }

  addProduct() {
    this.router.navigate(['/product/add']);
  }

  search() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data.filter(p => p.name.toLowerCase().includes(this.searchText.toLowerCase()));
    });
  }

  editProduct(id: string) {
    this.router.navigate(['/product/edit', id]);
  }

  deleteProduct(id: string, name: string) {
    const shouldDelete = confirm(`Tem certeza que deseja excluir "${name}"?`);
    if (shouldDelete) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter(product => product.id !== id);
        },
        error: (err) => {
          console.error('Error deleting product:', err);
        }
      });
    }
  }

  reloadProducts() {
    this.productService.getProducts(1, 10).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }
}