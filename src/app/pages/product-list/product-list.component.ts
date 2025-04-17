import { Component, computed, effect, signal } from '@angular/core';
import { PRODUCTS } from '../../../data/products';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { count } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  products = PRODUCTS;
  counter = signal(0);
  doubleCounter = computed(() => this.counter() * 2);
  multiply = signal(2);

  constructor() {
    effect(() => {
      console.log('yert: ', this.counter());
    });
  }

  logEffect = effect(() => {
    console.log('Counter chamhed to', this.counter());
  });

  resetCount() {
    this.counter.set(0);
  }
  setCount() {
    this.counter.set(10);
  }
  inc() {
    this.counter.update((val) => val + 1);
    // this.counter.update(this.counter + 1);
  }
  dec() {
    this.counter.update((val) => val - 1);
  }
  isMultiply() {
    this.multiply.update((val) => val * 2);
  }
}
