import { Injectable } from '@angular/core';
import { Product } from '../../data/products';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems: (Product & { quantity: number })[] = [];
  private cartSubject = new Subject<(Product & { quantity: number })[]>();
  cart$ = this.cartSubject.asObservable();

  addToCart(product: Product) {
    const item = this.cartItems.find((p) => p.id === product.id);
    if (item) {
      if (item.quantity < item.stock) {
        item.quantity++;
      }
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    this.cartSubject.next(this.cartItems);
  }

  getCart() {
    return this.cartItems;
  }

  incrementQuantity(productId: number) {
    const item = this.cartItems.find((p) => p.id === productId);
    if (item && item.quantity < item.stock) {
      item.quantity++;
    }
    this.cartSubject.next(this.cartItems);
  }

  decrementQuantity(productId: number) {
    const item = this.cartItems.find((p) => p.id === productId);
    if (item) {
      item.quantity--;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      }
    }
    this.cartSubject.next(this.cartItems);
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter((p) => p.id !== productId);
    this.cartSubject.next(this.cartItems);
  }

  clearCart() {
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
  }

  getTotal() {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}
