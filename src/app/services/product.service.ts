import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subject, tap } from 'rxjs';
import { Product } from '../models/product';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://dev-challenge-80777230809.southamerica-east1.run.app/api/dev-challenge/products';
  private productAddedSubject = new Subject<void>();
  
  productAdded$ = this.productAddedSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders() {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No token available');
    }
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  getProducts(page: number = 1, limit: number = 10): Observable<Product[]> {
    const params = { page: page.toString(), limit: limit.toString() };
    return this.http.get<{ data: Product[] }>(this.apiUrl, { ...this.getHeaders(), params })
      .pipe(
        map(response => response.data)
      );
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`, this.getHeaders());
  }
  
  searchProducts(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?name=${name}`, this.getHeaders());
  }

  addProduct(product: Partial<Product>): Observable<Product> {
    console.log('Sending product to API:', product); 
  
    return this.http.post<Product>(this.apiUrl, product, this.getHeaders()).pipe(
      tap((response) => {
        console.log('Product added successfully:', response); 
        this.productAddedSubject.next(); 
      }),
      catchError((error) => {
        console.error('Error adding product:', error); 
        throw error;
      })
    );
  }
  
  updateProduct(id: string, product: Partial<Product>): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/${id}`, product, this.getHeaders());
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.getHeaders());
  }
}
