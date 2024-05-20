import { Injectable } from '@angular/core';
import {Todo} from "./todo";
import {Image} from "./image";
import {Note} from "./note";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TodoStoreService {
  private api='http://evernote24.s2110456002.student.kwmhgb.at/api';

  constructor(private http:HttpClient) {
  }


  getAll():Observable<Array<Todo>>{
    return this.http.get<Array<Todo>>(`${this.api}/todos`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getSingle(id:number): Observable<Todo> {
    return this.http.get<Todo>(`${this.api}/todos/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${this.api}/todos/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  update(todo: Todo): Observable<any> {
    return this.http.put(`${this.api}/todos/${todo.id}`, todo)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  create(todo: Todo): Observable<any> {
    return this.http.post(`${this.api}/todos`, todo)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

}
