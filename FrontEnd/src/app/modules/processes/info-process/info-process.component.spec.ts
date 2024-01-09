import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProcessComponent } from './info-process.component';

describe('InfoProcessComponent', () => {
  let component: InfoProcessComponent;
  let fixture: ComponentFixture<InfoProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoProcessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
