import { Component } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  modal: any = null;

  openModal() {
    const el = document.getElementById('imageModal');
    if (!el) return;

    this.modal = new bootstrap.Modal(el, {
      backdrop: true,
      keyboard: true,
    });

    this.modal.show();
  }

  closeModal() {
    if (this.modal) {
      this.modal.hide();
    }
  }
}
