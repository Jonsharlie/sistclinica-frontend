import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarEspecialidadComponent } from './agregar-editar-especialidad.component';

describe('AgregarEditarEspecialidadComponent', () => {
  let component: AgregarEditarEspecialidadComponent;
  let fixture: ComponentFixture<AgregarEditarEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarEditarEspecialidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarEditarEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
