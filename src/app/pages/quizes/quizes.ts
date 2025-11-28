import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Content } from '../../services/content';

@Component({
  selector: 'app-quizes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './quizes.html',
  styleUrl: './quizes.css',
})
export class Quizes implements OnInit {
  quizPage: any = null;
  quizes: any[] = [];

  constructor(private content: Content) {}

  ngOnInit(): void {
    this.content.getPage('quizes').subscribe((page) => {
      this.quizPage = page;
      const section = page?.sections?.find((s: any) => s.type === 'quiz-overview');
      this.quizes = section?.quizes ?? [];
    });
  }
}
