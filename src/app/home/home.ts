import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Header } from '../components/header/header';
import * as bootstrap from 'bootstrap';
import { Content } from '../services/content';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
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

  pageData: any;

  constructor(private content: Content) {}

  ngOnInit(): void {
    this.content.getPage('home').subscribe((page) => {
      this.pageData = page;
      // console.log(this.pageData); // zum Testen
    });
  }
}
