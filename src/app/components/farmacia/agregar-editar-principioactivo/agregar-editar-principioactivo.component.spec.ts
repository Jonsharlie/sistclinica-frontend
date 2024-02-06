import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarPrincipioactivoComponent } from './agregar-editar-principioactivo.component';

describe('AgregarEditarPrincipioactivoComponent', () => {
  let component: AgregarEditarPrincipioactivoComponent;
  let fixture: ComponentFixture<AgregarEditarPrincipioactivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarEditarPrincipioactivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarEditarPrincipioactivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
