import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sea-title',
  standalone: true,
  templateUrl: './sea-title.html',
  styleUrl: './sea-title.css',
})
export class SeaTitle {
  @Input() seaName: string | null = null;
  @Input() showExtraText: boolean = false;
}
