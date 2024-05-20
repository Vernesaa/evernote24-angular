import { Injectable } from '@angular/core';
import {Lists, Note} from "./lists";
import {Todo} from "./todo";
import {Image} from "./image";
import {catchError, Observable, retry, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ListsStoreService {
  private api='http://evernote24.s2110456002.student.kwmhgb.at/api';


  constructor(private http:HttpClient,
              private toastr: ToastrService,) {
  }

  getAll(): Observable<Array<Lists>> {
  return this.http.get<Array<Lists>>(`${this.api}/lists`)
.pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getSingle(id:number): Observable<Lists> {
    return this.http.get<Lists>(`${this.api}/lists/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${this.api}/lists/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  update(lists: Lists): Observable<any> {
    return this.http.put(`${this.api}/todos/${lists.id}`, lists)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  create(list: Lists): Observable<any> {
    return this.http.post(`${this.api}/lists`, list)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }



  }

