import { Component, OnInit } from '@angular/core';
import { Content } from '../../services/content';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './seas.html',
  styleUrl: './seas.css',
})
export class Seas implements OnInit {
  pageData: any;
  images: any;

  constructor(private content: Content) {}

  ngOnInit(): void {
    this.content.getPageWithImages('seas').subscribe((result) => {
      this.pageData = result.page;
      this.images = result.images;
    });
  }
}
