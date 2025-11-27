import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Quiz } from './pages/quiz/quiz';
import { Animals } from './pages/animals/animals';
import { Seas } from './pages/seas/seas';
import { Animal } from './pages/animal/animal';
import { Quizes } from './pages/quizes/quizes';

export const routes: Routes = [
  { path: '', component: Home }, // Startseite
  { path: 'quiz/:seaId', component: Quiz },
  { path: 'quizes', component: Quizes },
  { path: 'animals/:seaId', component: Animals },
  { path: 'animal/:animalId', component: Animal },
  { path: 'seas', component: Seas },
  { path: '**', redirectTo: '' },
];
