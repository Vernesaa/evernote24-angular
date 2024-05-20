import { Injectable } from '@angular/core';
import {Lists, Note} from "./lists";
import {Image} from "./image";
import {Todo} from "./todo";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NoteStoreService {
  private api='http://evernote24.s2110456002.student.kwmhgb.at/api';

  constructor(private http:HttpClient) {
  }

  getAll():Observable<Array<Note>>{
    return this.http.get<Array<Note>>(`${this.api}/notes`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }

  getSingle(id:number):Observable<Note> {
    return this.http.get<Note>(`${this.api}/notes/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${this.api}/notes/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllSearch(searchTerm: string): Observable<Array<Note>> {
    return this.http.get<Note>(`${this.api}/notes/search/${searchTerm}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  update(note: Note): Observable<any> {
    return this.http.put(`${this.api}/notes/${note.id}`, note)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  create(note: Note): Observable<any> {
    return this.http.post(`${this.api}/notes`, note)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }


}
