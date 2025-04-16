import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../../data/products';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartItems = this.cartService.cartItems;

  constructor(private cartService: CartService) {}

  increment(item: Product) {
    this.cartService.incrementQuantity(item.id);
  }

  decrement(item: Product) {
    this.cartService.decrementQuantity(item.id);
    this.cartItems = this.cartService.cartItems;
  }

  remove(item: Product) {
    this.cartService.removeFromCart(item.id);
    this.cartItems = this.cartService.cartItems;
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = this.cartService.cartItems;
  }

  getTotal() {
    return this.cartService.getTotal();
  }

  getCount():number{
    let count = 0;
    this.cartService.cartItems.subscribe(items => {
      count = items.length;
    });
    return count;
  }

  getCart(): (Product & { quantity: number })[] {
    console.log('getting cart')
    console.trace()
    let cart: (Product & { quantity: number })[] =[] 
    this.cartService.cartItems.subscribe(items => {
      cart = items;
    });
    return cart;    
  }

}
