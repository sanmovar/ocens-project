import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgClass], // ⬅️ HIER ist NgClass wichtig
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy {
  isHomeActive = false;
  isSeasActive = false;
  isQuizActive = false;

  private sub?: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // direkt beim Start
    this.updateActiveFlags(this.router.url);

    // bei jedem Routing-Wechsel
    this.sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveFlags(event.urlAfterRedirects ?? event.url);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private updateActiveFlags(url: string): void {
    const cleanUrl = url.split('?')[0]; // Query-Params weg

    // Home
    this.isHomeActive = cleanUrl === '/' || cleanUrl === '';

    // Quiz aktiv bei /quizes ODER /quiz/:seaId
    this.isQuizActive = cleanUrl === '/quizes' || cleanUrl.startsWith('/quiz/');

    // Meere aktiv bei /seas ODER /animals/:seaId ODER /animal/:animalId
    this.isSeasActive =
      cleanUrl === '/seas' || cleanUrl.startsWith('/animals/') || cleanUrl.startsWith('/animal/');
  }
}
