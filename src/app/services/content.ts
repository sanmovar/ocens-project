import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class Content {
  constructor(private http: HttpClient) {}

  getContent(): Observable<any> {
    return this.http.get('/assets/content.json');
  }

  getPage(id: string): Observable<any | null> {
    return this.getContent().pipe(
      map((data: any) => data.pages.find((page: any) => page.id === id) ?? null)
    );
  }

  /** alle Tiere für ein bestimmtes Meer holen */
  getAnimalsBySea(seaId: string): Observable<any[]> {
    return this.getContent().pipe(
      map((data) => {
        const sea = data.animalsBySea.find((s: any) => s.seaId === seaId);
        return sea ? sea.animals : [];
      })
    );
  }

  /** Meer-Infos holen */
  getSea(seaId: string): Observable<any | null> {
    return this.getPage('seas').pipe(
      map((seasPage: any) => {
        if (!seasPage || !seasPage.seas) return null;
        const sea = seasPage.seas.find((item: any) => item.id === seaId);
        return sea ?? null;
      })
    );
  }

  getAnimal(animalId: string) {
    return this.http.get('assets/content.json').pipe(
      map((data: any) => {
        const allAnimals = data.animalsBySea.flatMap((sea: any) => sea.animals);
        return allAnimals.find((animal: any) => animal.id === animalId) || null;
      })
    );
  }

  getSeaInfo(seaId: string): Observable<any> {
    return this.getPage('seas').pipe(map((page) => page.seas.find((sea: any) => sea.id === seaId)));
  }

  /** 🔹 Neues: Seite "quizes" holen */
  getQuizesPage(): Observable<any | null> {
    return this.getPage('quizes');
  }

  /** 🔹 Neues: Alle Meere für Quiz-Startseite holen */
  getSeasForQuiz(): Observable<any[]> {
    return this.getPage('seas').pipe(map((page: any) => (page && page.seas ? page.seas : [])));
  }

  /** Quiz-Fragen & Ergebnis-Texte für ein Meer holen */
  getQuizForSea(
    seaId: string
  ): Observable<{ questions: any[]; resultTexts: { [key: string]: string } }> {
    return this.getPage('quiz').pipe(
      map((quizPage: any) => {
        if (!quizPage || !quizPage.questionsBySea) {
          return { questions: [], resultTexts: {} };
        }

        const seaBlock = quizPage.questionsBySea.find((item: any) => item.seaId === seaId);
        const questions = seaBlock ? seaBlock.questions : [];
        const resultTexts = quizPage.resultTexts ?? {};

        return { questions, resultTexts };
      })
    );
  }
}
