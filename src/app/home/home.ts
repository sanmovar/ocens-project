import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Header],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  modal: any = null;

  openModal() {
    const element = document.getElementById('imageModal');
    if (!element) return;

    this.modal = new bootstrap.Modal(element, {
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
