import { Component, OnInit } from '@angular/core';
import { Content } from '../../services/content';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css',
})
export class Quiz implements OnInit {
  pageData: any;

  constructor(private content: Content) {}

  ngOnInit(): void {
    this.content.getPage('quiz').subscribe((page) => {
      this.pageData = page;
    });
  }
}
