import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class Content {
  constructor(private http: HttpClient) {}

  // ------------------------------------
  // Grundfunktion: komplette content.json laden
  // ------------------------------------
  getContent(): Observable<any> {
    // wichtig: Pfad konsistent verwenden
    return this.http.get('/assets/content.json');
  }

  // ------------------------------------
  // Seiten nach id (z.B. 'home', 'seas', 'quizes', 'quiz')
  // ------------------------------------
  getPage(id: string): Observable<any | null> {
    return this.getContent().pipe(
      map((data: any) => data.pages.find((page: any) => page.id === id) ?? null)
    );
  }

  // ------------------------------------
  // Tiere für ein bestimmtes Meer
  // ------------------------------------
  getAnimalsBySea(seaId: string): Observable<any[]> {
    return this.getContent().pipe(
      map((data: any) => {
        const sea = data.animalsBySea.find((s: any) => s.seaId === seaId);
        return sea ? sea.animals : [];
      })
    );
  }

  // ------------------------------------
  // Meer-Infos (Name, Beschreibungen) zu seaId (aus Seite 'seas')
  // ------------------------------------
  getSea(seaId: string): Observable<any | null> {
    return this.getPage('seas').pipe(
      map((seasPage: any) => {
        if (!seasPage || !seasPage.seas) {
          return null;
        }
        const sea = seasPage.seas.find((item: any) => item.id === seaId);
        return sea ?? null;
      })
    );
  }

  // Einzelnes Tier über animalId finden (aus animalsBySea)
  getAnimal(animalId: string): Observable<any | null> {
    return this.getContent().pipe(
      map((data: any) => {
        const allAnimals = data.animalsBySea.flatMap((sea: any) => sea.animals);
        return allAnimals.find((animal: any) => animal.id === animalId) ?? null;
      })
    );
  }

  // Meer-Infos direkt (falls irgendwo noch genutzt)
  getSeaInfo(seaId: string): Observable<any | null> {
    return this.getPage('seas').pipe(
      map((page: any) => {
        if (!page || !page.seas) {
          return null;
        }
        return page.seas.find((sea: any) => sea.id === seaId) ?? null;
      })
    );
  }

  // ------------------------------------
  // QUIZ-ÜBERSICHT (Seite quizes.html)
  // ------------------------------------
  getQuizOverview(): Observable<any | null> {
    // Page mit id "quizes"
    return this.getPage('quizes');
  }

  /** Quiz-Fragen + Ergebnis-Texte zu einem Meer laden */
  getQuizForSea(seaId: string): Observable<any> {
    return this.getPage('quiz').pipe(
      map((quizPage: any) => {
        if (!quizPage) return null;

        // Quiz zum gesuchten Meer
        const quiz = quizPage.quizzes.find((q: any) => q.seaId === seaId);

        if (!quiz) return null;

        // Ergebnis-Texte oben aus der Seite hinzufügen
        return {
          questions: quiz.questions,
          title: quiz.title,
          resultTexts: quizPage.resultTexts, // ← WICHTIG!
        };
      })
    );
  }

  // (Optional) falls du irgendwo nur die Result-Texte brauchst:
  getQuizResultTexts(seaId: string): Observable<{ [key: string]: string } | null> {
    return this.getQuizForSea(seaId).pipe(
      map((quiz: any) => {
        if (!quiz || !quiz.resultTexts) {
          return null;
        }
        return quiz.resultTexts as { [key: string]: string };
      })
    );
  }

  getSeasForQuiz(): Observable<any[]> {
    return this.getPage('quizes').pipe(
      map((page: any) => {
        if (!page || !page.sections || !page.sections.length) {
          return [];
        }

        // Suche im ersten Abschnitt nach "quizes"
        const section = page.sections.find((s: any) => s.type === 'quiz-overview');
        return section?.quizes ?? [];
      })
    );
  }
}
