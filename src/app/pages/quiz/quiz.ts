import { Component, OnInit, AfterViewInit } from '@angular/core';
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
export class Quiz implements OnInit, AfterViewInit {
  seaId: string | null = null;
  seaInfo: any | null = null;

  questions: any[] = [];
  userAnswers: (number | null)[] = [];

  checked = false;
  correctCount = 0;
  resultText = '';
  resultTexts: { [key: string]: string } = {};

  /** falls kein Quiz gefunden wird */
  noQuizFound = false;

  constructor(
    private route: ActivatedRoute,
    private content: Content,
    private location: Location
  ) {}

  ngOnInit(): void {
    // seaId aus /quiz/:seaId oder ?seaId
    this.seaId =
      this.route.snapshot.paramMap.get('seaId') || this.route.snapshot.queryParamMap.get('seaId');

    console.log('Quiz: seaId aus Route =', this.seaId);

    if (!this.seaId) {
      this.noQuizFound = true;
      return;
    }

    // Meer-Infos (Name etc.)
    this.content.getSea(this.seaId).subscribe((sea: any | null) => {
      this.seaInfo = sea;
    });

    // Quizfragen & Ergebnis-Texte laden
    this.content.getQuizForSea(this.seaId).subscribe((quizData: any) => {
      console.log('Quizdaten für', this.seaId, quizData);

      if (!quizData) {
        this.noQuizFound = true;
        this.questions = [];
        this.resultTexts = {};
        return;
      }

      this.questions = quizData.questions ?? [];
      this.resultTexts = quizData.resultTexts ?? {};
      this.userAnswers = new Array(this.questions.length).fill(null);

      if (!this.questions.length) {
        this.noQuizFound = true;
      }
    });
  }

  ngAfterViewInit(): void {
    // nach dem Rendern zum Quiz-Bereich scrollen
    const el = document.getElementById('quiz-container');
    if (el) {
      el.scrollIntoView({ behavior: 'auto', block: 'start' });
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

  getOptionClass(questionIndex: number, optionIndex: number): string {
    if (!this.checked) {
      return '';
    }

    const q = this.questions[questionIndex];

    // Richtige Antwort → grün
    if (optionIndex === q.correctIndex) {
      return 'option-correct';
    }

    // Falsch angeklickt → rot
    if (this.userAnswers[questionIndex] === optionIndex) {
      return 'option-wrong';
    }

    return '';
  }

  // resetQuiz(): void {
  //   this.checked = false;
  //   this.correctCount = 0;
  //   this.resultText = '';
  //   this.userAnswers = new Array(this.questions.length).fill(null);
  // }
}
