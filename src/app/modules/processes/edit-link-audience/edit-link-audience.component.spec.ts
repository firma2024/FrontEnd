import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLinkAudienceComponent } from './edit-link-audience.component';

describe('EditLinkAudienceComponent', () => {
  let component: EditLinkAudienceComponent;
  let fixture: ComponentFixture<EditLinkAudienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditLinkAudienceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditLinkAudienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
