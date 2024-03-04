import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProcessAdminComponent } from './list-process-admin.component';

describe('ListProcessAdminComponent', () => {
  let component: ListProcessAdminComponent;
  let fixture: ComponentFixture<ListProcessAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListProcessAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListProcessAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
