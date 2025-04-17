import { CommonModule } from '@angular/common';
import { ToastService } from './../services/toast/toast.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  toasts = this.toastService.toastSignal;
  constructor(private toastService: ToastService) {}
}
