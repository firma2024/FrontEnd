import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerActionComponent } from './broker-action.component';

describe('BrokerActionComponent', () => {
  let component: BrokerActionComponent;
  let fixture: ComponentFixture<BrokerActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrokerActionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrokerActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
