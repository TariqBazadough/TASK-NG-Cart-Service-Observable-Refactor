import { Component } from '@angular/core';
import { Product, PRODUCTS } from '../../../data/products';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  product: Product | undefined;
  products = PRODUCTS;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.products.find((product) => product.id === id);
  }

  addToCart() {
    this.product && this.cartService.addToCart(this.product);
  }

  getCurrentStock(): number {
    if (!this.product) return 0;
    const inCart =
      this.cartService.getCart().find((i) => i.id === this.product!.id)
        ?.quantity || 0;
    return this.product.stock - inCart;
  }
}
