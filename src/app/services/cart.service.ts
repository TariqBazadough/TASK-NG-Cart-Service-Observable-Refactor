import { Injectable } from '@angular/core';
import { Product, PRODUCTS } from '../../data/products';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems: (Product & { quantity: number })[] = [];
  // cartItems2 = new BehaviorSubject<Product & {quantity: number })[] = [];
  //  cartItems2: new BehaviorSubject <(Product & { quantity: number })>[] = [];
  cartItemsSubject = new BehaviorSubject<(Product & { quantity: number })[]>(
    []
  );

  //dollar sign is read only
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {}

  addToCart2(product: Product) {
    const item = this.cartItems.find((p) => p.id === product.id);
    const update2 = [...this.cartItemsSubject.value];
    // this.cartItemsSubject.next(update2);
    if (item && item.quantity < item.stock) {
      item.quantity += 1;
    } else if (!item) {
      update2.push({ ...product, quantity: 1 });
    }

    this.cartItemsSubject.next(update2);
  }

  // addToCart(product: Product) {
  //   const item = this.cartItems.find((p) => p.id === product.id);
  //   if (item) {
  //     if (item.quantity < item.stock) {
  //       item.quantity++;
  //     }
  //   } else {
  //     this.cartItems.push({ ...product, quantity: 1 });
  //   }
  // }

  getCart() {
    return this.cartItems;
  }

  incrementQuantity(productId: number) {
    const updatedCart = this.cartItemsSubject.value.map((item) => {
      if (item && item.quantity < item.stock) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    this.cartItemsSubject.next(updatedCart);
    // const item = this.cartItems.find((p) => p.id === productId);
    // if (item && item.quantity < item.stock) {
    //   item.quantity++;
    // }
  }

  decrementQuantity(productId: number) {
    const updatedCart = this.cartItemsSubject.value.map((item) => {
      if (item && item.quantity < item.stock) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    this.cartItemsSubject.next(updatedCart);
  }

  removeFromCart(productId: number) {
    const updatedCart = this.cartItemsSubject.value.filter(
      (item) => item.id !== productId
    );
  }

  clearCart() {
    this.cartItemsSubject.next([]);
  }

  getTotal() {
    return this.cartItemsSubject.value.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}
