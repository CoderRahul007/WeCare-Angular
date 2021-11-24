import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RescheduleAppointmentsComponent } from './reschedule-appointments.component';

describe('RescheduleAppointmentsComponent', () => {
  let component: RescheduleAppointmentsComponent;
  let fixture: ComponentFixture<RescheduleAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RescheduleAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RescheduleAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
