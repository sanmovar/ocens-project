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
}
