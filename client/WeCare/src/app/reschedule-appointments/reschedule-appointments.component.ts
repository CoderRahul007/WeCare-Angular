import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RescheduleAppointmentsService } from './reschedule-appointments.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-reschedule-appointments',
  templateUrl: './reschedule-appointments.component.html',
  styleUrls: ['./reschedule-appointments.component.css'],
  providers:[RescheduleAppointmentsService]
})
export class RescheduleAppointmentsComponent implements OnInit {
  rescheduleAppointmentForm!:FormGroup;
  submitted:Boolean=false;
  rescheduleSuccess:Boolean=false;
  errorMessage:string='';
  constructor(private formBuilder: FormBuilder,private router:Router,
    private location:Location,private rescheduleAppointmentsService:RescheduleAppointmentsService) { }

  ngOnInit(): void {
    if(!sessionStorage.getItem('UserId'))
    {
      this.router.navigate(['/userLogin'],{replaceUrl:true});
    }
    this.rescheduleAppointmentForm= this.formBuilder.group({
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
  rescheduleAppointment(){
    if(!this.rescheduleAppointmentForm.invalid){         
      console.warn(this.rescheduleAppointmentForm.value);
      this.rescheduleAppointmentsService.rescheduleAppointment(this.rescheduleAppointmentForm.value).subscribe(
        message=>{
          this.rescheduleSuccess=true;
          console.log(message);
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
