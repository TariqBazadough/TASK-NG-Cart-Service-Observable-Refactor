import { computed, Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../data/products';

export type CartItem = Product & { quantity: number };

@Injectable({ providedIn: 'root' })
export class CartService {
  // private cartSubject = new BehaviorSubject<CartItem[]>([]);

  // cart$ = this.cartSubject.asObservable();
  // cartSubject2 = signal(0)
  currentCartSignal = computed(() => this.cartSubject2());
  private cartSubject2 = signal<CartItem[]>([]);

  addToCart(product: Product): void {
    const currentCart = [...this.currentCartSignal()];
    const item = this.cartSubject2().find((p) => p.id === product.id);

    if (item && item.quantity < item.stock) {
      item.quantity++;
      // this.itemSignal.update((val) => val +1)
    } else if (!item) {
      // currentCart.push({ ...product, quantity: 1 });
      currentCart.push({ ...product, quantity: 1 });
    }
    this.cartSubject2.update(() => currentCart);

    // this.cartSubject.next(currentCart);
  }

  incrementQuantity(productId: number): void {
    const updatedCart = this.cartSubject2().map((item) => {
      if (item.id === productId && item.quantity < item.stock) {
        // return { ...item, quantity: item.quantity + 1 };
        // currentCart.push({ ...product, quantity: + 1 });
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    this.cartSubject2.update(() => updatedCart);
  }

  decrementQuantity(productId: number): void {
    const updatedCart = this.cartSubject2()
      .map((item) => {
        if (item.id === productId) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    this.cartSubject2.update(() => updatedCart);
  }

  removeFromCart(productId: number): void {
    const updatedCart = this.cartSubject2().filter(
      (item) => item.id !== productId
    );
    this.cartSubject2.update(() => updatedCart);
  }

  clearCart(): void {
    // this.cartSubject.next([]);
    this.cartSubject2.set([]);
  }

  getTotal(): number {
    return this.cartSubject2().reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  getCartSnapshot(): CartItem[] {
    return this.cartSubject2();
  }
}
