import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toasts = signal<Toast[]>([]);
  private idCounter = 0;

  toasts = this._toasts.asReadonly();

  show(message: string, type: ToastType = 'success') {
    const toast: Toast = {
      id: ++this.idCounter,
      message,
      type,
    };

    this._toasts.update((prev) => [...prev, toast]);

    // Auto-remove after 3 seconds
    setTimeout(() => this.remove(toast.id), 3000);
  }

  remove(id: number) {
    this._toasts.update((toasts) => toasts.filter((t) => t.id !== id));
  }
}
