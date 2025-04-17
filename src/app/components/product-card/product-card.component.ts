import { Component, Input, output } from '@angular/core';
import { Product } from '../../../data/products';
import { RouterLink } from '@angular/router';
import { CartItem, CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product!: Product;
  cart = output<void>();
  constructor(private cartService: CartService) {}

  addToCart() {
    this.cartService.addToCart(this.product);
    this.cart.emit()
  }
}
