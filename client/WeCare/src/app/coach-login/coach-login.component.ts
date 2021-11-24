import { CoachLoginService } from './coach-login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coach-login',
  templateUrl: './coach-login.component.html',
  styleUrls: ['./coach-login.component.css'],
  providers:[CoachLoginService],
})
export class CoachLoginComponent implements OnInit {

  coachLoginForm!: FormGroup;
  submitted:Boolean=false;
  loginSuccess:Boolean=false;
  message:string='';
  errorMessage:string="";

  constructor(private formBuilder: FormBuilder,private router:Router,private coachLoginService:CoachLoginService) { }
  // constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.coachLoginForm= this.formBuilder.group({
      id: ['', {updateOn: 'blur',validators:[Validators.required]}],
      password: ['', {updateOn: 'blur',validators:[Validators.required,Validators.minLength(5),Validators.maxLength(10)]}],
    });
  }
  coachLogin(){
    if(!this.coachLoginForm.invalid){
      this.submitted=true;    
      this.coachLoginService.coachLogin(this.coachLoginForm.value).subscribe(
        message => {
          // this.message=message;
          // console.log(this.message);
          sessionStorage.setItem('CoachId',this.coachLoginForm.value.id);
          this.router.navigate(['/coachHome'],{replaceUrl:true});
      },
      error => this.errorMessage = <any>error);
      console.log(this.errorMessage);
    }
  }

}
