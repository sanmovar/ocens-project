import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Quiz } from './pages/quiz/quiz';
import { Animals } from './pages/animals/animals';
import { Seas } from './pages/seas/seas';
import { Animal } from './pages/animal/animal';
import { Quizes } from './pages/quizes/quizes';

export const routes: Routes = [
  { path: '', component: Home }, // Startseite
  { path: 'quiz', component: Quiz },
  { path: 'quizes', component: Quizes },
  { path: 'animals', component: Animals },
  { path: 'animal', component: Animal },
  { path: 'seas', component: Seas },
  { path: '**', redirectTo: '' },
];
