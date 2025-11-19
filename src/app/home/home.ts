import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import * as bootstrap from 'bootstrap';
import { Content } from '../services/content';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Header, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  modal: any = null;
  pageData: any;
  images: any;

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

  constructor(private content: Content) {}

  ngOnInit(): void {
    this.content.getPageWithImages('home').subscribe((result) => {
      this.pageData = result.page;
      this.images = result.images;
    });
  }
}
