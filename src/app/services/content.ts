import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class Content {
  constructor(private http: HttpClient) {}

  // ganze JSON-Datei holen
  getContent(): Observable<any> {
    return this.http.get('/assets/content.json');
  }

  // // nur eine Seite per id holen
  // getPage(id: string): Observable<any> {
  //   return this.getContent().pipe(map((data) => this.findPageById(id, data)));
  // }

  // // nur images-Objekt holen
  // getImages(): Observable<any> {
  //   return this.getContent().pipe(map((data) => data.images));
  // }

  // optional: Seite + images zusammen
  getPageWithImages(id: string): Observable<any> {
    return this.getContent().pipe(
      map((data) => ({
        page: this.findPageById(id, data),
        images: data.images,
      }))
    );
  }

  private findPageById(id: string, data: any): any {
    return data.pages.find((page: any) => page.id === id) ?? null;
  }

  // getImage(images: any, imageId: string): any {
  //   return images[imageId];
  // }
}
