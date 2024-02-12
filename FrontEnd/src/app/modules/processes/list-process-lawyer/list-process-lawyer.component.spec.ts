import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProcessLawyerComponent } from './list-process-lawyer.component';

describe('ListProcessLawyerComponent', () => {
  let component: ListProcessLawyerComponent;
  let fixture: ComponentFixture<ListProcessLawyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListProcessLawyerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListProcessLawyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
