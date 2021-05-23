import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { forkJoin, Observable } from 'rxjs';
import { APIResponse, Game } from '../models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  // combinam toate detaliile din acest query intr-unul singur
  getGameDetails(id: string) {
    const gameInfoRequest = this.http.get(`${env.BASE_URL}/${id}`);
    const gameTrailersRequest = this.http.get(`${env.BASE_URL}/${id}/movies`);
    const gameScreenSchots = this.http.get(`${env.BASE_URL}/${id}/screenshots`);

    return forkJoin({
      gameInfoRequest,
      gameScreenSchots,
      gameTrailersRequest,
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenSchots']?.results,
          trailers: resp['gameTrailersRequest']?.results,
        };
      })
    );
  }

  constructor(private http: HttpClient) {}

  getGameList(
    ordering: string,
    search?: string
  ): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering);
    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }
    // vezi calea catre API in environments.ts si environments.prod.ts
    return this.http.get<APIResponse<Game>>(env.BASE_URL, {
      params: params,
    });
  }
}
