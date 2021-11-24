import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserHomeService } from './user-home.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
  providers:[UserHomeService]
})
export class UserHomeComponent implements OnInit {

  coaches:any[]=[];
  errorMessage:string='';
  constructor(private router:Router,private userHomeService:UserHomeService) { }

  ngOnInit(): void {   
    if(!sessionStorage.getItem('UserId'))
    {
      this.router.navigate(['/userLogin'],{replaceUrl:true});
    }
    this.userHomeService.fetchAllCoaches().subscribe(
      message => {                
        this.coaches=message;        
    },
    error => this.errorMessage = <any>error);
  }


  bookAppointment(CoachId:string){
    sessionStorage.setItem('bookCoachId',CoachId);
    this.router.navigate(['/bookAppointment'],{ skipLocationChange: true })
  }
  userLogout(){
    sessionStorage.clear();
    this.router.navigate(['/home'],{replaceUrl:true});
    
  }

}
