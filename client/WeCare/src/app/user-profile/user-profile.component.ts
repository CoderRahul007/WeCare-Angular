import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileService } from './user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers:[UserProfileService]
})
export class UserProfileComponent implements OnInit {

  profile!:any;
  errorMessage:string='';
  constructor(private router:Router,private userProfileService:UserProfileService) { }

  ngOnInit(): void {
    if(!sessionStorage.getItem('UserId'))
    {
      this.router.navigate(['/userLogin'],{replaceUrl:true});
    }
    this.userProfileService.fetchProfile().subscribe(
      message => {         
        const arr:any[]=message;
        this.profile=arr[0];
    },
    error => this.errorMessage = <any>error);
  }
  userLogout(){
    sessionStorage.clear();
    this.router.navigate(['/home'],{replaceUrl:true});
  }

}
