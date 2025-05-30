import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordSetService {
  constructor(private http: HttpClient) {}

  getWordSets(): Observable<Record<string, string[]>> {
    return this.http.get<Record<string, string[]>>('assets/word-sets.json');
  }
}
