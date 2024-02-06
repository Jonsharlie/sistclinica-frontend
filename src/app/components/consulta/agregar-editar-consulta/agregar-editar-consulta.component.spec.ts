import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarConsultaComponent } from './agregar-editar-consulta.component';

describe('AgregarEditarConsultaComponent', () => {
  let component: AgregarEditarConsultaComponent;
  let fixture: ComponentFixture<AgregarEditarConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarEditarConsultaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarEditarConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
