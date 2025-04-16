import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../data/products';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItemsSubject = new BehaviorSubject<(Product & { quantity: number })[]>([]);
  cartItems: Observable<(Product & { quantity: number })[]> = this.cartItemsSubject.asObservable();

  private get cartItemsValue() {
    return this.cartItemsSubject.value;
  }

  addToCart(product: Product) {
    const items = [...this.cartItemsValue];
    const item = items.find((p) => p.id === product.id);
    if (item) {
      if (item.quantity < item.stock) {
        item.quantity++;
      }
    } else {
      items.push({ ...product, quantity: 1 });
    }
    this.cartItemsSubject.next(items);
  }

  incrementQuantity(productId: number) {
    const items = [...this.cartItemsValue];
    const item = items.find((p) => p.id === productId);
    if (item && item.quantity < item.stock) {
      item.quantity++;
      this.cartItemsSubject.next(items);
    }
  }

  decrementQuantity(productId: number) {
    let items = [...this.cartItemsValue];
    const item = items.find((p) => p.id === productId);
    if (item) {
      item.quantity--;
      if (item.quantity <= 0) {
        items = items.filter((p) => p.id !== productId);
      }
      this.cartItemsSubject.next(items);
    }
  }

  removeFromCart(productId: number) {
    const items = this.cartItemsValue.filter((p) => p.id !== productId);
    this.cartItemsSubject.next(items);
  }

  clearCart() {
    this.cartItemsSubject.next([]);
  }

  getTotal() {
    return this.cartItemsValue.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}
