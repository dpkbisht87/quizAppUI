import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Quiz } from "./model/quiz";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  quizList : Quiz[]

  apiURL = 'http://localhost:8080/api/v1/quiz';
  constructor(private http: HttpClient) { }

    // Http Options
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    // HttpClient API get() method => Fetch Stock list
  loadQuiz(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.apiURL + '/questions')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
