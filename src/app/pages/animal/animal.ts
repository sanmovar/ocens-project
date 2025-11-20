import { Component, OnInit } from '@angular/core';
import { Content } from '../../services/content';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-animals',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './animal.html',
  styleUrl: './animal.css',
})
export class Animal implements OnInit {
  pageData: any;

  constructor(private content: Content) {}

  ngOnInit(): void {
    this.content.getPage('animal').subscribe((page) => {
      this.pageData = page;
    });
  }
}
