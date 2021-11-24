import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UserAppointmentsService{
        //delete +id
    cachedUserId:any=sessionStorage.getItem('UserId') || null;
    // cachedBookingId:any=sessionStorage.getItem('BookingId');

    deleteUrl:string='http://localhost:4000/booking/'
    fetchUrl:string='http://localhost:4000/users/booking/'+this.cachedUserId;
    constructor(private http: HttpClient) { }

    fetchApppointmentsUser():Observable<any>{
        return this.http.get<any>(this.fetchUrl).pipe(
            catchError(this.handleError));
    }
    deleteAppointment(BookingId:string):Observable<any>{
        return this.http.delete<any>(this.deleteUrl+BookingId).pipe(
            catchError(this.handleError));
    }
    private handleError(err: HttpErrorResponse) {
        console.log(err);
        return Observable.throw(err.error() || 'Server error');
    }
   
}