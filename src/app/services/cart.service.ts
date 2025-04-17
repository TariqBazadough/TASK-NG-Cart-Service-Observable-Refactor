import { computed, Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../data/products';

export type CartItem = Product & { quantity: number };

@Injectable({ providedIn: 'root' })
export class CartService {
  cartSubject = signal<CartItem[]>([]);
  readonly cart$ = computed(() => this.cartSubject());

  addToCart(product: Product): void {
    const currentCart = [...this.cartSubject()];
    const item = currentCart.find((p) => p.id === product.id);

    if (item && item.quantity < item.stock) {
      item.quantity++;
    } else if (!item) {
      currentCart.push({ ...product, quantity: 1 });
    }

    this.cartSubject.set(currentCart);
  }

  incrementQuantity(productId: number): void {
    const updatedCart = this.cartSubject().map((item) => {
      if (item.id === productId && item.quantity < item.stock) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    this.cartSubject.set(updatedCart);
  }

  decrementQuantity(productId: number): void {
    const updatedCart = this.cartSubject()
      .map((item) => {
        if (item.id === productId) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    this.cartSubject.set(updatedCart);
  }

  removeFromCart(productId: number): void {
    const updatedCart = this.cartSubject().filter(
      (item) => item.id !== productId
    );
    this.cartSubject.set(updatedCart);
  }

  clearCart(): void {
    this.cartSubject.set([]);
  }

  getTotal(): number {
    return this.cartSubject().reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  getCartSnapshot(): CartItem[] {
    return this.cartSubject();
  }
}
