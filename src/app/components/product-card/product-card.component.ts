import { Component, Input } from '@angular/core';
import { Product } from '../../../data/products';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private cartService: CartService) {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  getCurrentStock(): number {
    if (!this.product) return 0;
    const inCart =
      this.cartService.getCart().find((i) => i.id == this.product!.id)
        ?.quantity || 0;
    return this.product.stock - inCart;
  }
}
