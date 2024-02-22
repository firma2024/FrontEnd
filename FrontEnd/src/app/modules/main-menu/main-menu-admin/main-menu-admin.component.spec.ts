import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMenuAdminComponent } from './main-menu-admin.component';

describe('MainMenuAdminComponent', () => {
  let component: MainMenuAdminComponent;
  let fixture: ComponentFixture<MainMenuAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainMenuAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainMenuAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
