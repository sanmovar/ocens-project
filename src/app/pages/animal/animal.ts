import { Component, OnInit } from '@angular/core';
import { Content } from '../../services/content';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeaTitle } from '../../components/sea-title/sea-title';

@Component({
  selector: 'app-animal',
  standalone: true,
  imports: [CommonModule, RouterLink, SeaTitle],
  templateUrl: './animal.html',
  styleUrl: './animal.css',
})
export class Animal implements OnInit {
  pageData: any;
  animal: any = null;
  seaId: string | null = null;
  animalId: string | null = null;
  seaInfo: any | null = null; // ⬅️ NEU

  constructor(private content: Content, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.animalId = this.route.snapshot.paramMap.get('animalId');

    // 1️ optional: Seitendaten (brauchst du evtl. später)
    this.content.getPage('animal').subscribe((page) => {
      this.pageData = page;
    });

    // 2️ Tierdaten laden
    if (this.animalId) {
      this.content.getAnimal(this.animalId).subscribe((animalData: any) => {
        this.animal = animalData;
        this.seaId = animalData?.seaId; // wichtig für zurück / quiz

        // 3️ sobald seaId bekannt ist -> Meer-Infos nachladen
        if (this.seaId) {
          this.content.getSea(this.seaId).subscribe((sea: any | null) => {
            this.seaInfo = sea;
          });
        }
      });
    }
  }
}
