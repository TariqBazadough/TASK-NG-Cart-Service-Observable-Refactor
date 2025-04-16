import { Injectable } from '@angular/core';
import { Product } from '../../data/products';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems: (Product & { quantity: number })[] = [];
  cartSubject = new BehaviorSubject<(Product & { quantity: number })[]>([]);
  cartObservable = this.cartSubject.asObservable();

  private updateCart() {
    this.cartSubject.next(this.cartItems);
  }

  addToCart(product: Product) {
    const item = this.cartItems.find((p) => p.id === product.id);
    if (item) {
      if (item.quantity < item.stock) {
        item.quantity++;
      }
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
      this.updateCart()
    }
  }

  getCart() {
    return this.cartItems;
  }

  incrementQuantity(productId: number) {
    const item = this.cartItems.find((p) => p.id === productId);
    if (item && item.quantity < item.stock) {
      item.quantity++;
      this.updateCart()
    }
  }

  decrementQuantity(productId: number) {
    const item = this.cartItems.find((p) => p.id === productId);
    if (item) {
      item.quantity--;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);

      }
      this.updateCart()
    }
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter((p) => p.id !== productId);
    this.updateCart()
  }

  clearCart() {
    this.cartItems = [];
    this.updateCart()
  }

  getTotal() {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}
