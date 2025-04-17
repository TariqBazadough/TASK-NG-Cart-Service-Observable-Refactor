import { Component, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../../data/products';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ToastService } from '../../toast.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, AsyncPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cart$ = this.cartService.cart$;

  constructor(private cartService: CartService, private toast: ToastService) {}

  increment(item: Product) {
    this.toast.show('Item quantity increased', 'success');
    this.cartService.incrementQuantity(item.id);
  }

  decrement(item: Product) {
    this.toast.show('Item quantity Decreased', 'success');
    this.cartService.decrementQuantity(item.id);
  }

  remove(item: Product) {
    this.toast.show('Item Removed from Cart', 'success');
    this.cartService.removeFromCart(item.id);
  }

  clearCart() {
    this.toast.show(`Cleared Cart `, 'error');
    this.cartService.clearCart();
  }

  getTotal() {
    return this.cartService.getTotal();
  }
}
