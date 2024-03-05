import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProcessLawyerComponent } from './info-process-lawyer.component';

describe('InfoProcessLawyerComponent', () => {
  let component: InfoProcessLawyerComponent;
  let fixture: ComponentFixture<InfoProcessLawyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoProcessLawyerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoProcessLawyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
