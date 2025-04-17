import { computed, Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product, PRODUCTS } from '../../data/products';
import { ToastService } from './toast.service';

export type CartItem = Product & { quantity: number };

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cartSignal = signal<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor(private toastService: ToastService){}

  addToCart(product: Product): void {
    const updatedCart = [...this.cartSubject.value];
    const item = updatedCart.find(p => p.id === product.id);

    if (item && item.quantity < item.stock) {
      item.quantity++;
      const message = `"${item.name}": added to cart!`
      this.toastService.showToast(false, message);
    } else if (!item) {
      updatedCart.push({ ...product, quantity: 1 });

      const item2 = PRODUCTS.find(p => p.id === product.id);
      if(item2){
        const message = `"${item2.name}": added to cart!`
        this.toastService.showToast(false, message);
      }
    }
    else{
      this.toastService.showToast(true, "You can't exceed the stock limit");
    }

    this.cartSubject.next(updatedCart);
    this.cartSignal.set(updatedCart);
    
  }

  incrementQuantity(productId: number): void {
    const updatedCart = this.cartSubject.value.map(item => {
      if (item.id === productId && item.quantity < item.stock) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    this.cartSubject.next(updatedCart);
    this.cartSignal.set(updatedCart);
  }

  decrementQuantity(productId: number): void {
    const updatedCart = this.cartSubject.value
      .map(item => {
        if (item.id === productId) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
      .filter(item => item.quantity > 0);

    this.cartSubject.next(updatedCart);
    this.cartSignal.set(updatedCart);
  }

  removeFromCart(productId: number): void {
    const updatedCart = this.cartSubject.value.filter(item => item.id !== productId);
    this.cartSubject.next(updatedCart);
    this.cartSignal.set(updatedCart);
  }

  clearCart(): void {
    this.cartSubject.next([]);
    this.cartSignal.set([]);
  }

  getTotal(): number {
    return this.cartSubject.value.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  getCartSnapshot(): CartItem[] {
    return this.cartSubject.value;
  }
}


