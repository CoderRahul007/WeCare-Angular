import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CoachSignupService{
    //post
    baseUrl:string='http://localhost:4000/coaches';
    constructor(private http: HttpClient) { }
    coachSignup(Coach:any):Observable<any>{
        return this.http.post<any>(this.baseUrl,Coach).pipe(
            catchError(this.handleError));
    }
    private handleError(err: HttpErrorResponse) {
        console.log(err);
        return Observable.throw(err.error() || 'Server error');
    }

}