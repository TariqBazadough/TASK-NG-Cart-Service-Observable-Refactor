import { Injectable } from '@angular/core';
import { Product } from '../../data/products';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  // private cartItems: (Product & { quantity: number })[] = [];
  cart = new BehaviorSubject<(Product & { quantity: number })[]>([]);
  cart$ = this.cart.asObservable();

  // total$: Observable<number> = this.cart.pipe(
  //   map((items) =>
  //     items.reduce((total, item) => total + item.price * item.quantity, 0)
  //   )
  // );

  // addToCart(product: Product) {
  //   this.cart.subscribe((value) => {
  //     const item = value.find((p) => p.id === product.id);
  //     if (item) {
  //       if (item.quantity < item.stock) {
  //         item.quantity++;
  //       }
  //     } else {
  //       value.push({ ...product, quantity: 1 });
  //     }
  //   });
  // }

  // // getCart() {
  // //   return this.cartItems;
  // // }

  // incrementQuantity(productId: number) {
  //   this.cart.subscribe((value) => {
  //     const item = value.find((p) => p.id === productId);
  //     if (item && item.quantity < item.stock) {
  //       item.quantity++;
  //     }
  //   });
  // }

  // decrementQuantity(productId: number) {
  //   this.cart.subscribe((value) => {
  //     const item = value.find((p) => p.id === productId);
  //     if (item && item.quantity > 1) {
  //       item.quantity--;
  //     } else {
  //       this.removeFromCart(productId);
  //     }
  //   });
  // }

  // removeFromCart(productId: number) {
  //   this.cart.subscribe((value) => {
  //     value = value.filter((p) => p.id !== productId);
  //     this.cart.next(value);
  //   });
  // }

  // clearCart() {
  //   this.cart.next([]);
  // }

  // getTotal() {
  //   return this.cart.value.reduce(
  //     (total, item) => total + item.price * item.quantity,
  //     0
  //   );
  // }

  addToCart(product: Product) {
    const item = this.cart.getValue().find((p) => p.id === product.id);
    if (item) {
      if (item.quantity < item.stock) {
        item.quantity++;
      }
    } else {
      this.cart.next([...this.cart.getValue(), { ...product, quantity: 1 }]);
    }
  }

  incrementQuantity(productId: number) {
    const item = this.cart.getValue().find((p) => p.id === productId);
    if (item) {
      if (item.quantity < item.stock) {
        item.quantity++;
      }
    }
  }

  decrementQuantity(productId: number) {
    const item = this.cart.getValue().find((p) => p.id === productId);
    if (item) {
      item.quantity--;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      }
    }
  }

  removeFromCart(productId: number) {
    const updatedCart = this.cart.getValue().filter((p) => p.id !== productId);
    this.cart.next(updatedCart);
  }

  clearCart() {
    this.cart.next([]);
  }

  getTotal() {
    const item = this.cart.getValue();
    return item.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
