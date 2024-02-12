import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoActionWebComponent } from './info-action-web.component';

describe('InfoActionWebComponent', () => {
  let component: InfoActionWebComponent;
  let fixture: ComponentFixture<InfoActionWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoActionWebComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoActionWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
