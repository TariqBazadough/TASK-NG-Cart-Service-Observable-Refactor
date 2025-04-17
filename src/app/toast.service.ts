import { computed, Injectable, signal } from '@angular/core';
export interface Toast{
   message : string;
  type : "success" | "error"
  id: number;

}
@Injectable({
  providedIn: 'root'
})
export class ToastService {
 private toastsSignal = signal<Toast[]>([])
 private nextId = 0;

 toasts = computed(() => this.toastsSignal())
 show(message:string, type:'success' | 'error'){
  const newToast: Toast = {
    message,type,id:this.nextId++
  }
  this.toastsSignal.set([...this.toastsSignal(),newToast])
  setTimeout(() => this.remove(newToast.id), 3000)

 }
  remove(id: number) {
    this.toastsSignal.set(this.toastsSignal().filter(toast => toast.id !== id ))
  }

  constructor() { }
}
