import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  showSignal = signal(false);
  colorSignal = signal('green');
  textSignal = signal('');
  constructor() { }

  showToast(isError: boolean, message: string){
    this.showSignal.set(true);
    this.textSignal.set(message);
    this.colorSignal.set(isError? 'red': 'green');
    setInterval(() => {this.showSignal.set(false)}, 3000);
  }
}
