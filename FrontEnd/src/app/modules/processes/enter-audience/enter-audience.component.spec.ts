import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterAudienceComponent } from './enter-audience.component';

describe('EnterAudienceComponent', () => {
  let component: EnterAudienceComponent;
  let fixture: ComponentFixture<EnterAudienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnterAudienceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnterAudienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
