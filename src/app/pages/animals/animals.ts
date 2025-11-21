import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Content } from '../../services/content';

@Component({
  selector: 'app-animals',
  standalone: true,
  imports: [CommonModule, RouterLink], // 🔹 RouterLink hinzugefügt
  templateUrl: './animals.html',
  styleUrl: './animals.css',
})
export class Animals implements OnInit {
  seaId: string | null = null;
  animals: any[] = [];
  seaInfo: any | null = null;

  constructor(private route: ActivatedRoute, private content: Content) {}

  ngOnInit(): void {
    this.seaId = this.route.snapshot.paramMap.get('seaId');

    if (this.seaId) {
      this.content.getAnimalsBySea(this.seaId).subscribe((animals: any[]) => {
        this.animals = animals;
      });

      this.content.getSea(this.seaId).subscribe((sea: any | null) => {
        this.seaInfo = sea;
      });
    }
  }
}
