import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../data/products';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartSubject = new BehaviorSubject<(Product & { quantity: number })[]>(
    []
  );
  cart$ = this.cartSubject.asObservable();

  constructor() {}

  addToCart(product: Product) {
    const currentCart = this.cartSubject.getValue();
    const item = currentCart.find((p) => p.id === product.id);

    if (item) {
      if (item.quantity < item.stock) {
        item.quantity++;
      }
    } else {
      currentCart.push({ ...product, quantity: 1 });
    }

    this.cartSubject.next([...currentCart]);
  }

  getCart() {
    return this.cartSubject.getValue();
  }

  incrementQuantity(productId: number) {
    const currentCart = this.cartSubject.getValue();
    const item = currentCart.find((p) => p.id === productId);

    if (item && item.quantity < item.stock) {
      item.quantity++;
      this.cartSubject.next([...currentCart]);
    }
  }

  decrementQuantity(productId: number) {
    const currentCart = this.cartSubject.getValue();
    const item = currentCart.find((p) => p.id === productId);

    if (item) {
      item.quantity--;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.cartSubject.next([...currentCart]);
      }
    }
  }

  removeFromCart(productId: number) {
    const currentCart = this.cartSubject.getValue();
    const updatedCart = currentCart.filter((p) => p.id !== productId);
    this.cartSubject.next(updatedCart);
  }

  clearCart() {
    this.cartSubject.next([]);
  }

  getTotal() {
    const currentCart = this.cartSubject.getValue();
    return currentCart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}
