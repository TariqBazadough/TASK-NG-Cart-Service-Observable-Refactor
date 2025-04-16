import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../../data/products';
import { CurrencyPipe } from '@angular/common';
import { Observable } from 'rxjs';

type cartType = Product & { quantity: number }


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartItems = this.cartService.getCart();

  data: Observable<cartType[]> = this.cartService.updateCart$;

  constructor(private cartService: CartService) {}

  increment(item: Product) {
    this.data.subscribe({
      next: (value) => this.cartService.incrementQuantity(item.id)
    });    
  }

  decrement(item: Product) {
    this.data.subscribe({
      next: (value) => {
        this.cartService.decrementQuantity(item.id);
        this.cartItems = this.cartService.getCart();
      }
    });
    
  }

  remove(item: Product) {
    this.data.subscribe({
      next: (value) => {
        this.cartService.removeFromCart(item.id);
        this.cartItems = this.cartService.getCart();
      }
    });
    
  }

  clearCart() {
    this.data.subscribe({
      next: (value) => {
        this.cartService.clearCart();
        this.cartItems = this.cartService.getCart();
      }
    });
  }

  getTotal() {
    return this.cartService.getTotal();
    
  }
}
