import { Component, effect } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  isHidden = this.toastService.showSignal();
  toastColor = this.toastService.colorSignal();
  toastMessage = this.toastService.textSignal();

  displayEffect = effect(() => {
    this.isHidden = this.toastService.showSignal();
    this.toastColor = this.toastService.colorSignal();
    this.toastMessage = this.toastService.textSignal()
  });

  constructor(private toastService: ToastService){
  }

}
