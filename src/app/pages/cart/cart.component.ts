import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../../data/products';
import { AsyncPipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, AsyncPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartItems$ = this.cartService.cartItems$;

  constructor(private cartService: CartService) {}

  increment(item: Product) {
    this.cartService.incrementQuantity(item.id);
    // this.cartService.addToCart2(item.id)
  }

  decrement(item: Product) {
    this.cartService.decrementQuantity(item.id);
    // this.cartItems = this.cartService.getCart();
  }

  remove(item: Product) {
    this.cartService.removeFromCart(item.id);
    // this.cartItems = this.cartService.getCart();
  }

  clearCart() {
    this.cartService.clearCart();
    // this.cartItems = this.cartService.getCart();
  }

  getTotal() {
    return this.cartService.getTotal();
  }
}
