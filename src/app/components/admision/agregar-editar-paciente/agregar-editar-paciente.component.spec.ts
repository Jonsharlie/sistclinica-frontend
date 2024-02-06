import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarPacienteComponent } from './agregar-editar-paciente.component';

describe('AgregarEditarPacienteComponent', () => {
  let component: AgregarEditarPacienteComponent;
  let fixture: ComponentFixture<AgregarEditarPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarEditarPacienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarEditarPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
