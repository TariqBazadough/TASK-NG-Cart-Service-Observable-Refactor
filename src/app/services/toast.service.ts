import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toasts = signal<string[]>([]);
  readonly toasts = computed(() => this._toasts());

  show(msg: string) {
    this._toasts.update((list) => [...list, msg]);
    setTimeout(() => this.remove(msg), 3000);
  }

  private remove(msg: string) {
    this._toasts.update((list) => list.filter((m) => m !== msg));
  }
}
