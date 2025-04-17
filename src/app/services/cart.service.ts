import { Injectable , signal, computed, effect} from '@angular/core';
//import { BehaviorSubject } from 'rxjs';
import { Product } from '../../data/products';

export type CartItem = Product & { quantity: number };

@Injectable({ providedIn: 'root' })
export class CartService {
  //private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cartSubject = signal<CartItem[]>([])
  //cart$ = this.cartSubject.asObservable();

  constructor(){
    effect(() => {
      console.log("CART SUBJECT: " , this.cartSubject)
    })
  }

  addToCart(product: Product): void {
    const currentCart = this.cartSubject();
    const item = currentCart.find(p => p.id === product.id);
    console.log("CART SUBJECT: " , this.cartSubject())

    if (item && item.quantity < item.stock) {
      item.quantity++;
    } else if (!item) {
      currentCart.push({ ...product, quantity: 1 });
    }

    this.cartSubject.update(c=>c = currentCart)
  }

  incrementQuantity(productId: number): void {
    const updatedCart = this.cartSubject().map(item => {
      if (item.id === productId && item.quantity < item.stock) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    //this.cartSubject.next(updatedCart);
  }

  decrementQuantity(productId: number): void {
    const updatedCart = this.cartSubject()
      .map(item => {
        if (item.id === productId) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
      .filter(item => item.quantity > 0);


      // const updatedCart = computed<CartItem>(() => {
      //       this.cartSubject()
      //     .map(item => {
      //       if (item.id === productId) {
      //         return { ...item, quantity: item.quantity - 1 };
      //       }
      //       return item;
      //     })
      //     .filter(item => item.quantity > 0)
      //     })

/** */
      // const updatedCart = this.cartSubject()
      // .map(item => {
      //   if (item.id === productId) {
      //     return computed(()=> item.quantity = item.quantity - 1);
      //   }
      //   return item;
      // })
      // .filter(item => item.quantity > 0);
/** */

      this.cartSubject.set(updatedCart)




          //const t = computed(()=> this.cart)
  }

  removeFromCart(productId: number): void {
    const updatedCart = this.cartSubject().filter(item => item.id !== productId);
    //this.cartSubject.next(updatedCart);
  }

  clearCart(): void {
    //this.cartSubject.next([]);
    this.cartSubject.set([])
  }

  getTotal(): number {
    return this.cartSubject().reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  getCartSnapshot(): CartItem[] {
    return this.cartSubject();
  }
}


