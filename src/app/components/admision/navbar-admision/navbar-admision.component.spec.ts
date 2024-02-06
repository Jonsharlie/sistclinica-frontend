import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarAdmisionComponent } from './navbar-admision.component';

describe('NavbarAdmisionComponent', () => {
  let component: NavbarAdmisionComponent;
  let fixture: ComponentFixture<NavbarAdmisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarAdmisionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarAdmisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
