import { computed, Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private message = signal<string>('');
  message$ = computed(() => this.message());

  private visible = signal<boolean>(false);
  visible$ = computed(() => this.visible());

  private type = signal<ToastType>('success');
  type$ = computed(() => this.type());

  constructor() {}

  showToast = (message: string, type: ToastType = 'success') => {
    this.message.set(message);
    this.type.set(type);
    this.visible.set(true);
    setTimeout(() => {
      this.message.set('');
      this.visible.set(false);
      this.type.set('success');
    }, 3000);
  };
}
