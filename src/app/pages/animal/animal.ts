import { Component, OnInit } from '@angular/core';
import { Content } from '../../services/content';
import { ActivatedRoute, Router } from '@angular/router';
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
  animal: any = null;
  seaInfo: any = null;
  seaId: string | null = null;

  isLoading = true;

  constructor(private content: Content, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const animalId = this.route.snapshot.paramMap.get('animalId');

    if (!animalId) {
      this.redirectHome();
      return;
    }

    this.content.getAnimal(animalId).subscribe({
      next: (animalData: any) => {
        if (!animalData) {
          this.redirectHome();
          return;
        }

        this.animal = animalData;
        this.seaId = animalData.seaId;

        if (!this.seaId) {
          this.redirectHome();
          return;
        }

        const sid = this.seaId;

        this.content.getSea(sid).subscribe({
          next: (seaData: any) => {
            if (!seaData) {
              this.redirectHome();
              return;
            }

            this.seaInfo = seaData;
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Fehler beim Laden des Meeres:', err);
            this.redirectHome();
          },
        });
      },
      error: (err) => {
        console.error('Fehler beim Laden des Tiers:', err);
        this.redirectHome();
      },
    });
  }

  private redirectHome() {
    this.isLoading = false; // falls die Navigation aus irgendeinem Grund scheitert
    this.router.navigate(['/']);
  }
}
