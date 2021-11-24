import { BookAppointmentService } from './book-appointment.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common'

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css'],
  providers:[BookAppointmentService]
})
export class BookAppointmentComponent implements OnInit {

  bookAppointmentForm!:FormGroup;
  bookSuccess:Boolean=false;
  errorMessage:string='';
  constructor(private formBuilder: FormBuilder,private router:Router,
    private  location:Location ,private bookAppointmentService:BookAppointmentService) { }

  ngOnInit(): void {
    if(!sessionStorage.getItem('UserId'))
    {
      this.router.navigate(['/userLogin'],{replaceUrl:true});
    }
    this.bookAppointmentForm= this.formBuilder.group({
      dateOfAppointment: ['', {updateOn: 'blur',validators:[Validators.required,this.within7days]}],
      slot: ['', {updateOn: 'blur',validators:[Validators.required]}]
    });
  }
  within7days(c:FormControl){
        const msDay = 86400000;
        let temp:any= new Date(c.value);
        let today:any = new Date();
        const diff:number = (temp - today );
        if (diff < (7 * msDay) && diff >= 0) {
           return null;
        } else {
            return{
              invalidDate:{
                message:'Invalid date'
              }
            }
        }
  }
  bookAppointment(){
    if(!this.bookAppointmentForm.invalid){          
      console.warn(this.bookAppointmentForm.value);
      this.bookAppointmentService.makeAppointment(this.bookAppointmentForm.value).subscribe(
          message =>{             
              this.bookSuccess=true;              
          },
          error=>{
            this.errorMessage = <any>error;
          }
      );
    }
  }
  goBack(){
    this.location.back();
  }
  userLogout(){
    sessionStorage.clear();
    this.router.navigate(['/home'],{replaceUrl:true});  
  }

}
