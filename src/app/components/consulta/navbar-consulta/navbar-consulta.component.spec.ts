import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarConsultaComponent } from './navbar-consulta.component';

describe('NavbarConsultaComponent', () => {
  let component: NavbarConsultaComponent;
  let fixture: ComponentFixture<NavbarConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarConsultaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
