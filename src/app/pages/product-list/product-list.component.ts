import { Component } from '@angular/core';
import { PRODUCTS } from '../../../data/products';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ToastComponent } from "../../toast/toast.component";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, ToastComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products = PRODUCTS;
}
