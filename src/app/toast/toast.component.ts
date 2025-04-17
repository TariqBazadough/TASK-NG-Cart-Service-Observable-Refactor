import { Component } from '@angular/core';
import { ToastService } from '../toast.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  constructor(public toastService: ToastService ){

  }

}
