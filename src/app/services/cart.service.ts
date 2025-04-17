import { effect, Injectable, signal } from '@angular/core';
import { Product } from '../../data/products';
import { ToastService } from './toast.service';
export type CartItem = Product & { quantity: number };

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems = signal<CartItem[]>([]);
  cartItems$ = this.cartItems;

  constructor(private toastService: ToastService) {}

  addToCart = (product: Product) => {
    const item = this.cartItems().find((p) => p.id === product.id);

    if (item) {
      if (item.quantity < item.stock) {
        item.quantity++;
        this.toastService.showToast(
          `🛒 ${product.name} added to cart`,
          'success'
        );
      } else {
        this.toastService.showToast(
          '❌ You can’t exceed the stock limit',
          'error'
        );
      }
    } else {
      this.cartItems.set([...this.cartItems(), { ...product, quantity: 1 }]);
      this.toastService.showToast(
        `🛒 ${product.name} added to cart`,
        'success'
      );
    }
  };

  incrementQuantity = (productId: number) => {
    const item = this.cartItems().find((p) => p.id === productId);
    if (item && item.quantity < item.stock) {
      item.quantity++;
      // this.cartItems.set([...this.cartItems(), item]);
    } else {
      this.toastService.showToast(
        '❌ You can’t exceed the stock limit',
        'error'
      );
    }
  };

  decrementQuantity = (productId: number) => {
    const item = this.cartItems().find((p) => p.id === productId);
    if (item) {
      item.quantity--;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
        this.toastService.showToast(
          `🛒 ${item.name} removed from cart`,
          'success'
        );
      }
    }
  };

  removeFromCart = (productId: number) => {
    this.cartItems.set(this.cartItems().filter((p) => p.id !== productId));
  };

  clearCart = () => {
    this.cartItems.set([]);
    this.toastService.showToast('Cart cleared');
  };

  getTotal = () => {
    return this.cartItems().reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
}
