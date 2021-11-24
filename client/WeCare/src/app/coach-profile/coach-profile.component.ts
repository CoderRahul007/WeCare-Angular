import { CoachProfileService } from './coach-profile.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coach-profile',
  templateUrl: './coach-profile.component.html',
  styleUrls: ['./coach-profile.component.css'],
  providers:[CoachProfileService]
})
export class CoachProfileComponent implements OnInit {

  profile!:any;
  errorMessage:string='';
  constructor(private router:Router,private coachProfileService:CoachProfileService) { }
  ngOnInit(): void {
    if(!sessionStorage.getItem('CoachId'))
    {
      this.router.navigate(['/coachLogin'],{replaceUrl:true});
    }
    this.coachProfileService.fetchProfile().subscribe(
      message => {
        const arr:any[]=message;
        this.profile=arr[0];       
    },
    error => this.errorMessage = <any>error);
  }
  coachLogout(){
    sessionStorage.removeItem('CoachId');
    this.router.navigate(['/home'],{replaceUrl:true});
  }

}
