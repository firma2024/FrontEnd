import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProcessComponent } from './register-process.component';

describe('RegisterProcessComponent', () => {
  let component: RegisterProcessComponent;
  let fixture: ComponentFixture<RegisterProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterProcessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
