import { CoachHomeService } from './coach-home.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coach-home',
  templateUrl: './coach-home.component.html',
  styleUrls: ['./coach-home.component.css'],
  providers:[CoachHomeService]
})
export class CoachHomeComponent implements OnInit {

  schedules: any[] = [];
  errorMessage:string='';
  errorFetch: boolean=false;
  constructor(private router:Router,private coachHomeService:CoachHomeService) { }
  ngOnInit(): void {
    if(!sessionStorage.getItem('CoachId'))
    {
      this.router.navigate(['/coachLogin'],{replaceUrl:true});
    }
    this.coachHomeService.getAppointmentsByCoach().subscribe(
      message =>{
        this.schedules=message.bookings;        
      },
      error=>{
        this.errorFetch=true;
        this.errorMessage = <any>error;           
      }
    );
    
  }
  coachLogout(){
    sessionStorage.removeItem('CoachId');
    this.router.navigate(['/home'],{replaceUrl:true});
  }

}
