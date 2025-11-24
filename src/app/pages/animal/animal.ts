import { Component, OnInit } from '@angular/core';
import { Content } from '../../services/content';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-animal',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './animal.html',
  styleUrl: './animal.css',
})
export class Animal implements OnInit {
  pageData: any;
  animal: any = null;
  seaId: string | null = null;
  animalId: string | null = null;

  constructor(private content: Content, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.animalId = this.route.snapshot.paramMap.get('animalId');

    // 1️ Lade generelle Seitendaten
    this.content.getPage('animal').subscribe((page) => {
      this.pageData = page;
    });

    // 2️ Lade Tierdaten
    if (this.animalId) {
      this.content.getAnimal(this.animalId).subscribe((animalData: any) => {
        this.animal = animalData;
        this.seaId = animalData?.seaId; // wichtig für zurück / quiz
      });
    }
  }
}
