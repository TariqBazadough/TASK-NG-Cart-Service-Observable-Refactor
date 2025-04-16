import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { Product } from '../../data/products';

export type CartItem = Product & { quantity: number };

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _cartItems = new BehaviorSubject<CartItem[]>([]);
  readonly cartItems$: Observable<CartItem[]> = this._cartItems.asObservable();

  private get cartItems(): CartItem[] {
    return this._cartItems.getValue();
  }

  private set cartItems(items: CartItem[]) {
    this._cartItems.next(items);
  }

  addToCart(product: Product) {
    const items = [...this.cartItems];
    const index = items.findIndex(p => p.id === product.id);

    if (index > -1) {
      if (items[index].quantity < items[index].stock) {
        items[index].quantity++;
      }
    } else {
      items.push({ ...product, quantity: 1 });
    }

    this.cartItems = items;
  }

  incrementQuantity(productId: number) {
    const items = [...this.cartItems];
    const item = items.find(p => p.id === productId);
    if (item && item.quantity < item.stock) {
      item.quantity++;
      this.cartItems = items;
    }
  }

  decrementQuantity(productId: number) {
    const items = [...this.cartItems];
    const index = items.findIndex(p => p.id === productId);

    if (index > -1) {
      items[index].quantity--;
      if (items[index].quantity <= 0) {
        items.splice(index, 1);
      }
      this.cartItems = items;
    }
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(p => p.id !== productId);
  }

  clearCart() {
    this.cartItems = [];
  }

  getTotal(): Observable<number> {
    return this.cartItems$.pipe(
      map(items => items.reduce((total, item) => total + item.price * item.quantity, 0))
    );
  }
}
