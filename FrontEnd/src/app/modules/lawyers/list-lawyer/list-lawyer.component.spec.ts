import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLawyerComponent } from './list-lawyer.component';

describe('ListLawyerComponent', () => {
  let component: ListLawyerComponent;
  let fixture: ComponentFixture<ListLawyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListLawyerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListLawyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
