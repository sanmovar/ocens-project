import { Component, OnInit } from '@angular/core';
import { Content } from '../../services/content';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quizes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './quizes.html',
  styleUrl: './quizes.css',
})
export class Quizes implements OnInit {
  pageData: any;

  constructor(private content: Content) {}

  ngOnInit(): void {
    this.content.getPage('quizes').subscribe((page) => {
      this.pageData = page;
    });
  }
}
