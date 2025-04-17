import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../../../data/products';
import { ToastService } from '../toast/toast.service';

export type CartItem = Product & { quantity: number };

@Injectable({ providedIn: 'root' })
export class CartService {
  private cart = signal<CartItem[]>([]);
  cartSignal = computed(() => this.cart());

  constructor(private toastService: ToastService) {}

  addToCart(product: Product): void {
    const currentCart = [...this.cart()];
    const item = currentCart.find((p) => p.id === product.id);

    if (item && item.quantity < item.stock) {
      item.quantity++;
      this.toastService.success(`${product.name} added again`);
    } else if (!item) {
      currentCart.push({ ...product, quantity: 1 });
      this.toastService.success(`${product.name} added to cart`);
    } else {
      this.toastService.error(`Cannot exceed stock limit for ${product.name}`);
    }

    this.cart.update(() => currentCart);
  }

  incrementQuantity(productId: number): void {
    const updatedCart = this.cart().map((item) => {
      if (item.id === productId && item.quantity < item.stock) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    this.cart.update(() => updatedCart);
  }

  decrementQuantity(productId: number): void {
    const currentCart = this.cart();
    const item = currentCart.find((item) => item.id === productId);

    if (!item) return;

    if (item.quantity <= 1) {
      this.removeFromCart(productId);
    } else {
      const updatedCart = currentCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
      this.cart.update(() => updatedCart);
    }
  }

  removeFromCart(productId: number): void {
    const item = this.cart().find((i) => i.id === productId);
    this.toastService.error(`Removed "${item?.name}" from cart`);
    const updatedCart = this.cart().filter((item) => item.id !== productId);
    this.cart.update(() => updatedCart);
  }

  clearCart(): void {
    this.toastService.success('Cart cleared');
    this.cart.set([]);
  }

  getTotal(): number {
    return this.cart().reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  getCartSnapshot(): CartItem[] {
    return this.cart();
  }
}
