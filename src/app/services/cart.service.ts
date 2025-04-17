import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../../data/products';

export type CartItem = Product & { quantity: number };

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartSignal = signal<CartItem[]>([]);

  total = computed(() =>
    this.cartSignal().reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  );

  cartItem$ = this.cartSignal;

  addToCart(product: Product): void {
    const currentCart = [...this.cartSignal()];
    const item = currentCart.find((p) => p.id === product.id);

    if (item && item.quantity < item.stock) {
      item.quantity++;
    } else if (!item) {
      currentCart.push({ ...product, quantity: 1 });
    }

    this.cartSignal.set(currentCart);
  }

  incrementQuantity(productId: number): void {
    const updatedCart = this.cartSignal().map((item) => {
      if (item.id === productId && item.quantity < item.stock) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    this.cartSignal.set(updatedCart);
  }

  decrementQuantity(productId: number): void {
    const updatedCart = this.cartSignal()
      .map((item) => {
        if (item.id === productId) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    this.cartSignal.set(updatedCart);
  }

  removeFromCart(productId: number): void {
    const updatedCart = this.cartSignal().filter(
      (item) => item.id !== productId
    );
    this.cartSignal.set(updatedCart);
  }

  clearCart(): void {
    this.cartSignal.set([]);
  }

  getTotal(): number {
    return this.total();
  }

  getCartSnapshot(): CartItem[] {
    return this.cartSignal();
  }
}
