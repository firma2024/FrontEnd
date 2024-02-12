import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoActionDocComponent } from './info-action-doc.component';

describe('InfoActionDocComponent', () => {
  let component: InfoActionDocComponent;
  let fixture: ComponentFixture<InfoActionDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoActionDocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoActionDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
