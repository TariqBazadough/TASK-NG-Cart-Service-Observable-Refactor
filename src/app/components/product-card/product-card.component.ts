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

  constructor(private cartService: CartService , private toast: ToastService) {}

  addToCart() {
    this.cartService.addToCart(this.product);
    this.toast.show("Added To Cart","success")
  }
}
