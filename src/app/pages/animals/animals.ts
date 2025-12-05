import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Content } from '../../services/content';
import { SeaTitle } from '../../components/sea-title/sea-title';
import { Router } from '@angular/router';

@Component({
  selector: 'app-animals',
  standalone: true,
  imports: [CommonModule, RouterLink, SeaTitle], // 🔹 RouterLink hinzugefügt
  templateUrl: './animals.html',
  styleUrl: './animals.css',
})
export class Animals implements OnInit {
  seaId: string | null = null;
  animals: any[] = [];
  seaInfo: any | null = null;

  constructor(private route: ActivatedRoute, private content: Content, private router: Router) {}

  ngOnInit(): void {
    this.seaId = this.route.snapshot.paramMap.get('seaId');

    if (!this.seaId) {
      this.router.navigate(['/']);
      return;
    }

    this.content.getAnimalsBySea(this.seaId).subscribe((animals: any[]) => {
      if (!animals || animals.length === 0) {
        this.router.navigate(['/']);
        return;
      }
      this.animals = animals;
    });

    this.content.getSea(this.seaId).subscribe((sea: any | null) => {
      if (!sea) {
        this.router.navigate(['/']);
        return;
      }
      this.seaInfo = sea;
    });
  }
}
