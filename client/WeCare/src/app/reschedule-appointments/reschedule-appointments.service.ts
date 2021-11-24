import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RescheduleAppointmentsService{
    //put
    cachedBookingId:any=sessionStorage.getItem('rescheduleBookingId');
    baseUrl:string=`http://localhost:4000/booking/${this.cachedBookingId}`;
    constructor(private http: HttpClient) { }
    
    rescheduleAppointment(User:any):Observable<any>{
        return this.http.put<any>(this.baseUrl,User).pipe(
            catchError(this.handleError));
    }
    private handleError(err: HttpErrorResponse) {
        console.log(err);
        return Observable.throw(err.error() || 'Server error');
    }
   
}