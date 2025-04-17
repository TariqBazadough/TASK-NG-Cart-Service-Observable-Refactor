import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../data/products';

export type CartItem = Product & { quantity: number };

@Injectable({ providedIn: 'root' })
export class CartService {
  cart$ = signal<CartItem[]>([]);

  addToCart(product: Product): void {
    this.cart$.update((cart) => {
      const currentCart = [...cart];
      const item = currentCart.find((p) => p.id === product.id);

      if (item && item.quantity < item.stock) {
        item.quantity++;
      } else if (!item) {
        currentCart.push({ ...product, quantity: 1 });
      }
      return currentCart;
    });
  }

  incrementQuantity(productId: number): void {
    this.cart$.update((cart) => {
      const updatedCart = cart.map((item) => {
        if (item.id === productId && item.quantity < item.stock) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      return updatedCart;
    });
  }

  decrementQuantity(productId: number): void {
    this.cart$.update((cart) => {
      const updatedCart = cart
        .map((item) => {
          if (item.id === productId) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
      return updatedCart;
    });
  }

  removeFromCart(productId: number): void {
    this.cart$.update((cart) => {
      const updatedCart = cart.filter((item) => item.id !== productId);
      return updatedCart;
    });
  }

  clearCart(): void {
    this.cart$.set([]);
  }

  getTotal(): number {
    return this.cart$().reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  getCartSnapshot(): CartItem[] {
    return this.cart$();
  }
}
