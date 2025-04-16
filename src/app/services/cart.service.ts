import { Injectable } from '@angular/core';
import { Product } from '../../data/products';
import { BehaviorSubject, isObservable } from 'rxjs';

export type CartItem = Product & { quantity: number };

@Injectable({ providedIn: 'root' })
export class CartService {
  cart: CartItem[] = [];
  cartObject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartObject.asObservable();

  addToCart(product: Product) {
    const item = this.cart.find((p) => p.id === product.id);
    if (item) {
      if (item.quantity < item.stock) {
        item.quantity++;
      }
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }

    this.cartObject.next(this.cart);
  }

  getCart() {
    return this.cart;
  }

  incrementQuantity(productId: number) {
    const item = this.cart.find((p) => p.id === productId);
    if (item && item.quantity < item.stock) {
      item.quantity++;
    }
    this.cartObject.next(this.cart);
  }

  decrementQuantity(productId: number) {
    const item = this.cart.find((p) => p.id === productId);
    if (item) {
      item.quantity--;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      }
    } else this.cartObject.next(this.cart);
  }

  removeFromCart(productId: number) {
    this.cart = this.cart.filter((p) => p.id !== productId);
    this.cartObject.next(this.cart);
  }

  clearCart() {
    this.cart = [];
    this.cartObject.next(this.cart);
  }

  getTotal() {
    return this.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}
