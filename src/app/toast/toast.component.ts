import { Component, computed } from '@angular/core';
import { ToastService } from '../toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  imports: [CommonModule],
  styleUrls: ['./toast.component.css'],
  standalone: true,
})
export class ToastComponent {
  toasts = computed(() => this.toastService.toasts());

  constructor(public toastService: ToastService) {}
}
