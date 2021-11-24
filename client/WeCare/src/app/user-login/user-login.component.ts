import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { HeaderService } from '../header.service';
import { UserLoginService } from './user-login.service';



@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  providers:[UserLoginService]
})
export class UserLoginComponent implements OnInit {

  userLoginForm!: FormGroup;
  submitted:Boolean=false;
  loginSuccess:Boolean=false;
  message!: string;
  errorMessage!:string;

  constructor(private formBuilder: FormBuilder,private router:Router,private userLoginService:UserLoginService) { }
  // constructor(private formBuilder: FormBuilder){}
  ngOnInit(): void {
    this.userLoginForm= this.formBuilder.group({
      id: ['', {updateOn: 'blur',validators:[Validators.required]}],
      password: ['', {updateOn: 'blur',validators:[Validators.required,Validators.minLength(5),Validators.maxLength(10)]}],
    });
  }
  userLogin(){
    if(!this.userLoginForm.invalid){
      this.submitted=true;     
      this.userLoginService.userLogin(this.userLoginForm.value).subscribe(
        message => {
          // this.message=message;
          // console.log(this.message);
          sessionStorage.setItem('UserId',this.userLoginForm.value.id);
          this.router.navigate(['/userHome'],{replaceUrl:true});
      },
      error => this.errorMessage = <any>error);
      console.log(this.errorMessage);
    }
    }
  

}
