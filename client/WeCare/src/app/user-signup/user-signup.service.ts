import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UserSignupService{
    //post
    baseUrl:string="http://localhost:4000/users";
    constructor(private http: HttpClient) { }
    userSignup(User:any):Observable<any>{
        return this.http.post<any>(this.baseUrl,User).pipe(
            catchError(this.handleError));
    }
    private handleError(err: HttpErrorResponse) {
        console.log(err);
        return Observable.throw(err.error() || 'Server error');
    }
   
}