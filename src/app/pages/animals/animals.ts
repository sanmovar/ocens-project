import { Component, OnInit } from '@angular/core';
import { Content } from '../../services/content';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-animals',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './animals.html',
  styleUrl: './animals.css',
})
export class Animals implements OnInit {
  pageData: any;
  images: any; // 🔹 NEU: hier speichern wir das images-Objekt

  constructor(private content: Content) {}

  ngOnInit(): void {
    this.content.getPageWithImages('seas').subscribe((result) => {
      this.pageData = result.page;
      this.images = result.images;
    });
  }
}
