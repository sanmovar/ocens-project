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
  quizPage: any | null = null;
  seas: any[] = [];

  constructor(private content: Content) {}

  ngOnInit(): void {
    // 1️ Seite "quizes" aus content.json laden
    this.content.getPage('quizes').subscribe((pageData) => {
      this.quizPage = pageData;
    });

    // 2️ Alle Meere aus content.json holen (für Bilder und Namen)
    this.content.getSeasForQuiz().subscribe((seasData) => {
      this.seas = seasData;
    });
  }
}
