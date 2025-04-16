import { Component } from '@angular/core';
import { CartItem, CartService } from '../../services/cart.service';
import { Product } from '../../../data/products';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cart: CartItem[] = [];

  constructor(private cartService: CartService) {
    this.cartService.cart$.subscribe((items) => {
      this.cart = items;
    });
  }

  increment(id: number) {
    this.cartService.incrementQuantity(id);
  }

  decrement(id: number) {
    this.cartService.decrementQuantity(id);
  }

  remove(id: number) {
    this.cartService.removeFromCart(id);
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
