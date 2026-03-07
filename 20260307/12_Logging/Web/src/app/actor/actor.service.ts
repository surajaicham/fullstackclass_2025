import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Actor {
  actor_id: number;
  first_name: string;
  last_name: string;
  last_update: string;
}

@Injectable({ providedIn: 'root' })
export class ActorService {
  private apiUrl = environment.apiUrl + '/api/actors';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Actor[]> {
    return this.http.get<Actor[]>(this.apiUrl);
  }

  getById(id: number): Observable<Actor> {
    return this.http.get<Actor>(`${this.apiUrl}/${id}`);
  }

  create(actor: Actor): Observable<Actor> {
    return this.http.post<Actor>(this.apiUrl, actor);
  }

  update(actor: Actor): Observable<Actor> {
    return this.http.put<Actor>(`${this.apiUrl}/${actor.actor_id}`, actor);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getByKeyword(keyword: string): Observable<Actor[]> {
    return this.http.get<Actor[]>(`${this.apiUrl}/search?keyword=${encodeURIComponent(keyword)}`);
  }
}
