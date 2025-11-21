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
      map((data: any) => {
        const entry = data.animalsBySea.find((item: any) => item.seaId === seaId);
        return entry ? entry.animals : [];
      })
    );
  }

  /** Meer-Infos (Name, Beschreibungen) zu seaId holen */
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
}
