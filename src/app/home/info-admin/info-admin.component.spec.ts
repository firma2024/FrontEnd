import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAdminComponent } from './info-admin.component';

describe('InfoAdminComponent', () => {
  let component: InfoAdminComponent;
  let fixture: ComponentFixture<InfoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
