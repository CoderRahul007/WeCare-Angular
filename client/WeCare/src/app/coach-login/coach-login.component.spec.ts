import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachLoginComponent } from './coach-login.component';

describe('CoachLoginComponent', () => {
  let component: CoachLoginComponent;
  let fixture: ComponentFixture<CoachLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
