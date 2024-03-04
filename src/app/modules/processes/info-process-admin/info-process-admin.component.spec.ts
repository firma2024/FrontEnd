import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProcessAdminComponent } from './info-process-admin.component';

describe('InfoProcessAdminComponent', () => {
  let component: InfoProcessAdminComponent;
  let fixture: ComponentFixture<InfoProcessAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoProcessAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoProcessAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
