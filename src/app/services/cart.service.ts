import { Injectable } from '@angular/core';
import { Product } from '../../data/products';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  cartItems = new BehaviorSubject<(Product & { quantity: number })[]>([]);

  addToCart(product: Product) {
    const item = this.cartItems.value.find((p) => p.id === product.id);
    if (item) {
      if (item.quantity < item.stock) {
        item.quantity++;
        this.cartItems.next(this.cartItems.value);
      }
    } else {
      this.cartItems.next([
        ...this.cartItems.value,
        { ...product, quantity: 1 },
      ]);
    }
  }

  incrementQuantity(productId: number) {
    const item = this.cartItems.value.find((p) => p.id === productId);
    if (item && item.quantity < item.stock) {
      item.quantity++;
      this.cartItems.next(this.cartItems.value);
    }
  }

  decrementQuantity(productId: number) {
    const item = this.cartItems.value.find((p) => p.id === productId);
    if (item) {
      item.quantity--;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      }
      this.cartItems.next(this.cartItems.value);
    }
  }

  removeFromCart(productId: number) {
    this.cartItems.next(this.cartItems.value.filter((p) => p.id !== productId));
  }

  clearCart() {
    this.cartItems.next([]);
  }

  getTotal() {
    return this.cartItems.value.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}
