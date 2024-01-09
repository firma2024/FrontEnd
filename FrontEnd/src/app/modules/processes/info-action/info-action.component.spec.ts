import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoActionComponent } from './info-action.component';

describe('InfoActionComponent', () => {
  let component: InfoActionComponent;
  let fixture: ComponentFixture<InfoActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoActionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
