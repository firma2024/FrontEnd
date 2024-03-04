import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMenuLawyerComponent } from './main-menu-lawyer.component';

describe('MainMenuLawyerComponent', () => {
  let component: MainMenuLawyerComponent;
  let fixture: ComponentFixture<MainMenuLawyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainMenuLawyerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainMenuLawyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
