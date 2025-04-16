import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartItem, CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  cartCount = 0;
  constructor(private cartService: CartService) {
    this.cartService.cart$.subscribe((cart: CartItem[]) => {
      this.cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    });
  }
}
