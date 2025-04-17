import { Component, Input } from '@angular/core';
import { Product } from '../../../data/products';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../toast.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private cartService: CartService, private Toast: ToastService) {}

  addToCart() {
    if (this.product.stock) {
      this.Toast.show(`${this.product.name} Added to Cart🛒`, 'success');
      this.cartService.addToCart(this.product);
      this.product.stock--;
    } else if (this.product.stock === 0) {
      this.Toast.show(`${this.product.name} is out of stock`, 'error');
    }
  }
}
