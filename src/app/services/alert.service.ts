import { Injectable  } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {  Observable, throwError } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import { Alert } from '../models/model.alert';

@Injectable({
  providedIn: 'root'
})

export class AlertService {

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  public getAlerts(): Observable<Alert[]>{
    return this.httpClient.get<Alert[]>('http://localhost:4200/assets/data/alerts.json')
      .pipe(catchError(this.handleError));
  }
}
