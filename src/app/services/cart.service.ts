import { Injectable } from '@angular/core';

import { Product } from '../../data/products';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private itemsInCart: (Product & { quantity: number })[] = [];

  addProductToCart(product: Product) {
    const existingItem = this.itemsInCart.find(
      (item) => item.id === product.id
    );
    if (existingItem) {
      if (existingItem.quantity < existingItem.stock) {
        existingItem.quantity += 1;
      }
    } else {
      this.itemsInCart.push({ ...product, quantity: 1 });
    }
  }

  getCartContents() {
    return this.itemsInCart;
  }

  increaseQuantity(productId: number) {
    const item = this.itemsInCart.find((item) => item.id === productId);
    if (item && item.quantity < item.stock) {
      item.quantity += 1;
    }
  }

  decreaseQuantity(productId: number) {
    const item = this.itemsInCart.find((item) => item.id === productId);
    if (item) {
      item.quantity -= 1;
      if (item.quantity <= 0) {
        this.removeProductFromCart(productId);
      }
    }
  }

  removeProductFromCart(productId: number) {
    this.itemsInCart = this.itemsInCart.filter((item) => item.id !== productId);
  }

  emptyCart() {
    this.itemsInCart = [];
  }

  calculateTotal() {
    return this.itemsInCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }
}
