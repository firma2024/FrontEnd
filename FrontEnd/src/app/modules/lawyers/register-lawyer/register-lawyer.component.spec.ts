import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLawyerComponent } from './register-lawyer.component';

describe('RegisterLawyerComponent', () => {
  let component: RegisterLawyerComponent;
  let fixture: ComponentFixture<RegisterLawyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterLawyerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterLawyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
