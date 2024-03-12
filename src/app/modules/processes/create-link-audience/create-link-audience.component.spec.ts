import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLinkAudienceComponent } from './create-link-audience.component';

describe('CreateLinkAudienceComponent', () => {
  let component: CreateLinkAudienceComponent;
  let fixture: ComponentFixture<CreateLinkAudienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateLinkAudienceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateLinkAudienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
