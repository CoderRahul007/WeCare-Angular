import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UserProfileService{
    cachedUserId:any=sessionStorage.getItem('UserId');
    baseUrl:string='http://localhost:4000/users/'+this.cachedUserId;
    constructor(private http: HttpClient) { }
    fetchProfile():Observable<any>{
        return this.http.get<any>(this.baseUrl).pipe(
            catchError(this.handleError));
    }
    private handleError(err: HttpErrorResponse) {
        console.log(err);
        return Observable.throw(err.error() || 'Server error');
    }
   
}