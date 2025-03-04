import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  searchText: string = '';
  isManager: boolean = false;
  showDeleteModal: boolean = false;
  productToDeleteId: string | null = null;
  productToDeleteName: string = '';
  currentPage: number = 1;
  totalProducts: number = 0;
  itemsPerPage: number = 10;
  hasMoreProducts: boolean = false;

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

  logout() {
    this.authService.logout();
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

  openDeleteModal(id: string, name: string) {
    this.productToDeleteId = id;
    this.productToDeleteName = name;
    this.showDeleteModal = true;
  }

  handleDeleteConfirmation(confirm: boolean) {
    if (confirm && this.productToDeleteId) {
      this.productService.deleteProduct(this.productToDeleteId).subscribe({
        next: () => {
          this.products = this.products.filter(product => product.id !== this.productToDeleteId);
          this.closeDeleteModal();
        },
        error: (err) => {
          console.error('Error deleting product:', err);
          this.closeDeleteModal();
        }
      });
    } else {
      this.closeDeleteModal();
    }
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.productToDeleteId = null;
    this.productToDeleteName = '';
  }

  reloadProducts() {
    this.productService.getProducts(this.currentPage, this.itemsPerPage).subscribe({
      next: (data) => {
        this.products = data;
        this.hasMoreProducts = data.length === this.itemsPerPage;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.reloadProducts();
  }
}