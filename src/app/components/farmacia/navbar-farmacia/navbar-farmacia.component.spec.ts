import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarFarmaciaComponent } from './navbar-farmacia.component';

describe('NavbarFarmaciaComponent', () => {
  let component: NavbarFarmaciaComponent;
  let fixture: ComponentFixture<NavbarFarmaciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarFarmaciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarFarmaciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
