import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoLawyerComponent } from './info-lawyer.component';

describe('InfoLawyerComponent', () => {
  let component: InfoLawyerComponent;
  let fixture: ComponentFixture<InfoLawyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoLawyerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoLawyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
