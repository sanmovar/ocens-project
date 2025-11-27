import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Content } from '../../services/content';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css',
})
export class Quiz implements OnInit {
  seaId: string | null = null;
  seaInfo: any | null = null;

  questions: any[] = [];
  userAnswers: (number | null)[] = [];

  checked = false;
  correctCount = 0;
  resultText = '';
  resultTexts: { [key: string]: string } = {};

  constructor(
    private route: ActivatedRoute,
    private content: Content,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.seaId =
      this.route.snapshot.paramMap.get('seaId') || this.route.snapshot.queryParamMap.get('seaId');

    if (this.seaId) {
      // Meer-Infos
      this.content.getSea(this.seaId).subscribe((sea: any | null) => {
        this.seaInfo = sea;
      });

      // Quizfragen & Ergebnis-Texte
      this.content.getQuizForSea(this.seaId).subscribe((quizData: any) => {
        this.questions = quizData?.questions ?? [];
        this.resultTexts = quizData?.resultTexts ?? {};
        this.userAnswers = new Array(this.questions.length).fill(null);
      });
    }
  }

  checkAnswers(): void {
    if (!this.questions || this.questions.length === 0) {
      return;
    }

    let count = 0;
    this.questions.forEach((q, index) => {
      if (this.userAnswers[index] === q.correctIndex) {
        count++;
      }
    });

    this.correctCount = count;
    this.checked = true;

    const key = String(this.correctCount);
    this.resultText = this.resultTexts[key] ?? '';
  }

  goBack(): void {
    this.location.back();
  }
}
