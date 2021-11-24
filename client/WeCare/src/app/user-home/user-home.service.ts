import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UserHomeService{
    //get
    baseUrl:string='http://localhost:4000/coaches/all';
    constructor(private http: HttpClient) { }
    fetchAllCoaches():Observable<any>{
        return this.http.get<any>(this.baseUrl).pipe(
            catchError(this.handleError));
    }
    private handleError(err: HttpErrorResponse) {
        console.log(err);
        return Observable.throw(err.error() || 'Server error');
    }
   
}