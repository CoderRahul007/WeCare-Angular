import { UserAppointmentsService } from './user-appointments.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-user-appointments',
  templateUrl: './user-appointments.component.html',
  styleUrls: ['./user-appointments.component.css'],
  providers:[UserAppointmentsService]
})
export class UserAppointmentsComponent implements OnInit {

  appointments:any[]=[];
  deleteSuccess: boolean=false;
  errorMessage: any;
  errorMessageFetch: any;
  constructor(private router:Router,private userAppointmentsService:UserAppointmentsService) { }

  ngOnInit(): void {  
    if(!sessionStorage.getItem('UserId'))
    {
      this.router.navigate(['/userLogin'],{replaceUrl:true});
    }
    this.userAppointmentsService.fetchApppointmentsUser().subscribe(
      message=>{      
        this.appointments=message.bookings;        
      },
      error=>{
        this.errorMessageFetch = <any>error;
      }
    )
  }
  rescheduleAppointment(BookingId:string){
    sessionStorage.setItem('rescheduleBookingId',BookingId);
    this.router.navigate(['/rescheduleAppointment'],{ skipLocationChange: true })
  }

  deleteAppointment(BookingId:string){
    const val=confirm('Are you Sure');
    console.warn(val);
    if(val){
      this.userAppointmentsService.deleteAppointment(BookingId).subscribe(
          message=>{
            this.deleteSuccess=true; 
            window.location.reload();
            console.log(message);
          },
          error=>{
            this.errorMessage = <any>error;
          }
      );
    }
  }
    userLogout(){
    sessionStorage.removeItem('UserId');
    this.router.navigate(['/home'],{replaceUrl:true});
    
  }
}
